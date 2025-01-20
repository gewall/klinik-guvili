"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/logo.jpg";

type Props = {};

const Print = (props: Props) => {
  const [stokObat, setStokObat] = useState<any[]>();
  const pathName = useSearchParams();

  useEffect(() => {
    const getStockObat = async () => {
      const obat = await fetch("/api/obat/super");
      const obatRes = await obat.json();
      const _obat = obatRes.data?.sort((a: any, b: any) => a.nama - b.nama);
      console.log(_obat, "obat");

      const filteredData = _obat.filter((item: any) => {
        const itemDate = new Date(item.createdAt);
        return (
          itemDate >= new Date(pathName.get("start") as string) &&
          itemDate <= new Date(pathName.get("end") as string)
        );
      });
      const gorup = Object.values(
        filteredData.reduce((acc: any, item: any) => {
          // Jika nama sudah ada di accumulator, tambahkan kuantitasnya
          if (acc[item.nama]) {
            acc[item.nama].kuantiti += item.kuantiti;
          } else {
            // Jika belum ada, tambahkan item ke accumulator
            acc[item.nama] = { ...item };
          }
          return acc;
        }, {})
      );

      console.log(gorup);

      setStokObat(gorup);
    };

    getStockObat();
  }, []);

  useEffect(() => {
    if (stokObat && stokObat?.length > 0) {
      window.print();
    }
  }, [stokObat]);

  console.log(stokObat);

  return (
    <div className="w-full py-8 px-8 relative h-screen overflow-hidden">
      <div className="absolute w-full -z-10 flex justify-center items-center h-full">
        <Image
          src={Logo}
          alt="logo"
          width={500}
          height={500}
          className="grayscale"
        />
      </div>
      <div className="flex flex-col items-center">
        <h4>LAPORAN AKHIR/STOK OPNAME OBAT KLINIK GUVILI</h4>
        <h5>
          {new Date().toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h5>
      </div>
      <div className=" w-full">
        <p>Data Stok Obat</p>

        <table className="border-collapse border  border-slate-500 table-auto w-full">
          <thead
            className="bg-orange-300"
            style={{ backgroundColor: "rgb(253 186 116 1)" }}
          >
            <tr>
              <th className="border border-slate-600 " rowSpan={2}>
                No
              </th>
              <th className="border border-slate-600 " rowSpan={2}>
                Nama Obat
              </th>
              <th className="border border-slate-600 " rowSpan={2}>
                Satuan Obat
              </th>
              <th className="border border-slate-600 " rowSpan={2}>
                Stok Awal
              </th>

              <th className="border border-slate-600 " colSpan={2}>
                Transaksi
              </th>
              <th className="border border-slate-600 " rowSpan={2}>
                Stok Akhir
              </th>
              <th className="border border-slate-600 " rowSpan={2}>
                Status Stok
              </th>
            </tr>
            <tr>
              <th className="border border-slate-600 ">Stok Masuk</th>
              <th className="border border-slate-600 ">Stok Keluar</th>
            </tr>
          </thead>
          <tbody>
            {stokObat?.map((_, i) => (
              <tr key={i}>
                <td className="border border-slate-600 text-center">{i + 1}</td>
                <td className="border border-slate-600 text-center">
                  {_.nama}
                </td>
                <td className="border border-slate-600 text-center">
                  {_.satuan}
                </td>
                <td className="border border-slate-600 text-center">
                  {parseInt(
                    _.kuantiti +
                      _.obatKeluar?.reduce((a: any, b: any) => {
                        return a + b.kuantiti;
                      }, 0)
                  )}
                </td>
                <td className="border border-slate-600 text-center">
                  {parseInt(
                    _.kuantiti +
                      _.obatKeluar?.reduce((a: any, b: any) => {
                        return a + b.kuantiti;
                      }, 0)
                  )}
                </td>
                <td className="border border-slate-600 text-center">
                  {_.obatKeluar?.reduce((a: any, b: any) => {
                    return a + b.kuantiti;
                  }, 0)}
                </td>
                <td className="border border-slate-600 text-center">
                  {_.kuantiti}
                </td>
                <td className="border border-slate-600 text-center">
                  {_.kuantiti >=
                  parseInt(
                    _.kuantiti +
                      _.obatKeluar?.reduce((a: any, b: any) => {
                        return a + b.kuantiti;
                      }, 0)
                  ) *
                    0.75
                    ? "Stok aman"
                    : _.kuantiti <
                        parseInt(
                          _.kuantiti +
                            _.obatKeluar?.reduce((a: any, b: any) => {
                              return a + b.kuantiti;
                            }, 0)
                        ) *
                          0.25 && _.kuantiti !== 0
                    ? "Stok kritikal"
                    : parseInt(_.kuantiti) === 0
                    ? "Stok habis"
                    : "Stok kritikal"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <h4>Keterangan Status Stok</h4>
        <ul className="list-disc ml-8">
          <li>
            Stok aman: Jumlah stok akhir bulan lebih dari sama dengan 75% dari
            stok awal
          </li>
          <li>Stok kritikal: Jumlah stok akhir kurang dari 25% stok awal.</li>
          <li>Stok habis: Jumlah stok 0..</li>
        </ul>
      </div>
    </div>
  );
};

export default Print;