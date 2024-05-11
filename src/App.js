import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import JobList from "./Components/JobLists/JobList";
import MiniFooter from "./Components/MiniFooter/MiniFooter";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Hero/>
      <Features/>
      <Footer/>
      <Navbar/>
      <JobList/>
      <MiniFooter/>
    </div>
  );
}

export default App;
