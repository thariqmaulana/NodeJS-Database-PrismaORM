import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can insert on many to many relation", async () => {
    const like = await prismaClient.like.create({
      data: {
        customer_id: "thariq",
        product_id: "P0001"
      },
      include: {
        customer: true,
        product: true
      }
    });
    console.info(like);
    expect(like.customer.email).toBe("thariq@gmail.com");
  });

  it("should can find unique on many to many relation", async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "thariq"
      },
      include: {
        likes: {
          include: {
            product: true
          }
        }
      }
    });
    console.info(customer);
    console.info(JSON.stringify(customer));
  });

  it("should can find many on many to many relation", async () => {
    const customer = await prismaClient.customer.findMany({
      where: {
        likes: {
          some: {
            product: {
              name: "A"
            }
          }
        }
      },
      include: {
        likes: {
          include: {
            product: true
          }
        }
      }
    });
    console.info(customer);
    console.info(JSON.stringify(customer));
    expect(customer.length).toBe(1);
  });

  
  it("should can create implicit relation", async () => {
    const customer = await prismaClient.customer.update({
      where: {
        id: "thariq"
      },
      data: {
        loves: {
          connect: [
            {
              id: "P0001"
            },
            {
              id: "P0002"
            }
          ]
        }
      },
      include: {
        loves: true
      }
    });
    console.info(customer);
    console.info(JSON.stringify(customer));
  });

  it("should can findMany implicit relation", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        loves: {
          some: {
            id: "P0001"
          }
        }
      },
      include: {
        loves: true
        // include semua data loves
      }
    });
    //mendapatkan semua customers yang me love P0001
    console.info(customers);
    console.info(JSON.stringify(customers));
    expect(customers[0].email).toBe("thariq@gmail.com");
  });
});