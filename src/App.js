
import { Route, Routes} from 'react-router-dom';


import React from "react";
//import Content from './Pages/ContentPage';

import Home from './pages/Home';
import Inner from './pages/Inner';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Document from './Components/ComponentsBody/Document';
import DownloadPage from './Components/ComponentsBody/DownloadsPage'
import Addsign from './Components/ComponentsBody/Addsign';
import Upload from './Components/ComponentsBody/Upload'
//import { useEffect, useState } from "react";
//import Upload from './Components/ComponentsBody/Upload';
import Chatprovider from './chatboxComponents/chatContext/Chatprovider';

import Chatinner from './chatboxComponents/chatPages/chatinner';
import ChatApp from './chatboxComponents/ChatApp';
import Sajidetalies from './chatboxComponents/chatComponents/UserAvatar/sajidetalies';

function App() {
  const user = localStorage.getItem('token');
  
  return (
        <>
      <Routes>
      {user && <Route path="/inner/" element={<Inner/>} />}
      <Route path="/" element={<Home />} />
     
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    
      <Route path="inner" element={<Inner />} >
        <Route index element={<Document />} />
        <Route path="download" element={<DownloadPage />} /> 
        <Route path="addsign" element={<Addsign />} /> 
        <Route path="upload" element={<Upload />} /> 
        <Route path="chatinner" element={<Chatinner/>}/>
        <Route path="chatapp" element={<ChatApp />} /> 
        <Route path="rowdy" element={<Sajidetalies />} /> 
      </Route>
      
    </Routes>

    </>
    
    
  );
}

export default App;
