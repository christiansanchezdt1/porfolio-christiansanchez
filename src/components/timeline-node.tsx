"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import type { WorkExperience } from "@/types/experience";

interface TimelineNodeProps {
  experience: WorkExperience;
  index: number;
}

export function TimelineNode({ experience, index }: TimelineNodeProps) {
  // Calculate years of experience
  const startDate = new Date(experience.startDate);
  const endDate = experience.current
    ? new Date()
    : experience.endDate
    ? new Date(experience.endDate)
    : new Date();
  const years = (
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365)
  ).toFixed(1);

  return (
    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10 absolute left-0 sm:left-1/2 transform -translate-x-1/2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: index * 0.2 + 0.3,
        }}
      >
        <Briefcase size={16} className="text-primary-foreground" />
      </motion.div>

      {/* Tooltip with additional info */}
      <div className="absolute left-10 sm:left-auto sm:right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card shadow-lg rounded-md p-2 w-40 pointer-events-none">
        <div className="flex items-center gap-1 text-xs mb-1">
          <Calendar size={12} />
          <span>{years} years</span>
        </div>
        {experience.location && (
          <div className="flex items-center gap-1 text-xs">
            <MapPin size={12} />
            <span>{experience.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
