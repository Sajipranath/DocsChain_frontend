import React from "react";
import '../Styles/FooterIntro.css';


const FooterIntro=()=>{
    return(      
        <>
            <div id="bg-footer"className="container-fluid">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <p id="docchainname">DocsChain</p>
                    </div>
                </div>
            </div>            
            <div className="row">
                <div className="col-md-3">
                    <p id  ="para2">
                          The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle. 
                           Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission policy on university admissions.
                    </p>
                </div>     
                <div  id="para3"className="col-md-3">
                          <a > USEFUL LINKS</a> 
                         
                          
                         <br></br><a>University of Ruhuna</a> 
                         <br></br> <a>Faculty of Engineering</a> 
                          <br></br> <a>ENG-MIS</a> 
                          <br></br> <a>Library</a> 
                           <br></br> <a>IESL</a>  
                        </div>
                        
                        <div id="para3" className="col-md-3">
                          <a >DEPARTMENTS</a>
                         <br></br> <a>Civil and Environment Engineering</a>
                           <br></br>   <a>Electrical and Information Engineering</a>            
                             <br></br>    <a>Mechanical and Manufacturing Engineering</a>         
                              <br></br>     <a> Interdisciplinary Studies</a>     
                          
                        </div>
                        
                        <div id="para3" className="col-md-3">
                          <a >CONTACT US
                          </a>
                         <br></br> <a>Faculty of Engineering,Hapugala,Galle,Sri Lanka.</a>
                           <br></br>  <a>Phone: +(94)0 91 2245765/6</a> 
                             <br></br> <a>E-mail: webmaster@eng.ruh.ac.lk</a>  
                          
                        </div>

                        </div>
                     

                   
                        </>
    )
}


export default FooterIntro;