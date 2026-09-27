import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

export async function upsert(req: AuthRequest, res: Response) {
  const { itemType, itemId, roadmapId, status, score } = req.body;
  if (!itemType || !itemId || !status) {
    return res.status(400).json({ message: "itemType, itemId and status are required" });
  }

  const record = await prisma.progress.upsert({
    where: { userId_itemType_itemId: { userId: req.userId!, itemType, itemId } },
    update: {
      status,
      score,
      completedAt: status === "COMPLETED" ? new Date() : null,
      ...(roadmapId ? { roadmapId } : {})
    },
    create: {
      userId: req.userId!,
      itemType,
      itemId,
      roadmapId,
      status,
      score,
      completedAt: status === "COMPLETED" ? new Date() : null
    }
  });

  res.json(record);
}

export async function dashboard(req: AuthRequest, res: Response) {
  const [user, skills, progress, roadmaps, assessments, projects] = await Promise.all([
    prisma.user.findUnique({ where: { id: req.userId! }, select: { name: true, email: true, targetRole: true } }),
    prisma.userSkill.findMany({ where: { userId: req.userId! }, include: { skill: true } }),
    prisma.progress.findMany({ where: { userId: req.userId! } }),
    prisma.roadmap.findMany({
      where: { userId: req.userId! },
      include: { skills: { include: { skill: true } }, projects: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.assessment.findMany({ where: { userId: req.userId! }, orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ where: { userId: req.userId! } })
  ]);

  const completed = progress.filter(p => p.status === "COMPLETED").length;
  const total = progress.length;
  const avgSkill = skills.length ? Math.round(skills.reduce((a, s) => a + s.score, 0) / skills.length) : 0;

  res.json({
    user,
    stats: {
      skillCount: skills.length,
      averageSkillScore: avgSkill,
      progressPercent: total ? Math.round((completed / total) * 100) : 0,
      completedItems: completed,
      totalItems: total
    },
    skills,
    progress,
    roadmaps,
    assessments,
    projects
  });
}
