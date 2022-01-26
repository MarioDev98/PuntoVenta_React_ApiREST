import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import { Link } from 'react-router-dom';
import {Sidebar} from './Sidebar';
import './Nav.css';
import { IconContext } from 'react-icons';

function Nav() {
    const [sidebar, setSidebar] = useState (false);
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar ">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                       
                </Link>
                <div style={{color: 'white', marginLeft:'900px', fontSize:'15px'}}>Agroquimicos Luna</div>                
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
              
                 <li className="navbar-toggle">
                 <Link to="#" className='menu-bars'>
                     <FaIcons.FaRegWindowClose/>
                 </Link>
                 
                 </li>
                 {Sidebar.map((item, index) => { 
                    return (
                     <li key={index} className={item.cName}>
                         <Link to={item.path}>
                           {item.icon}
                           <span>{item.title}</span>  
                         </Link>
                     </li>
                    )
                })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Nav;