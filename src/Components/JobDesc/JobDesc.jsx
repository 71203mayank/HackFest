import React from 'react'
import './JobDesc.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function JobDesc() {
    const location = useLocation();
    const { job, link, jobLocation, company,description} = location.state;
    let imgSrc = '';

    switch (company) {
        case 'Google':
            imgSrc = '/asset/google.svg';
            break;
        case 'SAP':
            imgSrc = '/asset/sap.svg';
            break;
        case 'IBM':
            imgSrc = '/asset/ibm.svg';
            break;
        case 'Salesforce':
            imgSrc = '/asset/salesforce.svg';
            break;
        default:
            imgSrc = '/asset/salesforce.svg';
            break;
    }
   
  return (
    <div className='job-desc'>
        {/* mayank gupta */}
        <div className='job-desc-img-container'>
            <img className='job-desc-img' src={imgSrc} alt='logo'></img>
        </div>
        <div className='job-desc-company job-desc-content'><div style={{width:'100px'}}>Company:</div><div>{company}</div></div>
        <div className='job-desc-content'><div style={{width:'100px'}}>Role:</div><div>{job}</div></div>
        <div className='job-desc-content'><div style={{width:'100px'}}>Location:</div><div>{jobLocation}</div></div>
        {/* <div>{link}</div> */}
        <div>
        <div className='job-description-heading'>Description:</div>
        <div className='job-description'>{description}</div>
        </div>
        {/* <div>{imgSrc}</div> */}
        <a href={link} target='blank' re><div className='job-desc-apply'>Apply</div></a>
        <Link to='/user'><div className='job-desc-back'>Back</div></Link>
    </div>
  )
}
