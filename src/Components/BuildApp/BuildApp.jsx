import React,{useState} from 'react'
import './BuildApp.css'
import axios from 'axios';
import pdfToText from 'react-pdftotext'
import MarkdownIt from 'markdown-it';
// import { use } from '../../../backend/Routes/api/jobs';
// function extractText(event) {
//     const file = event.target.files[0]
//     pdfToText(file)
//         .then(text => console.log(text))
//         .catch(error => console.error("Failed to extract text from pdf"))
// }
// function App() {
//     const [type, setType] = useState('');
//     const [cvFile, setCvFile] = useState(null);
//     const [jobDescription, setJobDescription] = useState('');
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       if (!cvFile) {
//         alert('Please upload a CV file.');
//         return;
//       }
  
//       const url = 'http://192.168.104.226:3000/build-app'; // Change this URL to your actual endpoint
      
//       // Read and extract text from PDF
//           // Send data to backend
//           const data = {
//             type: type,
//             cv_data: cvFile,
//             job_description: jobDescription
//           };
//           axios.post(url, data)
//             .then(response => {
//               console.log('Success:', response.data);
//             })
//             .catch(error => {
//               console.error('Error:', error);
//             });
//         }
    
  
//     return (
//       <div className="App">
//         <h1>Submit Your Data</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Type:
//             <input type="text" value={type} onChange={e => setType(e.target.value)} />
//           </label>
//           <label>
//             CV Data (PDF):
//             <input type="file" onChange={e => setCvFile(extractText)} accept="application/pdf" />
//           </label>
//           <label>
//             Job Description:
//             <input type="text" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
  
//   export default App;







function PDFParserReact() {

    const [cvFile,setCvFile] = useState('');
    const [category,setCategory] = useState('Statement of Purpose');
    const [jobDescription,setJobDescription] = useState('');
    const [myfile,setMyFile] = useState('');
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
    
    const handleSelectChange = (event) =>{
        setCategory(event.target.value);
    }

    const handleTextAreaChange = (e) => {
        setJobDescription(e.target.value);
    }

    const handleOnClick = async (event) =>{
        event.preventDefault();
        if (!cvFile) {
            alert('Please upload a CV file.');
            return;
        }
        const url = 'http://192.168.21.226:3000/build-app';
        // Read and extract text from PDF
//           // Send data to backend
          const data = {
            type: category,
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
    
    // console.log(cvFile);
    // console.log(category);
    // console.log(jobDescription);



    return (
        <div className="build-app">
            <div className='build-app-left'>
                <div className='build-app-left-inner'>

                    <div>
                        {/* <input type="file" accept="application/pdf" onChange={extractText} /> */}
                        <input className='build-app-file' type="file" id="file-input" accept="application/pdf" onChange={extractText}/>
                        <label htmlFor="file-input" className="custom-file-input" accept="application/pdf" onChange={extractText}>Choose File</label>
                        <input className='build-app-input' type='text' disabled value={myfile}></input>
                        <select className='build-app-select' onChange={handleSelectChange}>
                            <option className='build-app-option' value={'Statement of Purpose'}>Statement of Purpose</option>
                            <option className='build-app-option' value={'Cover Letter'}>Cover Letter</option>
                        </select>
                    </div>
                    <div>  
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
            <div className='build-app-right' dangerouslySetInnerHTML={{ __html: data }}>
                {/* {data} */}
            </div>
                
        </div>
    );
    
}
export default PDFParserReact;