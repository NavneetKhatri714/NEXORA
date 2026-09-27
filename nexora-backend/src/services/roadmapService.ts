import { prisma } from "../config/database";
import { generateRoadmap } from "./aiService";

export async function createPersonalizedRoadmap(userId: string, targetRole: string) {
  const role = await prisma.careerRole.findUnique({
    where: { name: targetRole },
    include: { requiredSkills: { include: { skill: true } } }
  });
  if (!role) throw Object.assign(new Error("Career role not found. Create/seed the role first."), { status: 404 });

  const userSkills = await prisma.userSkill.findMany({
    where: { userId },
    include: { skill: true }
  });
  const scoreMap = new Map(userSkills.map(s => [s.skill.name.toLowerCase(), s.score]));

  const gaps = role.requiredSkills.map(r => {
    const requiredScore = ({ BEGINNER: 25, INTERMEDIATE: 50, ADVANCED: 75, EXPERT: 95 } as any)[r.level];
    return {
      skill: r.skill.name,
      currentScore: scoreMap.get(r.skill.name.toLowerCase()) || 0,
      requiredScore,
      priority: Math.max(0, requiredScore - (scoreMap.get(r.skill.name.toLowerCase()) || 0)) * r.weight
    };
  }).filter(g => g.priority > 0).sort((a, b) => b.priority - a.priority);

  const ai = await generateRoadmap({ targetRole, gaps });

  const roadmap = await prisma.roadmap.create({
    data: {
      userId,
      roleId: role.id,
      title: ai.title,
      summary: ai.summary,
      skills: {
        create: await Promise.all(ai.skills.map(async s => {
          const skill = await prisma.skill.upsert({
            where: { name: s.skill },
            update: {},
            create: { name: s.skill }
          });
          return {
            skillId: skill.id,
            target: s.targetLevel,
            priority: s.priority,
            courseUrl: s.courseUrl,
            projectIdea: s.projectIdea
          };
        }))
      },
      projects: {
        create: ai.projects.map(p => ({
          userId,
          title: p.title,
          description: p.description,
          difficulty: p.difficulty
        }))
      }
    },
    include: { skills: { include: { skill: true } }, projects: true }
  });

  return roadmap;
}
