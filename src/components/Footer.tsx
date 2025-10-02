"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackToTop } from "@/components/back-to-top";
import { contactInfo, footerSections } from "@/data/contact";
import type { FooterProps } from "@/types/footer";
import { Mail, Phone } from "lucide-react";

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop />
      <motion.footer
        className={`bg-muted py-12 text-muted-foreground ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Christian Sánchez</h3>
              <p className="text-sm max-w-xs">
                Full-stack developer passionate about creating intuitive and
                efficient web applications with modern technologies.
              </p>
              <div className="flex space-x-3">
                {contactInfo
                  .filter((item) => item.icon !== Mail && item.icon !== Phone)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-9 w-9 rounded-full"
                      >
                        <Link
                          href={item.href}
                          target={item.isExternal ? "_blank" : undefined}
                          rel={
                            item.isExternal ? "noopener noreferrer" : undefined
                          }
                          aria-label={item.text}
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      </Button>
                    );
                  })}
              </div>
            </div>

            {/* Navigation sections */}
            {footerSections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-base font-semibold text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={
                          link.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="text-sm hover:text-primary transition-colors duration-200"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact section */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Contact
              </h3>
              <ul className="space-y-2">
                {contactInfo
                  .filter((item) => item.icon === Mail || item.icon === Phone)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className="text-sm flex items-center gap-2 hover:text-primary transition-colors duration-200"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.text}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>

              {/* Newsletter form */}
              <div className="pt-4">
              </div>
            </div>
          </div>

          <Separator className="my-8 opacity-20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              &copy; {currentYear} Christian Sánchez. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
