"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import type { Education } from "@/types/education";

interface EducationTimelineProps {
  items: Education[];
}

export function EducationTimeline({ items }: EducationTimelineProps) {
  // Sort items by date (most recent first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.inProgress
      ? new Date()
      : a.endDate
      ? new Date(a.endDate)
      : new Date(a.startDate);
    const dateB = b.inProgress
      ? new Date()
      : b.endDate
      ? new Date(b.endDate)
      : new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="relative mt-12 pl-8 border-l-2 border-muted">
      {sortedItems.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

interface TimelineItemProps {
  item: Education;
  index: number;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

  // Format dates
  const startDate = new Date(item.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const endDate = item.inProgress
    ? "Present"
    : item.endDate
    ? new Date(item.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-10 relative"
    >
      {/* Timeline node */}
      <div className="absolute -left-[42px] bg-background p-1 rounded-full border-2 border-muted">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <Badge variant="outline">{item.type}</Badge>
          {item.inProgress && <Badge variant="secondary">In Progress</Badge>}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
          <span className="font-medium">{item.institution}</span>

          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {startDate} - {endDate || "N/A"}
          </span>

          {item.location && (
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {item.location}
            </span>
          )}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              {expanded
                ? item.description
                : item.description.substring(0, 100) +
                  (item.description.length > 100 ? "..." : "")}
            </p>

            {item.description.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 h-auto p-0 text-primary"
              >
                {expanded ? "Show less" : "Show more"}
              </Button>
            )}

            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            {item.link && (
              <div className="mt-3">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Certificate
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
