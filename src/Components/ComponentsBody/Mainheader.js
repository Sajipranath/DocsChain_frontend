import React, { useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BiMenu } from 'react-icons/bi';
import '../Styles/Mainheader.css';
import axios from 'axios';
import { ethers } from "ethers";
import Requestaccount from './Block';

function Mainheader() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);



  const handleLogout = () => {
    // Perform logout actions here
    // ...

    // Redirect to the Home component
    navigate('/');

   
  };

  

  

  
  useEffect(() => {
    // Fetch the user's name from the backend
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
            
      if (!token) {// Token does not exist, handle the error or redirect to login
          console.log('Token not found. Please log in.');
          return;
            }
      try {
        const response = await axios.get('/api/users/username',{
          headers:{
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          }
        }
        ); 
        const { name } = response.data;
        console.log('Response data: ',response.data);
        console.log('name is', name)


        // Set the user's name in the state
        setUserName(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserName();
  }, []);


  
 
    useEffect(() => {
      async function fetchWalletAddress() {
        const address = await Requestaccount();
        setWalletAddress(address);
      }
  
      fetchWalletAddress();
    }, []);







  return (
    <header id="main-header" className="container-fluid">
      <div className="row">
       <div className="col-md-9 col-lg-10">
        <h1 className="logo">
           <Link to="/">Docs Chain</Link>
        </h1>
       </div>
      
         <div className="col-sm-none col-md-3 col-lg-2 header-buttons">

          
          <button className="user-button">Hi! {userName}</button>
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      {/* <div className='row'>
 
      <div className='col-md-12'>
          <div  className='metamask'>
          <button onClick={Requestaccount} >Connect Wallet</button>
           
        
            </div>

      </div> 

      </div> */}
       <div className='row'>

      <div  className='metamask'>
      <h3>wallet address:{walletAddress}</h3>
      
      
      </div>

         </div> 



    </header>
  );
}

export default Mainheader;
