"use client";

import { z } from "zod";

export const pasienScheme = z.object({
    nama: z.string(),
    umur: z.coerce.number().int(),
    tanggallahir: z.string(),
    alamat: z.string(),
});