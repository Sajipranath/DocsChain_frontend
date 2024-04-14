import React, { useState,useEffect } from 'react';
import { useLocation ,useNavigate} from "react-router-dom";
import { DownBlockchain } from './DownBlockchain';
import axios from 'axios';
import { Eye } from 'bootstrap-icons-react';





const DownloadPage = ({ history }) => {

  const location = useLocation();
  const { lastPartOfGeneratedKeys } = location.state || {};

  const [hashValue, setHashValue] = useState('');

  const [newHashValue, setNewHashValue] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

     // Fetch the existing hash values from the database when the component loads
     fetchHashValues();

     // Check if a new hash value is available
    if (lastPartOfGeneratedKeys) {

      const fetchData = async () => {
        const result = await DownBlockchain(lastPartOfGeneratedKeys);
        setHashValue(result); // Set the hashValue here
        uploadhash(result); // Call uploadhash with the set hashValue

        // Re-fetch the hash values to include the new value
      fetchHashValues();
      };
  
      fetchData();

      
    }
    
  }, [lastPartOfGeneratedKeys]);


  const uploadhash = async (hashValue) => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Token does not exist, handle the error or redirect to login
      console.log('Token not found. Please log in.');
      return;
    }

    try {
      if (history) {
        history(hashValue);
      }
      console.log('route hash to db', hashValue);
      const payload = {
        hashValue,
      };
      const saveResponse = await axios.post('/api/downdocs/hash', payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };


  const fetchHashValues = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found. Please log in.');
      return;
    }

    try {
      const response = await axios.get('/api/downdocs/hashvalues', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
        
      const docs=response.data;
      setNewHashValue(docs);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleHashValueChange = (event) => {
    setNewHashValue(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear the input fields after submitting
    setNewHashValue('');
  
  };
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleHover = (index) => {
    setHoverIndex(index);
  };

  const handleDownload = (hash) => {
    return () => {
      // Pass the hash value to the Addsign component via navigate
      console.log(hash);
      navigate('/inner/addsign', { state: { hash: hash } });
    };
  };
  
    

  return (
    
    
<div className="table">
        
        <h2>Downloaded Documents</h2>
           <div className="table-wrapper">
           <table className="table">
               <thead>
                   <tr>
                       {/* <th scope="col"></th> */}
                       {/* <th scope="col">Type</th> */}
                       <th scope="col">Hash Value</th>
                       <th scope="col"></th>
           
                   </tr>
               </thead>
               <tbody>
                
               {newHashValue.map((document, index) => (
                        <tr key={document._id}>
                         
                          
                          <td>{document.hashValue}</td>
                          <td
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={() => handleHover(null)} >
                       
                          <Eye
                            color={hoverIndex === index ? 'blue' : 'black'}
                            onClick={handleDownload(document.hashValue)}
                          />
                        
                          

                          </td>
                        </tr>
                      ))}
               </tbody>

           </table>
           </div>
       </div>
    
  );
};


export default DownloadPage; 

