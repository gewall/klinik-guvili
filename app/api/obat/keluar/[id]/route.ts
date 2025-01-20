import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      // Parsing data dari request body
     
      const id = (await params).id;
    // Membuat transaksi menggunakan Prisma
    const response = await prisma.obatKeluar.findMany({where:{status:"KELUAR",idtransaksi:id}});

    if (!response) {
      return new Response(
        JSON.stringify({ msg: "Error creating transaction" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Berhasil membuat transaksi
    return new Response(
      JSON.stringify({
        msg: "Success",
        data: response,
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
