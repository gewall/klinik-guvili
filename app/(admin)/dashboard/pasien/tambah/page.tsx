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
import SectionLayout from "../../_components/SectionLayout";
// import { AddProjectAPI } from "@/lib/api/projects";
import { Fragment, useState } from "react";
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
import { pasienScheme } from "../_lib/scheme";

const TambahPasien = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof pasienScheme>>({
    resolver: zodResolver(pasienScheme),
    defaultValues: {
      alamat: "",
      nama: "",
      tanggallahir: "",
      umur: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof pasienScheme>) {
    setIsLoading(true);
    console.log(values);

    try {
      // Kirim data transaksi ke API
      const response = await fetch("/api/pasien/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to create pasien: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result) {
        throw new Error(`Failed to add obat: ${result.statusText}`);
      }
      toast({
        variant: "default",
        title: "Sukses",
        description: "Sukses menambah data pasien",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error menambah data pasient",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SectionLayout title="Tambah Pasien">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.error(e))}
          className="space-y-8 "
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder={"Isi nama pasien"} {...field} />
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
              name="umur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umur</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Isi umur pasien"}
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
              name="tanggallahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Isi tanggal lahir pasien"
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
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder={"Isi alamat pasien"} {...field} />
                  </FormControl>
                  {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button variant={"default"} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}Simpan
          </Button>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default TambahPasien;
