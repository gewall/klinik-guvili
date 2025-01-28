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
  expired: z.string(),
  jenis:z.enum(["Obat bebas", "Obat bebas terbatas", "Obat keras", "Obat psikotropika", "Obat golongan narkotika"]),
  kuantiti:z.coerce.number(),
})

export const multiScheme = z.object({
  iduser:z.string(),
  tanggaltransaksi:z.string(),
  idpasien: z.string(),
  obat: z.array(obatScheme)
}) 
