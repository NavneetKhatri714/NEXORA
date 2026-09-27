import { SkillLevel } from "@prisma/client";

export function scoreToLevel(score: number): SkillLevel {
  if (score >= 85) return "EXPERT";
  if (score >= 65) return "ADVANCED";
  if (score >= 40) return "INTERMEDIATE";
  return "BEGINNER";
}

export function levelToScore(level: SkillLevel): number {
  return { BEGINNER: 25, INTERMEDIATE: 50, ADVANCED: 75, EXPERT: 95 }[level];
}
