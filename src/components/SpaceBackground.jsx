import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// A viewport-sized scene, listening on window so the background responds
// even while the pointer is over text, links, or a section farther down the page.
export default function SpaceBackground({ motionEnabled }) {
  const starsRef = useRef(null);
  const nebulaRef = useRef(null);

  useEffect(() => {
    const canvas = starsRef.current;
    const nebula = nebulaRef.current;
    const context = canvas.getContext("2d");
    const haze = nebula.getContext("2d");
    if (!context || !haze) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let scrollPosition = window.scrollY;
    let easedScroll = scrollPosition;
    let disposed = false;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const trail = [];
    const ripples = [];
    let touchInfluenceUntil = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Diffuse light is rendered at a lower resolution; stars stay sharp.
      nebula.width = Math.round(width * 0.35);
      nebula.height = Math.round(height * 0.35);
      const count = Math.min(coarse ? 110 : 270, Math.floor(width * height / 5500));
      particles = Array.from({ length: Math.max(65, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: 0.25 + Math.random() * 0.75,
        radius: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        offsetX: 0, offsetY: 0,
        warm: Math.random() > 0.82,
      }));
      if (!motionEnabled) draw(0);
    };

    const drawNebula = (time) => {
      const w = nebula.width;
      const h = nebula.height;
      haze.clearRect(0, 0, w, h);
      const px = pointer.x / Math.max(width, 1) - 0.5;
      const py = pointer.y / Math.max(height, 1) - 0.5;
      const colors = ["114,68,160", "164,76,128", "215,109,119", "100,81,159"];
      for (let i = 0; i < 4; i += 1) {
        haze.save();
        const x = w * (0.28 + i * 0.2) + Math.sin(time * 0.12 + i * 1.5) * w * 0.12 + px * w * 0.12;
        const y = h * (0.7 - i * 0.16) + Math.cos(time * 0.15 + i) * h * 0.08 + py * h * 0.12;
        haze.translate(x, y);
        haze.rotate(-0.45 + Math.sin(time * 0.08 + i) * 0.12 + px * 0.15);
        haze.scale(2.5, 0.68);
        const radius = Math.max(w, h) * 0.28;
        const light = haze.createRadialGradient(0, 0, 0, 0, 0, radius);
        light.addColorStop(0, `rgba(${colors[i]},${i === 2 ? 0.17 : 0.28})`);
        light.addColorStop(0.45, `rgba(${colors[i]},0.10)`);
        light.addColorStop(1, `rgba(${colors[i]},0)`);
        haze.fillStyle = light;
        haze.fillRect(-radius, -radius, radius * 2, radius * 2);
        haze.restore();
      }

      // Wide, flowing filaments give the nebula shape instead of a flat glow.
      // Their curve bends gently toward the pointer anywhere on the page.
      for (let band = 0; band < 3; band += 1) {
        const ribbon = haze.createLinearGradient(0, h, w, 0);
        ribbon.addColorStop(0, "rgba(97,64,155,0)");
        ribbon.addColorStop(0.35, "rgba(126,78,159,0.13)");
        ribbon.addColorStop(0.7, "rgba(215,109,119,0.10)");
        ribbon.addColorStop(1, "rgba(255,175,123,0)");
        haze.strokeStyle = ribbon;
        haze.lineWidth = h * (0.018 + band * 0.025);
        haze.beginPath();
        for (let step = 0; step <= 45; step += 1) {
          const progress = step / 45;
          const x = (progress * 1.2 - 0.1) * w;
          const distance = (progress - 0.5 - px) * 3;
          const bend = Math.exp(-distance * distance) * py * h * 0.2;
          const y = h * (0.9 - progress * 0.8) + Math.sin(progress * 6 + time * 0.2 + band * 0.55) * h * 0.12 + bend;
          if (step === 0) haze.moveTo(x, y);
          else haze.lineTo(x, y);
        }
        haze.stroke();
      }
    };

    const draw = (delta) => {
      if (disposed) return;
      if (motionEnabled) elapsed += delta;
      if (touchInfluenceUntil && elapsed > touchInfluenceUntil) {
        pointer.active = false;
        touchInfluenceUntil = 0;
      }
      const smoothing = motionEnabled ? 1 - Math.exp(-delta * 5) : 1;
      pointer.x += (pointer.targetX - pointer.x) * smoothing;
      pointer.y += (pointer.targetY - pointer.y) * smoothing;
      easedScroll += (scrollPosition - easedScroll) * smoothing;
      context.clearRect(0, 0, width, height);
      drawNebula(elapsed);

      const nearby = [];
      const nx = pointer.x / Math.max(width, 1) - 0.5;
      const ny = pointer.y / Math.max(height, 1) - 0.5;
      const wrap = (value, range) => ((value % range) + range) % range;
      particles.forEach((star) => {
        let x = wrap(star.x + nx * star.depth * 35 + elapsed * star.depth * 2, width);
        let y = wrap(star.y + ny * star.depth * 25 - easedScroll * star.depth * 0.035, height);
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = motionEnabled && pointer.active ? Math.max(0, 1 - distance / 190) : 0;
        const force = influence * influence * 40;
        const easing = motionEnabled ? 1 - Math.exp(-delta * 7) : 1;
        star.offsetX += ((dx / Math.max(distance, 1)) * force - star.offsetX) * easing;
        star.offsetY += ((dy / Math.max(distance, 1)) * force - star.offsetY) * easing;
        x += star.offsetX; y += star.offsetY;
        const twinkle = motionEnabled ? Math.sin(elapsed * 0.7 + star.phase) * 0.12 : 0;
        const alpha = Math.min(0.95, 0.20 + star.depth * 0.42 + twinkle + influence * 0.3);
        const color = star.warm ? "255,190,162" : "221,215,247";
        context.fillStyle = `rgba(${color},${alpha})`;
        context.beginPath();
        context.arc(x, y, star.radius + influence * 0.65, 0, Math.PI * 2);
        context.fill();
        if (star.depth > 0.9) {
          context.strokeStyle = `rgba(${color},${alpha * 0.36})`;
          context.lineWidth = 0.5;
          context.beginPath();
          context.moveTo(x - 3.5, y); context.lineTo(x + 3.5, y);
          context.moveTo(x, y - 3.5); context.lineTo(x, y + 3.5);
          context.stroke();
        }
        if (influence > 0 && nearby.length < 25) nearby.push({ x, y, influence });
      });

      // Constellations appear locally around the cursor, then dissolve.
      for (let i = 0; i < nearby.length; i += 1) {
        for (let j = i + 1; j < nearby.length; j += 1) {
          const a = nearby[i];
          const b = nearby[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 110) continue;
          context.strokeStyle = `rgba(215,158,181,${(1 - distance / 110) * Math.min(a.influence, b.influence) * 0.32})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(a.x, a.y); context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      if (motionEnabled) {
        for (let i = ripples.length - 1; i >= 0; i -= 1) {
          const ripple = ripples[i];
          ripple.age += delta;
          if (ripple.age > 1.1) { ripples.splice(i, 1); continue; }
          const progress = ripple.age / 1.1;
          context.strokeStyle = `rgba(255,175,123,${(1 - progress) * 0.32})`;
          context.lineWidth = 1 - progress * 0.7;
          context.beginPath();
          context.arc(ripple.x, ripple.y, 10 + (1 - (1 - progress) ** 3) * 105, 0, Math.PI * 2);
          context.stroke();
        }
        for (let i = trail.length - 1; i >= 0; i -= 1) {
          trail[i].age += delta;
          if (trail[i].age > 0.85) trail.splice(i, 1);
        }
        for (let i = 1; i < trail.length; i += 1) {
          const point = trail[i];
          const alpha = Math.max(0, 1 - point.age / 0.85) * 0.24;
          context.strokeStyle = `rgba(255,175,123,${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(trail[i - 1].x, trail[i - 1].y);
          context.lineTo(point.x, point.y);
          context.stroke();
        }
        // An occasional shooting star rather than a continuous stream.
        const phase = (elapsed + 4) % 13;
        if (phase < 1.2) {
          const x = width * 0.57 + phase * 260;
          const y = height * 0.13 + phase * 115;
          const tail = context.createLinearGradient(x - 90, y - 40, x, y);
          tail.addColorStop(0, "rgba(244,240,243,0)");
          tail.addColorStop(1, `rgba(244,240,243,${Math.sin(phase / 1.2 * Math.PI) * 0.65})`);
          context.strokeStyle = tail;
          context.lineWidth = 1.4;
          context.beginPath();
          context.moveTo(x - 90, y - 40); context.lineTo(x, y);
          context.stroke();
        }
      }
    };

    const tick = (time) => {
      frame = 0;
      if (disposed || document.hidden) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
      previousTime = time;
      draw(delta);
      if (motionEnabled) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!motionEnabled) {
        draw(0);
        return;
      }
      if (!frame && !disposed && !document.hidden) {
        previousTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const move = (event) => {
      if (!motionEnabled || event.pointerType === "touch") return;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
      trail.push({ x: event.clientX, y: event.clientY, age: 0 });
      if (trail.length > 35) trail.shift();
    };
    const resetPointer = () => {
      pointer.active = false;
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
    };
    const pulse = (event) => {
      if (!motionEnabled) return;
      ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
      if (ripples.length > 6) ripples.shift();
      if (event.pointerType === "touch") {
        pointer.x = pointer.targetX = event.clientX;
        pointer.y = pointer.targetY = event.clientY;
        pointer.active = true;
        touchInfluenceUntil = elapsed + 0.65;
      }
    };
    const pointerOut = (event) => { if (!event.relatedTarget) resetPointer(); };
    const scroll = () => { scrollPosition = window.scrollY; };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      resetPointer();
      if (!document.hidden) start();
    };

    resize();
    pointer.x = pointer.targetX = width / 2;
    pointer.y = pointer.targetY = height / 2;
    draw(0);
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pulse, { passive: true });
    window.addEventListener("pointerout", pointerOut);
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pulse);
      window.removeEventListener("pointerout", pointerOut);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [motionEnabled]);

  return (
    <div className="space-background" aria-hidden="true">
      <canvas ref={nebulaRef} className="space-nebula" />
      <canvas ref={starsRef} className="space-stars" />
    </div>
  );
}
SpaceBackground.propTypes = { motionEnabled: PropTypes.bool.isRequired };
