"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EducationCard } from "@/components/education-card";
import { EducationTimeline } from "@/components/education-timeline";
import { educationItems, getEducationTypes } from "@/data/education";
import { ViewIcon as ViewGrid, Clock } from "lucide-react";
import type { StudiesProps } from "@/types/education";

export default function StudiesAndCertificates({
  className = "",
  id = "Studies",
}: StudiesProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  const educationTypes = getEducationTypes();

  const filteredItems = selectedType
    ? educationItems.filter((item) => item.type === selectedType)
    : educationItems;

  // Sort items by date (most recent first)
  const sortedItems = [...filteredItems].sort((a, b) => {
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
    <section
      id={id}
      className={`w-full py-4 md:py-4 lg:py-4 bg-gradient-to-br from-background via-muted/50 to-background ${className}`}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            Studies & Certificates
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            My Educational Journey
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base">
            Explore the various studies and certificates I&apos;ve completed to
            enhance my expertise in software development and design.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            {educationTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2"
            >
              <ViewGrid className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("timeline")}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Timeline
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedItems.map((item, index) => (
              <EducationCard key={item.id} education={item} index={index} />
            ))}
          </div>
        ) : (
          <EducationTimeline items={sortedItems} />
        )}
      </div>
    </section>
  );
}
