import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ParticlePlanet from "./ParticlePlanet";
import { RiArrowUpLine, RiCheckLine, RiFileCopyLine, RiGithubFill, RiLinkedinBoxFill, RiFacebookBoxFill, RiTwitterXFill } from "@remixicon/react";

const email = "abrarfaisal87@gmail.com";
const socials = [
  { label: "GitHub", url: "https://github.com/abrarfaisal87", icon: RiGithubFill },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/abrar-faisal-4aa913199", icon: RiLinkedinBoxFill },
  { label: "Facebook", url: "https://www.facebook.com/abrar.faisal.1884/", icon: RiFacebookBoxFill },
  { label: "X", url: "https://x.com/abrarfaisal87", icon: RiTwitterXFill },
];
export default function Contacts({ motionEnabled }) {
  const [copyStatus, setCopyStatus] = useState("");
  const resetTimer = useRef(null);
  useEffect(() => () => clearTimeout(resetTimer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Select the email address to copy it");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyStatus(""), 3000);
  };
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="page-width">
        <div className="contact-topline" data-reveal><span className="eyebrow">04 / SAY HELLO</span><span className="contact-note">Good things start with a conversation.</span></div>
        <div className="contact-main" data-reveal><h2 id="contact-title">Let’s make<br />something <em>work.</em></h2><ParticlePlanet motionEnabled={motionEnabled} variant="gauntlet" /></div>
        <div className="contact-details" data-reveal><div className="email-group"><a className="contact-email" href={`mailto:${email}`}>{email}</a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address">{copyStatus === "Email copied" ? <RiCheckLine size={18} /> : <RiFileCopyLine size={18} />}</button><span className="copy-status" role="status">{copyStatus}</span></div><div className="social-links">{socials.map(({ label, url, icon: Icon }) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${label} profile`} title={label}><Icon size={30} aria-hidden="true" /></a>)}</div></div>
        <footer className="footer"><p>© {new Date().getFullYear()} Abrar Faisal</p><span className="footer-credit">Built with curiosity. And React.</span><a href="#home" className="back-to-top">Back to top <RiArrowUpLine size={16} /></a></footer>
      </div>
    </section>
  );
}
Contacts.propTypes = { motionEnabled: PropTypes.bool.isRequired };
