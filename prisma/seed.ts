import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "@node-rs/argon2";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const users = [
  {
    username: "admin",
    email: "admin@example.com",
  },
  {
    username: "user",
    email: "user@example.com",
  },
];
const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("geheimnis");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
