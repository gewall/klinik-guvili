"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "../_components/SectionLayout";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_lib/columns";
import { iObat } from "./_lib/obat.type";
type Props = {};
const data: iObat[] = [
  {
    id: "1",
    nama: "Paracetamol",
    satuan: "Tablet",
    kuantiti: 100,
  },
  {
    id: "2",
    nama: "Amoxicillin",
    satuan: "Kapsul",
    kuantiti: 50,
  },
  {
    id: "3",
    nama: "Ibuprofen",
    satuan: "Tablet",
    kuantiti: 75,
  },
  {
    id: "4",
    nama: "Vitamin C",
    satuan: "Tablet",
    kuantiti: 200,
  },
  {
    id: "5",
    nama: "Salbutamol",
    satuan: "Sirup",
    kuantiti: 30,
  },
];

const Obat = (props: Props) => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/obat");
      const result = await response.json();

      setData(result.data);
    };

    getData();
  }, []);
  return (
    <SectionLayout title="Obat">
      <DataTable columns={columns} data={data} filterCol="nama" />
    </SectionLayout>
  );
};

export default Obat;
