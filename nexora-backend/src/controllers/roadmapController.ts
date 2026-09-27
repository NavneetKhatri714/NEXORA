import { Response } from "express";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";
import { createPersonalizedRoadmap } from "../services/roadmapService";
import { calculateSkillGaps } from "../services/skillGapService";

export async function gaps(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user?.targetRole) return res.status(400).json({ message: "Set target role first" });
  res.json(await calculateSkillGaps(req.userId!, user.targetRole));
}

export async function generate(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user?.targetRole) return res.status(400).json({ message: "Set target role first" });
  res.status(201).json(await createPersonalizedRoadmap(req.userId!, user.targetRole));
}

export async function list(req: AuthRequest, res: Response) {
  res.json(await prisma.roadmap.findMany({
    where: { userId: req.userId! },
    include: { skills: { include: { skill: true } }, projects: true },
    orderBy: { createdAt: "desc" }
  }));
}

export async function getOne(req: AuthRequest, res: Response) {
  const roadmap = await prisma.roadmap.findFirst({
    where: { id: req.params.id, userId: req.userId! },
    include: { skills: { include: { skill: true } }, projects: true, role: true }
  });
  if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
  res.json(roadmap);
}
