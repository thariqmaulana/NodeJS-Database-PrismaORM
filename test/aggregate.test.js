import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can do aggregate function", async () => {
    const result = await prismaClient.product.aggregate({
      // returnnya obj
      _min: {
        price: true,
        stock: true
      },
      _avg: {
        price: true,
        stock: true
      },
      _max: {
        price: true,
        stock: true
      }
    });

    expect(result._min.price).toBe(1000);
    expect(result._avg.price).toBe(3000);
    expect(result._max.price).toBe(5000);

    console.table(result);
    console.info(result);
  });

  it("should can do aggregate function with group by", async () => {
    const result = await prismaClient.product.groupBy({
      // returnnya array obj. beda category beda index
      // beda kategori, beda index
      by: ["category"],
      _min: {
        price: true,
        stock: true
      },
      _avg: {
        price: true,
        stock: true
      },
      _max: {
        price: true,
        stock: true
      },
    });

    console.info(result);
    console.table(result);
  });

  it("should can do aggregate function with group by having", async () => {
    const result = await prismaClient.product.groupBy({
      // nah dia akan 1 object muncul, yaitu obj category k2, karena objectnya avgnya > 5000, yaitu 8000 
      by: ["category"],
      _min: {
        price: true,
        stock: true
      },
      _avg: {
        price: true,
        stock: true
      },
      _max: {
        price: true,
        stock: true
      },
      having: {
        price: {
          _avg: {
            gt: 5000
          }
        }
      }
    });

    console.info(result);
    console.table(result);
  });
})