import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can create one to one relation", async () => {
    const wallet = await prismaClient.wallet.create({
      data: {
        id: "thariq",
        balance: 1000000,
        customer_id: "thariq"
      },
      include: {
        customer: true
      }
    });
    console.info(wallet);
    console.table(wallet);
  });

  it("should can create one to one with relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "fatih",
        name: "fatih",
        email: "fatih@gmail.com",
        phone: "081144002200",
        wallet: {
          create: {
            id: "fatih",
            balance: 500000
          }
        }
      },
      include: {
        wallet: true
      }
    });
    console.info(customer);
  });

  it("should can find one to one with relation", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "thariq"
      },
      include: {
        wallet: true
      }
    });
    console.info(customer);
    expect(customer.wallet.balance).toBe(1000000);
  });

  it("should can find one to one with relation filter", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null
        }
      },
      include: {
        wallet: true
      }
    });
    // kita dapet 2 customer yang punya wallet yaitu thariq dan fatih 
    console.info(customers);
  });
});