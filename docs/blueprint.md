# **App Name**: LoanPulse AI

## Core Features:

- PDF Ingestion Simulation: Simulate the ingestion of a Loan Agreement PDF with a scanning animation.
- Financial Covenant Extraction: Simulate AI extracting financial covenants from the document.
- Live Bank Data Connection (Mocked): Display mocked data as if connected to live bank feeds.
- Dashboard Overview: Display a dashboard summarizing key loan health metrics and financial covenants. This includes charts for leverage and interest cover.
- Covenant Monitoring: Display the current status of each financial covenant (healthy, warning, breach).
- Cure Calculator: Simulate the ability to calculate the equity injection or debt reduction needed to cure a breach, presenting options in a modal.
- Audit Trail: Show a tooltip of the original text snippet from the PDF, whenever the user hovers over the 'Limit'.

## Style Guidelines:

- Primary color: Dark blue (#2E3192) to evoke trust and stability, befitting the financial sector.
- Background color: Very light gray (#F4F5F7), near-white to emphasize content and avoid distraction.
- Accent color: Green (#67E8F9), a brighter color found by shifting hue ~30 degrees, and desaturating / lightening it, for interactive elements and alerts.
- Font pairing: 'Space Grotesk' for headlines, a computerized-style sans-serif, and 'Inter' for body text, for better readability. Note: currently only Google Fonts are supported.
- Code font: 'Source Code Pro' for displaying code snippets. Note: currently only Google Fonts are supported.
- Use Lucide React icons for clarity and a modern, clean interface.
- Implement a grid-based layout for the dashboard, optimizing the use of screen real estate. The right column will house the ESG widget and alert feed.
- Use subtle Framer Motion animations for page transitions and component loading to enhance the user experience.