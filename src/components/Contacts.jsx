import { RiFacebookBoxFill, RiGithubFill, RiLinkedinBoxFill } from "@remixicon/react";
import React, { useRef,useEffect } from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

const Contacts = () => {
  const contactRef = useRef(null);
  useEffect(()=>{
    const ctx =  gsap.context(()=>{
      gsap.from(".contact-icon",{
        opacity:0,
        y:30,
        duration:1,
        ease:"power3.out",
        ScrollTrigger:{
          trigger:contactRef.current,
          start:"top 80%",
          toggleActions:"play none none none",
        }
      })
    },contactRef)
    return ()=> ctx.revert();
  },[])

  return (
    <section className="py-16" id="contact" ref={contactRef}>
      <div className="px-4 text-center">
        <h2 className="mb-8 text-3xl lg:text-4xl font medium">Contacts</h2>
        <p className="mb-4 text-lg lg:text-xl">
          Reach me through email:{" "}
          <a
            href="mailto:abrarfaisal87@gmail.com"
            className="hover:border-b font-semibold"
          >
            abrarfaisal87@gmail.com
          </a>
        </p>
        <div className="mt-8 flex justify-center space-x-8">
          <a
            href="https://www.linkedin.com/in/abrar-faisal-4aa913199"
              target="_blank"
              rel="noopenner noreferrer"
              aria-label="Visit my linkdin profile"
            className="contact-icon"
          ><RiLinkedinBoxFill className="text-3xl"/></a>
                    <a
            href="https://github.com/abrarfaisal87"
              target="_blank"
              rel="noopenner noreferrer"
              aria-label="Visit my github"
            className="contact-icon"
          ><RiGithubFill className="text-3xl"/></a>
                    <a
            href="https://www.facebook.com/abrar.faisal.1884/"
              target="_blank"
              rel="noopenner noreferrer"
              aria-label="Visit my facebook profile"
            className="contact-icon"
          ><RiFacebookBoxFill className="text-3xl"/></a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
