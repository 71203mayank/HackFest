import React,{useState, useEffect} from 'react'
import './JobList.css'
import JobCard from '../JobCard/JobCard'
import axios from 'axios';

export default function JobList() {
    const [data,setData] = useState([]);
    // useEffect(() => {
    //     axios.get('http://localhost:8082/api/jobs')
    //         .then((res)=>{
    //             console.log(res.data);
    //             const newData = {};

    //             res.data.forEach((item) => {
    //                 newData[item._id] = item; // Assuming _id is a unique identifier
    //                 console.log(item)
    //             });

    //             setData(newData);
    //             // console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);
    useEffect(() => {
        axios.get('http://localhost:8082/api/jobs')
            .then((res)=>{
                console.log("Response from API:", res.data);
                const shuffledData = shuffleArray(res.data);
                setData(shuffledData);
                // console.log("State after update:", data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
console.log(data);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  return (
    <div className='job-list'>
        <div className='job-list-filter-container'></div>
        <div className='job-list-container'>
            {/* <JobCard
                job={data[0].job}
                company={data[0].name}
                location={data[0].location}
            /> */}

            {data.map((item,id)=>(
                <JobCard
                    id = {id}
                    job={item.job}
                    company={item.name}
                    location={item.location}
                />
            ))}
            {/* <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/> */}
        </div>
    </div>
  )
}
