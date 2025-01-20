-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Des 2024 pada 13.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `obat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) DEFAULT NULL,
  `scope` varchar(191) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` varchar(191) DEFAULT NULL,
  `refresh_token_expires_in` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `authenticator`
--

CREATE TABLE `authenticator` (
  `credentialID` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `credentialPublicKey` varchar(191) NOT NULL,
  `counter` int(11) NOT NULL,
  `credentialDeviceType` varchar(191) NOT NULL,
  `credentialBackedUp` tinyint(1) NOT NULL,
  `transports` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat`
--

CREATE TABLE `obat` (
  `id` varchar(191) NOT NULL,
  `idtransaksi` varchar(191) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `satuan` varchar(191) NOT NULL,
  `kuantiti` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `obat`
--

INSERT INTO `obat` (`id`, `idtransaksi`, `nama`, `satuan`, `kuantiti`, `createdAt`, `updatedAt`, `status`) VALUES
('cm559a2v4000cu7783ljavz3k', 'cm559a2se000bu77816jdb37n', 'Paracetamol', 'Tablet', 20, '2024-12-26 11:43:59.488', '2024-12-26 11:44:31.169', 'MASUK'),
('cm559a2v4000du778s60nhluh', 'cm559a2se000bu77816jdb37n', 'Komik', 'Botol', 25, '2024-12-26 11:43:59.488', '2024-12-26 11:43:59.488', 'MASUK');

-- --------------------------------------------------------

--
-- Struktur dari tabel `obatkeluar`
--

CREATE TABLE `obatkeluar` (
  `id` varchar(191) NOT NULL,
  `idtransaksi` varchar(191) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `satuan` varchar(191) NOT NULL,
  `kuantiti` int(11) NOT NULL,
  `status` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `obatkeluar`
--

INSERT INTO `obatkeluar` (`id`, `idtransaksi`, `nama`, `satuan`, `kuantiti`, `status`, `createdAt`, `updatedAt`) VALUES
('cm559arav000gu778zu9h5g3d', 'cm559ar5p000fu778nguao31w', 'Paracetamol', 'Tablet', 5, 'KELUAR', '2024-12-26 11:44:31.159', '2024-12-26 11:44:31.159');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pasien`
--

CREATE TABLE `pasien` (
  `id` varchar(191) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `umur` int(11) NOT NULL,
  `tanggallahir` datetime(3) NOT NULL,
  `alamat` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pasien`
--

INSERT INTO `pasien` (`id`, `nama`, `umur`, `tanggallahir`, `alamat`, `createdAt`, `updatedAt`) VALUES
('cm5599epp0009u778syt05fvj', 'Ujang', 25, '2024-12-26 11:43:00.000', 'irak', '2024-12-26 11:43:28.188', '2024-12-26 11:43:28.188');

-- --------------------------------------------------------

--
-- Struktur dari tabel `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksikeluar`
--

CREATE TABLE `transaksikeluar` (
  `id` varchar(191) NOT NULL,
  `iduser` varchar(191) NOT NULL,
  `idpasien` varchar(191) NOT NULL,
  `tanggaltransaksi` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaksikeluar`
--

INSERT INTO `transaksikeluar` (`id`, `iduser`, `idpasien`, `tanggaltransaksi`, `createdAt`, `updatedAt`) VALUES
('cm559ar5p000fu778nguao31w', 'UESR01', 'cm5599epp0009u778syt05fvj', '2024-12-26 11:44:00.000', '2024-12-26 11:44:30.973', '2024-12-26 11:44:30.973');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksimasuk`
--

CREATE TABLE `transaksimasuk` (
  `id` varchar(191) NOT NULL,
  `iduser` varchar(191) NOT NULL,
  `tanggaltransaksi` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaksimasuk`
--

INSERT INTO `transaksimasuk` (`id`, `iduser`, `tanggaltransaksi`, `createdAt`, `updatedAt`) VALUES
('cm559a2se000bu77816jdb37n', 'UESR01', '2024-12-26 11:43:00.000', '2024-12-26 11:43:59.390', '2024-12-26 11:43:59.390');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `password` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `email`, `emailVerified`, `image`, `createdAt`, `updatedAt`, `password`) VALUES
('UESR01', 'user', 'user', 'user@gmail.com', '2024-12-04 16:51:44.000', NULL, '2024-12-25 16:51:44.000', '2024-12-25 08:38:05.000', '$2a$12$npA4d/CmCt1T40iJUUX6O.mtmzzE.DwJd6YshL.HcZaxTZ9ODC5.G');

-- --------------------------------------------------------

--
-- Struktur dari tabel `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('01691adb-773d-44c4-87f3-1c7c93e208e6', 'a5a4349a79ba47b3233a20b8863e5ff417f083cc5d3a8379eaff75779188584e', '2024-12-25 17:28:39.779', '20241225172839_status', NULL, NULL, '2024-12-25 17:28:39.763', 1),
('02b9321e-5c0f-483f-830e-011755b8d1f8', 'fecf4524cd4542d57b6b2bd1a849609f911b164b20d368d0beae447aea1e326a', '2024-12-25 15:08:48.022', '20241225150847_obat', NULL, NULL, '2024-12-25 15:08:47.924', 1),
('57546b24-0f86-4d3f-8d73-efab9d6bbcef', '87b662b7ad69dc93ed5d9ab105672a91eadbc8287629d8d065f0012ef7cf91df', '2024-12-26 04:51:53.473', '20241226045153_pasien', NULL, NULL, '2024-12-26 04:51:53.315', 1),
('88930f38-a615-456c-a23c-56e2496df0b2', '203d9e1a0284a057445fd9efe2211b429e6848edd8a027531d661060d4502c20', '2024-12-26 10:20:14.777', '20241226102014_pw', NULL, NULL, '2024-12-26 10:20:14.762', 1),
('8b03c048-6fc7-441a-9f6d-968e19ad7025', '70fd98220651ff342f5c377f096e935a790fc76eaeac5fe6296c21216f8708a0', '2024-12-26 05:28:14.659', '20241226052814_umur', NULL, NULL, '2024-12-26 05:28:14.632', 1),
('be0dbb29-b3a6-4595-b934-fbf8f37d0e3a', '8ca881f546094fe70016d23251578dc5fb0a7e8890137a8bed6f601bae6cda27', '2024-12-26 05:02:48.680', '20241226050248_keluar', NULL, NULL, '2024-12-26 05:02:48.622', 1),
('d351e02c-16e4-4666-ac02-bc5143d591c4', '37c8702aaee3cb964ab3e55da1b4a8564980b5ee1069b0c741a91b535008694a', '2024-12-25 09:07:42.734', '20241225090742_init', NULL, NULL, '2024-12-25 09:07:42.490', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_userId_key` (`userId`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_idx` (`userId`);

--
-- Indeks untuk tabel `authenticator`
--
ALTER TABLE `authenticator`
  ADD PRIMARY KEY (`userId`,`credentialID`),
  ADD UNIQUE KEY `Authenticator_credentialID_key` (`credentialID`);

--
-- Indeks untuk tabel `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Obat_idtransaksi_fkey` (`idtransaksi`);

--
-- Indeks untuk tabel `obatkeluar`
--
ALTER TABLE `obatkeluar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ObatKeluar_idtransaksi_fkey` (`idtransaksi`);

--
-- Indeks untuk tabel `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_idx` (`userId`);

--
-- Indeks untuk tabel `transaksikeluar`
--
ALTER TABLE `transaksikeluar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TransaksiKeluar_iduser_fkey` (`iduser`),
  ADD KEY `TransaksiKeluar_idpasien_fkey` (`idpasien`);

--
-- Indeks untuk tabel `transaksimasuk`
--
ALTER TABLE `transaksimasuk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TransaksiMasuk_iduser_fkey` (`iduser`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indeks untuk tabel `verificationtoken`
--
ALTER TABLE `verificationtoken`
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `authenticator`
--
ALTER TABLE `authenticator`
  ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `obat`
--
ALTER TABLE `obat`
  ADD CONSTRAINT `Obat_idtransaksi_fkey` FOREIGN KEY (`idtransaksi`) REFERENCES `transaksimasuk` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `obatkeluar`
--
ALTER TABLE `obatkeluar`
  ADD CONSTRAINT `ObatKeluar_idtransaksi_fkey` FOREIGN KEY (`idtransaksi`) REFERENCES `transaksikeluar` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksikeluar`
--
ALTER TABLE `transaksikeluar`
  ADD CONSTRAINT `TransaksiKeluar_idpasien_fkey` FOREIGN KEY (`idpasien`) REFERENCES `pasien` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `TransaksiKeluar_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksimasuk`
--
ALTER TABLE `transaksimasuk`
  ADD CONSTRAINT `TransaksiMasuk_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
