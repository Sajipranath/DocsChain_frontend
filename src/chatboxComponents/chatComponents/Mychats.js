import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../chatConfig/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Tooltip } from "@chakra-ui/react";
import { useChatState } from "../chatContext/Chatprovider";
import "./styles.css";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const token = localStorage.getItem('token');

  const { selectedChat, setSelectedChat,  chats, setChats, user } = useChatState([]);

  const toast = useToast();
  
  // useEffect(() => {
  //   console.log('loggedUser user++++', loggedUser);
  //  }, [loggedUser]);

  const fetchChats = async () => {
    // console.log(user._id);
     //const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
           'x-auth-token': token,
        },
      };
      console.log('logeed user-------',loggedUser)

      const response = await axios.get("/api/chat", config);
      const data = response.data;
      console.log('data', data);

      const result = data || [];
      console.log('result length',result.length)
      console.log('result', result);
      console.log('result users', result[0].users[1])
      
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const loguser=JSON.parse(localStorage.getItem("userDetalies"));
    setLoggedUser(loguser);
    console.log('logeed user',loguser)
   // console.log('loggedUser user',loggedUser)
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

   

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Tooltip label="Create New Group" aria-label="Add Tooltip">
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              
            </Button>
          </Tooltip>
        </GroupChatModal>
      </Box>
      
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {/* {console.log("Chats Length:", chats.length)} */}
        {chats ? (
          <Stack overflowY="scroll" maxHeight="500px">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#119BE0" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
               
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">

                    {/* <b>{chat.latestMessage.sender.firstName} : </b> */}
                    <b>{chat.latestMessage.content}  </b>
                    {(chat.latestMessage.content || []).length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;