import React from 'react'
import './JobCard.css'
import { useNavigate } from 'react-router-dom';
export default function JobCard(props) {
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

    const navigate = useNavigate();

    const handleView = () =>{
        navigate('/user/jobdesc',{
            state:{
                job:props.job,
                link:props.link,
                jobLocation:props.location,
                company:props.company,
                description:props.description,
                imgSrc:imgSrc
            }
        })
    }
  return (
        <div className='job-card'>
            <div className='job-card-img-container'>
                <img className='job-card-img' src={imgSrc} alt={props.company} />
            </div>
            <div className='job-card-desc'>
                <div className='job-card-title' >{props.company} - {props.job}</div>
                <div className='job-card-details' style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
                    <div className='job-card-location'>{props.location}</div>
                    <div className='job-view' onClick={handleView}>See Details</div>
                </div>
                
            </div>
        </div>
  )
}
