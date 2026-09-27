import { PrismaClient, SkillLevel } from "@prisma/client";
const prisma = new PrismaClient();

const skills = [
  ["JavaScript", "Programming"],
  ["TypeScript", "Programming"],
  ["React", "Frontend"],
  ["Node.js", "Backend"],
  ["Express.js", "Backend"],
  ["PostgreSQL", "Database"],
  ["SQL", "Database"],
  ["Git", "Tools"],
  ["GitHub", "Tools"],
  ["REST APIs", "Backend"],
  ["Data Structures & Algorithms", "Computer Science"],
  ["System Design", "Architecture"],
  ["Docker", "DevOps"],
  ["Testing", "Engineering"]
];

async function main() {
  for (const [name, category] of skills) {
    await prisma.skill.upsert({
      where: { name },
      update: { category },
      create: { name, category }
    });
  }

  const roleDefinitions: Record<string, Array<[string, SkillLevel, number]>> = {
    "Full Stack Developer": [
      ["JavaScript", "ADVANCED", 1.0],
      ["TypeScript", "INTERMEDIATE", 0.8],
      ["React", "ADVANCED", 1.0],
      ["Node.js", "ADVANCED", 1.0],
      ["Express.js", "INTERMEDIATE", 0.8],
      ["PostgreSQL", "INTERMEDIATE", 0.8],
      ["SQL", "INTERMEDIATE", 0.7],
      ["Git", "INTERMEDIATE", 0.5],
      ["REST APIs", "ADVANCED", 0.9],
      ["Testing", "INTERMEDIATE", 0.5],
      ["Docker", "INTERMEDIATE", 0.4]
    ],
    "Backend Developer": [
      ["JavaScript", "ADVANCED", 0.8],
      ["TypeScript", "INTERMEDIATE", 0.8],
      ["Node.js", "ADVANCED", 1.0],
      ["Express.js", "ADVANCED", 1.0],
      ["PostgreSQL", "ADVANCED", 1.0],
      ["SQL", "ADVANCED", 1.0],
      ["REST APIs", "ADVANCED", 1.0],
      ["Git", "INTERMEDIATE", 0.5],
      ["Docker", "INTERMEDIATE", 0.6],
      ["Testing", "INTERMEDIATE", 0.6]
    ],
    "Frontend Developer": [
      ["JavaScript", "ADVANCED", 1.0],
      ["TypeScript", "INTERMEDIATE", 0.7],
      ["React", "ADVANCED", 1.0],
      ["Git", "INTERMEDIATE", 0.5],
      ["Testing", "INTERMEDIATE", 0.6],
      ["REST APIs", "INTERMEDIATE", 0.5]
    ]
  };

  for (const [roleName, required] of Object.entries(roleDefinitions)) {
    const role = await prisma.careerRole.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, description: `Skills profile for ${roleName}` }
    });

    for (const [skillName, level, weight] of required) {
      const skill = await prisma.skill.findUniqueOrThrow({ where: { name: skillName } });
      await prisma.requiredSkill.upsert({
        where: { roleId_skillId: { roleId: role.id, skillId: skill.id } },
        update: { level, weight },
        create: { roleId: role.id, skillId: skill.id, level, weight }
      });
    }
  }

  console.log("NEXORA seed complete");
}

main().finally(() => prisma.$disconnect());
