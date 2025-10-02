import type { Project } from "@/types/project";
import imageinventoty from "@/assets/inventory.png";
import imageavenucrm from "@/assets/avenucrm.png";
import imagehotelemaus from "@/assets/hotelEmaus.jpg";

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
    createdAt: "2021-05-02",
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
    {
    id: "HotelEmaus",
    title: "Hotel Emaus",
    description:
      "Website promoting the rooms at this hotel in downtown Salta. You can contact us via WhatsApp and reserve your desired room.",
    shortDescription:
      "Web system that allows you to contact Hotel Emaus to reserve a room",
    imageSrc: imagehotelemaus.src as unknown as string,
    technologies: [
      { name: "Next.JS", color: "#336791" },
      { name: "React", color: "#61DAFB" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Vercel", color: "#000000" },
    ],
    liveLink: "https://hotel-emaus-site.vercel.app/",
    codeLink: "https://github.com/christiansanchezdt1/hotel-emaus-site",
    status: "Completed",
    createdAt: "2025-05-02",
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
