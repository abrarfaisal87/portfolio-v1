import React, { useRef,useEffect } from 'react'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger)
const Education = () => {
    const EDUCATION = [
        {
            id:1,
            degree:"Bachelor of Science in Computer Science and Engineering",
            institute:"International Islamic University of Chittagong",
            duration:"2020-2024",
        },
        {
            id:2,
            degree:"Higher secondary school certificate",
            institute:"Feni Goverment College",
            duration:"2017-2019",
        }
    ]
    const educationRef = useRef(null)
    useEffect(()=>{
        const ctx =  gsap.context(()=>{
          gsap.from(".edu-item",{
            opacity:0,
            y:50,
            duration:1,
            ease:"power3.out",
            stagger:0.3,
            scrollTrigger:{
              trigger:educationRef.current,
              start:"top 80%",
              toggleActions:"play none none none",
            }
          })
        },educationRef)
        return ()=> ctx.revert();
      },[])
  return (
    <section className='py-16 ' id="education" ref={educationRef}>
             <div className='mx-auto max-w-fit px-4'>
                <h1 className='mb-8 text-3xl lg:text-4xl text-center font-medium'>Education</h1>
                <div className='flex flex-col space-y-8'>
                    {EDUCATION.map((edu)=>(
                        <div key={edu.id} className='edu-item border-y-2 border-slate-500 p-6'>
                            <h3 className='mb-2 text-lg lg:text-xl'>{edu.institute}</h3>
                            <h4 className='text-lg font-medium lg:text-xl'>{edu.duration}</h4>
                            <p className='text-sm lg:text-base'>{edu.degree}</p>
                        </div>
                    ))}
                </div>
             </div>

    </section>
  )
}

export default Education