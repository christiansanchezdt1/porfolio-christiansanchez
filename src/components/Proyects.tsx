"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { projects, getAllTechnologies } from "@/data/projects";
import { Search, Filter, X } from "lucide-react";
import type { ProjectsProps } from "@/types/project";

export default function Projects({
  className = "",
  id = "projects",
}: ProjectsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showFilters, setShowFilters] = useState(false);

  const allTechnologies = getAllTechnologies();

  useEffect(() => {
    let result = projects;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term) ||
          project.technologies.some((tech) =>
            tech.name.toLowerCase().includes(term)
          )
      );
    }

    // Filter by selected technology
    if (selectedTech) {
      result = result.filter((project) =>
        project.technologies.some((tech) => tech.name === selectedTech)
      );
    }

    setFilteredProjects(result);
  }, [searchTerm, selectedTech]);

  const handleTechFilter = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTech(null);
  };

  return (
    <section
      id={id}
      className={`w-full py-2 md:py-2 lg:py-2 bg-gradient-to-br from-background via-muted/50 to-background ${className}`}
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            Projects
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            My Work
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base">
            Explore a selection of my projects, showcasing my skills and
            experience in web development.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {(selectedTech || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
                {allTechnologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTechFilter(tech)}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center p-8 bg-muted/30 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria to find projects.
            </p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
