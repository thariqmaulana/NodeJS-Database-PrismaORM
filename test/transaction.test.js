import { prismaClient } from "../src/prisma-client";

describe("prisma client", () => {
  it("should execute sequential transaction", async () => {

    // const array = await prismaClient.$transaction([atau kita destructuring saja langsung
    const [thariq, ahmad] = await prismaClient.$transaction([
      prismaClient.customer.create({
        data: {
          id: "thariq",
          name: "Thariq Maulana",
          email: "thariq@gmail.com",
          phone: "080044007700"
        }
      }),
      prismaClient.customer.create({
        data: {
          id: "ahmad",
          name: "Ahmad",
          email: "ahmad@gmail.com",
          phone: "080022006600"
        }
      })
    ], {
      // konfigurasi transaction di parameter ke - 2
      // timeout: 5 misalnya batas waktu locking 
    }
    )

    console.info(thariq);
    expect(thariq.email).toBe("thariq@gmail.com");
    console.info(ahmad);
    expect(ahmad.email).toBe("ahmad@gmail.com");
  })

  it("should execute interactive transaction", async () => {

    const [thariq, ahmad] = await prismaClient.$transaction(async (prisma) => {
      //disini ada return promise select *
      const thariq = await prisma.customer.create({
        data: {
          id: "thariq-aaa",
          name: "Thariq Maulana",
          email: "thariq-aaa@gmail.com",
          phone: "080044007700111"
        }
      })
      //disini ada return promise select *
      const ahmad = await prisma.customer.create({
        data: {
          id: "ahmad-aaa",
          name: "Ahmad",
          email: "ahmad-aaa@gmail.com",
          phone: "080022006600111"
        }
      })
      // kalau tidak return akan tetap select
      // datanya tersimpan di thariq, dan ahmad
      // tapi ya tidak di return
      return [thariq, ahmad];
    })

    console.info(thariq);
    expect(thariq.email).toBe("thariq-aaa@gmail.com");
    console.info(ahmad);
    expect(ahmad.email).toBe("ahmad-aaa@gmail.com");
  })
})