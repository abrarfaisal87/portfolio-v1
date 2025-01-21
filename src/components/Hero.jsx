import { RiArrowRightUpLine } from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";
import headerImg from "../assets/headerImg.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [text, setText] = useState("");
  const period = 2000;
  const toRotate = ["Abrar Faisal", "a Frontend Dev", "a Backend Dev"];
  const heroRef = useRef(null);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.6 },
      });
      tl.from(".hero-box", {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
      }).from(
        ".hero-text",
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.8,
        },
        "-=0.4"
      );
      // .from(
      //   ".hero-btn",
      //   {
      //     opacity: 0,
      //     scale: 0.9,
      //     duration: 0.7,
      //   },
      //   "-=0.3"
      // );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);

    if (isDeleleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <>
      <section
        className="flex items-center pt-16 sm:pt-20 lg:pt-10 justify-center min-h-screen"
        ref={heroRef}
      >
        <div className="flex flex-col lg:flex-row lg:justify-between ">
          <div className="hero-text-content flex flex-col p-4 max-w-md sm:max-w-2xl gap-4 lg:gap-6">
            <span
              className="hero-box p-2 w-fit outline-none border-0 rounded-lg text-white
             bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B]"
            >
              Welcome to my PortFolio
            </span>
            <h1 className="text-6xl mt-9">
              {`Hi I'm `}
              <span>{text}</span>
            </h1>
            <p className="hero-text max-w-2xl  text-xl tracking-tighter lg:text-2xl ">
              Passionate web developer crafting dynamic, responsive, and
              user-friendly websites with a focus on clean code and modern
              design
            </p>
            <a
              href="https://drive.google.com/uc?export=download&id=1TJUSH5k2v82IJowHSxgvT3uBIC2xlS9E"
              className="hero-btn mb-6 flex gap-1 w-fit rounded-full 
              border hover:bg-slate-900 transition-all
               border-pink-200/50 px-3 py-2 tracking-tighter"
            >
              <span>Download Resume</span>
              <RiArrowRightUpLine />
            </a>
          </div>
          <div className="hero-logo w-96 h-96 ">
            <img src={headerImg} alt="Hero Logo" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
