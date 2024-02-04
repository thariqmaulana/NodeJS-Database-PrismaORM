import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should be able to create customer", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "thariq",
        name: "Thariq Maulana",
        email: "thariq@gmail.com",
        phone: "083456780012"
      }
    });
    console.info(customer);
    expect(customer.id).toBe("thariq");
    expect(customer.name).toBe("Thariq Maulana");
    expect(customer.email).toBe("thariq@gmail.com");
    expect(customer.phone).toBe("083456780012");
  })

  it("should be able to update customer", async () => {
    const customer = await prismaClient.customer.update({
      data: {
        email: "thariqm@gmail.com"
      },
      where: {
        id: "thariq"
      }
    });
    console.info(customer);
    expect(customer.id).toBe("thariq");
    expect(customer.name).toBe("Thariq Maulana");
    expect(customer.email).toBe("thariqm@gmail.com");
    expect(customer.phone).toBe("083456780012");
  })

  it("should be able to read customer", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "thariq"
      }
    });
    console.info(customer);
    expect(customer.id).toBe("thariq");
    expect(customer.name).toBe("Thariq Maulana");
    expect(customer.email).toBe("thariqm@gmail.com");
    expect(customer.phone).toBe("083456780012");
  })

  it("should be able to delete customer", async () => {
    const customer = await prismaClient.customer.delete({
      where: {
        id: "thariq"
      }
    });
    console.info(customer);
    expect(customer.id).toBe("thariq");
    expect(customer.name).toBe("Thariq Maulana");
    expect(customer.email).toBe("thariqm@gmail.com");
    expect(customer.phone).toBe("083456780012");
  })
})

