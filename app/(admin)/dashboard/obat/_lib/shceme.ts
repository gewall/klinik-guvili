 "use client";

import { z } from "zod";

export const obatSchema = z.object({
    id:z.string(),
    idtransaksi:z.string(),
    nama:z.string(),
    satuan:z.enum(["Tablet", "Ampul", "Botol", "Fles","Pcs"]),
    kuantiti:z.coerce.number(),
});