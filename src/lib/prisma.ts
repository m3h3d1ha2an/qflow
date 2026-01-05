import { PrismaClient } from "@db/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/env";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const createPrismaClient = () => new PrismaClient({ adapter, log: ["error", "warn"], errorFormat: "pretty" });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
