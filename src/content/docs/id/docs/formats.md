---
title: Format berkas
description: DXF ASTM D6673 dan AAMA-292, ASTM RUL, HPGL/2, PDF, CSV, workbook Excel, serta berkas asli style, marker, dan cut plan.
---

Rajutara bertukar pola lewat standar terbuka dan menyimpan pekerjaannya sendiri dalam zip dan JSON biasa. Rajutara tidak pernah membaca atau menulis format berkas Optitex.

| Format | Arah | Dipakai untuk |
|---|---|---|
| DXF ASTM D6673 dan AAMA-292 | Impor dan ekspor | Pola dan graded nest |
| ASTM RUL | Impor dan ekspor | Aturan grade di samping DXF graded nest |
| HPGL/2 | Ekspor | Berkas plotter dan berkas potong marker |
| PDF | Ekspor | Ubin A4, satu lembar A0, atau satu halaman A4; marker dan laporan |
| CSV | Impor dan ekspor | Masuk: jumlah order, gulungan kain, dan daftar cacat marker; keluar: laporan Cut Plan |
| Workbook Excel (`.xlsx`) | Ekspor | Report to Excel di PDS dan Marker |
| `.rjx`, `.rjm`, `.rjc` | Buka dan simpan | Style, Marker, dan Cut Plan: zip dan JSON, format 2 |

Ekstensi lama `.optx`, `.optm`, dan `.optc` juga bisa dibuka. [Galeri](/rajutara-documentation/id/gallery/) menyediakan contoh kaos dalam sebagian besar format di atas.

## Berkas asli

Style, marker, dan cut plan masing-masing adalah satu arsip zip dengan dua entri: `manifest.json`, yang menyebut format dan versinya, dan `document.json`, yang memuat isinya. Satuan panjang adalah milimeter. Marker menyematkan style yang dipakainya, jadi marker terbuka tanpa berkas style. Masukan yang sama dan pengaturan yang sama menghasilkan berkas yang identik byte demi byte. Berkas yang ditulis oleh versi format yang lebih baru ditolak, tidak pernah dipotong. Penyimpanan bersifat atomik dan menyimpan berkas sebelumnya sebagai `.bak`. [Headless dan skrip](../headless/) menunjukkan cara membacanya dengan beberapa baris Python.

Formatnya masih versi 2 di 1.5.0. Rilis yang lebih baru menambahkan kunci opsional; berkas tanpa kunci itu dimuat seperti sebelumnya, dan saat disimpan tidak mendapat kunci baru:

| Kunci | Sejak | Isinya |
|---|---|---|
| `thickness_mm` pada setiap ukuran | 1.4.0 | Ketebalan garis ukuran itu di Graded Nest. |
| `clusters`, `cut_order` di `.rjm` | 1.5.0 | Cluster dan Fuse Block, serta Cutting Order: urutan, verteks awal, dan arah per potongan. |
| `bump_lines`, `cut_lines`, `flaws`, `texts` di `.rjm` | 1.5.0 | Bump line dan cut line beserta pengaturannya, cacat, dan teks marker. |
| `name` pada verteks `.rjx` | 1.5.0 | Point Name. |
| `equal_segments`, `fabric` pada Style `.rjx` | 1.5.0 | Equal Segments Group dan Fabric Pattern. |
| `placement`, `spread`, `zones`, `from_zone`, `color` pada potongan | 1.5.0 | Fixed Placement, Spread Pieces, zona map piece dan zona asal sebuah potongan, serta warna milik potongan. |
| `stripe_group`, `stripe_point` di aturan potong sebuah potongan | 1.5.0 | Stripe Group dan titik belang. |
| `one_line`, `separator` di label potongan | 1.5.0 | Tata letak label satu baris. |

Buka berkas yang memakai kunci ini dengan 1.5.0 atau yang lebih baru. Build 1.4.0 membukanya tetapi membuang isi itu, jadi menyimpan di sana menghilangkannya, dan menolak Style yang Graded Nest-nya memakai Stack Along Line.

## DXF ASTM D6673 dan AAMA-292

Rajutara membaca dan menulis DXF ASTM D6673-10, AutoCAD R13, dengan satu blok per potongan dan satu style per berkas. Layer-nya bernomor, tidak bernama.

