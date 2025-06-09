"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillBadge } from "@/components/skill-badge";
import type { Skill } from "@/types/skills";

interface SkillCategoryProps {
  title: string;
  description: string;
  skills: Skill[];
  initiallyExpanded?: boolean;
}

export function SkillCategory({
  title,
  description,
  skills,
  initiallyExpanded = false,
}: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleShowAll = () => setShowAll(!showAll);

  const displayedSkills = showAll ? skills : skills.slice(0, 6);
  const hasMoreSkills = skills.length > 6;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleExpand();
          }
        }}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isExpanded ? "Collapse" : "Expand"} {title} skills
          </span>
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-3">
              {displayedSkills.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>

            {hasMoreSkills && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleShowAll();
                }}
                className="mt-2"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
