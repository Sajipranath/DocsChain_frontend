import './ChatApp.css';
//import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import axios from 'axios';

import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
//import {useChatState} from './chatContext/Chatprovider'

function ChatApp() {


  //const  [userDetalies,setUserDetalies]=useState([]);
const navigate = useNavigate();
//const [user, setUser] = useChatState();

useEffect(()=>{

  const fetchUserDetalies=async()=>{

    const token =localStorage.getItem('token');
            
    if (!token) {
        console.log('Token not found. Please log in.');
        return;
          }
          try {
            const response = await axios.get('/api/users/detalies',{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                  },


            }); 
            const detalies = response.data;
            console.log("user detalies",response.data);
            //console.log("user detalies2",detalies);

            
            //setUserDetalies(detalies);
            localStorage.setItem("userDetalies", JSON.stringify(detalies));
            // setLoading(false);
           // setUser(detalies); // Set the user details in the state after fetching
            
               

            
           
          } 
            catch (error){
                console.error(error)

            }
          };
          fetchUserDetalies();
        


  } ,[]);


   const butnavigate =()=>{
      navigate('/inner/rowdy');

   }



  return (
   <div>
     <button onClick={butnavigate}> Click Me</button>
   </div>
     
       
  );
}

export default ChatApp;
