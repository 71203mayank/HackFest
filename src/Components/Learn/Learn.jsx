import React, {useState} from 'react'
import './Learn.css'

import axios from 'axios';

function Learn() {
    const [area, setArea] = useState('');
    const [time, setTime] = useState('');
    const [additional_info, setInfo] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const url = 'http://192.168.21.226:3000/prepare/'; // Change this URL to your actual endpoint
      const data = {
        area: area,
        time:time,
        additional_info: additional_info
      };
      console.log(data)
      axios.post(url,data)
        .then(response => {
          console.log('Success:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div className="learn">
        <div>Submit Your Data</div>
        <form onSubmit={handleSubmit}>
          <label>
            Topic:
            <input type="text" value={area} onChange={e => setArea(e.target.value)} />
          </label>
          <label>
            Time Period:
            <input type="text" value={time} onChange={e => setTime(e.target.value)} />
          </label>
          <label>
            Additional Info:
            <input type="text" value={additional_info} onChange={e => setInfo(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Learn;


