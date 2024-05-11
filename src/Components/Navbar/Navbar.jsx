import React from 'react'
import './Navbar.css'
import { Outlet } from 'react-router-dom'
import MiniFooter from '../MiniFooter/MiniFooter'
// import Footer from '../Footer/Footer'
export default function Navbar() {
  return (
    <div>

        <div className='navbar'>
            <div className='navbar-title'>PlaceMeNow.in</div>
            <div className='navbar-links-container'>
                <div className='navlink'>Find Jobs</div>
                <div className='navlink'>Build Your <br></br>Application</div>
                <div className='navlink'>Score Your <br></br> Application</div>
                <div className='navlink'>Interview <br></br> Diaries</div>
                <div className='navlink'>Learn</div>
            </div>
        </div>
        <Outlet/>
        <MiniFooter/>
        {/* <Footer/> */}
    </div>
  )
}
