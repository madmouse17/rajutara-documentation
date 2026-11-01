---
title: Peta jalan
description: Apa yang dibawa 1.0.0, apa yang dijadwalkan spesifikasi tetapi belum dikirim, apa yang tidak akan dikerjakan Rajutara, dan rencana v2.
---

Halaman ini adalah rencana proyek dalam kata-kata sederhana. Isinya apa yang dibawa 1.0.0, apa yang dijadwalkan spesifikasi tetapi belum dikirim, apa yang tidak direncanakan, dan rencana v2, yang disusun dengan mengukur 1.0 terhadap fitur yang ditambahkan Optitex sejak rilis 15. Sumbernya adalah `ROADMAP.md` dan `docs/spec/08-v2-roadmap.md` di repositori, dan [daftar paritas](../parity-checklist/) memuat tampilan alat demi alat.

## Fase

| Fase | Menghasilkan | Di 1.0.0 |
|---|---|---|
| 0 Fondasi | Workspace, CI, model inti dengan urungkan, format asli, shell docking, bahasa Inggris dan Indonesia, `--version` dan `--smoke` | Dirilis |
| 1a Jalur impor | Impor DXF dan RUL ASTM D6673 dan AAMA-292, panel Pieces, properti, kampuh, plot ke PDF (A4 berubin, A0) dan HPGL/2 | Dirilis |
| 1b Dari grade ke marker | Ruang kerja Grading, ekspor graded nest dan RUL, ruang kerja Marker dengan penataan manual, auto-nesting, laporan, dan plot marker | Dirilis |
| 1c Menggambar dari nol | Drafting, titik, kurva, kup, lipit, walk, trace, cermin, pisah dan gabung, ukur, teks, garis dalam | Dirilis. 89 alat PDS mencakup alat yang oleh spesifikasi diberi tanda Fase 3: spiral, fullness, gusset, garis lipit, fold, remove excess cloth, dan extend in parallel |
| 2 Perencanaan potong | Ruang kerja Cut Plan, order, perencanaan lay, konsumsi dan biaya, laporan, mode lapis, Cut Order | Dirilis di ruang kerja Cut Plan, dengan Cut Order dan gulungan kain. Belum dirilis di ruang kerja Marker: mode lapis selain tunggal, alat teks, cutting order, optimize cut order, bump dan garis potong |
| 3 Tambahan produksi | Pencocokan belang dan kotak-kotak, tilt, buffer potongan per sisi, block fuse, cacat kain, cross grading, penghamparan multi-material | Belum dimulai |
| 4 dan seterusnya, 3D | Simulasi garmen 3D, hanya setelah keputusan untuk meninggalkannya diganti | Hanya kontrak antarmuka |

## Batasan yang diketahui di 1.0.0

- Build Windows 7 hanya diverifikasi di bawah Wine dan lewat pemeriksaan tabel impor. Uji di perangkat keras Windows 7 sungguhan masih tertunda. Lihat [Windows 7](../windows-7/).
- 3D hanya antarmuka. Tidak ada jendela 3D.
- Driver pemotong vendor tidak disertakan. Marker menulis satu berkas potong HPGL/2 generik.
- String bahasa Indonesia belum dikonfirmasi: setiap string bahasa Inggris punya padanan Indonesia, dan CI memeriksanya, tetapi belum ada Operator berbahasa Indonesia yang meninjau pilihan katanya.

## Dijadwalkan spesifikasi, belum dikirim

- **Marker.** Cluster pieces, delete cluster, fix on marker, optimum dan rectangular block fuse, substitute size, dan antrean nesting, ditambah butir Fase 2 dan 3 di tabel di atas.
- **Grading.** Stack Along Line tercantum dan dinonaktifkan sampai Fase 3. Sistem ukuran multidimensi, cross grading dengan menggabungkan berkas style, dan bagan ukuran adalah Fase 3.
- **PDS.** Sudut kampuh Custom adalah tombol nonaktif sampai Fase 3. Wave, Deform Internals, Zones, Equal Segments, Track Lines, dan Segment Editor tidak ditiru.
- **Cut Plan.** Grup penghamparan yang mencampur material, inventaris gudang kain yang dipakai bersama antarrencana, grup gulungan menurut lebar dan penyusutan dengan marker sendiri, beberapa meja potong per material, dan beberapa style dalam satu rencana.

## Tidak direncanakan

- Driver pemotong vendor, driver digitizer, layanan cloud, dan skrip batch milik Optitex.
- Membaca atau menulis format asli Optitex. Proyek ini clean-room, jadi tidak ada berkas Optitex yang pernah dibuka.
- Menjalankan Cut Plan dari baris perintah.

## v2

