import React from 'react'
import './FeatureCard.css'
export default function FeatureCard(props) {
    console.log(props.imgLink);
  return (
    <div className='feature-card'>
        <div className='feature-card-img-container'>
            <img className='feature-card-img' src={props.imgLink} alt='img'></img>
        </div>
        <div className='feature-card-title'>{props.title}</div>
        <div className='feature-card-desc'>{props.desc}</div>
        <div></div>
    </div>
  )
}
