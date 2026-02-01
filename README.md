# LoanPulse AI

**Transforming static loan agreements into dynamic, AI-powered risk-monitoring dashboards.**

LoanPulse AI elevates credit portfolio management by transforming dense, static LMA-style loan agreements into a live, interactive dashboard. It allows portfolio managers to proactively monitor financial covenants, track ESG KPIs, and get instant AI-driven risk summaries to stay ahead of potential breaches.

## Core Features
- **Multi-Format Document Ingestion**: Upload loan agreements in PDF, DOC, or DOCX format.
- **AI-Powered Data Extraction**: Utilizes Google's Gemini 2.5 Flash model to read and understand complex legal documents, extracting key financial covenants, limits, and other metadata.
- **Interactive Risk Dashboard**: Visualizes the health of each financial covenant with status indicators (Healthy, Warning, Breach), trend charts, and current values.
- **AI Risk Summaries**: On-demand, AI-generated summaries that explain the risk associated with a specific covenant in plain English.
- **Market Sentiment Analysis ("Market Chatter")**: A unique feature that uses AI to simulate market research, providing a sentiment score (Positive, Neutral, Negative) and a summary of public perception for the borrower.
- **Simulated "Cure Calculator"**: Demonstrates how a user could calculate the necessary equity injection or debt reduction to fix a covenant breach.
- **Modern, Responsive UI**: A clean, professional interface built for financial analysis, with subtle animations and a clear layout.

## Tech Stack

LoanPulse AI is built on a modern, AI-native stack designed for performance, scalability, and a great developer experience.

- **Frontend**:
    - **Next.js**: React framework for server-side rendering, routing, and a full-stack experience.
    - **TypeScript**: For robust, type-safe code.
    - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
    - **ShadCN UI**: A library of beautifully designed, accessible, and customizable React components.
    - **Recharts**: For creating the interactive data charts on the dashboard.
    - **Framer Motion**: Powers the smooth animations and page transitions.
    - **Lucide React**: Provides the clean and modern icon set.

- **AI & Backend**:
    - **Google Gemini 2.5 Flash**: The core multimodal AI model used for document understanding and sentiment analysis.
    - **Genkit**: An open-source framework from Google for building robust, production-ready AI flows.
    - **Firebase App Hosting**: The project is configured for easy deployment on a secure, scalable, and fully-managed hosting solution.

## Getting Started

To get the project running locally, follow these steps:

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here or any orther API key from the availablle
    ```

### Running the Application

1.  **Start the development server:**
    This command starts the Next.js application.
    ```bash
    npm run dev
    ```

2.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
