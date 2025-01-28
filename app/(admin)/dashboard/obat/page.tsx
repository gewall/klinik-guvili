"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "../_components/SectionLayout";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_lib/columns";
import { iObat } from "./_lib/obat.type";
type Props = {};

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
