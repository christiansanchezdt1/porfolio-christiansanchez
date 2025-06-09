export interface Responsibility {
  id: string;
  text: string;
}

export interface Technology {
  name: string;
  icon?: string;
  color?: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  responsibilities: Responsibility[];
  technologies: Technology[];
  companyLogo?: string;
  companyUrl?: string;
}

export interface WorkExperienceProps {
  className?: string;
  id?: string;
}
