"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  FileScan,
  DatabaseZap,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    text: "Uploading 'Facility_Agreement_v4.pdf'...",
    icon: <Loader2 className="h-6 w-6 animate-spin text-primary" />,
    duration: 2000,
  },
  {
    text: "Identified Clause 21 (Financial Covenants)...",
    icon: <FileScan className="h-6 w-6 text-primary" />,
    duration: 2000,
  },
  {
    text: "Extracting Leverage definitions...",
    icon: <DatabaseZap className="h-6 w-6 text-primary" />,
    duration: 2500,
  },
  {
    text: "Success!",
    icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    duration: 1500,
  },
];

export function ScanningAnimation() {
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!isUploading) return;

    if (currentStep < steps.length - 1) {
      const timer = setTimeout(
        () => setCurrentStep((prev) => prev + 1),
        steps[currentStep].duration
      );
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(
        () => router.push("/dashboard"),
        steps[currentStep].duration
      );
      return () => clearTimeout(timer);
    }
  }, [currentStep, router, isUploading]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isUploading) {
      setIsUploading(true);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      setIsUploading(true);
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        isUploading ? "bg-transparent shadow-none border-none" : ""
      )}
    >
      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          {!isUploading ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
            >
              <UploadCloud className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="font-semibold">Drop PDF Loan Agreement here</p>
              <p className="text-sm text-muted-foreground">or click to upload</p>
            </motion.div>
          ) : (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-48"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4"
                >
                  {steps[currentStep].icon}
                  <span className="text-lg font-medium">
                    {steps[currentStep].text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
