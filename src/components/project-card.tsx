"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Github, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Format date
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden group">
          <Image
            src={project.imageSrc || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {project.status && (
            <div className="absolute top-2 right-2">
              <Badge
                variant={
                  project.status === "Beta"
                    ? "default"
                    : project.status === "In Progress"
                    ? "secondary"
                    : "outline"
                }
                className="opacity-90"
              >
                {project.status}
              </Badge>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground"
              >
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            {isExpanded
              ? project.description
              : project.shortDescription ||
                `${project.description.substring(0, 100)}...`}
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={toggleExpand}
            className="mt-2 p-0 h-auto"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: tech.color ? `${tech.color}20` : undefined,
                  borderLeft: tech.color
                    ? `2px solid ${tech.color}`
                    : undefined,
                }}
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-4 border-t">
          {project.liveLink ? (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Eye className="mr-2 h-4 w-4" />
              No Demo
            </Button>
          )}
          {project.codeLink && project.codeLink !== "#" ? (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Github className="mr-2 h-4 w-4" />
              Private Code
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
