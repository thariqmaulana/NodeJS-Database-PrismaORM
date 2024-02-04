import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should be create many records", async () => {
    const {count} = await prismaClient.customer.createMany({
      data: [
        {
           id: "said",
           name: "said",
           email: "said@gmail.com",
           phone: "080066008800"
        },
        {
          id: "rijal",
          name: "rijal",
          email: "rijal@gmail.com",
          phone: "08008800009900"
       }
      ]
    })
    expect(count).toBe(2);
  })

  it("should be update many records", async () => {
    const {count} = await prismaClient.customer.updateMany({
      data: {
        email: "rijalsaja@gmail.com"
      },
      where: {
        name: "rijal"
      }
    })
    expect(count).toBe(1);
  })

  it("should be delete many records", async () => {
    const {count} = await prismaClient.customer.deleteMany({
      where: {
        name: "tidak ada"
      }
    })
    expect(count).toBe(0);
    console.info(count);
  })

  it("should be read many records", async () => {
    const customers = await prismaClient.customer.findMany({})
    expect(customers.length).toBe(6);
    console.info(customers);
  })
})