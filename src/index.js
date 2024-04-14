import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter } from "react-router-dom"
//import Content from './Pages/ContentPage';

import Chatprovider from './chatboxComponents/chatContext/Chatprovider';
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <ChakraProvider>
    <BrowserRouter>
    
    <Chatprovider> 
      <App />
    </Chatprovider> 
    
    
      
    </BrowserRouter>
    </ChakraProvider>
  //</React.StrictMode>
  // <React.StrictMode>
//   <ChakraProvider>
//   <BrowserRouter>
//     <Chatprovider>
//     <App />
//     </Chatprovider>



//   </BrowserRouter>
// </ChakraProvider>
// </React.StrictMode>
);    


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();