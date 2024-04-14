import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
//import '../Styles/Navbar.css'
import { Search } from 'bootstrap-icons-react';
import axios from 'axios';
// import { hover } from '@testing-library/user-event/dist/hover';
import { Eye } from 'bootstrap-icons-react';
import { useNavigate } from 'react-router-dom';
import { navigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

const Document = ({ history }) => {

    const [hashValue, setHashValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    

    
    
  
    const handleHashValueChange = (event) => {
      setHashValue(event.target.value);
    };
  
    const handleFileNameChange = (event) => {
      setFileName(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Clear the input fields after submitting
      setHashValue('');
      setFileName('');
    };


    const [hoverIndex, setHoverIndex] = useState(null);

    const handleHover = (index) => {
      setHoverIndex(index);
    };


    useEffect(() => {
        // Fetch the documents for the current user from the backend
        const fetchUserDocuments = async () => {
            const token = localStorage.getItem('token');
            
    if (!token) {// Token does not exist, handle the error or redirect to login
        console.log('Token not found. Please log in.');
        return;
          }
        // Token exists, you can use it for further operations
        console.log('Token:', token);
  
          try {
            const response = await axios.get('/api/ufiles/files',{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                  },


            }); // Fetch user documents from the backend
            const documents = response.data;
    
            // Assuming that the response contains an array of document objects with properties fileName and hashValue
            // Set the documents in the state
            setDocuments(documents);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUserDocuments();
      }, []);



      const handleDownload = (hash) => {
        return () => {
          // Pass the hash value to the Addsign component via navigate
          console.log(hash);
          navigate('/inner/addsign', { state: { hash: hash } });
        };
      };
      
        
      
      
   
      

    return(


<div className="table">
        
        <h2>Uploaded Documents</h2>
           <div className="table-wrapper">
           <table className="table">
               <thead>
                   <tr>
                       <th scope="col">Name</th>
                       {/* <th scope="col">Type</th> */}
                       <th scope="col">Hash Value</th>
                       <th scope="col"></th>
           
                   </tr>
               </thead>
               <tbody>
                
               {documents.map((document, index) => (
                        <tr key={document._id}>
                          <td>{document.fileName}</td>
                          
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

       
                    // <form >
                    //     <input type="text" placeholder="Search..."  />
                        
                    //     <button type="submit"><Search/> </button>
                    // </form>
                   
  
  
    )
}


export default Document; ;

