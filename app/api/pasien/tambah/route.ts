import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
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
    const flatId = randomUUID();

    
    const id = await bcrypt.hash(flatId,8)
    const fixid = id.replace(/\//g, "-")

    // Membuat transaksi menggunakan Prisma
    const pasien = await prisma.pasien.create({
      data:{...data, tanggallahir: new Date(data.tanggallahir),id:fixid}
    });


    if (!pasien) {
      return new Response(
        JSON.stringify({ msg: "Error creating pasien" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Berhasil membuat transaksi
    return new Response(
      JSON.stringify({
        msg: "Success",
        data: { id: pasien.id },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error:any) {
   console.error("Error",error);
   
    // Mengembalikan respons error
    return new Response(
      JSON.stringify({ msg: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
