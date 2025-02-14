import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import demoJpg from "../assets/demo.jpg"
import buzz from "../assets/buzz.png"
import recipefinder from "../assets/recipefinder.png"


gsap.registerPlugin(ScrollTrigger)
const Projects = () => {

  const projectsRef = useRef(null)

  useEffect(()=>{
    const ctx =  gsap.context(()=>{
      gsap.from(".project-card",{
        opacity:0,
        y:50,
        duration:1,
        ease:"power3.out",
        stagger:0.3,
        scrollTrigger:{
          trigger:projectsRef.current,
          start:"top 80%",
          toggleActions:"play none none none",
        }
      })
    },projectsRef)
    return ()=> ctx.revert();
  },[])

  const PROJECTS = [
    {
      id: 1,
      title: "Buzz",
      Description: "A full stack chat app with socket.io implementation",
      imgUrl: buzz,
      link: "https://buzz-3ywi.onrender.com",
    },
    {
      id: 2,
      title: "Recipe-Finder",
      Description: "A full stack recipe finding app where you can search recipes, store favorites",
      imgUrl: recipefinder,
      link: "http://recipe-finder-qp9s.vercel.app",
    },
    {
      id: 3,
      title: "Demo app",
      Description: "Under construction",
      imgUrl: demoJpg,
      link: "https://github.com/abrarfaisal87?tab=repositories",
    },
    {
      id: 4,
      title: "Demo app",
      Description: "Under construction",
      imgUrl: demoJpg,
      link: "https://github.com/abrarfaisal87?tab=repositories",
    },
  ];
  return (
    <section className="py-16" id="projects" ref={projectsRef}>
      <div className="px-4">
        <h2 className="mb-8 text-center text-3xl font-medium lg:text-4xl">
          Projects
        </h2>
        <div className="flex flex-wrap justify-center">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card flex w-full flex-col p-4 md:w-1/2 lg:w-1/3"
            >
              <div className="flex-grow 
              backdrop-blur-sm overflow-hidden  border rounded-lg border-gray-500">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={project.imgUrl}
                    alt={project.title}
                    className="h-60 w-full object-cover
                     lg:opacity-75 lg:hover:opacity-100 transition-all duration-300"
                  />
                </a>
                <div className="px-4 py-2   lg:opacity-50 lg:hover:opacity-100 lg:transition-all lg:duration-200 ">
                  <h3 className="mb-1 text-lg font-medium lg:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mb-2 text-xs">{project.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
