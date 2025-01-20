import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parsing data dari request body
    const data = await request.json();
    console.log(data);
    
    // Validasi data (opsional, disarankan menggunakan library seperti zod)
    if (!data) {
      return new Response(
        JSON.stringify({ msg: "Invalid data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cek =  await prisma.transaksiKeluar.findFirst({
      where: {
        idpasien: data.idpasien
      }
    });

    console.log(cek);
    
    // Membuat transaksi menggunakan Prisma
    if(!cek){
      const transaksi = await prisma.transaksiKeluar.create({
        data: {iduser: data.iduser, tanggaltransaksi: new Date(data.tanggaltransaksi),idpasien: data.idpasien},
      });
  
      if (!transaksi) {
        return new Response(
          JSON.stringify({ msg: "Error creating transaction" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Berhasil membuat transaksi
      return new Response(
        JSON.stringify({
          msg: "Success",
          data: { idtransaksi: transaksi.id },
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    const update = await prisma.transaksiKeluar.update({
      where:{
        id:cek.id
      },
      data: {tanggaltransaksi: new Date(data.tanggaltransaksi)},
    });

    if(!update) {
      return new Response(
        JSON.stringify({ msg: "Error updating transaction" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        msg: "Success",
        data: { idtransaksi: cek.id },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error:any) {
    console.log("error:",error.message);
    
    // Mengembalikan respons error
    return new Response(
      JSON.stringify({ msg: "Internal server error 2", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
