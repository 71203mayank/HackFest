import React from 'react'
import './JobCard.css'
export default function JobCard(props) {
  return (
    <div className='job-card' key={props.id}>
        <div className='job-card-img-container'>

        </div>
        <div className='job-card-desc'>
            <div className='job-card-title'>{props.company} - {props.job}</div>
            <div className='job-card-location'>{props.location}</div>
        </div>
    </div>
  )
}
