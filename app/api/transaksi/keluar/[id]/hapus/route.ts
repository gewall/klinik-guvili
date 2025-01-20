import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Ambil ID dari parameter
    const { id } = await params;

    // Validasi data
    if (!id) {
      return new Response(
        JSON.stringify({ msg: "Invalid data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Cari semua obat terkait transaksi
    const obatList = await prisma.obatKeluar.findMany({
      where: {
        idtransaksi: id,
      },
    });

    if (!obatList || obatList.length === 0) {
      return new Response(
        JSON.stringify({ msg: "No related records found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Perbarui kuantiti obat dan hapus dari obatKeluar secara paralel
    await Promise.all(
      obatList.map(async (item:any) => {
        const obat = await prisma.obat.findFirst({
          where: {
            id: item.idobat,
          },
        });

        if (obat) {
          await prisma.obat.update({
            where: {
              id: item.idobat,
            },
            data: {
              kuantiti: obat.kuantiti + item.kuantiti,
            },
          });
        }

        await prisma.obatKeluar.delete({
          where: {
            id: item.id,
          },
        });
      })
    );

    // Hapus transaksi
    const transaksi = await prisma.transaksiKeluar.delete({
      where: {
        id,
      },
    });

    if (!transaksi) {
      return new Response(
        JSON.stringify({ msg: "Error deleting transaction" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Respons sukses
    return new Response(
      JSON.stringify({ msg: "Success" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error.message);

    // Mengembalikan respons error
    return new Response(
      JSON.stringify({ msg: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
