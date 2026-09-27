import { prisma } from "../config/database";
import { scoreToLevel } from "../utils/skillLevel";

export async function calculateSkillGaps(userId: string, roleName: string) {
  const role = await prisma.careerRole.findUnique({
    where: { name: roleName },
    include: { requiredSkills: { include: { skill: true } } }
  });

  if (!role) throw Object.assign(new Error("Career role not found"), { status: 404 });

  const userSkills = await prisma.userSkill.findMany({
    where: { userId },
    include: { skill: true }
  });

  const byName = new Map(userSkills.map(s => [s.skill.name.toLowerCase(), s]));

  return role.requiredSkills.map(req => {
    const current = byName.get(req.skill.name.toLowerCase());
    const currentScore = current?.score ?? 0;
    const requiredScore = ({ BEGINNER: 25, INTERMEDIATE: 50, ADVANCED: 75, EXPERT: 95 } as any)[req.level];
    const gap = Math.max(0, requiredScore - currentScore);

    return {
      skill: req.skill.name,
      category: req.skill.category,
      currentScore,
      currentLevel: scoreToLevel(currentScore),
      requiredScore,
      requiredLevel: req.level,
      gap,
      priority: Math.round(gap * req.weight)
    };
  }).sort((a, b) => b.priority - a.priority);
}

export async function seedRoleIfMissing(roleName: string) {
  return prisma.careerRole.findUnique({ where: { name: roleName } });
}
