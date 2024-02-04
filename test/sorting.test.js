import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can do sorting", async () => {    
    const customers = await prismaClient.customer.findMany({
      skip: 0,
      take: 6,
      orderBy: [
        {
          // pertama saya mau sorting berdasarkan name
          name: "asc"
        },
        {
          // kalau namenya ternyata sama
          // maka kita urutkan berdasarkan email
          email: "desc"
        }
      ]
    });
    console.table(customers);
  })
})