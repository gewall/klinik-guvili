import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      // Parsing data dari request body
     
      const id = (await params).id;
      const data = await request.json();
    console.log(data);
    
    // Validasi data (opsional, disarankan menggunakan library seperti zod)
    if (!data) {
      return new Response(
        JSON.stringify({ msg: "Invalid data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

      const transaksi = await prisma.obat.update({
        where:{
            id:id
        },data: {
            nama: data.nama,
            satuan: data.satuan,
            kuantiti: data.kuantiti
        }
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
        data: transaksi
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );

    }catch(error:any){
        console.log("error",error.massage);
        // Mengembalikan respons error
        return new Response(
          JSON.stringify({ msg: "Internal server error", error: error.message }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}