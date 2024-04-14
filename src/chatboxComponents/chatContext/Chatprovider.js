import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const ChatContext = createContext();

const Chatprovider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [generatedKey, setGeneratedKey] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, set the user from localStorage
      const userInfo = JSON.parse(localStorage.getItem('userDetalies'));
      setUser(userInfo);
      console.log('userinfo:', userInfo);
    } else {
      // If the token doesn't exist, navigate to "/"
      navigate('/');
    }
  }, [navigate]);

  // useEffect(() => {
    

    
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        user,
       setUser,
       generatedKey,
       setGeneratedKey,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default Chatprovider;