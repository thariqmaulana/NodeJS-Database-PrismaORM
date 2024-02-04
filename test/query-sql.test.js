import { prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  it("should be able to query sql", async () => {
    const id = "1";
    
    const samples = await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id};`;

    console.info(samples);
    for (const sample of samples) {
      console.info(`Result sample id : ${sample.id} - name : ${sample.name}`);
    }
  })
})