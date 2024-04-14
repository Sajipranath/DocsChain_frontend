import React, { useState } from 'react';
//import logo from './logo.svg';
import { Route, Routes, BrowserRouter,Navigate, Outlet} from 'react-router-dom';
// import "./Styles/Inner.css";


import Mainheader from '../Components/ComponentsBody/Mainheader';

import Document from '../Components/ComponentsBody/Document';
import Upload from '../Components/ComponentsBody/Upload';
import Addsign from '../Components/ComponentsBody/Addsign';
import Sidebar from '../Components/ComponentsBody/Sidebar';
import Footer from '../Components/ComponentsBody/Footer';
import Navbar from '../Components/ComponentsBody/Navbar';


function Inner() {
  const [activePage, setActivePage] = useState('document');

  const handleNavItemClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      
         <Mainheader/>
         <Navbar onNavItemClick={handleNavItemClick} />  
        <div className="container-fluid">
          <div className="row">
              <div className="col-lg-2 d-lg-block d-none">
            
                <Sidebar/>
              </div>
              <div className="col-lg-1 d-lg-block d-none">
              <div className="vertical-line"></div>
              </div>
              <div className="col-lg-8 col-12">
                <div className="content-switching">
                  <Outlet />
              </div>
            
              </div>
            </div>
          </div>
       
        
        <Footer/>
     
    
    </>

  );
}
export default Inner;
