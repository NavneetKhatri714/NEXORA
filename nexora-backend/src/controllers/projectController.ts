import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { prisma } from "../config/database";

export async function list(req: AuthRequest, res: Response) {
  res.json(await prisma.project.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" }
  }));
}

export async function update(req: AuthRequest, res: Response) {
  const { status, githubUrl } = req.body;
  const existing = await prisma.project.findFirst({ where: { id: req.params.id, userId: req.userId! } });
  if (!existing) return res.status(404).json({ message: "Project not found" });

  res.json(await prisma.project.update({
    where: { id: existing.id },
    data: {
      ...(status ? { status } : {}),
      ...(githubUrl !== undefined ? { githubUrl } : {})
    }
  }));
}
