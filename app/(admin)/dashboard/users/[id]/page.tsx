"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import SectionLayout from "../../_components/SectionLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import bcrypt from "bcryptjs";

export default function TambahPengguna() {
  const ids = useParams().id;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/users/${ids}`);
      const result = await response.json();

      setName(result.data?.username);
      setEmail(result.data?.email);
      setId(result.data?.id);
      setPassword(result.data?.password);
      // setData(result.data);
      // form.reset({
      //   alamat: result.data?.alamat,
      //   nama: result.data?.nama,
      //   tanggallahir: new Date(result.data?.tanggallahir)
      //     .toISOString()
      //     .slice(0, 16),
      //   umur: result.data?.umur,
      // });
    };

    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post(`/api/users/${id}/update`, { name, email }).then((res) => {
      if (res.data.status === 200) {
        toast({
          variant: "default",
          title: "Sukses",
          description: "Sukses menambah data pengguna",
        });
        setName("");
        setEmail("");
        setId("");
        setPassword("");
      }
      setIsLoading(false);
      console.log(res.data);
    });
  };

  return (
    <SectionLayout title="Tambah Pengguna">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex flex-col">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border text-sm rounded-lg p-3"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border text-sm rounded-lg p-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label>ID</label>
            <input
              type="text"
              placeholder="Masukkan ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border text-sm rounded-lg p-3"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="text"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border text-sm rounded-lg p-3 bg-gray-200"
              readOnly
            />
          </div>
        </div>

        <Button variant={"default"} type="submit" className="mt-3">
          {isLoading && <Loader2 className="animate-spin" />}Simpan
        </Button>
      </form>
    </SectionLayout>
  );
}
