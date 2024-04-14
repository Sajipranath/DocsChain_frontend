import React, { useState ,useContext,createContext} from 'react'
//import {useChatState} from '../../chatContext/Chatprovider'
 const ChatContext = createContext();
const Saji = ({ children }) => {
   
    // const [ setUser] = useChatState();
     

       

    const userDetalies = JSON.parse(localStorage.getItem("userDetalies"));
     console.log("user :",userDetalies);
     console.log("user email :",userDetalies.email);

    //setUser(userDetalies);
    // console.log("user-email",userDetalies.email);



  return (
    <div>
       
       <h3> Welcome</h3>
        <h3>{userDetalies.email}</h3> 
        {/* <ChatContext.Provider
      value={{
        
        user,
        setUser,
       
      }}
    >
      {children}
    </ChatContext.Provider> */}
      
    </div>
  )
}
// export const ChatState = () => {
//   return useContext(ChatContext);
// };

export default Saji;
