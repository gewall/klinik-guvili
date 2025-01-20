import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Parsing data dari request body
   
    const id = (await params).id;
    
    // Validasi data (opsional, disarankan menggunakan library seperti zod)
    if (!id) {
      return new Response(
        JSON.stringify({ msg: "Invalid data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Membuat transaksi menggunakan Prisma
    const obat = await prisma.obat.deleteMany({
      where:{
        idtransaksi: id
      }
    });
    const transaksi = await prisma.transaksiMasuk.delete({
        where:{
            id
        }
    });

    if (!transaksi) {
      return new Response(
        JSON.stringify({ msg: "Error deleting transaction" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Berhasil membuat transaksi
    return new Response(
      JSON.stringify({
        msg: "Success",
       
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
