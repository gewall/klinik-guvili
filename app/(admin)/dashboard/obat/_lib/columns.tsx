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
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { iObat } from "./obat.type";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<iObat>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "satuan",
    header: "Satuan",
  },
  {
    accessorKey: "kuantiti",
    header: "Kuantiti",
  },

  {
    id: "actions",
    enableHiding: false,
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
            <DropdownMenuItem
              onClick={async () => {
                await fetch(`/api/obat/${data.id}/hapus`, {
                  method: "DELETE",
                });
                toast({
                  variant: "default",
                  title: "Sukses",
                  description:
                    "Sukses menghapus data obat, refresh untuk memperbarui",
                });
              }}
              className="text-red-600"
            >
              Hapus
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/obat/${data.id}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
