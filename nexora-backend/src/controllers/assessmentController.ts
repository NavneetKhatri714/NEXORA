import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { prisma } from "../config/database";
import { createAssessment, submitAssessment } from "../services/assessmentService";

export async function create(req: AuthRequest, res: Response) {
  const { skill, level = "INTERMEDIATE" } = req.body;
  if (!skill) return res.status(400).json({ message: "Skill is required" });
  res.status(201).json(await createAssessment(req.userId!, skill, level));
}

export async function list(req: AuthRequest, res: Response) {
  res.json(await prisma.assessment.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" }
  }));
}

export async function submit(req: AuthRequest, res: Response) {
  const answers = req.body.answers;
  if (!Array.isArray(answers)) return res.status(400).json({ message: "answers must be an array" });
  res.json(await submitAssessment(req.userId!, req.params.id, answers));
}
