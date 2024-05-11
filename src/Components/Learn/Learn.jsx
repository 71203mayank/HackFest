import React, {useState} from 'react'
import './Learn.css'
import MarkdownIt from 'markdown-it';
import axios from 'axios';

function Learn() {
    const [area, setArea] = useState('');
    const [time, setTime] = useState('');
    const [additional_info, setInfo] = useState('');
    const [data,setData] = useState('');
  
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
            const markdown = new MarkdownIt();
            const renderedHtml = markdown.render(response.data);
            setData(renderedHtml)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    return (
      <div className="learn">
        <div className='learn-left'>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}
            <div>

                <div className='learn-left-title'>Submit Your Data</div>
                <div className='learn-left-field'>
                    <div className='learn-label'>Topic:</div>
                    <input className='learn-input' type="text" value={area} onChange={e => setArea(e.target.value)} />
                </div>
                <div className='learn-left-field'>
                    <div className='learn-label'>Time Period:</div>
                    <input className='learn-input' type="text" value={time} onChange={e => setTime(e.target.value)}/>
                </div>
                <div className='learn-left-field'>
                    <div className='learn-label' >Additional Info:</div>
                    <textarea className='learn-textarea' rows='10' cols='80' value={additional_info} onChange={e => setInfo(e.target.value)}></textarea>
                    {/* <input type="text" value={time} onChange={e => setTime(e.target.value)}/> */}
                </div>
                <div className='build-app-submit'>
                        <button className='build-app-submit-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>

        </div>
        <div className='learn-right' dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
    );
  }
  
  export default Learn;


