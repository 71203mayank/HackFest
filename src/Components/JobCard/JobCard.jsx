import React from 'react'
import './JobCard.css'
// import { } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function JobCard(props) {
    // console.log(props.link)
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
                description:props.description
            }
        })
    }
  return (
    // <a href={props.link} style={{textDecoration:'none'}}>

    // </a>
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
                
                {/* <Link to='/user/jobdesc'>view</Link> */}
                {/* <Link to={{ pathname: '/user/jobdesc', state: { job: props.job, company: props.company, jobLocation: props.location, link: props.link } }}>View</Link> */}
                
            </div>
        </div>
  )
}
