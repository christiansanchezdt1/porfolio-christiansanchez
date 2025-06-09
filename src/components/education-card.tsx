"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import type { Education } from "@/types/education";

interface EducationCardProps {
  education: Education;
  index: number;
}

export function EducationCard({ education, index }: EducationCardProps) {
  const Icon = education.icon;

  // Format dates
  const startDate = new Date(education.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const endDate = education.inProgress
    ? "Present"
    : education.endDate
    ? new Date(education.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="rounded-md bg-primary/10 text-primary p-3">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="line-clamp-2">{education.title}</CardTitle>
              <Badge variant="outline" className="mt-2">
                {education.type}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex flex-col space-y-1 mb-3">
            <div className="flex items-center text-sm font-medium">
              {education.institution}
              {education.location && (
                <span className="flex items-center text-muted-foreground ml-2 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {education.location}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {startDate} - {endDate || "N/A"}
              </span>
              {education.inProgress && (
                <Badge
                  variant="secondary"
                  className="ml-2 text-[10px] py-0 h-4"
                >
                  In Progress
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {education.description}
          </p>

          {education.skills && education.skills.length > 0 && (
            <div className="mt-auto">
              <div className="flex flex-wrap gap-1 mt-2">
                {education.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {education.link && (
            <Link
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:underline"
            >
              View Certificate
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
