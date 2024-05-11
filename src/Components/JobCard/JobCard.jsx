import React from 'react'
import './JobCard.css'
export default function JobCard(props) {
    console.log(props.link)
    let imgSrc = '';

    switch (props.company) {
        case 'Google':
            imgSrc = './asset/google.svg';
            break;
        case 'SAP':
            imgSrc = './asset/sap.svg';
            break;
        case 'IBM':
            imgSrc = './asset/ibm.svg';
            break;
        case 'Salesforce':
            imgSrc = './asset/salesforce.svg';
            break;
        default:
            imgSrc = 'pathb';
            break;
    }
  return (
    <a href={props.link} style={{textDecoration:'none'}}>

        <div className='job-card' key={props.id}>
            <div className='job-card-img-container'>
                <img className='job-card-img' src={imgSrc} alt={props.company} />
            </div>
            <div className='job-card-desc'>
                <div className='job-card-title'>{props.company} - {props.job}</div>
                <div className='job-card-location'>{props.location}</div>
            </div>
        </div>
    </a>
  )
}
