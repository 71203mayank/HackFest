import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footer-up'>
            <div className='footer-up-button'>Post a Job</div>
            <Link to='/user' className='footer-up-button' style={{textDecoration:'none'}}>Search Jobs</Link>
            {/* <div className='footer-up-button'>Search Jobs</div> */}
        </div>
        <div className='footer-container'>
            <div className='footer-container-one'>
                <div className='footer-container-one-left'>
                    <div className='footer-container-one-left-inner'>PlaceMeNow.in</div>
                </div>
                <div className='footer-container-one-right'>
                    <div className='footer-container-one-right-inner'>GitHub</div>
                    <div className='footer-container-one-right-inner'>Documentations</div>
                    <div className='footer-container-one-right-inner'>System Requirements</div>
                </div>
            </div>
            <div className='footer-container-two'>
                <div className='footer-container-two-inner'>Mohammad Saad</div>
                <div className='footer-container-two-inner'>Mayank Gupta</div>
                <div className='footer-container-two-inner'>Chandrakant V Bellary</div>
            </div>
            <div className='footer-container-three'>
                <div className='footer-container-three-inner'>HackFest'24</div>
                <div className='footer-container-three-inner'>LOGGERS</div>
            </div>
        </div>
    </div>
  )
}
