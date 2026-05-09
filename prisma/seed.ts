import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({ where: { email: "demo@growthstep.ai" }, update: {}, create: { email: "demo@growthstep.ai" } });
  const project = await prisma.project.create({ data: { name: "Demo Project", websiteUrl: "https://my-growth-site.com", userId: user.id } });
  await prisma.checklistItem.createMany({ data: [
    { projectId: project.id, category: "SEO", item: "Title tags optimized", done: false },
    { projectId: project.id, category: "GEO", item: "Entity definitions added", done: false },
  ]});
}

main().finally(() => prisma.$disconnect());
