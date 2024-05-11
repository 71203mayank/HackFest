import React from 'react'
import './Hero.css'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function Hero() {
    const {user, loginWithRedirect} = useAuth0();
    const navigate = useNavigate(); 
    const handleLogin = () => {
        loginWithRedirect();
    }
    if (user) {
        navigate('/user');
    }
  return (
    <div className='hero'>
        <div className='hero-nav'>
            <div className='hero-nav-title'>PlaceMeNow.in</div>
            {/* <Link to='/login'> </Link> */}
            {/* <Link to='/login' className='hero-nav-button' style={{textDecoration:'none', color:'white'}}>Try Now</Link> */}
            {/* {isAuthenticated?(<button className='hero-nav-button' onClick={logout()}>Log out</button>):(<button className='hero-nav-button' onClick={handleLogin}>Try Now</button>)} */}
            <button className='hero-nav-button' onClick={handleLogin}>Try Now</button>
          

            
            
        </div>
        <div className='hero-title'> 
            <div className='hero-title-one'>Get Placed with the Power of</div>
            <div className='hero-title-two'>ARTIFICIAL INTELLIGENCE</div>
        </div>
        <div className='hero-main'>
            <div className='hero-container'>
                <img className='hero-img' src='./asset/hero-img.svg' alt='hero-img'></img>
                <img className='foreground-img' src='./asset/foreground-img.svg' alt='foreground'></img>
                <img className='hero-img-one' src='./asset/hero-resume-one.svg' alt='hero-img-one'></img>
                <img className='hero-img-two' src='./asset/hero-resume-two.svg' alt='hero-img-two'></img>
                <img className='hero-img-three' src='./asset/hero-resume-three.svg' alt='hero-img-three'></img>
            </div>
        </div>
    </div>
  )
}
