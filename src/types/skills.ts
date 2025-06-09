export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools"
  | "Languages";

export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon?: string;
  color?: string;
}

export interface AboutMeProps {
  className?: string;
  id?: string;
}
