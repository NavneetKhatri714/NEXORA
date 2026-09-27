import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: env.GEMINI_MODEL });

export async function generateJSON<T>(prompt: string): Promise<T> {
  const result = await model.generateContent(
    `${prompt}

Return ONLY valid JSON. Do not use markdown fences, comments, or explanatory text.`
  );
  const text = result.response.text().trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(text) as T;
}

export async function analyzeCandidate(input: {
  targetRole: string;
  resumeText?: string;
  githubData?: unknown;
  linkedinUrl?: string;
}) {
  return generateJSON<{
    skills: Array<{ name: string; score: number; evidence: string }>;
    summary: string;
  }>(`You are NEXORA, an AI career skill-gap analyzer.

Target role: ${input.targetRole}

Resume:
${input.resumeText || "Not provided"}

GitHub analysis:
${JSON.stringify(input.githubData || {}, null, 2)}

LinkedIn URL:
${input.linkedinUrl || "Not provided"}

Infer only skills reasonably supported by the evidence. Give each skill a 0-100 score and concise evidence.
Return:
{
  "skills": [{"name":"string","score":0,"evidence":"string"}],
  "summary":"string"
}`);
}

export async function generateRoadmap(input: {
  targetRole: string;
  gaps: Array<{ skill: string; currentScore: number; requiredScore: number; priority: number }>;
}) {
  return generateJSON<{
    title: string;
    summary: string;
    skills: Array<{
      skill: string;
      targetLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
      priority: number;
      courseUrl: string;
      projectIdea: string;
    }>;
    projects: Array<{
      title: string;
      description: string;
      difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
    }>;
  }>(`Create a practical adaptive learning roadmap for a student targeting "${input.targetRole}".

Skill gaps:
${JSON.stringify(input.gaps, null, 2)}

For every skill, provide a real, stable learning-resource URL when possible (official docs, freeCodeCamp, MDN, Coursera, edX, Google, Microsoft Learn, AWS, etc.). Never invent a URL if uncertain; use an official documentation/home page instead.
Projects must be concrete and portfolio-ready.
Return the requested JSON shape.`);
}

export async function generateAssessment(skill: string, level: string) {
  return generateJSON<{
    title: string;
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      answer: number;
      explanation: string;
    }>;
  }>(`Create a 5-question multiple-choice assessment for "${skill}" at ${level} level.
Questions should test practical understanding, not trivia.
Return exactly 5 questions with 4 options each. The "answer" field is the zero-based correct option index.`);
}
