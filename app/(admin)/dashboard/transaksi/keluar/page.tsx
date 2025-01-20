"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "../..//_components/SectionLayout";
import { DataTable } from "../../_components/DataTable";
import { columns } from "./_lib/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import Link from "next/link";
import { iTransaksi } from "./_lib/transaksikeluar.type";

const Masuk = () => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/transaksi/keluar");
      const result = await response.json();

      setData(result.data);
    };

    getData();
  }, []);

  console.log(data, "data");

  return (
    <SectionLayout title="Transaksi Keluar ">
      <div className="flex mb-4">
        <Button className="bg-sky-300 hover:bg-sky-400" asChild>
          <Link href={"/dashboard/transaksi/keluar/tambah"}>
            <Plus /> Tambah
          </Link>
        </Button>

        {/* <AddProject /> */}
      </div>

      <DataTable columns={columns} data={data} filterCol="namapasien" />
    </SectionLayout>
  );
};

export default Masuk;
