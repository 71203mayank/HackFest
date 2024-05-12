import BuildApp from "./Components/BuildApp/BuildApp";
import Interview from "./Components/Interview/Interview";
// import InterviewCard from "./Components/InterviewCard/InterviewCard";
import JobDesc from "./Components/JobDesc/JobDesc";
import JobList from "./Components/JobLists/JobList";
import Learn from "./Components/Learn/Learn";
// import MiniFooter from "./Components/MiniFooter/MiniFooter";
import Navbar from "./Components/Navbar/Navbar";
import Score from "./Components/Score/Score";
import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='login' element={<Login/>}/> */}
          <Route path='user' element={<Navbar/>}>
            <Route index element={<JobList/>} />
            {/* <Route path='user' element={<JobList/>}/> */}
            <Route path='build' element={<BuildApp/>}/>
            <Route path='learn' element={<Learn/>}/>
            <Route path='jobdesc' element={<JobDesc/>}/>
            <Route path='score' element = {<Score/>}/>
            <Route path='diaries' element={<Interview/>}/>
            {/* <Route path='interviewdesc' element={<InterviewCard/>} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
