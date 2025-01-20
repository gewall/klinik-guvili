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

    // Membuat pasien menggunakan Prisma

    const pasien = await prisma.obat.delete({
        where:{
            id
        }
    });

    if (!pasien) {
      return new Response(
        JSON.stringify({ msg: "Error deleting pasien" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Berhasil membuat pasien
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
