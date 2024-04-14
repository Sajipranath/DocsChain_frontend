import React from "react";

import { Link } from "react-router-dom";
// import SignUp from "../SignUp";

//import bitcoin from '../images/bitcoin.png'

const Intro =()=> {
  return(
    
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
    <div className="container-fluid">
      <a className="navbar-brand h3 px-4" href="#">DocsChain</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item h5 px-3">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item h5 px-3">
            <a className="nav-link" href="#">Blog</a>
          </li>
        
                    <li className="nav-item h5 px-3">
            <Link to="/SignUp" className="nav-link">Signup</Link>
          </li>
          <li className="nav-item h5 px-3">
            <Link to="/SignIn" className="nav-link">Signin</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  

    
     
);


};
export default Intro;