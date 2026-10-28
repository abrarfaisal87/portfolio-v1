import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function usePortfolioMotion(root, enabled) {
  useGSAP(() => {
    if (!enabled) return;
    gsap.from("[data-intro]", {
      y: 35, opacity: 0, duration: 1, stagger: 0.11,
      ease: "power3.out", clearProps: "all",
    });
    gsap.utils.toArray("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 32, opacity: 0, duration: 0.85,
        ease: "power3.out", clearProps: "all",
        scrollTrigger: { trigger: element, start: "top 94%", once: true },
      });
    });
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine)", () => {
      const cleanups = [];
      gsap.utils.toArray("[data-magnetic]").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });
        const move = (event) => {
          const rect = element.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.14);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.18);
        };
        const reset = () => { xTo(0); yTo(0); };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        element.addEventListener("blur", reset);
        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
          element.removeEventListener("blur", reset);
        });
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => {
      media.revert();
    };
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });
}
