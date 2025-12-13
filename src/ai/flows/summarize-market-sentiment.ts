'use server';

/**
 * @fileOverview Analyzes market sentiment for a given company.
 *
 * - summarizeMarketSentiment - A function that handles the sentiment analysis.
 * - SummarizeMarketSentimentInput - The input type for the function.
 * - SummarizeMarketSentimentOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarketSentimentInputSchema = z.object({
  companyName: z.string().describe('The name of the company to analyze.'),
});
export type SummarizeMarketSentimentInput = z.infer<typeof SummarizeMarketSentimentInputSchema>;

const SummarizeMarketSentimentOutputSchema = z.object({
  sentiment: z.enum(["Positive", "Neutral", "Negative"]).describe("The overall market sentiment towards the company."),
  summary: z.string().describe('A brief summary of the key themes and reasons for the sentiment.'),
  confidence_score: z.number().describe('A confidence score (0-1) in the sentiment analysis.'),
});
export type SummarizeMarketSentimentOutput = z.infer<typeof SummarizeMarketSentimentOutputSchema>;

export async function summarizeMarketSentiment(input: SummarizeMarketSentimentInput): Promise<SummarizeMarketSentimentOutput> {
  return summarizeMarketSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMarketSentimentPrompt',
  input: {schema: SummarizeMarketSentimentInputSchema},
  output: {schema: SummarizeMarketSentimentOutputSchema},
  prompt: `You are a financial market analyst AI. Your task is to analyze the current market sentiment for the company: {{{companyName}}}.

  To do this, you will:
  1.  Imagine you are searching for recent news headlines, financial reports, and social media discussions related to the company.
  2.  Based on this simulated search, determine the overall market sentiment (Positive, Neutral, or Negative).
  3.  Provide a concise summary (under 60 words) explaining the key drivers behind this sentiment.
  4.  Provide a confidence score for your analysis.

  Generate a plausible and realistic sentiment analysis based on the type of company. For example, a renewable energy company might have positive sentiment due to a new green project, or negative sentiment due to supply chain issues.`,
});

const summarizeMarketSentimentFlow = ai.defineFlow(
  {
    name: 'summarizeMarketSentimentFlow',
    inputSchema: SummarizeMarketSentimentInputSchema,
    outputSchema: SummarizeMarketSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
