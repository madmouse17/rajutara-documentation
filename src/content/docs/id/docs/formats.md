---
title: Format berkas
description: DXF ASTM D6673 dan AAMA-292, ASTM RUL, HPGL/2, PDF, CSV, workbook Excel dan OpenDocument, serta berkas asli style, marker, dan rencana potong.
---

Rajutara bertukar pola lewat standar terbuka dan menyimpan pekerjaannya sendiri dalam zip dan JSON biasa. Rajutara tidak pernah membaca atau menulis format berkas Optitex.

| Format | Arah | Dipakai untuk |
|---|---|---|
| DXF ASTM D6673 dan AAMA-292 | Impor dan ekspor | Pola dan graded nest |
| DXF rilis 12 | Ekspor | Isi plot PDS dan isi plot Marker (Export to CAD/CAM Files) |
| ASTM RUL | Impor dan ekspor | Aturan grade di samping DXF graded nest |
| HPGL/2 | Ekspor | Berkas plotter dan berkas potong marker |
| PDF | Ekspor | Ubin A4, satu lembar A0, atau satu halaman A4; marker, laporan, dan Production Sheet |
| CSV | Impor dan ekspor | Masuk: jumlah order, gulungan kain, Fabric Room, spesifikasi ukur, Piece Name Dictionary, dan daftar cacat marker; keluar: laporan |
| Workbook Excel (`.xlsx`) | Impor dan ekspor | Keluar: Report to Excel, laporan Measurement Chart, Fabric Room, dan Piece Name Dictionary; masuk: jumlah, gulungan kain, Fabric Room, spesifikasi ukur, dan Piece Name Dictionary |
| Spreadsheet OpenDocument (`.ods`) | Impor | Jumlah, gulungan kain, Fabric Room, spesifikasi ukur, dan Piece Name Dictionary |
| `.rjx`, `.rjm`, `.rjc` | Buka dan simpan | Style, Marker, dan Rencana Potong: zip dan JSON, format 3 |

Ekstensi lama `.optx`, `.optm`, dan `.optc` juga bisa dibuka. [Galeri](/rajutara-documentation/id/gallery/) menyediakan contoh kaos dalam sebagian besar format di atas.

## Berkas asli

Style, marker, dan cut plan masing-masing adalah satu arsip zip dengan dua entri: `manifest.json`, yang menyebut format dan versinya, dan `document.json`, yang memuat isinya. Satuan panjang adalah milimeter. Marker menyematkan style yang dipakainya, jadi marker terbuka tanpa berkas style. Masukan yang sama dan pengaturan yang sama menghasilkan berkas yang identik byte demi byte. Rajutara menolak berkas dari versi format yang lebih baru dan tidak pernah memotongnya. Penyimpanan bersifat atomik dan menyimpan berkas sebelumnya sebagai `.bak`. [Headless dan skrip](../headless/) menunjukkan cara membacanya dengan beberapa baris Python.

Rajutara 2.0.0 menulis format native 3 ([ADR-0018](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0018-native-format-3.md)). Rajutara membuka berkas format 2 dan yang lebih lama dan memigrasinya saat dimuat: Style atau Marker mempertahankan isinya, dan Rencana Potong menjadi rencana dengan satu Purchase Order yang memuat order, marker, dan Lay lama. Rajutara 1.5.x dan yang lebih lama menolak berkas format 3 dengan "made by a newer rajutara (format version 3; this build reads up to 2)". Bila beberapa PC berbagi berkas, perbarui semuanya bersamaan.

Di dalam format 2, rilis 1.4.0 dan 1.5.0 menambahkan kunci opsional. Berkas tanpa kunci itu dimuat seperti sebelumnya:

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

Build 1.4.0 membuka berkas 1.5 tetapi membuang isi itu, jadi isi itu hilang bila Anda menyimpan di sana. Build 1.4.0 juga menolak Style yang Graded Nest-nya memakai Stack Along Line.

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

Spesifikasi AAMA-292 tidak dibuka untuk umum, jadi Rajutara membaca dan menulisnya dengan aturan yang sama dengan ASTM. Setiap impor mencantumkan apa yang tidak bisa dipertahankan, dan Rajutara tidak membuang apa pun diam-diam. Saat ekspor, Rajutara menulis bentuk penandaan yang tidak punya layer di AAMA sebagai V atau I, dengan peringatan. Export Graded Nest punya opsi L-notches as L shapes, mati secara bawaan. Bila opsi ini menyala, penandaan L juga menulis garis tepi berbentuk L sebagai polyline di samping titiknya.

