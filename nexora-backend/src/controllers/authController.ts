import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { env } from "../config/env";
import { loginSchema, registerSchema } from "../utils/validators";

function token(userId: string) {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
}

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, passwordHash }
  });

  res.status(201).json({
    token: token(user.id),
    user: { id: user.id, name: user.name, email: user.email }
  });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: token(user.id),
    user: { id: user.id, name: user.name, email: user.email, targetRole: user.targetRole }
  });
}

export async function me(req: any, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, targetRole: true, profile: true }
  });
  res.json(user);
}
