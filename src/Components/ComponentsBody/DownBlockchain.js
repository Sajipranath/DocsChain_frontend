

import React,{useEffect,useState} from "react";

import { ethers } from 'ethers';

import { soliditySha3 } from 'web3-utils';
import { func } from "prop-types";



export async function DownBlockchain(genkey){
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


 const Blocknumber= await provider.getBlockNumber();
 
 // Wallet for transaction signing (replace with your wallet's private key)
 const privateKey = 'a23c0ffbca95bdc4847ea05b3e9f4c3a5ca82a9a0919fb412360ba0fc0fc5fb5'; // Replace with your private key
     
 const wallet = new ethers.Wallet(privateKey, provider);
 console.log('Wallet address:', wallet);



 // Create a contract instance
 const contract = new ethers.Contract(contractAddress, contractABI, provider);
 const key= genkey;
 console.log('Routed Key->',key);
 
try{

    const contentDetails = await contract.getContentDetails(key);
   const hashvalue = contentDetails[1];

   console.log("Hash bytes->>",hashvalue)
  

  return hashvalue;
}

catch(error){
    console.error('Error interacting with the smart contract:', error);
    throw error;

}








}