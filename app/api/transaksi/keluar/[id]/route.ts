import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Parsing data dari request body
   
    const id = (await params).id;

    console.log(id,"id");
    
    
    // Validasi data (opsional, disarankan menggunakan library seperti zod)
    if (!id) {
      return new Response(
        JSON.stringify({ msg: "Invalid data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Membuat transaksi menggunakan Prisma
    const transaksi = await prisma.transaksiKeluar.findFirst({
        where:{
            id
        }
      });

      
          if (!transaksi) {
            return new Response(
              JSON.stringify({ msg: "Error selecting transaction" }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

    const pasien = await prisma.pasien.findFirst({
      where: {
       id: transaksi.idpasien 
      }
    })

    if (!pasien) {
      return new Response(
        JSON.stringify({ msg: "Error selecting transaction" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Berhasil membuat transaksi
    return new Response(
      JSON.stringify({
        msg: "Success",
       data:{...transaksi, namapasien: pasien.nama}
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error:any) {
    console.log("error",error.massage);
    
    // Mengembalikan respons error
    return new Response(
      JSON.stringify({ msg: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
