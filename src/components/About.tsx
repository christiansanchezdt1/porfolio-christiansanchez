"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillCategory } from "@/components/skill-category";
import { skills, skillCategories } from "@/data/skills";
import type { AboutMeProps } from "@/types/skills";
import { Github, Linkedin, Mail } from "lucide-react";
import meImage from "@/assets/me1.jpg";

export default function AboutMe({
  className = "",
  id = "about",
}: AboutMeProps) {
  // Agrupar habilidades por categoría
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Ordenar categorías para mostrar Frontend y Backend primero
  const orderedCategories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
    "Languages",
  ].filter((cat) => skillsByCategory[cat]?.length > 0);

  return (
    <section
      id={id}
      className={`w-full py-2 md:py-2 lg:py-2 bg-gradient-to-br from-background via-muted/50 to-background ${className}`}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12 items-start"
        >
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={meImage.src}
                  alt="Christian Sánchez"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </Card>

            <div className="flex flex-wrap gap-3 justify-center">
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
                  href="https://www.linkedin.com/in/elvis-pino-b358b2127/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>

              <Button variant="outline" size="icon" asChild>
                <a href="mailto:elvisreyxd@gmail.com" aria-label="Email Me">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Christian Sánchez
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-xl mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Full-stack Developer
              </motion.p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About me</h2>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a passionate full-stack Full-stack developer 
                  with over 10 years of experience in web and desktop programming, 
                  specializing in .NET technologies (C#, ASP.NET Core, MVC), Entity Framework, 
                  and SQL Server databases. He has extensive experience in systems integration, 
                  REST API development, agile methodologies (SCRUM), and version control with Git. 
                  He has experience in both corporate environments and freelance projects, 
                  working with modern frameworks such as Laravel, Vue.js, Node, React, NextJs, and AngularJS.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  When I&apos;m not coding, you can find me exploring new hiking
                  trails, experimenting with new recipes in the kitchen, or
                  immersing myself in a good book about software architecture
                  and design patterns.
                </p>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Technical Skills</h2>

              {orderedCategories.map((category) => (
                <SkillCategory
                  key={category}
                  title={category}
                  description={skillCategories[category]}
                  skills={skillsByCategory[category]}
                  initiallyExpanded={
                    category === "Frontend" || category === "Backend"
                  }
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
