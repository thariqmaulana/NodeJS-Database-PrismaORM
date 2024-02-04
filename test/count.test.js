import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can count ", async () => {
    const total = await prismaClient.customer.count({
      where: {
        name: "ahmad"
      }
    });
    console.info(total);
    expect(total).toBe(2);
  });
})