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

import { Fragment, useEffect, useState } from "react";
import { Loader2, MinusCircle, Plus, PlusCircle } from "lucide-react";

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

import { Label } from "@/components/ui/label";
import { multiScheme } from "../../_lib/scheme";
import SectionLayout from "@/app/(admin)/dashboard/_components/SectionLayout";
import { useParams } from "next/navigation";

const EditKeluar = () => {
  const id = useParams().id;
  const [data, setData] = useState();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [pasienInput, setPasienInput] = useState<string>("");
  const [dataPasien, setDataPasien] = useState<[]>([]);
  const [obatInput, setObatInput] = useState<string>("");
  const [dataObat, setDataObat] = useState<[]>([]);
  const [pasien, setPasien] = useState<string>("");
  const form = useForm<z.infer<typeof multiScheme>>({
    resolver: zodResolver(multiScheme),
    defaultValues: {
      iduser: session?.user?.id ?? "",
      tanggaltransaksi: "",
      idpasien: "",
      obat: [
        { id: "", idtransaksi: "", kuantiti: 0, nama: "", satuan: "Ampul" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "obat",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/transaksi/keluar/${id}`);
      const result = await response.json();
      const obatResponse = await fetch(`/api/obat/keluar/${id}`);
      const obatResult = await obatResponse.json();

      setData(result.data);
      form.reset({
        iduser: result.data.iduser,
        idpasien: result.data.idpasien,
        tanggaltransaksi: new Date(result.data.tanggaltransaksi)
          .toISOString()
          .slice(0, 16),
        obat: obatResult.data,
      });
    };

    getData();
  }, []);

  const onCariPasien = async () => {
    try {
      const resp = await fetch(`/api/pasien/cari?query=${pasienInput}`);
      const result = await resp.json();

      setDataPasien(result?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onCariObat = async () => {
    try {
      const resp = await fetch(`/api/obat/cari?query=${obatInput}`);
      const result = await resp.json();

      setDataObat(result?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function onSubmit(values: z.infer<typeof multiScheme>) {
    setIsLoading(true);

    try {
      // Persiapkan data transaksi
      const transaksiData = {
        iduser: session?.user?.id as string,
        tanggaltransaksi: values.tanggaltransaksi,
        idpasien: pasien,
      };
      console.log("Transaksi Data:", transaksiData);

      // Kirim data transaksi ke API
      const response = await fetch("/api/transaksi/keluar/tambah", {
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
        id: obat.id,
        nama: obat.nama,
        satuan: obat.satuan,
        kuantiti: obat.kuantiti,
        idtransaksi,
        status: "KELUAR",
      }));
      console.log("Prepared Obat Data:", obatData);

      // Kirim data obat ke API
      const responseObat = await fetch("/api/obat/keluar/tambah", {
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
  console.log(dataPasien);

  return (
    <SectionLayout title="Edit Transaksi Keluar">
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
            <FormField
              control={form.control}
              name="idpasien"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id Pasien</FormLabel>
                  <FormControl>
                    <Input placeholder={pasien} {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Typograph variant="Sub-Header">Cari Pasien</Typograph>
          <div className="flex flex-col  ">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Cari pasien"
                onChange={(e) => setPasienInput(e.target.value)}
              />
              <Button variant={"ghost"} type="button" onClick={onCariPasien}>
                Cari
              </Button>
            </div>
            <div className="flex gap-4 my-4 flex-col">
              {dataPasien.length > 0 ? (
                dataPasien.map((_: any, i) => (
                  <div className="flex" key={i}>
                    <Typograph variant="Text" className="w-full">
                      {_.nama}
                    </Typograph>
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => setPasien(_.id)}
                    >
                      <PlusCircle />
                      Pilih
                    </Button>
                  </div>
                ))
              ) : (
                <Typograph variant="Text">
                  Data pasien tidak ditemukan.
                </Typograph>
              )}
            </div>
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
          <Typograph variant="Sub-Header">Cari Obat</Typograph>
          <div className="flex flex-col  ">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Cari obat"
                onChange={(e) => setObatInput(e.target.value)}
              />
              <Button variant={"ghost"} type="button" onClick={onCariObat}>
                Cari
              </Button>
            </div>
            <div className="flex gap-4 my-4 flex-col">
              {dataObat.length > 0 ? (
                dataObat.map((_: any, i) => (
                  <div className="flex" key={i}>
                    <Typograph variant="Text" className="w-full">
                      {_.nama}
                    </Typograph>
                    <Button
                      variant={"ghost"}
                      type="button"
                      onClick={() =>
                        append({
                          id: _.id,
                          idtransaksi: "",
                          kuantiti: 0,
                          nama: _.nama,
                          satuan: _.satuan,
                        })
                      }
                    >
                      <PlusCircle />
                      Tambah
                    </Button>
                    {/* <Button
                      type="button"
                      size={"sm"}
                      onClick={() => setPasien(_.id)}
                    >
                      Pilih
                    </Button> */}
                  </div>
                ))
              ) : (
                <Typograph variant="Text">Data Obat tidak ditemukan.</Typograph>
              )}
            </div>
          </div>

          <Button variant={"default"} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}Simpan
          </Button>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default EditKeluar;
