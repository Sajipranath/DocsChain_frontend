import React, { useState ,useRef} from 'react';
import '../Styles/Upload.css';
import { useDropzone } from 'react-dropzone';
import { ArrowDown ,FileEarmarkMedical, Share, Arrow90degRight, Arrow90degUp,} from 'bootstrap-icons-react';
import { BiSend } from 'react-icons/bi';
import Lottie from "react-lottie";
import animationData from '../Styles/uploading.json';
import {useToast, Spinner} from "@chakra-ui/react";
import UserNameList from '../../chatboxComponents/chatComponents/UserAvatar/UserNameList';
import axios from 'axios';
import { ethers } from 'ethers';
import { UploadToBlockchain } from './BlockchainService';
import UserBadgeItem from '../../chatboxComponents/chatComponents/UserAvatar/UserBadgeItem';
import { DownBlockchain } from './DownBlockchain';
const bs58 = require('bs58');
const bs58check = require('bs58check');

function Upload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hashValue, setHashValue] = useState('');
  const [generatedKey,setGeneratedKey]=useState('');
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const toast = useToast();

  const dropzoneRef = useRef(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.pdf, .docx, .xlsx, .pptx', // Specify the accepted file types here
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setErrorMessage('');
    },
    maxSize: 100 * 1024 * 1024, // 100MB maximum file size
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: "XMidYMid meet",
    // },
  };

  const handleUpload = async () => {

    const token = localStorage.getItem('token');
   
    if (!token) {// Token does not exist, handle the error or redirect to login
      console.log('Token not found. Please log in.');
      return;
        }


      // Token exists, you can use it for further operations
      console.log('Token:', token);

     
    try {
      if (!selectedFile) {
        setErrorMessage('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/api/ipfs/up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        },
      });  
 

      // Assuming the response contains the uploaded hash
      const { hash } = response.data;
      setHashValue(hash);

      // localStorage.setItem('hashvalue', hash);


      

      
      const generatedKey = await UploadToBlockchain(hash); 
      setGeneratedKey(generatedKey); // Set the generated key state
      console.log("Generated Key-->",generatedKey);
      
   



      if (onUpload) {
        onUpload(hash);
      }
      // setHashValue(hash); // Set the hash value state

    // Fetch the user ID or username from your authentication system or wherever it is stored
  
             const payload = {
             fileName: selectedFile.name,
             hashValue: hash, };
      // Make a POST request to save the data in the backend
      const saveResponse = await axios.post('/api/ufiles/updb', payload,{

        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
      }
     
    
      );




           
    } catch (error) {
      console.error(error);
    }
  
 
  };


  const handleClear = () => {
    setSelectedFile(null); // Clear selected file
    setHashValue(''); // Clear hash value
  };

  const handleMessageChange = (e) => {
    setMessageContent(e.target.value);
  };
  
  const handleSearch = async (query) => {
    setSearch(query);
    const token = localStorage.getItem('token');
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.get(`/api/users/allusers?search=${search}`, config);
       const data = response.data;
      console.log(data);
      setLoading(false);
      
      
      const filteredResults = data.filter((user) => !selectedUsers.some((selectedUser) => selectedUser._id === user._id));
    
       setSearchResult(filteredResults);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);

    setSearch('');
    setSearchResult([]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!selectedUsers.length) {
      toast({
        title: "Error",
        description: "Please select at least one user.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    
    if (!generatedKey) {
      toast({
        title: "Empty upload Warning",
        description: "Please upload a document before sharing.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
        transform: "translate(-50%, -50%)",
      });
      return;
    }

    const token = localStorage.getItem('token');
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          'x-auth-token': token,
        },
      };
  
      // Create an array of recipient IDs
      const recipientIds = selectedUsers.map((user) => user._id);
  
      // Check if a chat exists between the current user and each selected user
      const chatIds = [];
      for (const recipientId of recipientIds) {
        const chatCheckResponse = await axios.post(
          "/api/chat",
          {
            userId: recipientId,
          },
          config
        );
  
        if (chatCheckResponse.data._id) {
          chatIds.push(chatCheckResponse.data._id);
        }
      }
  
      // Construct the message content with the generatedKey
      const messageContent = `Uploaded Document Key: ${generatedKey}`;
      console.log('genereted key', messageContent)
      // Send a separate message to each recipient
      for (const chatId of chatIds) {
        await axios.post(
          "/api/message",
          {
            content: messageContent,
            chatId: chatId,
            recipientIds: [recipientIds], // Send to one recipient at a time
          },
          config
        );
      }
  
      // Clear the selected users
      setSelectedUsers([]);
  
      toast({
        title: "Message Sent",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  
  

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
  <input className="input-zone" {...getInputProps()} />
  <div className="text-center">
    {isDragActive ? (
      <p className="dropzone-content">Release to drop the files here</p>
    ) : (
      selectedFile ? (
        // If a file is uploaded, show this content
        <div>
          <p className="file-uploaded">File has been uploaded</p>
          <div className="file-details">
          <i style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <FileEarmarkMedical style={{ width: '150px', height: '200px' }} />
          </i>
            <p className="file-name">{selectedFile.name}</p>
          </div>
        </div>
      ) : (
        // If no file is uploaded, show the default content
        <div>
          <p className="dropzone-content">
            Drag & drop a PDF, DOCX, XLSX, or PPTX file here, OR click below to select a file
          </p>
          <button type="button" className="btn" onClick={() => {
            dropzoneRef.current.value = null; // Reset the value of the file input
            handleClear(); // Clear fields when "Click to select file" is clicked
          }}>
            Click to select a file
          </button>
          <div className="upload-arrow">
            {/* <ArrowDown /> */}
            <Lottie
              options={defaultOptions}
              width={70}
              style={{ marginBottom: 15, marginLeft: 'auto', marginRight: 'auto', alignItems: 'center', justifyContent: 'center' }}
            />
          </div>
          <p className="upload-message">Max upload size: 100MB</p>
        </div>
      )
    )}
  </div>
</div>


      <aside>
        <div className="Select-file">
          <div className="container">
            <div className="row">
              <div className="col-sm-2 col-lg-2 showTitle">Selected file :</div>
              <div className="col-sm-7 col-lg-5 botBorder">
                {selectedFile ? <li>{selectedFile.name}</li> : <li>No file selected</li>}
              </div>
              <div className="col-sm-7 col-lg-2">
                <button className="upload-button" onClick={handleUpload} >
                  Upload
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-7 col-lg-2 showTitle">Hash value :</div>
              <div className="col-sm-7 col-lg-7 botBorder">
                <label id="hashValue">
                  {hashValue}  {/* Display the hash value */}
                </label>
              </div>
            </div>
            {errorMessage && (
              <div className="row">
                <div className="col-lg-12 botBorder">
                  <p className="error-message">{errorMessage}</p>
                </div>
              </div>
            )}
            <div className='row'>
              <div className='col col-sm-12 col-lg-2 showTitle'>
                Block key :
              </div>
              <div className='col col-sm-11 col-lg-7 botBorder'>
                <label id="hashvalue">
                   {generatedKey}
                </label>
              </div>
            </div>
            <div className='row' style={{ marginTop: '10px' }}>
            <div className="col-sm-7 col-lg-2 showTitle">Share To :</div>
              <div className='col-sm-7 col-lg-4 search'> 
                 <div>
                  <input
                    placeholder="Add Sender"
                    mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                   {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
                  {loading ? (
                  <Spinner size="lg" />
                ) : (
                  searchResult
                  ?.slice(0, 1)
                  .map((user) => (
                    <UserNameList
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
                )}
                <div>
                 
                  </div>
                  {/* <input
                    placeholder="Enter your message" // Add a placeholder for the message input
                    value={messageContent}
                    onChange={handleMessageChange} // Handle message input change
                  /> */}
                  </div>
              </div>
              <div className='col-sm-7 col-lg-4 search'> 
                  <button className="upload-button" onClick={handleSubmit}>
                      <BiSend/>
                      <i class="bi bi-send-arrow-up"></i>
                    </button>
                
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
            };

export default Upload;