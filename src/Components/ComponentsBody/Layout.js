import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Mainheader from './Mainheader';
import Footer from './Footer';

const Layout = ({ children }) => {

    
    
  return (
    <>
       <Mainheader />
      <Navbar  />
      <div className="container">
        <div className="row">
          <div className="col-lg-2 d-lg-block d-none">
            <Sidebar />
          </div>
          <div className="col-lg-1 d-lg-block d-none">
            <div className="vertical-line"></div>
          </div>
          <div className="col-lg-8 col-12">
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
