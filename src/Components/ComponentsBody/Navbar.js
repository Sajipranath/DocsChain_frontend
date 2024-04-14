import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { Search , Gear} from 'bootstrap-icons-react';
import { BiArrowFromBottom, BiFolderOpen,  BiPen ,BiTrash} from 'react-icons/bi';
import { MdDriveFolderUpload,MdUploadFile } from "react-icons/md";
import { HiOutlineFolderDownload} from "react-icons/hi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Navbar=({ onNavItemClick }) => {
  return (
    <header className="header">
         <div className="container-fluid">
          <div className="row">
              <div className="col-sm-2 col-lg-2"><h2 className="homescreen__title">Main Section</h2></div>
              <div className="col-sm-7 col-lg-6">
                  <ul className="navlist">
                    <li >
                      <Link to="/inner" onClick={() => onNavItemClick('document')} data-tooltip-id="my-tooltip" data-tooltip-content="Uploaded Documents" data-tooltip-place="bottom" > <MdDriveFolderUpload/> </Link>
                      <Tooltip id="my-tooltip" />
                    </li>
                    <li >
                      <Link to="/inner/download" onClick={() => onNavItemClick('download')} data-tooltip-id="my-tooltip" data-tooltip-content="Downloaded Documents" data-tooltip-place="bottom" > <HiOutlineFolderDownload/> </Link>
                      {/* <Tooltip id="my-tooltip" /> */}
                    </li>
                    <li >
                      <Link to="/inner/upload" onClick={() => onNavItemClick('upload')} data-tooltip-id="my-tooltip" data-tooltip-content="Upload" data-tooltip-place="bottom"> <MdUploadFile/> </Link>
                    </li>
                    <li >
                      <Link to="/inner/addsign" onClick={() => onNavItemClick('addSign')} data-tooltip-id="my-tooltip" data-tooltip-content="Add Sign" data-tooltip-place="bottom"> <BiPen/> </Link>
                    </li>
                    <li >
                      <Link to="/inner" data-tooltip-id="my-tooltip" data-tooltip-content="Trash" data-tooltip-place="bottom"> <BiTrash/> </Link>
                    </li>
                    <li >
                      <Link to="/inner" data-tooltip-id="my-tooltip" data-tooltip-content="Settings"data-tooltip-place="bottom"> <Gear/> </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-3 col-lg-3 d-none d-sm-block">
                <div id="search-bar-container">
                    <form >
                        <input type="text" placeholder="Search..."  />     
                        <button type="submit"><Search/> </button>
                    </form>
                  </div>
              </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar