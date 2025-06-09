"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@") && email.includes(".")) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Please enter a valid email address");
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-base font-medium mb-2">Subscribe to my newsletter</h3>
      
      {status === "success" && (
        <div className="flex items-center gap-2 mt-2 text-sm text-green-500">
          <Check className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 mt-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
