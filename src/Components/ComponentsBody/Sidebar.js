import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Sidebar.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Sidebar = (onNavItemClick) => {
    return(
      
    <div className="container">
        
            
                <div className="Category-Center">
                    

                    <ul className="main-nav">
                        <li><Link to="/inner" onClick={() => onNavItemClick('document')} >Uploads</Link></li> {/* Document.js */}
                        <li><Link to="/inner/download" onClick={() => onNavItemClick('upload')} >Downloads</Link></li>
                        <li><Link to="/inner/addsign" onClick={() => onNavItemClick('addSign')} >Add Sign</Link></li>
                        <li><Link to="/inner/chatinner" onClick={() => onNavItemClick('chatinner')} >Chatbox</Link></li>
                        <li><Link to="/inner/chatapp" onClick={() => onNavItemClick('chatapp')} >Draft</Link></li>
                    </ul>
                    <hr/>

                    <h2 className="homescreen__title">Admin tools</h2>

                    <p className="homescreen__option">Dashboard & Reports</p>
                    <p className="homescreen__option">Manage Users</p>
                    <p className="homescreen__option">Manage Users Groups</p>
                    <p className="homescreen__option">Recycle bin</p>
                    <p className="homescreen__option">More..</p>

                    <hr/>
                    {/* <select class="form-select" 
                        onChange={(e)=>{
                        //   setCatagory(e.target.value)
                        //   console.log(catagory)
                        }}>
                        <option selected>Open this select menu</option>
                        <option value="Vegetables">Abc</option>
                        <option value="Fruits">cde</option>
                        <option value="Groceries">fgh</option>
                        <option value="Other">Others</option>
                     </select> */}
                 
                 
                 <h2 className="homescreen__title">Calender</h2>
                 <div className="calender">
                        <Calendar/>
                 </div>

                 </div>

    </div>
   
 
    
  
    )
}


export default Sidebar ;