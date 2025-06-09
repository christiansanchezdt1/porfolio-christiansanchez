"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { WorkExperience } from "@/types/experience";
import Image from "next/image";

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
  isEven: boolean;
}

export function ExperienceCard({ experience, isEven }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card
      className={`w-full sm:w-5/12 transition-all duration-300 hover:shadow-lg ${
        isEven ? "sm:mr-auto" : "sm:ml-auto"
      }`}
    >
      <CardHeader className="relative">
        {experience.companyLogo && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={experience.companyLogo || "/placeholder.svg"}
              alt={`${experience.company} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
        )}
        <CardTitle className="text-lg sm:text-xl font-bold">
          {experience.title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {experience.company}
          </p>
          {experience.companyUrl && (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${experience.company} website`}
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {experience.period}
          </Badge>
          {experience.location && (
            <Badge variant="secondary" className="text-xs">
              {experience.location}
            </Badge>
          )}
          {experience.current && (
            <Badge variant="default" className="text-xs">
              Current
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {experience.technologies.map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="text-xs"
              style={{
                backgroundColor: tech.color ? `${tech.color}20` : undefined,
                borderLeft: tech.color ? `2px solid ${tech.color}` : undefined,
              }}
            >
              {tech.name}
            </Badge>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3"
            >
              {experience.responsibilities.map((resp, idx) => (
                <motion.li
                  key={resp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="text-xs sm:text-sm text-muted-foreground flex items-start"
                >
                  <span className="mr-2 mt-1 text-primary">•</span>
                  {resp.text}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="mt-4 w-full justify-between"
          aria-expanded={isExpanded}
          aria-controls={`responsibilities-${experience.id}`}
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={16} />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
