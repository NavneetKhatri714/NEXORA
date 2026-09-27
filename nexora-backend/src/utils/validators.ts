import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const targetRoleSchema = z.object({
  targetRole: z.string().min(2)
});

export const githubSchema = z.object({
  githubUsername: z.string().min(1)
});

export const linkedinSchema = z.object({
  linkedinUrl: z.string().url()
});
