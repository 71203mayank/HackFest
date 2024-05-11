import React,{useState} from 'react'
import './Score.css'
import pdfToText from 'react-pdftotext'
import MarkdownIt from 'markdown-it';
import axios from 'axios';

export default function Score() {

    const [myfile,setMyFile] = useState('');
    const [cvFile,setCvFile] = useState('');
    const [jobDescription,setJobDescription] = useState('');
    const [data,setData] = useState('');

    function extractText(event) {
        const file = event.target.files[0]
        console.log(file);
        setMyFile(file.name);
        pdfToText(file)
            .then(text => {
                // console.log(text);
                setCvFile(text);
            })
            .catch(error => console.error("Failed to extract text from pdf"))
    }

    const handleTextAreaChange = (e) => {
        setJobDescription(e.target.value);
    }

    const handleOnClick = async (event) => {
        event.preventDefault();
        if (!cvFile) {
            alert('Please upload a CV file.');
            return;
        }
        const url = 'http://192.168.21.226:3000/review_cv';
        // Read and extract text from PDF
        //           // Send data to backend
        const data = {
            cv_data: cvFile,
            job_description: jobDescription
        };
        axios.post(url, data)
            .then(response => {
                console.log('Success:', response.data);
                const markdown = new MarkdownIt();
                const renderedHtml = markdown.render(response.data);
                setData(renderedHtml)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

  return (
    <div className='score'>
        <div className='score-left'>
            <div>
                <div className='score-left-inner'>
                    <input className='build-app-file' type="file" id="file-input" accept="application/pdf" onChange={extractText}/>
                    <label htmlFor="file-input" className="custom-file-input" accept="application/pdf" onChange={extractText}>Choose File</label>
                    <input className='build-app-input' type='text' disabled value={myfile}></input>
                </div>
                <div className='build-app-job-desc'>
                    <div>Job Description</div>
                    <textarea value={jobDescription} rows='10' cols='80' onChange={handleTextAreaChange}></textarea>
                </div>
                <div className='build-app-submit'>
                    <button className='build-app-submit-button' onClick={handleOnClick}>Submit</button>
                </div>
            </div>
        </div>
        <div className='score-right' dangerouslySetInnerHTML={{ __html: data }}>

        </div>
    </div>
  )
}
