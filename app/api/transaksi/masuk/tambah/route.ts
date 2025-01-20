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

    // Membuat transaksi menggunakan Prisma
    const transaksi = await prisma.transaksiMasuk.create({
      data: {iduser: data.iduser, tanggaltransaksi: new Date(data.tanggaltransaksi)},
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
  } catch (error:any) {
   
    // Mengembalikan respons error
    return new Response(
      JSON.stringify({ msg: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
