import type { LucideIcon } from "lucide-react";

export type EducationType =
  | "Degree"
  | "Certificate"
  | "Course"
  | "Specialization"
  | "Bootcamp";

export interface Education {
  id: string;
  title: string;
  institution: string;
  description: string;
  type: EducationType;
  icon: LucideIcon;
  startDate: string;
  endDate?: string;
  inProgress?: boolean;
  link?: string | null;
  skills?: string[];
  location?: string;
  credential?: string;
}

export interface StudiesProps {
  className?: string;
  id?: string;
}
