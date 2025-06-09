"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import type { NavItem, HeaderProps } from "@/types/navigation";
import { Menu, Code, Github, Linkedin, ExternalLink } from "lucide-react";

export default function Header({ className = "" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#Studies", label: "Studies & Certificates" },
  ];

  const sectionIds = navItems.map((item) => item.href.slice(1));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 transition-all duration-300 ${
        scrolled ? "bg-background/90 shadow-md" : "bg-background/50"
      } ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <Code className="w-6 h-6 text-primary" />
          <Avatar className="h-10 w-10 border-2 border-primary/20 transition-all duration-300 hover:border-primary">
            <AvatarImage
              src="/assets/me3.jpg"
              alt="Christian Sánchez"
              className="object-cover"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h1 className="text-xl font-bold md:text-2xl">Christian Sánchez</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Computer Science Degree
            </p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="relative"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href.slice(1))}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative ${
                    isActive ? "text-primary" : "hover:text-primary/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              </motion.div>
            );
          })}

          <div className="flex items-center ml-4 space-x-1">
            <ThemeToggle />

            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/christiansanchezdt1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/christian-daniel-s%C3%A1nchez-tineo-471586112/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </nav>

        <div className="flex items-center md:hidden">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetTitle className="text-xl">Christian Sánchez</SheetTitle>
              <SheetDescription>Computer Science Degree</SheetDescription>

              <div className="grid gap-4 py-6">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavigation(e, item.href.slice(1))}
                      className={`flex items-center py-2 text-lg font-medium transition-colors duration-200 ${
                        isActive ? "text-primary" : "hover:text-primary/80"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeMobileSection"
                          className="ml-2 h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="flex space-x-4 mt-auto pt-4 border-t">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/christiansanchezdt1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/christian-daniel-s%C3%A1nchez-tineo-471586112/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Resume"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
