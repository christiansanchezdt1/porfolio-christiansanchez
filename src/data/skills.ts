import type { Skill } from "@/types/skills";

export const skills: Skill[] = [
  // Frontend
  { name: "Angular", level: "Expert", category: "Frontend", color: "#dd0606ff" },
  { name: "React", level: "Intermediate", category: "Frontend", color: "#0ba506ff" },
  { name: "TypeScript", level: "Intermediate", category: "Frontend",color: "#3178C6"},
  { name: "JavaScript", level: "Expert", category: "Frontend",color: "#F7DF1E",},
  { name: "Jquery", level: "Expert", category: "Frontend",color: "#764ABC",},
  { name: "HTML", level: "Expert", category: "Frontend", color: "#3110ebff" },
  { name: "CSS", level: "Expert", category: "Frontend", color: "#1572B6" },
  { name: "Razor", level: "Intermediate", category: "Frontend", color: "#1572B6" },
  { name: "BLazor", level: "Expert", category: "Frontend", color: "#1572B6" },
  { name: "Vue", level: "Expert", category: "Frontend", color: "#4FC08D" },
  { name: "Next.js", level: "Intermediate", category: "Frontend", color: "#000000" },

  // Backend
  { name: ".Net", level: "Expert", category: "Backend", color: "#764ABC" },
  { name: ".Net core", level: "Expert", category: "Backend", color: "#F7DF1E" },
  { name: "Api Rest", level: "Advanced", category: "Backend", color: "#764ABC" },
  { name: "Laravel", level: "Advanced", category: "Backend", color: "#339933" },
  { name: "Node.js", level: "Intermediate", category: "Backend", color: "#4FC08D" },

  // Database
  { name: "SQL", level: "Expert", category: "Database", color: "#4479A1" },
  { name: "MYSQL", level: "Expert", category: "Database", color: "#4479A1" },
  { name: "Firebird", level: "Expert", category: "Database", color: "#4479A1" },
  {
    name: "MongoDB",
    level: "Intermediate",
    category: "Database",
    color: "#47A248",
  },
  {
    name: "PostgreSQL",
    level: "Intermediate",
    category: "Database",
    color: "#336791",
  },

  // DevOps
  { name: "AWS", level: "Intermediate", category: "DevOps", color: "#FF9900" },
  {
    name: "Docker",
    level: "Intermediate",
    category: "DevOps",
    color: "#2496ED",
  },

  // Tools
  { name: "Git", level: "Expert", category: "Tools", color: "#F05032" },
];

export const skillCategories: { [key: string]: string } = {
  Frontend: "User Interface Technologies",
  Backend: "Server and API Development",
  Database: "Databases and Storage",
  DevOps: "Infrastructure and Deployment",
  Tools: "Development Tools",
  Languages: "Programming Languages",
};
