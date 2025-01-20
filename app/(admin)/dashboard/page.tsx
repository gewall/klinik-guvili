"use client";
import React, { useEffect, useState } from "react";
import SectionLayout from "./_components/SectionLayout";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Typograph from "@/components/ui/typograph";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#fde047",
  },
  mobile: {
    label: "Mobile",
    color: "#991b1b",
  },
} satisfies ChartConfig;
const Dashboard = () => {
  const [stokObat, setStokObat] = useState<[]>([]);
  const [topObat, setTopObat] = useState<[]>([]);
  const [date, setDate] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  useEffect(() => {
    const getStockObat = async () => {
      const obat = await fetch(`/api/obat`);
      const obatRes = await obat.json();
      const _obat = obatRes.data
        ?.sort((a: any, b: any) => a.kuantiti - b.kuantiti)
        .map((_: any) => ({
          nama: _.nama,
          kuantiti: _.kuantiti,
        }));

      setStokObat(_obat);
    };

    const getTopObat = async () => {
      const obat = await fetch(`/api/obat/keluar`);
      const obatRes = await obat.json();
      const _obat = obatRes.count
        ?.sort((a: any, b: any) => a._sum.kuantiti + b._sum.kuantiti)
        .map((_: any) => ({
          nama: _.nama,
          kuantiti: _._sum.kuantiti,
        }));

      console.log(obatRes.count);

      setTopObat(_obat);
    };

    getStockObat();
    getTopObat();
  }, []);
  // console.log(session, "ss");

  console.log(topObat, "stok");

  // if (!session) return <div>Not authenticated</div>;
  return (
    <SectionLayout title="Dashboard">
      <div className="my-4 flex gap-4">
        <form className="flex gap-4">
          <div className="">
            <Label>Dari</Label>
            <Input
              type="date"
              id="start"
              name="start"
              placeholder="pilih tanggal awal"
              onChange={(e) =>
                setDate((_) => ({
                  ..._,
                  start: e.target.value as string,
                }))
              }
            />
          </div>
          <div className="">
            <Label>Ke</Label>
            <Input
              type="date"
              id="end"
              name="end"
              placeholder="pilih tanggal akhir"
              onChange={(e) =>
                setDate((_) => ({
                  ..._,
                  end: e.target.value as string,
                }))
              }
            />
          </div>
        </form>
        <Button asChild variant={"outline"} className="self-end">
          <Link
            href={`/print?start=${date.start}&&end=${date.end}`}
            target="_blank"
          >
            Print
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col border-slate-100 border-2 p-4 rounded-lg gap-4">
          <Typograph variant="Sub-Header">
            <span className="border-l-4 border-red-400 mr-4" />
            Obat dengan stok minimum
          </Typograph>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={stokObat.slice(0, 5)}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="nama"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="kuantiti" fill="#dc2626" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col border-slate-100 border-2 p-4 rounded-lg gap-4">
          <Typograph variant="Sub-Header">
            <span className="border-l-4 border-cyan-400 mr-4 " />
            Obat paling diminati
          </Typograph>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={topObat.slice(0, 5)}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="nama"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="kuantiti" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Dashboard;
