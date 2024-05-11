import JobList from "./Components/JobLists/JobList";
// import MiniFooter from "./Components/MiniFooter/MiniFooter";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='user' element={<Navbar/>}>
            <Route index element={<JobList/>} />
            <Route path='/user' element={<JobList/>}/>
          </Route>
          {/* <MiniFooter/> */}
        </Routes>
      </BrowserRouter>
      {/* <Home/>
      <Login/>
      <Navbar/>
      <JobList/>
      <MiniFooter/> */}
    </div>
  );
}

export default App;
