import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/SignUp.css';

// Bootstrap CSS
//import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
//import "bootstrap/dist/js/bootstrap.bundle.min";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({...data, [input.name]: input.value})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users/signup";
      /*
      const userData = {
        firstName: data.firstName,
        lastName: data.LastName,
        email: data.email,
        password: data.password
      }
      axios.post("http//localhost:3000/api/users/signup", userData).then((response) => {
        console.log(data)
      })
      */
      const res = await axios.post(url, data)
      console.log(data);
      console.log(res);
      navigate("/signin");
      //<Navigate to='/' replace={true} />
      console.log(res.message);
    } catch (error) {
      if(error.response && 
        error.response.status >= 400 &&
        error.response.status <= 500
        ){
          setError(error.response.data.message)
        }
    }
  };
  return(
    <div className='register-form'>
    <div className='row'>
      <div className=' col-md-6'>
        <form className='form' onSubmit={handleSubmit}>
            <div className='welcome'>Welcome to DocsChain</div>
            <div className='signupText'>To Sign up</div>
            <div className="input-container">
              <label>First Name </label>
              <input id="text"  name="firstName" value={data.firstName} required onChange={handleChange}/>
            </div>
            <div className="input-container">
              <label>Last Name </label>
              <input id="text" name="lastName" value={data.lastName} required onChange={handleChange}/>
            
            </div>
            <div className="input-container">
              <label>Email </label>
              <input id="email" name="email" value={data.email} required onChange={handleChange}/>
              
            </div>
            <div className="input-container">
              <label>Batch </label>
              <input id="number" name="batch" value={data.batch} required onChange={handleChange}/>
              
            </div>
            <div className="input-container">
              <label>Password </label>
              <input id="password" name="password" value={data.password} required onChange={handleChange}/>
              
            </div>
            {error && <div>{error}</div>}
            <div className="button-container">
              <button className='registerBtn' id='submit'>Register</button>
            </div>
          <p>Already have an account? <Link className='link' to="/signin">Sign In</Link></p>
          

        </form>
    </div>
      <div className=' col-md-6 col-sm-4 align-items-center d-flex'>
        <div className='logoText'>Faculty of Engineering,<br></br> University of Ruhuna</div>
      </div> 
    </div>
    </div>
  )
}


export default SignUp;
