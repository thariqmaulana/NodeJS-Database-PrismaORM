import { PrismaClient } from "@prisma/client";

describe("Prisma Client", () => {
  it('should be able to connect to db', async () => {
      const prisma = new PrismaClient();//dia akan membaca url env dan schema.prisma
      await prisma.$connect();
      console.info("Connected to database");
      await prisma.$disconnect();
  })
})