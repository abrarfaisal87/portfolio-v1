import { useEffect, useRef } from "react";
import { RiRestartLine } from "@remixicon/react";
import PropTypes from "prop-types";
import gauntletUrl from "../assets/infinity-gauntlet.svg";
import gauntletSource from "../assets/infinity-gauntlet.svg?raw";

const SIZE = 480;

function createPlanet() {
  const particles = [];
  const angle = -0.38;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  for (let y = 70; y < 405; y += 4.5) {
    for (let x = 25; x < 455; x += 4.5) {
      const dx = x - SIZE / 2;
      const dy = y - 235;
      const distance = Math.hypot(dx, dy);
      const ringX = dx * cos + dy * sin;
      const ringY = -dx * sin + dy * cos;
      const ellipse = (ringX / 202) ** 2 + (ringY / 58) ** 2;
      const sphere = distance < 111;
      const ring = ellipse > 0.71 && ellipse < 1 && (!sphere || ringY > 0);
      if (!sphere && !ring) continue;
      const depth = sphere ? Math.sqrt(1 - (distance / 111) ** 2) : 0;
      const light = ring ? 0.92 : Math.max(0.28, depth * 0.75 - dx / 350 + 0.18);
      particles.push({
        x, y, originX: x, originY: y, vx: 0, vy: 0,
        size: ring ? 1.35 : 1.1 + depth * 0.55,
        color: `rgba(${ring ? "255,175,123" : "225,132,156"},${light})`,
      });
    }
  }
  return particles;
}

function createGauntlet() {
  const mask = document.createElement("canvas");
  mask.width = SIZE;
  mask.height = SIZE;
  const context = mask.getContext("2d");
  if (!context) return [];
  const drawing = new DOMParser().parseFromString(gauntletSource, "image/svg+xml");
  context.translate(50, 50);
  context.scale(380 / 459.94, 380 / 459.94);
  drawing.querySelectorAll("path, ellipse").forEach((shape) => {
    context.fillStyle = shape.getAttribute("fill") || drawing.documentElement.getAttribute("fill");
    if (shape.tagName === "path") {
      context.fill(new Path2D(shape.getAttribute("d")));
    } else {
      context.beginPath();
      context.ellipse(Number(shape.getAttribute("cx")), Number(shape.getAttribute("cy")), Number(shape.getAttribute("rx")), Number(shape.getAttribute("ry")), 0, 0, Math.PI * 2);
      context.fill();
    }
  });
  const pixels = context.getImageData(0, 0, SIZE, SIZE).data;
  const particles = [];
  for (let y = 48; y < 435; y += 3.5) {
    for (let x = 48; x < 435; x += 3.5) {
      const index = (Math.round(y) * SIZE + Math.round(x)) * 4;
      if (pixels[index + 3] < 140) continue;
      particles.push({
        x, y, originX: x, originY: y, vx: 0, vy: 0, size: 1.2,
        color: `rgb(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]})`,
      });
    }
  }
  return particles;
}

