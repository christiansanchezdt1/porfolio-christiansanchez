"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import AboutMe from "@/components/About";
import Projects from "@/components/Proyects";
import WorkExperience from "@/components/WorkExperience";
import StudiesAndCertificates from "@/components/studies-and-certificates";
import Footer from "@/components/Footer";
import { motion, useAnimation } from "framer-motion";
import {
  AnimatedBackground,
  FloatingShapes,
} from "@/components/animated-background";

/// Hero section with welcome message
function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          I&apos;m Christian Sánchez, a Full-Stack Developer passionate about creating
          modern web experiences with cutting-edge technologies.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/90 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">
            Scroll to explore
          </p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Intersection observer for section animations
function SectionObserver() {
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [controls]);

  return null;
}

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <FloatingShapes />
      <SectionObserver />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col items-center">
          {/* Hero Section */}
          <HeroSection />

          {/* Content Sections */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section id="about" className="scroll-mt-20 py-4 md:py-4">
              <AboutMe />
            </section>

            <section id="experience" className="scroll-mt-20 py-4 md:py-4">
              <WorkExperience />
            </section>

            <section id="projects" className="scroll-mt-20 py-4 md:py-4">
              <Projects />
            </section>

            <section id="Studies" className="scroll-mt-20 py-4 md:py-4">
              <StudiesAndCertificates />
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
