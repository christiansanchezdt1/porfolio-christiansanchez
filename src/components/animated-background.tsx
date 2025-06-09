"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isDarkMode = useRef(false);

  // Check if dark mode is enabled
  useEffect(() => {
    const checkDarkMode = () => {
      isDarkMode.current = document.documentElement.classList.contains("dark");
    };

    // Initial check
    checkDarkMode();

    // Create a mutation observer to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Initialize canvas and particles
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();

        // Set canvas dimensions with device pixel ratio for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        setDimensions({ width: canvas.width, height: canvas.height });

        // Reinitialize particles when canvas size changes
        initParticles();
      }
    };

    const initParticles = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        100
      );

      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.1,
        });
      }

      particlesRef.current = particles;
    };

    const getRandomColor = () => {
      const colors = ["#4361ee", "#3a0ca3", "#4895ef", "#4cc9f0", "#560bad"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (isDarkMode.current) {
        gradient.addColorStop(0, "rgba(10, 10, 20, 0.2)");
        gradient.addColorStop(0.5, "rgba(20, 20, 40, 0.1)");
        gradient.addColorStop(1, "rgba(10, 10, 30, 0.2)");
      } else {
        gradient.addColorStop(0, "rgba(240, 240, 255, 0.2)");
        gradient.addColorStop(0.5, "rgba(230, 240, 255, 0.1)");
        gradient.addColorStop(1, "rgba(240, 240, 255, 0.2)");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Mouse interaction
        const dx =
          mousePosition.x * (window.devicePixelRatio || 1) - particle.x;
        const dy =
          mousePosition.y * (window.devicePixelRatio || 1) - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150 * (window.devicePixelRatio || 1);

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.speedX += dx * force * 0.01;
          particle.speedY += dy * force * 0.01;

          // Limit speed
          const maxSpeed = 2;
          const speed = Math.sqrt(
            particle.speedX * particle.speedX +
              particle.speedY * particle.speedY
          );
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = isDarkMode.current
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 50, 0.05)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, mousePosition]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* Additional animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, var(--background) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}

// Floating shapes component for additional visual interest
export function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(50px)",
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.3 + 0.8],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
