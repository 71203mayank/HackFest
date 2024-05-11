import React from 'react'
import './JobDesc.css'
import { useLocation } from 'react-router-dom';

export default function JobDesc() {
    const location = useLocation();
    const { job, link, jobLocation, company,description } = location.state;
  return (
    <div className='job-desc'>
        {/* mayank gupta */}
        <div>{company}</div>
       <div>{job}</div>
       <div>{jobLocation}</div>
       <div>{link}</div>
       <div>{description}</div>
    </div>
  )
}
