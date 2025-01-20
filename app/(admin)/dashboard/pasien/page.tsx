"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "../_components/SectionLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "../_components/DataTable";
import { iPasien } from "./_lib/pasien.type";
import { columns } from "./_lib/columns";
type Props = {};
const data: any = [];

const Pasien = (props: Props) => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/pasien");
      const result = await response.json();

      setData(result.data);
    };

    getData();
  }, []);

  return (
    <SectionLayout title="Pasien">
      <div className="flex mb-4">
        <Button className="bg-sky-300 hover:bg-sky-400" asChild>
          <Link href={"/dashboard/pasien/tambah"}>
            <Plus /> Tambah
          </Link>
        </Button>

        {/* <AddProject /> */}
      </div>

      <DataTable columns={columns} data={data} filterCol="nama" />
    </SectionLayout>
  );
};

export default Pasien;