| Layer | Isi | Layer | Isi |
|---|---|---|---|
| 1 | Batas potongan, dan teks sistem untuk style serta tiap potongan | 9, 10 | Garis acuan belang dan kotak-kotak |
| 2 | Turn point | 11 | Lubang dalam |
| 3 | Curve point | 13 | Lubang bor, dengan diameter |
| 4 | Penandaan V dan celah (I) | 14 | Garis jahit |
| 5 | Garis acuan grade | 15 | Teks anotasi |
| 6 | Garis cermin | 80 sampai 83 | Penandaan T, castle (Box), check (L), dan U |
| 7 | Garis serat | 84 sampai 87 | Kurva validasi kualitas untuk layer 1, 8, 11, dan 14 |
| 8 | Garis dalam, tidak dipotong | | |

Spesifikasi AAMA-292 tidak dibuka untuk umum, jadi Rajutara membaca dan menulisnya dengan aturan yang sama dengan ASTM. Setiap impor mencantumkan apa yang tidak bisa dipertahankan: tidak ada yang dibuang diam-diam. Saat ekspor, bentuk notch yang tidak punya layer di AAMA ditulis sebagai V atau I dengan peringatan.

DXF membawa ukuran sampel dan titik grade. Aturan grade masuk ke berkas RUL, atau seluruh style yang sudah di-grade keluar sebagai graded nest dengan satu blok per ukuran. Kedua pilihan ada di dialog ekspor.

## ASTM RUL

Tabel aturan grade adalah berkas teks ASCII. Setiap aturan adalah satu baris pasangan `x,y`, satu pasangan per ukuran sesuai urutan daftar ukuran, dengan ukuran sampel di `0.00,0.00`.

```text
ASTM/D13 PROPOSAL 1 VERSION: D6673-10
AUTHOR: Rajutara
PRODUCT: Rajutara
VERSION: 1.0.0
CREATION DATE: 01-11-2026
CREATION TIME: 04:56
UNITS: METRIC
GRADE RULE TABLE: kaos-lengan-pendek
NUMBER OF SIZES: 4
SIZE LIST: S M L XL
SAMPLE SIZE: M
RULE: DELTA 1
-10.00,15.00 0.00,0.00 10.00,-15.00 20.00,-30.00
RULE: DELTA 2
10.00,15.00 0.00,0.00 -10.00,-15.00 -20.00,-30.00
END
```

Pembacaan longgar soal pemisah dan akhir baris, tetapi ketat soal angka: aturan dengan jumlah pasangan yang salah dilaporkan dan dilewati, sedangkan sisa berkas tetap dimuat.

## HPGL/2

Satu unit plotter adalah 0,025 mm, jadi ada 40 unit per milimeter. Marker diplot dengan X sepanjang panjangnya dan Y melintang lebarnya. Berkas potong memakai pena sebagai alat: 1 untuk label dan garis gambar, 2 untuk pisau, 3 untuk bor. Nomor pena bisa diubah di pengaturan plotter. Pisau berjalan searah jarum jam mengelilingi setiap potongan, dari verteks kiri bawahnya, kecuali Cutting Order marker menetapkan titik awal atau arah lain; potongan dipotong menurut urutan itu. Fuse Block dipotong sebagai batasnya saja.

## PDF

Potongan dan marker diplot sebagai PDF vektor. Lembarnya A0, atau ubin A4 untuk printer meja, dan plot yang lebih panjang daripada satu lembar dibagi menjadi ubin sepanjang panjangnya. Halaman pertama plot berubin adalah peta ubin. Teks memakai Helvetica standar PDF, jadi berkas tetap kecil, dan teks Indonesia berupa Latin biasa sehingga muat.

## CSV

Laporan dan daftar berupa UTF-8, dengan `.` sebagai tanda desimal dan `,` di antara kolom. Jumlah order diimpor dari CSV dengan baris judul, warna di kolom pertama dan satu kolom per nama ukuran. Daftar cacat marker punya satu baris `x_from,y_from,x_to,y_to` per cacat, dalam milimeter. Laporan Cut Plan menulis satu berkas per bagian.

## Workbook Excel

Report to Excel menulis workbook `.xlsx`. Laporan PDS punya satu lembar kerja dengan potongan, kode, ukuran, jumlah, material, luas, serta keliling potong dan jahit. Laporan Marker punya satu lembar kerja per bagian, General, Order, Pieces, dan Notches, dengan angka sebagai sel angka. Rajutara menulis workbook itu sendiri, tanpa pustaka tambahan.
