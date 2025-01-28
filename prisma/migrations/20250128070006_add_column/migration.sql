-- AlterTable
ALTER TABLE "Obat" ADD COLUMN     "expired" TIMESTAMP(3),
ADD COLUMN     "jenis" TEXT;

-- AlterTable
ALTER TABLE "ObatKeluar" ADD COLUMN     "expired" TIMESTAMP(3),
ADD COLUMN     "jenis" TEXT;
