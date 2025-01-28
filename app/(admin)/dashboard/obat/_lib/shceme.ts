 "use client";

import { z } from "zod";

export const obatSchema = z.object({
    id:z.string(),
    idtransaksi:z.string(),
    nama:z.string(),
    satuan:z.enum(["Tablet", "Ampul", "Botol", "Fles","Pcs"]),
    kuantiti:z.coerce.number(),
    expired: z.string(),
    jenis:z.enum(["Obat bebas", "Obat bebas terbatas", "Obat keras", "Obat psikotropika", "Obat golongan narkotika"]),
});