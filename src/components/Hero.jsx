import { RiArrowDownLine, RiArrowRightUpLine, RiDownloadLine } from "@remixicon/react";
import PropTypes from "prop-types";
import ParticlePlanet from "./ParticlePlanet";

export default function Hero({ motionEnabled }) {
  return (
    <section className="hero page-width" id="home" aria-labelledby="hero-title">
      <div className="hero-topline" data-intro>
        <span className="eyebrow"><span className="status-dot" /> Technical roots. A people-first approach.</span>
        <span className="hero-location">Based in Chattogram, BD <span>↗</span></span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-hello" data-intro>Hi, I’m</p>
          <h1 id="hero-title" data-intro>Abrar<br /><span className="surname">Faisal<span className="name-period">.</span></span></h1>
          <p className="hero-description" data-intro>I bring 1.5+ years of software industry experience across technical support, operations, and marketing. I connect people, solve problems, and turn what I learn into better outcomes—for customers, products, and teams.</p>
          <div className="hero-actions" data-intro>
            <a href="#career" className="button button-primary" data-magnetic>My experience <RiArrowRightUpLine size={21} /></a>
            <a href="/abrarfaisal.pdf" download="Abrar_Faisal_Resume.pdf" className="text-link">Download résumé <RiDownloadLine size={18} /></a>
          </div>
        </div>
        <div className="hero-art" data-intro>
          <ParticlePlanet motionEnabled={motionEnabled} />
        </div>
      </div>
      <div className="hero-bottom" data-intro>
        <a href="#career" className="scroll-cue"><span className="scroll-icon"><RiArrowDownLine size={18} /></span>Scroll to explore</a>
        <span className="hero-index">PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
Hero.propTypes = { motionEnabled: PropTypes.bool.isRequired };
