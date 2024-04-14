import React,{useEffect,useState} from "react";

import { ethers } from 'ethers';

import { soliditySha3 } from 'web3-utils';
import { AlarmFill } from "bootstrap-icons-react";





export async function UploadToBlockchain(hash) {
// Your contract's address and ABI
const contractAddress = '0xD1bbC4C4F0ca1e4fc8fefd01CDb4cBa7C636e73F'; // Replace with your actual contract address
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "uploader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hashValue",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "ContentUploaded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_key",
        "type": "bytes32"
      }
    ],
    "name": "getContentDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hashValue",
        "type": "string"
      }
    ],
    "name": "uploadContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/b9FML_qKuadWuTdRBSQgakL8W9tfif-A');
console.log("Provider-->",provider);

const Blocknumber= await provider.getBlockNumber();
console.log("Block Number-->",Blocknumber);


 // Wallet for transaction signing (replace with your wallet's private key)
 const privateKey = 'a23c0ffbca95bdc4847ea05b3e9f4c3a5ca82a9a0919fb412360ba0fc0fc5fb5'; // Replace with your private key
     
// const privateKey ='a1d83e76d6616b86f708ca25f5f0e1c73df3b29141bb0cdbd5bb8519ee2ba0b3';

 const wallet = new ethers.Wallet(privateKey, provider);
 console.log('Wallet address:', wallet);

//  const hashvalue= localStorage.getItem('hashvalue');
 console.log("hash-string",hash);

 // Create a contract instance
 const contract = new ethers.Contract(contractAddress, contractABI, provider);
 const connectedSigner = wallet.connect(provider);


  
   

    try{
        console.log("Before transaction - hashvalue:", hash);
         // Upload content to the smart contract
    const tx = await contract.connect(connectedSigner).uploadContent(hash);
    const txReceipt = await tx.wait();
 // Wait for the transaction to be mined
        // await  measureWalletCreationTime();
    console.log("After transaction - hashvalue:", hash);


            // Get the block timestamp for the mined transaction
            const blockNumber = txReceipt.blockNumber;
            const block = await provider.getBlock(blockNumber);
            console.log("Blocknumber",block)
            const blockTimestamp = block.timestamp;
           
            const time= new Date(blockTimestamp * 1000).toUTCString()

            console.log("Block creation time:", time);
            // alert("Block creation time:", time);

            const startTime = Date.now(); // Record the start time

            // Generate a random private key (for demonstration purposes)
            const privateKey = ethers.Wallet.createRandom().privateKey;
        
            // Create a wallet instance
            const wallet = new ethers.Wallet(privateKey);
            

            const createBlockAsync = async () => {
              const startTime = Date.now(); // Record the start time
            
              // Replace this with your actual asynchronous operation
            
              const endTime = Date.now(); // Record the end time
            
              const creationTime = endTime - startTime;
            
              console.log('Block created in', creationTime, 'milliseconds.');
             //  alert('Block created in ' + creationTime + ' milliseconds.'); // Display time in the alert message
            };
            
        
           // Call the asynchronous function
        createBlockAsync();



    // The key can be obtained from the ContentUploaded event
   // Get the ContentUploaded event from the transaction receipt
   const contentUploadedEvent = txReceipt.events.find(event => event.event === 'ContentUploaded');

   if (contentUploadedEvent) {
    console.log("Event emitted args",contentUploadedEvent.args)
       const key = contentUploadedEvent.args.key;

       console.log('Uploaded content with key::::', key);
       return key;
   } else {
       console.log('Content upload failed.');
       return null;
   }

    
    }
    catch (error) {
        console.error('Error uploading content:', error);
        return null;
      }
 

 
 
 



  };

  async function measureWalletCreationTime() {
    
}
