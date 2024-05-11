import React from 'react'
import './Navbar.css'
import { Outlet } from 'react-router-dom'
import MiniFooter from '../MiniFooter/MiniFooter'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import Footer from '../Footer/Footer'
export default function Navbar() {
    

    const {logout} = useAuth0();
  return (
    <div>

        <div className='navbar'>
            <div className='navbar-title'><Link to='/' style={{color:'black'}}>PlaceMeNow.in</Link></div>
            <div className='navbar-links-container'>
                <Link to='/user'><div className='navlink'>Find Jobs</div></Link>
                <Link to='/user/build'><div className='navlink'>Build Your <br></br>Application</div></Link>
                <Link to='/user/learn'><div className='navlink'>Prepare</div></Link>
                <Link to='/user/score'><div className='navlink'>Score Your <br></br> Application</div></Link>
                
                <div className='navlink'>Interview <br></br> Diaries</div>
                {/* <button onClick={handleOnClick}  className='navlink button-navlink'>Learn</button> */}
                <button onClick={(e)=>logout()} className='navlink button-navlink'>Log Out</button>
            </div>
        </div>
        <Outlet/>
        <MiniFooter/>
        {/* <Footer/> */}
    </div>
  )
}
