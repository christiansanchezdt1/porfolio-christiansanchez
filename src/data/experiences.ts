import type { WorkExperience } from "@/types/experience";
import { v4 as uuidv4 } from "uuid";

export const experiences: WorkExperience[] = [
  {
    id: uuidv4(),
    title: "Full-Stack Developer",
    company: "Start University",
    location: "Remote",
    period: "Mar 2021 - Feb 2025",
    startDate: "2021-03-01",
    endDate: "2025-02-28",
    responsibilities: [
      {
        id: uuidv4(),
        text: "Develop and deploy modern web applications using .NET",
      },
      {
        id: uuidv4(),
        text: "Create RESTful APIs and integrate third-party services to enhance application functionality.",
      },
      {
        id: uuidv4(),
        text: "Database in entity framework using linq.",
      },
      {
        id: uuidv4(),
        text: "Optimize website performance and implement SEO best practices to improve client visibility.",
      },
      {
        id: uuidv4(),
        text: "Collaborate directly with clients to gather requirements and deliver solutions that meet their business needs.",
      },
      {
        id: uuidv4(),
        text: "Maintain and update existing websites, implementing new features and fixing bugs as needed.",
      },
    ],
    technologies: [
      { name: ".NET CORE", color: "#61DAFB" },
      { name: "API .net", color: "#000000" },
      { name: "Jquery", color: "#3178C6" },
      { name: "Scrum", color: "#06B6D4" },
      { name: "AWS", color: "#339933" },
      { name: "SQL", color: "#3ECF8E" },
      { name: "Git", color: "#F05032" },
    ],
  },
  {
    id: uuidv4(),
    title: "Full-Stack Developer",
    company: "Dicsys",
    location: "On-site",
    period: "Febr 2020 - March 2021",
    startDate: "2020-02-01",
    endDate: "2021-02-28",
    responsibilities: [
      {
        id: uuidv4(),
        text: "Development of programs in C# (MVC) with Entity Framework and SQL Server.",
      },
      {
        id: uuidv4(),
        text: "Managing version control with Git.",
      },
      {
        id: uuidv4(),
        text: "Implementation of SCRUM methodology.",
      },
      {
        id: uuidv4(),
        text: "Maintenance and bug fixes for the Córdoba Stock Exchange's STING system.",
      },
      {
        id: uuidv4(),
        text: "Participated in daily stand-up meetings and sprint planning sessions.",
      },
    ],
    technologies: [
      { name: "C#", color: "#3178C6" },
      { name: "Entity Framework", color: "#777BB4" },
      { name: "Linq", color: "#4479A1" },
      { name: "SQL Server", color: "#4479A1" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Git", color: "#F05032" },
    ],
  },
  {
    id: uuidv4(),
    title: "Programer C#",
    company: "ITDRIVER",
    location: "On-site",
    period: "May 2017 - Dic 2017",
    startDate: "2017-05-01",
    endDate: "2017-12-31",
    responsibilities: [
      {
        id: uuidv4(),
        text: "Development of internal payroll control program in C# (MVC).",
      },
      {
        id: uuidv4(),
        text: "Integración con servicio web en API whit PHP y base de datos MySQL.",
      },
      {
        id: uuidv4(),
        text: "Gained experience in project management and client communication.",
      },
    ],
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "HTML", color: "#E34F26" },
      { name: "CSS", color: "#1572B6" },
    ],
  },
  {
    id: uuidv4(),
    title: "Programador/Tecnico",
    company: "Hosting Margarita",
    location: "On-site",
    period: "Jan 2012 - Nov 2014",
    startDate: "2012-01-06",
    endDate: "2014-11-30",
    responsibilities: [
      {
        id: uuidv4(),
        text: "Web programming in PHP, MySQL, jQuery, HTML5.",
      },
      {
        id: uuidv4(),
        text: "Development in Visual Studio (C#) and database creation.",
      },
      {
        id: uuidv4(),
        text: "Information systems analysis and hardware maintenance.",
      },
    ],
    technologies: [
      { name: ".NET", color: "#61DAFB" },
      { name: "SQL SERVER", color: "#339933" },
      { name: "PHP", color: "#0078D7" },
      { name: "MySQL", color: "#FF9800" },
      { name: "jQuery", color: "#4CAF50" },
      { name: "HTML5", color: "#F44336" },
    ],
  },
];
