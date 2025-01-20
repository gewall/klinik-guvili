"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "../..//_components/SectionLayout";
import { DataTable } from "../../_components/DataTable";
import { columns } from "./_lib/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Link from "next/link";
import { iTransaksi } from "./_lib/transaksi.type";

const Masuk = () => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/transaksi/masuk");
      const result = await response.json();

      const _data = result.data.map((item: any) => {
        return {
          ...item,
          namaobat: item.obat?.map((_: any) => _.nama).join(","),
          satuan: item.obat?.map((_: any) => _.satuan).join(","),
          kuantiti: item.obat?.map((_: any) => _.kuantiti).join(","),
        };
      });
      console.log(_data);

      setData(_data);
    };

    getData();
  }, []);

  return (
    <SectionLayout title="Transaksi Masuk ">
      <div className="flex mb-4">
        <Button className="bg-sky-300 hover:bg-sky-400" asChild>
          <Link href={"/dashboard/transaksi/masuk/tambah"}>
            <Plus /> Tambah
          </Link>
        </Button>

        {/* <AddProject /> */}
      </div>

      <DataTable columns={columns} data={data} filterCol="iduser" />
    </SectionLayout>
  );
};

export default Masuk;
