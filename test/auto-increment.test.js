import { prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  it("should auto increment id", async () => {
    const category = await prismaClient.categories.create({
      data: {
        name: "Makanan"
      }
    });
    console.info(category);
    console.table(category);
    expect(category).toHaveProperty("id");
  });
});