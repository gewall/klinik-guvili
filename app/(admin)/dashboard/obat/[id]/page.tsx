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
import { obatSchema } from "../_lib/shceme";
import { useParams } from "next/navigation";

const EditObat = () => {
  const id = useParams().id;
  const [data, setData] = useState<z.infer<typeof obatSchema>>();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof obatSchema>>({
    resolver: zodResolver(obatSchema),
    defaultValues: {
      id: data?.id,
      idtransaksi: data?.idtransaksi,
      kuantiti: data?.kuantiti,
      nama: data?.nama,
      satuan: data?.satuan,
    },
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/obat/${id}`);
      const result = await response.json();

      setData(result.data);
      form.reset({
        id: result.data?.id,
        idtransaksi: result.data?.idtransaksi,
        kuantiti: result.data?.kuantiti,
        nama: result.data?.nama,
        satuan: result.data?.satuan,
      });
    };

    getData();
  }, []);

  async function onSubmit(values: z.infer<typeof obatSchema>) {
    setIsLoading(true);
    console.log(values);

    try {
      // Kirim data transaksi ke API
      const response = await fetch(`/api/obat/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to create obat: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result) {
        throw new Error(`Failed to add obat: ${result.statusText}`);
      }
      toast({
        variant: "default",
        title: "Sukses",
        description: "Sukses menambah data obat",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error menambah data obat",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SectionLayout title="Edit Obat">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.error(e))}
          className="space-y-8 "
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name={`nama`}
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
              name={"kuantiti"}
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
              name={`satuan`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
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
          </div>

          <Button variant={"default"} type="submit">
            {isLoading && <Loader2 className="animate-spin" />}Simpan
          </Button>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default EditObat;
