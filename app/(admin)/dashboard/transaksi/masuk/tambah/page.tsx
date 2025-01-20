"use client";

import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SectionLayout from "../../../_components/SectionLayout";

import { Fragment, useState } from "react";
import { Loader2, MinusCircle, Plus, PlusCircle } from "lucide-react";
import { multiObatScheme, transakiMasukSchema } from "../_lib/Scheme";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typograph from "@/components/ui/typograph";
import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const TambahMasuk = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof multiObatScheme>>({
    resolver: zodResolver(multiObatScheme),
    defaultValues: {
      iduser: session?.user?.id ?? "",
      tanggaltransaksi: "",
      obat: [
        { id: "", idtransaksi: "", kuantiti: 0, nama: "", satuan: "Ampul" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "obat",
  });

  async function onSubmit(values: z.infer<typeof multiObatScheme>) {
    setIsLoading(true);

    try {
      // Persiapkan data transaksi
      const transaksiData = {
        iduser: session?.user?.id as string,
        tanggaltransaksi: values.tanggaltransaksi,
      };
      console.log("Transaksi Data:", transaksiData);

      // Kirim data transaksi ke API
      const response = await fetch("/api/transaksi/masuk/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaksiData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create transaction: ${response.statusText}`);
      }

      const result = await response.json();
      const idtransaksi = result.data?.idtransaksi;

      if (!idtransaksi) {
        throw new Error("Transaction ID is undefined.");
      }

      // Persiapkan data obat
      const obatData = values.obat.map((obat: any) => ({
        nama: obat.nama,
        satuan: obat.satuan,
        kuantiti: obat.kuantiti,
        idtransaksi,
        status: "MASUK",
      }));
      console.log("Prepared Obat Data:", obatData);

      // Kirim data obat ke API
      const responseObat = await fetch("/api/obat/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obatData),
      });

      if (!responseObat.ok) {
        throw new Error(`Failed to add obat: ${responseObat.statusText}`);
      }

      const obatResult = await responseObat.json();
      console.log("Obat Response:", obatResult);
      toast({
        variant: "default",
        title: "Sukses",
        description: "Sukses menambah data transaksi masuk dan obat",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error menambah data transaksi masuk dan obat",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SectionLayout title="Tambah Transaksi Masuk">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 "
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="iduser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={session?.user?.id}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggaltransaksi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Transaksi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Isi tanggal transaksi"
                      {...field}
                      type="datetime-local"
                    />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Typograph variant="Sub-Header">Tambah Obat</Typograph>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {fields.map((_, i) => (
              <Fragment key={i}>
                <FormField
                  control={form.control}
                  name={`obat.${i}.nama`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Isi nama obat" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`obat.${i}.kuantiti`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kuantiti</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Isi kuantitas obat"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                      This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`obat.${i}.satuan`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Satuan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih satuan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tablet">Tablet</SelectItem>
                          <SelectItem value="Ampul">Ampul</SelectItem>
                          <SelectItem value="Botol">Botol</SelectItem>
                          <SelectItem value="Fles">Fles</SelectItem>
                          <SelectItem value="Pcs">Pcs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="self-end">
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Button
                      variant={"destructive"}
                      type="button"
                      onClick={() => remove(i)}
                    >
                      <MinusCircle />
                    </Button>
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              </Fragment>
            ))}
          </div>
          <div className="Flex">
            <Button
              variant={"ghost"}
              type="button"
              onClick={() =>
                append({
                  id: "",
                  idtransaksi: "",
                  kuantiti: 0,
                  nama: "",
                  satuan: "Ampul",
                })
              }
            >
              <PlusCircle />
              Tambah
            </Button>
          </div>
          <Button variant={"default"} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}Simpan
          </Button>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default TambahMasuk;
