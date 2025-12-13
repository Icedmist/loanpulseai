
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  File as FileIcon,
  X,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { processLoanAgreement } from "@/ai/flows/process-loan-agreement";
import { ScanningAnimation } from "./scanning-animation";


export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();


  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleClick = () => {
    if (isProcessing) return;
    fileInputRef.current?.click();
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result as string;
          const result = await processLoanAgreement({ fileDataUri: base64Data });

          sessionStorage.setItem('loanData', JSON.stringify(result));
          
          // The scanning animation component will handle the redirect.
          // The isProcessing state change triggers its display.
        } catch (err) {
            console.error("Processing error:", err);
            toast({
                variant: "destructive",
                title: "Processing Failed",
                description: "Could not analyze the loan agreement file.",
            });
            setIsProcessing(false);
        }
      };
      reader.onerror = () => {
        throw new Error("Failed to read file.");
      }

    } catch (err) {
      console.error("File reading error:", err);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not read the selected file.",
      });
      setIsProcessing(false);
    }
  };


  if (isProcessing) {
    return <ScanningAnimation fileName={file?.name || 'file'} />;
  }

  return (
    <Card>
      <CardContent className="p-0">
          <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors relative"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              accept="application/pdf"
            />
            {!file ? (
                <div className="text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-2 mx-auto" />
                    <p className="font-semibold">Drop PDF Loan Agreement here</p>
                    <p className="text-sm text-muted-foreground">or click to upload</p>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <FileIcon className="h-10 w-10 text-primary" />
                    <p className="mt-2 font-semibold truncate max-w-xs">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
             {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>

          {file && !isProcessing && (
            <div className="p-4 border-t">
                 <Button onClick={handleProcess} className="w-full" disabled={isProcessing || !!error}>
                    {isProcessing ? <Loader2 className="animate-spin" /> : 'Process Agreement'}
                </Button>
            </div>
           )}
      </CardContent>
    </Card>
  );
}
