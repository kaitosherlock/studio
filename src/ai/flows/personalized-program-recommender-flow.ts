'use server';
/**
 * @fileOverview A Genkit flow for recommending personalized Vietnamese university programs or specialization tracks in entertainment and media communication.
 *
 * - personalizedProgramRecommender - A function that handles the program recommendation process.
 * - PersonalizedProgramRecommenderInput - The input type for the personalizedProgramRecommender function.
 * - PersonalizedProgramRecommenderOutput - The return type for the personalizedProgramRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedProgramRecommenderInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'User interests and passions related to entertainment and media communication, e.g., film production, journalism, digital marketing, game design, music, etc.'
    ),
  academicBackground: z
    .string()
    .describe(
      'User academic background, including high school performance, relevant subjects, and any academic achievements or projects.'
    ),
  careerAspirations: z
    .string()
    .describe(
      'User career goals and aspirations in the entertainment and media communication field, e.g., film director, journalist, marketing specialist, public relations manager, content creator, etc.'
    ),
});
export type PersonalizedProgramRecommenderInput = z.infer<
  typeof PersonalizedProgramRecommenderInputSchema
>;

const PersonalizedProgramRecommenderOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        universityName: z.string().describe('Name of the Vietnamese university.'),
        programName:
          z.string().describe('Name of the program or specialization track in entertainment and media communication.'),
        reasoning: z
          .string()
          .describe(
            'A concise explanation of why this program is a suitable recommendation based on the user\'s interests, academic background, and career aspirations.'
          ),
        detailsLink:
          z.string().url().optional().describe('Optional URL to the program details page on the university\'s official website.'),
      })
    )
    .describe('A list of personalized university program recommendations.'),
});
export type PersonalizedProgramRecommenderOutput = z.infer<
  typeof PersonalizedProgramRecommenderOutputSchema
>;

export async function personalizedProgramRecommender(
  input: PersonalizedProgramRecommenderInput
): Promise<PersonalizedProgramRecommenderOutput> {
  return personalizedProgramRecommenderFlow(input);
}

const personalizedProgramRecommenderPrompt = ai.definePrompt({
  name: 'personalizedProgramRecommenderPrompt',
  input: {schema: PersonalizedProgramRecommenderInputSchema},
  output: {schema: PersonalizedProgramRecommenderOutputSchema},
  prompt: `You are an expert career counselor specializing in Vietnamese higher education for Entertainment and Media Communication. Your task is to recommend suitable university programs or specialization tracks based on a student's profile.

Provide personalized recommendations for Vietnamese university programs or specialization tracks in entertainment and media communication. For each recommendation, include the university name, program name, a concise explanation of why it's a good fit, and an optional URL to the program details page.

Use the following information to generate your recommendations:

User Interests: {{{interests}}}
Academic Background: {{{academicBackground}}}
Career Aspirations: {{{careerAspirations}}}

Ensure the recommendations are relevant to the Vietnamese educational context and focus specifically on programs within Entertainment and Media Communication. Limit your recommendations to a maximum of 3-5 programs to keep it focused.`,
});

const personalizedProgramRecommenderFlow = ai.defineFlow(
  {
    name: 'personalizedProgramRecommenderFlow',
    inputSchema: PersonalizedProgramRecommenderInputSchema,
    outputSchema: PersonalizedProgramRecommenderOutputSchema,
  },
  async input => {
    const {output} = await personalizedProgramRecommenderPrompt(input);
    return output!;
  }
);
