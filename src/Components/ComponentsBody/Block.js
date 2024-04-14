import React, { useState } from "react";
import { watch } from "./Upload";
import { ethers } from 'ethers';




async function Requestaccount() {

  console.log('Requested Accounts');
  if (window.ethereum) {
    console.log('Metamask Detected');

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      

      console.log(accounts);
     

      
      
      return accounts[0]; // Return the account address
    
    } catch (error) {
      console.log("Error Connecting");
    }
  } else {
    console.log('MM not detected');
  }

  return null; // Return null if no address is available
}

export default Requestaccount;
