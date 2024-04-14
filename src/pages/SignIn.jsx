import React from 'react';
import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Styles/SignIn.css';

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("")
  const navigate = useNavigate();
  //const navigate = Navigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({...data, [input.name]: input.value})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth/signin";
      const res = await axios.post(url, data);
      console.log('Token:',res.data.data);
      const token = res.data.data;
        localStorage.setItem('token', token);

    
      
         
      //window.location('/Home')
      navigate("/inner");
      //redirect("/")
     
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
      <div className='login-form'>
        <div className='row'>
          <div className='col col-md-6 align-items-center d-flex'>
            <form className='form' onSubmit={handleSubmit}>
              <div className='welcome'>Welcome to DocsChain</div>
              <div className='signupText'>Log In</div>
            <div className="input-container">
                <label className='label'>Email </label>
                <input id="email" type="email" name="email" required value={data.email} onChange={handleChange}/>
              </div>

              <div className="input-container">
                <label className='label'>Password </label>
                <input id="password" type="password" name="password" value={data.password} required onChange={handleChange} />
              </div>
              {/* <div>
              <input type={'checkbox'} id="checkbox" />
                <label htmlFor="remember">Remember me</label>
              </div> */}

              {error && <div>{error}</div>}

              <div className="button-container">
              <button className='loginBtn' type='submit' id="submit">Login</button>
            </div>
        
              <p>Don't have an account? <Link className='link' to="/signUp">Register</Link></p>
          
            </form>
          </div>
          <div className='col col-md-6 align-items-center d-flex'>
           <div className='logoText'>Faculty of Engineering,<br></br> University of Ruhuna</div>
          </div>
          </div>  
      </div>
    )
}


export default SignIn;