Rencana untuk rilis setelah 1.0 disusun pada 2026-11-01. Rencana ini mengurutkan pekerjaan menurut apa yang diperoleh Operator dalam pekerjaan harian PDS, grading, marker, dan rencana potong, serta apakah cocok dengan batasan: egui dengan renderer `glow`, Linux lebih dulu, batas bawah Windows 7, dan anggaran memori. Tidak ada di dalamnya yang membutuhkan lebih dari OpenGL 2.1, dan tidak ada yang meninggalkan Windows 7. Beberapa fitur Optitex yang lebih baru bertumpu pada fitur Optitex 15 yang ditunda 1.0, seperti buffer per sisi, grup shading, cacat kain, dan pencocokan belang dan kotak-kotak, jadi v2 mengambil setiap prasyarat bersama fitur yang membutuhkannya.

### v2.0, butir wajib

| Butir | Apa itu | Nilai | Ukuran |
|---|---|---|---|
| Nesting engine v2 | Pencarian peminimalan tumpang tindih yang diterbitkan, di atas mesin yang ada, log efisiensi langsung sebagai CSV, dan penyimpanan marker sementara. Menjadi bawaan hanya jika mengalahkan 1.0 pada tolok ukur dalam batas waktu dan batas memori 32-bit. | Tinggi | Besar |
| Batasan marker | Buffer per tepi, pengelompokan bundle, grup shading, dan area meja. | Tinggi | Besar |
| Pencocokan belang dan kotak-kotak | Titik cocok, pengulangan kain, dan tilt pada marker. Dimulai setelah batasan marker. | Tinggi | Sangat besar |
| Headless batch | `rajutara batch SCRIPT` menjalankan skrip perintah, satu per baris, tanpa jendela: impor, ekspor, antrean nesting, laporan, plot. Daftar perintah tertutup, tanpa variabel atau perulangan. | Tinggi | Sedang |
| Cut Plan per purchase order | Beberapa purchase order per rencana, masing-masing dengan jumlah, marker, dan lapisnya sendiri, ditampilkan berdampingan. | Tinggi | Sedang |
| Bagan ukuran | Titik ukur per ukuran yang diambil dari pola, spesifikasi pembeli yang diimpor dari CSV, dan laporan di luar spesifikasi. Memeriksa; tidak mengubah ukuran. | Tinggi | Sedang |
| Lubang bor dan teks per ukuran | Lebih sedikit kancing pada ukuran kecil sebuah kemeja. Ini membawa format asli versi 3. | Sedang | Sedang |
| Penyempurnaan PDS | Preset notch dengan lebar atas, filter menurut dimensi, salinan yang dinomori ulang otomatis, panjang segmen dari kedua ujung, dan peringatan sebelum berpindah antara sew dan cut. | Sedang | Sedang |
| Opsi keluaran | Geometri notch L yang benar di DXF sebagai opsi, dan ekspor DXF generik marker dengan nama potongan dan satu warna per bundle. | Sedang | Kecil |

Batasan marker, mesin nesting, dan perintah batch berbagi pekerjaan dan dikerjakan lebih dulu; Cut Plan, bagan ukuran, dan butir per ukuran bersifat mandiri. Ketiga butir yang mengubah model asli berbagi satu kenaikan ke format versi 3, dengan migrasi dari format 2, dan berkas yang lebih baru ditolak, bukan dipotong.

### v2.x, butir sebaiknya

Cacat kain, dengan impor daftar cacat dan perintah yang menghapus potongan yang terkena cacat. Garis bump dan potong. Beberapa material dan style per Cut Plan, dengan inventaris gudang kain bersama. PDF lembar produksi dengan tata letak beranotasi dan dasar tech pack. Wizard pembuatan marker. Pemilih kolom untuk laporan. Pencarian Preferences. Track lines. Kamus nama potongan untuk label plot, misalnya Inggris ke Indonesia. Set style dan pencarian. Tata letak label potongan. Fold line to line, swap piece properties, dan alat 2D multi-target. Referensi induk dipertahankan pada grade point baru. Impor XLSX untuk bagan ukuran dan order.

### Di luar lingkup v2

Simulasi kain, rendering, animasi, dan avatar. Pratinjau 3D: tidak akan menggantikan apa pun yang dipakai Operator dari 3D dan tidak bisa menilai kecocokan pakaian, dan membutuhkan laju frame di OpenGL 2.1 yang belum diukur. Sinkronisasi cloud dan fitur hosting. Konektor PLM. Konverter untuk berkas asli Lectra, Gerber, atau Optitex. Plug-in Adobe Illustrator. Print and cut dari ujung ke ujung. Kamus pemotong dan proyektor vendor. Dialog berkas bawaan sistem operasi.

### Keputusan yang harus diambil pemilik

Headless batch membalik dua pernyataan sebelumnya, bahwa skrip batch tidak ditiru dan bahwa Cut Plan tidak punya baris perintah, jadi memerlukan keputusan tercatat dengan daftar perintah tertutup. Ekspor DXF generik marker melampaui PDF dan HPGL/2 yang kini ditulis marker. Format asli versi 3 adalah satu kenaikan untuk semua perubahan model v2. Mesin nesting adalah kode milik proyek sendiri dari metode yang diterbitkan, kecuali gagal pada gerbang tolok ukur.

Ingin mengambil satu butir? Buka issue lebih dulu, seperti yang diminta [Berkontribusi](../contributing/).
