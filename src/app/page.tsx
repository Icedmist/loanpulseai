import { FileUpload } from "@/components/loanpulse/file-upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-lg">
        <h1 className="font-headline text-4xl font-bold text-center text-primary mb-2">LoanPulse AI</h1>
        <p className="text-center text-muted-foreground mb-8">
          Turning static LMA loan PDFs into active, risk-monitoring dashboards.
        </p>
        <FileUpload />
      </div>
    </main>
  );
}
