import { prisma } from "../config/database";
import { generateAssessment } from "./aiService";

export async function createAssessment(userId: string, skill: string, level: string) {
  const ai = await generateAssessment(skill, level);
  return prisma.assessment.create({
    data: {
      userId,
      title: ai.title,
      skillName: skill,
      questions: ai.questions
    }
  });
}

export async function submitAssessment(userId: string, assessmentId: string, answers: number[]) {
  const assessment = await prisma.assessment.findFirst({ where: { id: assessmentId, userId } });
  if (!assessment) throw Object.assign(new Error("Assessment not found"), { status: 404 });

  const questions = assessment.questions as any[];
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  const score = Math.round((correct / questions.length) * 100);

  const updated = await prisma.assessment.update({
    where: { id: assessmentId },
    data: { answers, score }
  });

  const skill = await prisma.skill.findUnique({ where: { name: assessment.skillName } });
  if (skill) {
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId, skillId: skill.id } },
      update: { score, level: score >= 85 ? "EXPERT" : score >= 65 ? "ADVANCED" : score >= 40 ? "INTERMEDIATE" : "BEGINNER", source: "MANUAL" },
      create: { userId, skillId: skill.id, score, level: score >= 85 ? "EXPERT" : score >= 65 ? "ADVANCED" : score >= 40 ? "INTERMEDIATE" : "BEGINNER", source: "MANUAL" }
    });
  }

  return { assessment: updated, score, correct, total: questions.length };
}
