import type { Project } from "@/types/project";
import imageinventoty from "@/assets/inventory.png";
import imageavenuprofesores from "@/assets/avenuprofesores.png";
import imageavenucrm from "@/assets/avenucrm.png";

export const projects: Project[] = [
  {
    id: "CRM",
    title: "EDU CRM",
    description:
      "We provide lead tracking and enrollment management all the way to graduation. Our services include an applications portal, tuition manager, online payments, course enrollment tools, document management and a lot more.",
    shortDescription:
      "The most comprehensive robust set of EDU CRM solutions specifically designed for higher Education.",
    imageSrc: imageavenucrm.src as unknown as string,
    technologies: [
      { name: ".NET CORE", color: "#000000" },
      { name: "Api .NET", color: "#61DAFB" },
      { name: "SQL SERVER", color: "#336791" },
      { name: "CSS", color: "#06B6D4" },
      { name: "Jquery", color: "#000000" },
    ],
    liveLink: "https://dev-avenu.startuniversity.dev/",
    codeLink: "#",
    featured: true,
    createdAt: "2021-05-02",
  },
  {
    id: "profesoresavenu",
    title: "Profesores Avenu",
    description:
      "Portal where teachers register to take courses and apply for said courses. Here you can manage your profile and all your information as well as your documents.",
    shortDescription:
      "Portal for the administration of teachers.",
    imageSrc: imageavenuprofesores.src as unknown as string,
    technologies: [
      { name: ".NET CORE", color: "#000000" },
      { name: "Api .NET", color: "#61DAFB" },
      { name: "SQL SERVER", color: "#336791" },
      { name: "CSS", color: "#06B6D4" },
      { name: "Jquery", color: "#000000" },
    ],
    liveLink: "https://es.profesoresavenu.com/",
    codeLink: "#",
    featured: true,
    createdAt: "2024-09-15",
  },
  {
    id: "Inventory-app",
    title: "Inventory-app",
    description:
      "It is a portal for controlling inventory, orders, and customers of any business, capable of placing orders and recording changes to each of the products.",
    shortDescription:
      "It is a portal for controlling inventory, orders, and customers of any business, capable of placing orders and recording changes to each of the products.",
    imageSrc: imageinventoty.src as unknown as string,
    technologies: [
      { name: "Next.JS", color: "#336791" },
      { name: "React", color: "#61DAFB" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Vercel", color: "#000000" },
    ],
    liveLink: "https://v0-inventory-dashboard-creator.vercel.app/",
    codeLink: "https://github.com/christiansanchezdt1/inventory-app",
    status: "Completed",
    featured: true,
    createdAt: "2025-05-20",
  },
];

export const getAllTechnologies = (): string[] => {
  const techSet = new Set<string>();

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      techSet.add(tech.name);
    });
  });

  return Array.from(techSet).sort();
};
