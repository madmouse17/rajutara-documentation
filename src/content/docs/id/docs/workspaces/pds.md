---
title: PDS, desain pola
description: Impor atau susun potongan, sunting titik, notch, dan kampuh, periksa panjang, lalu plot. Ruang kerja PDS dan 89 alatnya.
---

PDS adalah tempat potongan berasal. Impor dari DXF ASTM atau AAMA, atau gambar sendiri, lalu sunting titik, notch, kampuh, dan garis dalam, periksa panjang segmen, dan plot potongan pada skala 1:1.

![Ruang kerja PDS dengan kaos contoh: Pieces Window di bagian atas, Toolbox dan Properties di kiri, potongan FRONT dengan panjang segmen di Lembar Kerja, Pieces Table di bawah.](../../../../../assets/screens/full-pds.jpg)

## Layar

Panelnya adalah tab dock. Seret tab untuk memindahkannya, dan Tools, Reset Workspace Layout mengembalikan susunan bawaan. Ruang kerja mengingat tata letaknya sendiri.

| Panel | Isinya | Tombol |
|---|---|---|
| Work Area (Lembar Kerja) | Meja tempat potongan berada. Tidak bisa ditutup. | |
| Pieces Window | Satu thumbnail per potongan, dengan nama, jumlah, dan `L/R` untuk sepasang. Seret satu ke meja, atau klik ganda. | `1` |
| Toolbox | Alat-alat, dikelompokkan seperti di toolbar. | `3` |
| Properties | Bidang potongan, titik, atau notch yang dipilih. Beberapa potongan bisa disunting sekaligus. | `Ctrl+I` |
| View and Selection | Apa yang ditampilkan dan apa yang bisa dipilih. | `F10` |
| Grading Table | Aturan grade titik yang dipilih. | `2` |
| Pieces Table | Setiap potongan dalam grid: nama, kode, jumlah, pasangan, material, rotasi, balik, buffer, luas, keliling. | `6` |
| Compare Length | Dua ruas kontur, diukur satu terhadap yang lain. | `5` |
| History | Riwayat urungkan, dipakai bersama ruang kerja lain. | |
| Import Report | Masalah impor terakhir. Terbuka bila ada. | |

Bilah status mengalihkan panjang segmen (`F8`), kampuh (`Ctrl+F6`), titik yang tidak membawa aturan grade, ukuran ter-grade (`F4`), dan snapping. Di kanan, ia menampilkan `Protected` untuk potongan yang terkunci, `SEW` atau `CUT` untuk garis yang disunting, satuan (klik untuk bergilir antara sentimeter, milimeter, dan inci), dan posisi kursor.

## Alat

Ada 89 alat, dalam kelompok yang dipakai toolbar.

| Grup | Contoh |
|---|---|
| General | Select (`Z`), zoom dan pan, garis panduan, properti potongan, kunci potongan (`F3`), potong, salin, dan tempel potongan, gabung berkas style |
| Piece movement and rotation | Pindah, putar (`R`), putar ke horizontal atau vertikal, balik |
| Grainline and half symmetry | Atur arah Garis Serat (`/`), atur separuh (`H`), buka dan tutup separuh (`Shift+H`, `Ctrl+H`) |
| New pieces | Potongan persegi panjang, poligon, lingkaran, sektor, dan busur, spiral |
| Drafting and points | Draft (`D`), busur (`A`), tambah titik pada kontur (`O`), pindah titik (`M`), multi move (`Q`) |
| Contour | Align points, round corner, cut corner, smooth, points cleanup |
| Notches and internals | Notch (`N`), notch pada titik, teks, trim, extend, pindah dan pilih garis dalam |
| Seams | Add seam (`S`), remove seam, reseam, show seam, beralih antara cut dan sew |
| Split, join and fold | Cut, gabung potongan, gabung kontur, bangun potongan, trace segmen |
| Darts, pleats and fullness | Dart (`Ctrl+Alt+D`), pleat (`L`), add fullness, gusset |

Tekan `Ctrl+Shift+P` untuk mencari alat berdasarkan nama, bukan tombol. Alat yang butuh beberapa klik menampilkan langkah berikutnya di bilah status, dan `Esc` membatalkannya. Menahan `Alt` saat mengklik membuka dialog untuk nilai yang tepat.

Setiap notch punya bentuk (V, T, I, L, U, atau Box), kedalaman, dan lebar. Garis Serat adalah garis berarah yang dipakai marker untuk memutar potongan sepanjang kain. Kampuh punya lebar per segmen: kontur potong adalah kontur jahit ditambah kampuh.

[Daftar paritas](../../parity-checklist/) mencantumkan seluruh 89 alat satu per satu.

## Impor dan ekspor

File, Import From CAD/CAM Files membaca berkas DXF ASTM D6673 dan AAMA-292, dengan berkas RUL untuk style yang sudah di-grade. File, Export To CAD/CAM Files menulisnya kembali, dengan pilihan antara berkas aturan (bawaan) dan graded nest. Layer demi layer, DXF dijelaskan di [Format berkas](../../formats/). Rajutara tidak pernah membaca atau menulis format Optitex sendiri.

## Plot

`Ctrl+L` membuka dialog Plot.

| Bidang | Pilihan |
|---|---|
| Pieces | Semua, di meja, atau terpilih. Terpilih jika ada seleksi, selain itu di meja. |
| Sizes | Daftar centang ukuran, dan apakah ukuran di-nesting dalam satu set garis tepi. |
| Elements | Garis potong, garis jahit, garis dalam, notch, lubang bor, Garis Serat, garis cermin, anotasi, label potongan. |
| Target | PDF sebagai ubin A4 (bawaan), PDF di A0, atau berkas HPGL/2. |
| Arrange first | Menata potongan pada lebar lembar sebelum memplot. |

Garis potong diplot padat dan garis jahit putus-putus, notch digambar sebagai bentuknya pada garis potong, dan Garis Serat punya kepala panah. Arrange for Plot (`Ctrl+K`) mengerjakan tata letak sendiri: potongan diurutkan menurut tinggi, ditata dalam baris dari kiri ke kanan dengan celah (bawaan 10 mm), dan diputar 90 derajat ketika potongan panjang tidak muat pada lebar. Plot berjalan di thread pekerja dengan kemajuan dan tombol Cancel.

## Belum ada di 1.0

Sudut kampuh Custom adalah tombol nonaktif sampai Fase 3. Wave, Deform Internals, Zones, Equal Segments, Track Lines, dan Segment Editor tidak ditiru. [Peta jalan](../../roadmap/) memuat daftar lengkapnya.
