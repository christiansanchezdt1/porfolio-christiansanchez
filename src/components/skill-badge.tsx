"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import type { Skill } from "@/types/skills";

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  // Convertir nivel a número para la visualización
  const levelToNumber = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
  };

  const levelNumber = levelToNumber[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md cursor-pointer w-full justify-between`}
              style={{
                borderLeft: skill.color
                  ? `3px solid ${skill.color}`
                  : undefined,
              }}
            >
              <span>{skill.name}</span>
              <span className="ml-2 flex">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
                      i < levelNumber ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">{skill.level}</p>
            <p className="text-xs text-muted-foreground">{skill.category}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}
