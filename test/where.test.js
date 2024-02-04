import { prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  it("should can using OR operator", async () => {
    const products = await prismaClient.product.findMany({
      where: {
        OR: [
          {
            name: "A"
          },
          {
            name: "E"
          }
        ]
      },
      orderBy: [
        {
          name: "asc"
        }
      ]
    });

    expect(products.length).toBe(2);
    expect(products[0].name).toBe("A");
    expect(products[1].name).toBe("E");

    console.table(products);
    console.info(products);
  });
});