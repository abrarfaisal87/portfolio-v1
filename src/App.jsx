import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Career from "./components/Career";
import Education from "./components/Education";
import Contacts from "./components/Contacts";
import usePortfolioMotion from "./hooks/usePortfolioMotion";
import SpaceBackground from "./components/SpaceBackground";

function App() {
  const root = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [motionEnabled, setMotionEnabled] = useState(true);
  const animate = motionEnabled && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setReducedMotion(event.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  usePortfolioMotion(root, animate);

  return (
    <div className="portfolio" ref={root} data-motion={animate}>
      <SpaceBackground motionEnabled={animate} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar motionEnabled={animate} onToggleMotion={() => setMotionEnabled((enabled) => !enabled)} reducedMotion={reducedMotion} />
      <main id="main">
        <Hero motionEnabled={animate} />
        <Career />
        <Skills />
        <Education />
        <Contacts motionEnabled={animate} />
      </main>
    </div>
  );
}
export default App;
