import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='hero'>
        <div className='hero-nav'>
            <div className='hero-nav-title'>PlaceMeNow.in</div>
            {/* <Link to='/login'> </Link> */}
            <Link to='/login' className='hero-nav-button' style={{textDecoration:'none', color:'white'}}>Try Now</Link>
            
            
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
