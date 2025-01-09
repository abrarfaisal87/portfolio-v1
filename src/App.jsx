import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contacts from "./components/Contacts";

function App() {
  return (
    <>
      <main className="mx-auto max-w-7xl overflow-x-hidden antialiased">
       <div className="relative z-10">
        <Navbar/>
        <Hero/>
        <Skills/>
        <Projects/>
        <Education/>
        {/* <Contact/> */}
        <Contacts/>
       </div>
      </main>
    </>
  );
}

export default App;
