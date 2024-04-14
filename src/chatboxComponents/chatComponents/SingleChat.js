import React, { useState, useEffect } from "react";
import { Box, FormControl, Input, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Lottie from "react-lottie";
import animationData from "../chatAnimations/typing.json";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useChatState } from "../chatContext/Chatprovider";
import {
  isSameSenderMargin,
  isSameUser,
  getSender,
  getSenderFull,
} from "../chatConfig/ChatLogics";
import ScrollableChat from "./ScrollableChat";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

import ScrollableFeed from "react-scrollable-feed";

const ENDPOINT = "http://localhost:4000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [lastPartOfGeneratedKeys, setLastPartOfGeneratedKeys] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    user,
    setGeneratedKey,
  } = useChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    const token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };

      setLoading(true);

      const response = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      const data = response.data;

      setMessages(data);
      setFilteredMessages(
        data.filter((message) =>
          message.content.includes("Uploaded Document Key:")
        )
      ); // Filter and set filtered messages
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);

      const token = localStorage.getItem("token");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-auth-token": token,
          },
        };
        setNewMessage("");
        const response = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        const data = response.data;
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setFilteredMessages([...filteredMessages, data]); // Add new message to filtered messages
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
        setFilteredMessages([...filteredMessages, newMessageReceived]); // Add new message to filtered messages
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleFilteredMessageClick = (message) => {
    console.log(`Clicked on message: ${message.content}`);

    const lastPart = getLastPartFromMessageContent(message.content);

    navigate("/inner/download", {
      state: { lastPartOfGeneratedKeys: lastPart },
    });
  };

  function getLastPartFromMessageContent(messageContent) {
    const parts = messageContent.split(" "); // Split the message content by spaces
    const lastPart = parts[parts.length - 1]; // Get the last part of the split (the generated key)
    return lastPart;
  }

  return (
    <>
    
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <ArrowBackIcon
              display={{ base: "flex", md: "none" }}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              
              <div className="messages">
                <ScrollableFeed>
                <ScrollableChat messages={messages} />
                {filteredMessages.map((message) => {
                  const isButtonMessage = message.content.includes("Uploaded Document Key:");
                  return isButtonMessage ? (
                    <button 
                      style={{
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginLeft: isSameSenderMargin(messages, message, 1, user._id),
                        marginTop: isSameUser(messages, message, 1, user._id) ? 3 : 10,
                        backgroundColor: `${
                          message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                        }`,
                      }}
                      key={message._id}
                      onClick={() => handleFilteredMessageClick(message)} 
                    >
                      {message.content}
                    </button>
                  ) : (
                    <div
                      style={{
                        marginLeft: isSameSenderMargin(messages, message, 1, user._id),
                        marginTop: isSameUser(messages, message, 1, user._id) ? 3 : 10,
                        backgroundColor: `${
                          message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                        }`,
                      }}
                      key={message._id}
                    >
                      {message.content}
                    </div>
                  );
                })}
                 </ScrollableFeed>
              </div>
            )}
         
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
      
    </>
  );
};

export default SingleChat;
