import React from "react";
import bg from "../images/bg2.png";
// import bitcoin from "../images/bitcoin.png"
import bitcoin from "../images/bitcoin.png";
import '../Styles/MiddleIntro.css';


const Hero = ()=> {
    return(
    <div className="container">
        <div className="row">
            <div className="col-md-12 bitcoin" alt="Responsive image">
                <img src={bitcoin} className="img-fluid coinimg" />
            </div>
        </div>
        
        <div className="row" id="head1">
        <div className="col-md-12">
            <p className="mt-4 h4">The Most User-Friendly Document Management System in the World </p>
            <p className="py-4 fs-5">Keeping your paperless office documents only on your computer or local server poses the 
          risks of hard drive failure, fire, flood or burglary. And what if you want to access one of those important files away 
          from the office? Meet Folderit. The ultimate online document management
           system for any organization, the most user-friendly DMS in the world! Amazingly easy to use, highly secure and affordable EDMS.</p>
            </div>
        </div>
        <div className="row imagepad">
            <div className="col-md-12" alt="Responsive image">
                <img src={bg} className="img-fluid px-4" />
            </div>
        </div>
        <div className="row justify-content-center py-4 mt-4" id="head1">
            <div className="col-md-4 py-4">
            <p className="h5">File Versions</p>
                <p id="para1">
                    You can upload a new version of a document and preserve the existing metadata and all earlier versions of the file -- which are always easily recoverable with just one click! A document check-in/check-out feature allows you 
                    to lock a document for others while you are editing it on your computer. And each version of a document can be independently approved.
                </p>
            </div>
            <div className="col-md-4 py-4">
            <p className="h5">Safe & Secure</p>
                <p id="para1">
                    All your data is triple backed up and bank-level encrypted in the Folderit cloud document management system where it's safely stored and is transferred via secure SSL layer. You can also customize password policy
                    (including 2FA) for your team members, so they can only choose extra long passwords and need to change their password as often as you wish.
                </p>
            </div>
            <div className="col-md-4 py-4">
            <p className="h5">Safe & Secure</p>
                <p id="para1">
                    All your data is triple backed up and bank-level encrypted in the Folderit cloud document management system where it's safely stored and is transferred via secure SSL layer. You can also customize password policy
                    (including 2FA) for your team members, so they can only choose extra long passwords and need to change their password as often as you wish.
                </p>
            </div>
        </div>
        <div className="row justify-content-center" id="head1">
            <div className="col-md-4 py-4">
            <p className="h5">Custom Metadata & File Linking</p> 
                <p> 
                    Add tags, notes, date and due date to help organise your documents. 
                    You can easily add your own metadata fields of different types like lists, checkboxes and much more! 
                    You can also link files to create relations between documents in different folder 
                    structures. Metadata templates can be defined on folder-level too.
                </p>
            </div>
            <div className="col-md-4 py-4">
            <p className="h5">Mobile Friendly DMS</p>
                <p>
                    Your documents in the Folderit 
                    online document management system are accessible to you from every PC, Mac,
                    tablet or smartphone with an internet connection. All over the world.
                </p>
            </div>
            <div className="col-md-4 py-4">
            <p className="h5">Mobile Friendly DMS</p>
                <p>
                    Your documents in the Folderit 
                    online document management system are accessible to you from every PC, Mac,
                    tablet or smartphone with an internet connection. All over the world.
                </p>
            </div>
        </div>

    </div>
    )

}

export default Hero;