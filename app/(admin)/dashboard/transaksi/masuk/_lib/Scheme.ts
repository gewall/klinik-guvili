"use client";

import { z } from "zod";

export const transakiMasukSchema = z.object({
  
  iduser:z.string(),

  tanggaltransaksi:z.string()
});

export const obatScheme = z.object({
  id:z.string(),
  idtransaksi:z.string(),
  nama:z.string(),
  satuan:z.enum(["Tablet", "Ampul", "Botol", "Fles","Pcs"]),
  kuantiti:z.coerce.number(),
})

export const multiObatScheme = z.object({
  iduser:z.string(),
  tanggaltransaksi:z.string(),
  obat: z.array(obatScheme)
}) 
