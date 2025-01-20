import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parsing data dari request body
    const data = await request.json();
    if (!Array.isArray(data) || data.length === 0) {
      return new Response(
        JSON.stringify({ msg: "Invalid or empty data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const _data = data.map((_: any) => ({
      idtransaksi: _.idtransaksi,
      kuantiti: _.kuantiti,
      nama: _.nama,
      satuan: _.satuan,
      status: _.status,
      idobat: _.id,
    }));

    // Proses transaksi
    for (const item of _data) {
      const obat = await prisma.obat.findFirst({ where: { id: item.idobat } });

      if (!obat) {
        return new Response(
          JSON.stringify({ msg: `Obat with id ${item.idobat} not found` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (obat.kuantiti < item.kuantiti) {
        return new Response(
          JSON.stringify({ msg: `Insufficient stock for obat id ${item.idobat}` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      await prisma.obat.update({
        where: { id: obat.id },
        data: { kuantiti: obat.kuantiti - item.kuantiti },
      });
    }

    // Menyimpan transaksi ke database
    const transaksi = await prisma.obatKeluar.createMany({ data: _data });

    if (!transaksi) {
      return new Response(
        JSON.stringify({ msg: "Error creating transactions" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ msg: "Success" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ msg: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
