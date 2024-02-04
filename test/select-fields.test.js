import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can create and select fields", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "usamah",
        name: "usamah",
        email: "usamah@gmail.com",
        phone: "080011003300"
      },
      select: {
        id: true,
        email: true
      }
    });

    expect(customer.id).toBe("usamah");
    expect(customer.email).toBe("usamah@gmail.com");
    expect(customer.name).toBeUndefined();
    expect(customer.phone).toBeUndefined();

    console.table(customer);
  });

  it("should select fields", async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        email: true
      }
    });

    for (const customer of customers) {
      expect(customer.id).toBeDefined();
      expect(customer.email).toBeDefined();
      expect(customer.name).toBeUndefined();
      expect(customer.phone).toBeUndefined();    
    }
    
    console.table(customers);
    console.info(customers.length);
  });
})