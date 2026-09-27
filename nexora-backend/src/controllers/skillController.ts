import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";
import { scoreToLevel } from "../utils/skillLevel";

export async function listSkills(_req: AuthRequest, res: Response) {
  res.json(await prisma.skill.findMany({ orderBy: { name: "asc" } }));
}

export async function mySkills(req: AuthRequest, res: Response) {
  res.json(await prisma.userSkill.findMany({
    where: { userId: req.userId! },
    include: { skill: true },
    orderBy: { score: "desc" }
  }));
}

export async function upsertSkill(req: AuthRequest, res: Response) {
  const { name, score = 0, evidence } = req.body;
  if (!name) return res.status(400).json({ message: "Skill name is required" });

  const numericScore = Math.max(0, Math.min(100, Number(score)));
  const skill = await prisma.skill.upsert({
    where: { name },
    update: {},
    create: { name }
  });

  const record = await prisma.userSkill.upsert({
    where: { userId_skillId: { userId: req.userId!, skillId: skill.id } },
    update: { score: numericScore, level: scoreToLevel(numericScore), source: "MANUAL", evidence },
    create: { userId: req.userId!, skillId: skill.id, score: numericScore, level: scoreToLevel(numericScore), source: "MANUAL", evidence }
  });

  res.json(record);
}
