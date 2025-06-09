import {
  BookOpen,
  Brush,
  Code,
  PuzzleIcon,
  GraduationCap,
  School,
} from "lucide-react";
import type { Education } from "@/types/education";

export const educationItems: Education[] = [
  {
    id: "computer-science-bachelor",
    title: "Bachelor of Computer Science",
    institution: "Liceo Nueva Esparta",
    location: "Venezuela",
    description:
      "Graduated with a degree in Computer Science, focusing on programming fundamentals, algorithms, and data structures.",
    type: "Degree",
    icon: School,
    startDate: "2002-09-01",
    endDate: "2005-07-15",
    skills: ["Programming Fundamentals", "Algorithms", "Data Structures"],
  },
  {
    id: "systems-engineering",
    title: "Computer Science Degree",
    institution: "Universidad de Oriente",
    location: "Venezuela",
    description:
      "Graduated with a degree in Systems Engineering, with emphasis on software development, database management, and system architecture.",
    type: "Degree",
    icon: GraduationCap,
    startDate: "2006-02-01",
    endDate: "2012-12-30",
    link: "https://udo.education/",
    skills: [
      "Software Development",
      "Database Management",
      "System Architecture",
    ],
  }
];

export const getEducationTypes = (): string[] => {
  const typesSet = new Set<string>();

  educationItems.forEach((item) => {
    typesSet.add(item.type);
  });

  return Array.from(typesSet).sort();
};
