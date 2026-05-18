import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const glowRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  // Use refs to store positions so we don't trigger React re-renders on every pixel move
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const outline = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const glow = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Update the solid dot immediately for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      // Easing formula: current += (target - current) * ease
      outline.current.x += (mouse.current.x - outline.current.x) * 0.15;
      outline.current.y += (mouse.current.y - outline.current.y) * 0.15;

      glow.current.x += (mouse.current.x - glow.current.x) * 0.05;
      glow.current.y += (mouse.current.y - glow.current.y) * 0.05;

      // Apply transform using translate3d for GPU acceleration
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outline.current.x}px, ${outline.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={glowRef} className="glow-cursor"></div>
      <div ref={outlineRef} className={`cursor-outline ${isHovering ? 'hover' : ''}`}></div>
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hover' : ''}`}></div>
    </>
  );
};

export default CustomCursor;
