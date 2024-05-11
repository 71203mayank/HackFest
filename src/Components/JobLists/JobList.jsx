import React,{useState, useEffect} from 'react'
import './JobList.css'
import JobCard from '../JobCard/JobCard'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function JobList() {
    const [data,setData] = useState([]);
    const [location,setLocation] = useState('');
    const [name,setName] = useState('');
    const [job,setJob] = useState('');
    // const [isable,setAble]=useState(true)

    // const navigate = useNavigate();

    const [url,setUrl] = useState('http://localhost:8082/api/jobs');

    useEffect(() => {
        axios.get(url)
        // axios.get('http://localhost:8082/api/jobs')
            .then((res)=>{
                // console.log("Response from API:", res.data);
                const shuffledData = shuffleArray(res.data);
                setData(shuffledData);
                // console.log("State after update:", data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [url]);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



const handleFilter = () => {
    let tempUrl = 'http://localhost:8082/api/jobs';
    console.log(name)
    if (location || name || job) {
        tempUrl += `?location=${location}&name=${name}&job=${job}`;
    }
    setUrl(tempUrl);
    console.log(tempUrl);

};

// const isFilterButtonDisabled = !location && !name && !job;

// console.log(name)

  return (
    <div className='job-list'>
        <div className='job-list-filter-container'>
            <div className='job-filter'>
                <div>Company</div>
                <input type='text' value={name} onChange={(e)=>{
                    setName(e.target.value);
                    console.log(name)}}></input>
            </div>
            <div className='job-filter'>
                <div>Role</div>
                <input type='text' value={job} onChange={(e)=>setJob(e.target.value)}></input>
            </div>
            <div className='job-filter'>
                <div>Location</div>
                <input type='text' value={location} onChange={(e)=>setLocation(e.target.value)}></input>
            </div>
            <div className='filter-button-container'>
                <button className='filter-button' onClick={handleFilter}>Filter</button>
            </div>
            
        </div>
        <div className='job-list-container'>

            {data.map((item,id)=>(
                <JobCard
                    key = {id}
                    // onClick = {() => navigate(`/jobdesc`,{state:{item}})}
                    job={item.job}
                    company={item.name}
                    location={item.location}
                    link={item.link}
                    description={item.description}
                />
            ))}
        </div>
    </div>
  )
}



// useEffect(() => {
//     fetchData();
// }, []);

// const fetchData = () => {
//     let url = 'http://localhost:8082/api/jobs';
//     if (location || name || job) {
//         url += `?location=${location}&name=${name}&job=${job}`;
//     }
//     axios.get(url)
//         .then((res) => {
//             const shuffledData = shuffleArray(res.data);
//             setData(shuffledData);
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//         });
// };

// const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// };
