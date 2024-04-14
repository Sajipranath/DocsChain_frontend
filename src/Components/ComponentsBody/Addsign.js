import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Viewer from './viewer.js';
//import ExcelViewer from './excelviewer.js';
// import WordViewer from './wordviewer.js';

const Addsign = () => {
  const [vw, setVW] = useState();
  console.log('Addsign component rendered');
  const location = useLocation();
  const hash = location.state?.hash;

  console.log('The Hash:', hash);

  const [fileType, setFileType] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [fileName,setFileName] =useState('');

  useEffect(() => {
    const fetchUserDocuments = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Token does not exist, handle the error or redirect to login
        console.log('Token not found. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`/api/dflies/down/${hash}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          },
        });

        const data = response.data;
        // Perform further actions with the download link, such as opening the document in a web document viewer
        console.log('Response from IPFS and database:', data);
        console.log('The File Name:', data.fileName);
        console.log('Download Link:', data.downloadLink);
       
        
        
        // Extract file extension from the file name
        const fileExtension = data.fileName.split('.').pop().toLowerCase();

        // Set the file type based on the file extension

         // Set the download link and file type
         setDownloadLink(data.downloadLink);
         setFileName(data.fileName);
        if (fileExtension === 'pdf') {
          setFileType('pdf');
        } 
        else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
          setFileType('pdf');
        } 
        else if (fileExtension === 'doc' || fileExtension === 'docx') {
          setFileType('pdf');
        }
        else if (fileExtension === 'pptx' || fileExtension === 'pptx') {
          setFileType('pdf'); } 


        else if (fileExtension === 'png' || fileExtension === 'png') {
            setFileType('pdf'); } 
        }
      



        catch (error) {
        console.error('Error retrieving download link:', error);
      }
    };

    if (hash && hash !== '') {
      fetchUserDocuments();
    }
  }, [hash]);


  

  return (
    <div>
      
      {fileType === 'pdf' && <Viewer downloadLink={downloadLink}  fileName={fileName} />}
      {/* {fileType === 'docx' && <PdfViewer downloadLink={downloadLink} />} */}
      {/* {fileType === 'excel' && <ExcelViewer downloadLink={downloadLink} />}
      {fileType === 'word' && <WordViewer downloadLink={downloadLink} />} */}
    </div>
  );
};

export default Addsign;
