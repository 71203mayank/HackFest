import React from 'react'
import './Navbar.css'
import { Outlet } from 'react-router-dom'
import MiniFooter from '../MiniFooter/MiniFooter'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import Footer from '../Footer/Footer'
export default function Navbar() {
    // const handleOnClick = () => {
    //     const params = {
    //         key1:'hello',
    //         key2:'hello'
    //     }
    //     axios.post('http://192.168.123.226:3000/')
    //     .then(response => {console.log(response)})
    //     .catch(err => {console.log(err)})
    // }
    
    // const [response, setResponse] = useState('');
    // useEffect(() => {
    //     axios.get('http://192.168.123.226:3000/')
    //       .then(res => {
    //         setResponse(res.data.response);
    //       })
    //       .catch(err => {
    //         console.error('Error fetching data: ', err);
    //       });
    //   }, []);
    

    // function sendCVData(cvData, jobDescription) {
    //     const url = 'http://192.168.123.226:3000/';
    //     const data = {
    //         cv_data: cvData,
    //         job_description: jobDescription
    //     };
    
    //     axios.post(url, data)
    //         .then(response => {
    //             console.log('Response:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }

    const {logout} = useAuth0();
  return (
    <div>

        <div className='navbar'>
            <div className='navbar-title'>PlaceMeNow.in</div>
            <div className='navbar-links-container'>
                <Link to='/user'><div className='navlink'>Find Jobs</div></Link>
                <Link to='/user/build'><div className='navlink'>Build Your <br></br>Application</div></Link>
                <Link to='/user/learn'><div className='navlink'>Prepare</div></Link>
                <div className='navlink'>Score Your <br></br> Application</div>
                <div className='navlink'>Interview <br></br> Diaries</div>
                {/* <button onClick={handleOnClick}  className='navlink button-navlink'>Learn</button> */}
                <button onClick={(e)=>logout()} className='navlink button-navlink'>Log Out</button>
            </div>
        </div>
        <Outlet/>
        <MiniFooter/>
        {/* <Footer/> */}
    </div>
  )
}
