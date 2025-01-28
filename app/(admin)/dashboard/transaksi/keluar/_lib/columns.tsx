"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { iTransaksi } from "./transaksikeluar.type";
import Link from "next/link";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<iTransaksi>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "iduser",
    header: "User",
  },
  {
    accessorKey: "namapasien",
    header: "Pasien",
  },
  {
    accessorKey: "alamatpasien",
    header: "Alamat Pasien",
  },

  {
    accessorKey: "tanggaltransaksi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Transaksi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (d) => {
      return moment(d.row.original.tanggaltransaksi)
        .local()
        .format("DD-MM-YYYY");
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      const { toast } = useToast();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>

            {/* <DropdownMenuItem>Ubah</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={async () => {
                await fetch(`/api/transaksi/keluar/${data.id}/hapus`, {
                  method: "DELETE",
                });
                toast({
                  variant: "default",
                  title: "Sukses",
                  description:
                    "Sukses menghapus data transaksi, refresh untuk memperbarui",
                });
              }}
              className="text-red-600"
            >
              Hapus
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/transaksi/keluar/${data.id}`}>Lihat</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem asChild>
              <Link href={`/dashboard/transaksi/keluar/${data.id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