export default function ParticlePlanet({ motionEnabled, variant = "planet" }) {
  const canvasRef = useRef(null);
  const panelRef = useRef(null);
  const scatterRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * ratio;
    canvas.height = SIZE * ratio;
    context.scale(ratio, ratio);
    const particles = variant === "gauntlet" ? createGauntlet() : createPlanet();
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let previousTime = 0;
    let visible = true;
    let disposed = false;
    let touchActive = false;
    let touchPreviewPlayed = false;

    const render = (time = 0) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const step = previousTime ? Math.min((time - previousTime) / 16.667, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, SIZE, SIZE);
      let moving = false;
      particles.forEach((particle) => {
        if (motionEnabled) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (pointer.active && distance < 100) {
            const force = (1 - distance / 100) * 4.5 * step;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
          particle.vx += (particle.originX - particle.x) * 0.035 * step;
          particle.vy += (particle.originY - particle.y) * 0.035 * step;
          particle.vx *= 0.85 ** step;
          particle.vy *= 0.85 ** step;
          particle.x += particle.vx * step;
          particle.y += particle.vy * step;
          if (Math.abs(particle.vx) + Math.abs(particle.vy) > 0.015) moving = true;
        }
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      canvas.dataset.ready = "true";
      if (motionEnabled && (moving || pointer.active)) frame = requestAnimationFrame(render);
    };
    const requestRender = () => {
      if (!frame && visible && !document.hidden && !disposed) {
        previousTime = 0;
        frame = requestAnimationFrame(render);
      }
    };
    const burst = (x = SIZE / 2, y = SIZE / 2, strength = 1) => {
      if (!motionEnabled || disposed) return;
      particles.forEach((particle) => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const angle = Math.atan2(dy, dx);
        const force = Math.max(0, 1 - Math.hypot(dx, dy) / 310) * 16 * strength;
        particle.vx += Math.cos(angle) * force;
        particle.vy += Math.sin(angle) * force;
      });
      requestRender();
    };
    scatterRef.current = () => burst();
    const locate = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width * SIZE;
      pointer.y = (event.clientY - rect.top) / rect.height * SIZE;
    };
    const move = (event) => {
      if (!motionEnabled || (event.pointerType === "touch" && !touchActive)) return;
      locate(event);
      pointer.active = true;
      requestRender();
    };
    const down = (event) => {
      if (!motionEnabled) return;
      touchActive = event.pointerType === "touch";
      locate(event);
      pointer.active = true;
      burst(pointer.x, pointer.y, 0.85);
    };
    const release = () => {
      touchActive = false;
      pointer.active = false;
      requestRender();
    };
    const suspend = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      pointer.active = false;
    };
    const visibility = () => {
      if (document.hidden) suspend();
      else requestRender();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) suspend();
      else {
        if (motionEnabled && !touchPreviewPlayed && window.matchMedia("(pointer: coarse)").matches) {
          touchPreviewPlayed = true;
          burst(SIZE / 2, SIZE / 2, 0.3);
        }
        requestRender();
      }
    }, { threshold: 0.1 });
    observer.observe(panelRef.current);
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerdown", down, { passive: true });
    canvas.addEventListener("pointerleave", release);
    canvas.addEventListener("pointercancel", release);
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    render();
    return () => {
      disposed = true;
      scatterRef.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerleave", release);
      canvas.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [motionEnabled, variant]);

  if (variant === "gauntlet") {
    return (
      <figure className="particle-accent" ref={panelRef}>
        <div className="particle-accent-art">
          <img className="planet-fallback" src={gauntletUrl} alt="" aria-hidden="true" style={{ padding: "10.4167%" }} />
          <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
        </div>
        <figcaption className="particle-accent-caption"><span className="pointer-hint">Move your cursor</span><span className="touch-hint">Tap the gauntlet</span><button className="scatter-button" onClick={() => scatterRef.current?.()} disabled={!motionEnabled} aria-label="Scatter the Infinity Gauntlet particles"><RiRestartLine size={15} aria-hidden="true" /><span>Scatter</span></button></figcaption>
      </figure>
    );
  }

  return (
    <figure className="particle-study" ref={panelRef}>
      <div className="particle-panel">
        <span className="particle-label" aria-hidden="true">01 / A LITTLE UNIVERSE</span>
        <span className="panel-corner corner-tl" aria-hidden="true">+</span>
        <span className="panel-corner corner-tr" aria-hidden="true">+</span>
        <span className="panel-corner corner-bl" aria-hidden="true">+</span>
        <span className="panel-corner corner-br" aria-hidden="true">+</span>
        <svg className="planet-fallback" aria-hidden="true" viewBox="0 0 480 480"><circle cx="240" cy="235" r="111" fill="none" stroke="currentColor" strokeWidth="2" /><ellipse cx="240" cy="235" rx="202" ry="58" fill="none" stroke="currentColor" strokeWidth="12" transform="rotate(-22 240 235)" /></svg>
        <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
        <span className="particle-panel-note" aria-hidden="true">A little chaos. Back into orbit.</span>
      </div>
      <figcaption className="particle-caption">
        <span><span className="pointer-hint">Move your cursor.</span><span className="touch-hint">Tap or drag the planet.</span> Watch it come back together.</span>
        <button className="scatter-button" onClick={() => scatterRef.current?.()} disabled={!motionEnabled} aria-label="Scatter the planet particles"><RiRestartLine size={16} aria-hidden="true" /><span>Scatter</span></button>
      </figcaption>
    </figure>
  );
}
ParticlePlanet.propTypes = {
  motionEnabled: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(["planet", "gauntlet"]),
};