DXF membawa ukuran sampel dan titik grade. Aturan grade masuk ke berkas RUL, atau seluruh style yang sudah di-grade keluar sebagai graded nest dengan satu blok per ukuran. Kedua pilihan ada di dialog ekspor. Lubang bor atau teks yang hanya ada di sebagian ukuran ditulis per ukuran di graded nest; DXF Base Size dengan berkas aturan tidak bisa memuat ini, jadi ia menulis semua lubang dan teks utama dan menyebutkannya di catatan ekspor.

## DXF plot

Dialog Plot PDS punya target DXF, dan Marker punya File, Export to CAD/CAM Files…. Keduanya menulis DXF rilis 12 dalam milimeter dari isi yang sama dengan plot: garis potong, garis dalam, penandaan, lubang bor, garis serat, dan label sebagai teks, ditambah bingkai meja untuk Marker. Ada satu layer per jenis elemen. Ekspor Marker memberi setiap Bundle warnanya sendiri; plot PDS mengambil warnanya dari pena Plotter Setup. Dengan Translate piece names menyala, label mencetak terjemahan setiap nama dari Piece Name Dictionary ([ADR-0017](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0017-marker-dxf-output.md)).

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

Pembaca RUL longgar soal pemisah dan akhir baris, tetapi ketat soal angka. Rajutara melaporkan dan melewati aturan dengan jumlah pasangan yang salah, lalu tetap memuat sisa berkas.

## HPGL/2

Satu unit plotter adalah 0,025 mm, jadi ada 40 unit per milimeter. Marker diplot dengan X sepanjang panjangnya dan Y melintang lebarnya. Berkas potong memakai pena sebagai alat: 1 untuk label dan garis gambar, 2 untuk pisau, 3 untuk bor. Anda bisa mengubah nomor pena di pengaturan plotter. Pisau berjalan searah jarum jam mengelilingi setiap potongan, mulai dari verteks kiri bawahnya, kecuali Cutting Order marker menetapkan titik awal atau arah lain. Potongan dipotong menurut urutan itu, dan Fuse Block dipotong sebagai batasnya saja.

## PDF

Potongan dan marker diplot sebagai PDF vektor. Lembarnya A0, atau ubin A4 untuk printer meja, dan plot yang lebih panjang daripada satu lembar dibagi menjadi ubin sepanjang panjangnya. Halaman pertama plot berubin adalah peta ubin. Teks memakai Helvetica standar PDF, jadi berkas tetap kecil. Teks bahasa Indonesia hanya memakai huruf Latin biasa, jadi tetap muat.

## CSV

Laporan dan daftar berupa UTF-8, dengan `.` sebagai tanda desimal dan `,` di antara kolom. Jumlah order diimpor dari CSV dengan baris judul, warna di kolom pertama dan satu kolom per nama ukuran. Daftar cacat marker punya satu baris `x_from,y_from,x_to,y_to` per cacat, dalam milimeter. Laporan Rencana Potong menulis satu berkas per bagian; dengan beberapa Purchase Order berkasnya bernama `<stem>-<po>-<part>.csv`. Auto Nesting Marker juga bisa menulis log efisiensi, `<stem>-nesting.csv`, dengan `time_s,length_mm,efficiency_pct,placed`.

## Workbook Excel dan OpenDocument

Report to Excel menulis workbook `.xlsx`. Laporan PDS punya satu lembar kerja dengan potongan, kode, ukuran, jumlah, material, luas, serta keliling potong dan jahit. Laporan Marker punya satu lembar kerja per bagian, General, Order, Pieces, dan Notches, dengan angka sebagai sel angka; File, Customize Excel Report… memilih dan mengurutkan kolomnya. Rajutara menulis workbook itu sendiri.

Jumlah dan Fabric Roll Rencana Potong, Fabric Room, spesifikasi Measurement Chart, dan Piece Name Dictionary membaca `.xlsx` dan `.ods` selain `.csv`. Rajutara hanya membaca sheet pertama, dengan pustaka `calamine`, dan memakai batas tetap. Rajutara menolak berkas di atas 20 MB, workbook yang terurai lebih dari 256 MB, `.xlsx` yang mendeklarasikan lebih dari 1 000 000 shared string, dan sel di luar baris 100 000 atau kolom 1 000, lalu membaca paling banyak 1 000 000 sel. Workbook `.xls` lama tidak terbaca sama sekali; simpan sebagai `.xlsx` atau `.csv`.
