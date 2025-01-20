import Typograph from "@/components/ui/typograph";
import SectionLayout from "../../../_components/SectionLayout";
import moment from "moment";
import { DataTable } from "../../../_components/DataTable";
import { columns } from "./_lib/columns";

const getData = async (id: string) => {
  const resp = await fetch(
    `${process.env.BASE_URL}/api/transaksi/keluar/${id}`
  );
  const result = await resp.json();

  const obatResp = await fetch(`${process.env.BASE_URL}/api/obat/keluar/${id}`);
  const obatRes = await obatResp.json();

  return { data: result.data, obat: obatRes.data };
};

// export async function generateStaticParams() {
//   const resps = await fetch("http://localhost:3000/api/transaksi/keluar").then(
//     (res) => res.json()
//   );

//   return resps.map((_: any) => ({
//     id: _.id,
//   }));
// }

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data, obat } = await getData(id);

  console.log(data, obat);

  console.log(id);

  return (
    <SectionLayout title="Transaksi Keluar ">
      <div className="grid grid-cols-2 gap-0">
        <Typograph variant="Text" className="font-semibold">
          User :
        </Typograph>
        <Typograph variant="Text" className="font-semibold">
          Pasien :
        </Typograph>
        <Typograph variant="Text">{data?.iduser}</Typograph>
        <Typograph variant="Text">{data?.namapasien}</Typograph>
        <Typograph variant="Text" className="font-semibold">
          Tanggal Transaksi
        </Typograph>
        <Typograph variant="Text"></Typograph>
        <Typograph variant="Text">
          {moment(data?.tanggaltransaksi).local().format("DD-MM-YYYY")}
        </Typograph>
      </div>
      <div className="my-4">
        <Typograph variant="Sub-Header">List Obat</Typograph>
        <DataTable data={obat} columns={columns} />
      </div>
    </SectionLayout>
  );
};

export default page;
