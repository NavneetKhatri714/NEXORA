import { Response } from "express";
import fs from "fs/promises";
import { prisma } from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";
import { analyzeCandidate } from "../services/aiService";
import { extractResumeText } from "../services/resumeService";
import { analyzeGithub } from "../services/githubService";
import { targetRoleSchema, githubSchema, linkedinSchema } from "../utils/validators";
import { scoreToLevel } from "../utils/skillLevel";

export async function setTargetRole(req: AuthRequest, res: Response) {
  const { targetRole } = targetRoleSchema.parse(req.body);
  const user = await prisma.user.update({ where: { id: req.userId! }, data: { targetRole } });
  res.json({ targetRole: user.targetRole });
}

export async function uploadResume(req: AuthRequest, res: Response) {
  if (!req.file) return res.status(400).json({ message: "Resume PDF is required" });

  const text = await extractResumeText(req.file.path);
  const profile = await prisma.profile.upsert({
    where: { userId: req.userId! },
    update: { resumeText: text, resumeFile: req.file.filename, source: "RESUME" },
    create: { userId: req.userId!, resumeText: text, resumeFile: req.file.filename, source: "RESUME" }
  });

  res.json({ message: "Resume uploaded and extracted", profileId: profile.id, textLength: text.length });
}

export async function setGithub(req: AuthRequest, res: Response) {
  const { githubUsername } = githubSchema.parse(req.body);
  const data = await analyzeGithub(githubUsername);
  await prisma.profile.upsert({
    where: { userId: req.userId! },
    update: { githubUsername, source: "GITHUB", extractedData: data as any },
    create: { userId: req.userId!, githubUsername, source: "GITHUB", extractedData: data as any }
  });
  res.json(data);
}

export async function setLinkedin(req: AuthRequest, res: Response) {
  const { linkedinUrl } = linkedinSchema.parse(req.body);
  await prisma.profile.upsert({
    where: { userId: req.userId! },
    update: { linkedinUrl, source: "LINKEDIN" },
    create: { userId: req.userId!, linkedinUrl, source: "LINKEDIN" }
  });
  res.json({ linkedinUrl });
}

export async function analyzeProfile(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId! },
    include: { profile: true }
  });
  if (!user?.targetRole) return res.status(400).json({ message: "Set target role first" });
  if (!user.profile) return res.status(400).json({ message: "Upload resume, connect GitHub, or add LinkedIn first" });

  const result = await analyzeCandidate({
    targetRole: user.targetRole,
    resumeText: user.profile.resumeText || undefined,
    githubData: user.profile.extractedData || undefined,
    linkedinUrl: user.profile.linkedinUrl || undefined
  });

  for (const item of result.skills) {
    const skill = await prisma.skill.upsert({
      where: { name: item.name },
      update: {},
      create: { name: item.name }
    });
    await prisma.userSkill.upsert({
      where: { userId_skillId: { userId: user.id, skillId: skill.id } },
      update: { score: item.score, level: scoreToLevel(item.score), source: user.profile.source || "MANUAL", evidence: item.evidence },
      create: { userId: user.id, skillId: skill.id, score: item.score, level: scoreToLevel(item.score), source: user.profile.source || "MANUAL", evidence: item.evidence }
    });
  }

  res.json(result);
}

export async function getProfile(req: AuthRequest, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId! },
    include: {
      profile: true,
      skills: { include: { skill: true } }
    }
  });
  res.json(user);
}
