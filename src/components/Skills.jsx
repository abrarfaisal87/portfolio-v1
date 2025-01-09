import {
  RiCss3Line,
  RiHtml5Line,
  RiJavascriptLine,
  RiNodejsLine,
  RiReactjsLine,
  RiTailwindCssLine,
} from "@remixicon/react";
import React, { useRef,useEffect } from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const SKILLS = [
    {
      name: "HTML5",
      icon: <RiHtml5Line className="text-orange-600 hover:text-orange-300" />,
    },
    {
      name: "CSS3",
      icon: <RiCss3Line className="text-blue-500 hover:text-blue-300" />,
    },
    {
      name: "Tailwind",
      icon: <RiTailwindCssLine className="text-teal-600 hover:text-teal-400" />,
    },
    {
      name: "Javascript",
      icon: <RiJavascriptLine className="text-yellow-300 hover:text-yellow-500" />,
    },
    {
      name: "React",
      icon: <RiReactjsLine className="text-blue-400 hover:text-blue-600" />,
    },
    {
      name: "NodeJS",
      icon: <RiNodejsLine className="text-green-500 hover:text-green-300" />,
    },
    {
      name: "ExpressJs",
      icon: <RiJavascriptLine className="text-gray-400 hover:bg-gray-200" />,
    },
    {
      name: "Postgresql",
      icon: <BiLogoPostgresql className="text-blue-300 hover:text-blue-500" />,
    },
  ];

  const skillsref = useRef(null);

  useEffect(()=>{
    const ctx =  gsap.context(()=>{
      gsap.from(".skill-item",{
        opacity:0,
        y:50,
        duration:1,
        ease:"power3.out",
        stagger:0.2,
        scrollTrigger:{
          trigger:skillsref.current,
          start:"top 80%",
          toggleActions:"play none none none",
        }
      })
    },skillsref)
    return ()=> ctx.revert();
  },[])

  return (
    <section className="py-10" id="skills" ref={skillsref}>
      <div className="px-4">
      <h1 className="mb-8 text-center text-3xl lg:text-4xl font-medium">
          Skills
        </h1>
           <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
           {SKILLS.map((skill, index) => (
          <div key={index} className="skill-item flex flex-col items-center text-center">
            <div className="mb-4 hover:">
                {skill.icon}
            </div>
            <h3 className="mb-2 text-lg lg:text-xl font-medium">{skill.name}</h3>
          </div>
        ))}
           </div>
      </div>
    </section>
  );
};

export default Skills;
