import { prismaClient } from "../src/prisma-client"

describe("prisma client", () => {
  it("should can create one to many relation", async () => {
    const comment = await prismaClient.comment.create({
      data: {
        customer_id: "rijal",
        title: "Insert komentar rijal",
        description: "Description komentar rijal"
      },
      include: {
        customer: true
      }
    });
    console.info(comment);
    expect(comment.customer.email).toBe("rijalsaja@gmail.com");//akses berdasarkan model
    // daatanya tersimpan di model customer 
  });

  it("should can create one to many relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "asad",
        name: "asad",
        email: "asad@gmail.com",
        phone: "080033005500",
        comments: {
          createMany: {
            data: [
              {
                // tidak perlu menambahkan customer id karena sudah relasi
                title: "Comment 1",
                description: "Desc 1"
              },
              {
                title: "Comment 2",
                description: "Desc 2"
              }
            ]
          }
        }
      },
      include: {
        comments: true
      }
    });
    console.info(customer);
    console.table(customer);
    expect(customer.comments[0].title).toBe("Comment 1");
  });

  it("should can find many with filter relation", async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        comments: {
          some: {
            title: {
              // berarti rijal tidak dapat
              contains: "Comment"
            }
          }
        }
      },
      include: {
        comments: true
      }
    });
    console.info(customers);
    console.info(JSON.stringify(customers));
  });
});