import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useChatState } from '../chatContext/Chatprovider';
import {Box} from "@chakra-ui/layout"
import SideDrawer from '../chatComponents/miscellaneous/SideDrawer';
import ChatBox from '../chatComponents/ChatBox';
import Mychats from '../chatComponents/Mychats';
import '../ChatApp.css'

const Chatinner = () => {
     const [fetchAgain, setFetchAgain] = useState(false);
     const user = JSON.parse(localStorage.getItem('userDetalies'));


  return (
    <div className="Chatinner" style={{width:"100%"}}>
      {user && <SideDrawer/>}  
      <Box display="flex" justifyContent="space-between" w="100%" h="" p="10px">
        
        {user && <Mychats fetchAgain={fetchAgain}/>}
         {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />} 
      </Box>
    </div>
  )
};

export default Chatinner
