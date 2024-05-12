import React from 'react'
import './Interview.css'
// import { useNavigate } from 'react-router-dom';
// import { renderToStaticMarkup } from 'react-dom/server';
// import Markdown from 'markdown-to-jsx';

export default function Interview() {
    const wells_data=[
        {
            id:1,
            role: " Intern Analyst 2023",
            link: 'https://sites.google.com/nitc.ac.in/interviewdiaries/wells-fargo?authuser=1'
        }
    ]

    const gold_data=[
        {
            id:1,
            role: " Intern Analyst 2023",
            link: 'https://sites.google.com/nitc.ac.in/interviewdiaries/goldman-sachs?authuser=1'
        },{
            id:2,
            role: " Intern Analyst 2023",
            link: 'https://sites.google.com/nitc.ac.in/interviewdiaries/goldman-sachs?authuser=1'
        }
    ]

    const oracle_data=[
        {
            id:1,
            role: " Intern Analyst 2023",
            link: 'https://sites.google.com/nitc.ac.in/interviewdiaries/oracle?authuser=1'
        },{
            id:2,
            role: " Intern Analyst 2023",
            link: 'https://sites.google.com/nitc.ac.in/interviewdiaries/oracle?authuser=1'
        }
    ]


    // const navigate = useNavigate();

    // const handleView=()=>{
    //     navigate('/user/interviewdesc',{
    //         state:{
    //             description:'1,00,000 per month\nNumber of rounds : 3'
    //         }
    //     })
    // }

  return (
    <div className='interview'>
        <div className='interview-container'>
            <div className='interview-container-inner'>
                <div className='interview-inner-head'>
                    <div className='interview-img-container'>
                        <img className='interview-img' src='/asset/goldman.svg' alt='logo'></img>
                    </div>
                    <div className='interview-company-name'>Goldman Sachs</div>
                </div>
                <div className='interview-table'>
                      {gold_data.map((item, id) => (
                          <a href={item.link} target='blank'><div className='interview-table-list' key='id'>{item.role}</div></a>
                      ))}
                </div>
            </div>
            <div className='interview-container-inner'>
                <div className='interview-inner-head'>
                    <div className='interview-img-container'>
                        <img className='interview-img' src='/asset/wells.svg' alt='logo'></img>
                    </div>
                    <div className='interview-company-name'>Wells Fargo</div>
                </div>
                <div className='interview-table'>
                    {wells_data.map((item,id)=>(
                        <a href={item.link} target='blank'><div className='interview-table-list' key='id'>{item.role}</div></a>
                    ))}
                </div>
            </div>
            <div className='interview-container-inner'>
                <div className='interview-inner-head'>
                    <div className='interview-img-container'>
                        <img className='interview-img' src='/asset/oracle.svg' alt='logo'></img>
                    </div>
                    <div className='interview-company-name'>Oracle</div>
                </div>
                <div className='interview-table'>
                      {oracle_data.map((item, id) => (
                          <a href={item.link} target='blank'><div className='interview-table-list' key='id'>{item.role}</div></a>
                      ))}
                </div>
            </div>
        </div>
    </div>
  )
}
