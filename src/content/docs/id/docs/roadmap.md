---
title: Peta jalan
description: Apa yang dibawa 2.1.0, batasan yang diketahui, apa yang berikutnya, dan apa yang tidak akan dikerjakan Rajutara.
---

Halaman ini merangkum rencana proyek: apa yang dibawa 2.1.0, batasan yang diketahui, apa yang berikutnya, dan apa yang tidak direncanakan. Sumbernya adalah `ROADMAP.md`, [`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §8, dan [`docs/spec/08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md) §3 di repositori. [Daftar paritas](../parity-checklist/) memuat tampilan alat demi alat, dan [catatan perubahan](../changelog/) mencatat apa yang berubah di setiap rilis.

## Fase

| Fase | Menghasilkan | Status di 2.1.0 |
|---|---|---|
| 0 Fondasi | Workspace, CI, model inti dengan urungkan, format asli, shell docking, bahasa Inggris dan Indonesia, `--version` dan `--smoke` | Dirilis di 1.0.0 |
| 1a Jalur impor | Impor DXF dan RUL ASTM D6673 dan AAMA-292, panel Pieces, properti, kampuh, plot ke PDF (A4 berubin, A0) dan HPGL/2 | Dirilis di 1.0.0 |
| 1b Dari grade ke marker | Ruang kerja Grading, ekspor graded nest dan RUL, ruang kerja Marker dengan penataan manual, auto-nesting, laporan, dan plot marker | Dirilis di 1.0.0 |
| 1c Menggambar dari nol | Drafting, titik, kurva, kup, lipit, walk, trace, cermin, pisah dan gabung, ukur, teks, garis dalam | Dirilis. 89 alat PDS di 1.0.0, 101 sejak 1.5.0: Segment Editor, Track Lines, Wave, Deform Internals, Equal Segments, Fold Line to Line, Swap Piece Properties, Zones, Spread dan Gather Pieces, Fabric And Stripes, Save dan Restore Placement, Reopen Darts |
| 2 Perencanaan potong | Ruang kerja Cut Plan, order, perencanaan lay, konsumsi dan biaya, laporan, mode lapis, Cut Order | Dirilis di 1.0.0 dan 1.5.0. 2.0.0 menambahkan Purchase Order, beberapa Style dan Material per rencana, Spreading Group, Cutting Table, pengelompokan gulungan, Fabric Room, dan Customize Report |
| 3 Tambahan produksi | Pencocokan belang dan kotak-kotak, tilt, buffer potongan per sisi, block fuse, cacat kain, cross grading, penghamparan multi-material | Dirilis. Block fuse, cacat kain, Substitute Size, dan Single Piece Gap di 1.5.0; pencocokan belang dan kotak-kotak, tilt, buffer per sisi, penataan terlipat, variasi ukuran, Cross Grading, Measurement Chart, dan penghamparan multi-material di 2.0.0 |
| v2.0 | V1 sampai V9: mesin nesting v2, batasan Marker, belang, batch headless, Purchase Order, Measurement Chart, lubang bor dan teks per ukuran, penyempurnaan PDS, opsi keluaran DXF | Dirilis di 2.0.0 (gelombang C) |
| v2.x | X1 sampai X14 | X1, X2, X5, X8, dan X11 di 1.5.0; X3, X4, X6, X7, X9, X10, X13, dan X14 di 2.0.0. X12 sebagian: Fold Line to Line dan Swap Piece Properties sudah dibuat, alat 2D multi-target belum |
| Lapisan perintah agen | `rajutara batch`, `rajutara mcp`, playbook, indeks pengetahuan, memori asisten, dan berkas prompt | Dirilis di 2.0.0. 2.1.0 menambahkan konfirmasi MCP, `release_notes`, dan `trace_from_photo` (87 alat) |
| Gelombang D: asisten di dalam aplikasi | Panel [asisten](../assistant/), enam jenis penyedia dengan dua belas preset, jendela persetujuan, keahlian dan persona, peran di menu, tinjauan memori dan umpan balik, Yang baru, jalur aksi cepat, penjalan playbook dan perbandingan skenario, soket lokal dan `mcp --gui`, input suara opsional, `trace_from_photo`, dan `rajutara eval` | Dirilis di 2.1.0 |
| 4 dan seterusnya, 3D | Simulasi garmen 3D, hanya setelah keputusan untuk meninggalkannya diganti | Hanya kontrak antarmuka |

## Batasan yang diketahui di 2.1.0

Platform dan berkas:

- Build Windows hanya diverifikasi di bawah Wine dan lewat pemeriksaan tabel impor. Uji di perangkat keras Windows 7 sungguhan masih tertunda. Lihat [Windows 7](../windows-7/).
- Berkas yang disimpan 2.0.0 adalah format native 3. Rajutara 1.5.x dan yang lebih lama menolaknya, jadi perbarui setiap PC yang berbagi berkas secara bersamaan. 2.0.0 membuka berkas lama.
- 3D hanya antarmuka. Driver pemotong vendor tidak disertakan; Marker menulis satu berkas potong HPGL/2 generik dan satu DXF generik.
- String bahasa Indonesia belum dikonfirmasi: setiap string bahasa Inggris punya padanan bahasa Indonesia, dan CI memeriksanya, tetapi belum ada Operator berbahasa Indonesia yang meninjau kata-katanya.

PDS dan Grading:

- Segment Editor tidak punya panel dan tidak punya Use Darts. Track Lines bertahan selama sesi dan tidak bisa dijadikan sasaran snap. Equal Segments tidak punya jendela grup dan Options. Swap Zone Segment dan Move Piece On Piece belum dibuat, karena tidak ada keterangan publik tentang apa yang dilakukannya.
- Dynamic Input hanya bekerja di Draft, dan Polar Tracking punya langkah tetap 45°. Point Name disimpan di berkas tetapi tidak digambar dan tidak ditulis ke DXF. Support Notch milik Walk tidak punya Reconnect dan Grading Walking.
- Pleat Lines mengikuti aturan Rajutara sendiri, karena tidak ada sumber publik yang memberi geometrinya. Bentuk penandaan khusus buatan sendiri belum dibuat. Style Set tidak bisa diganti namanya setelah dibuat.
- Tabel chart di Production Sheet hanya menampilkan nilai terukur, dan Date-nya adalah hari pencetakan.
- Variasi ukuran baru sampai ke Marker dan Rencana Potong setelah Reshape Variation Grading. Rule Table milik ukuran utama.
- Pencarian Preferences mencocokkan bahasa antarmuka dan bahasa Inggris, bukan bahasa antarmuka yang lain.

Marker:

- Advanced menjadi Algorithm bawaan sejak uji keputusan tolok ukur ADR-0019 lulus, jadi Marker yang di-nesting ulang bisa berbeda hasilnya dari 1.5.x. Pilih Standard di Auto Nesting Setup, atau `@NEST /AL=QUA`, untuk mesin 1.x.
- Auto Nesting tidak pernah melipat potongan sendiri; Operator menjalankan Place Folded dengan tangan. Pasangan terlipat adalah satu bentuk bersama, jadi pasangan itu tidak bisa dipindah, ditembak, atau diputar sampai dibuka.
- Hanya potongan tunggal yang menempel ke belang; seleksi atau cluster bergerak sesuai seretan. Ukuran belang diagonal, warna belang yang berubah-ubah, Revise Pieces Placements, dan motif bunga belum dibuat.
- Satu buffer potongan melayani setiap ukuran, dan garis tepi buffer tidak bisa disunting titik demi titik.
- Additional Mixing, Optimize Last Bundles, Idle Time, dan nama mesin Nest++ belum dibuat. Pecahan Bundles Overlap (5, 15, dan 30 %) dan lajur setiap Bundle adalah pilihan Rajutara sendiri.
- Auto Save Of Markers menamai berkasnya `<file>-1.rjm`, `<file>-2.rjm`, bukan `MARKER-n` seperti Optitex.
- Customize Excel Report mengubah laporan Excel dan PDF, bukan panel Report di layar.
- Masih terbuka sejak 1.5.0: Cluster atau Fuse Block hanya bergeser; berkas potong memotong Fuse Block sebagai batasnya saja dan tidak punya alat atau layer per urutan; Insert to Hole memindahkan satu potongan per seretan; Substitute Size hanya mengambil ukuran berikutnya; cacat kain tidak diplot; bump line dan cut line tidak punya Lock atau OpStop; Marker Creation Wizard tidak punya properti Overlay; Text Tool tidak punya Quality Text.

Rencana Potong:

- Semua Purchase Order berbagi satu Cut Order dan satu set gulungan, PO demi PO. Satu marker tidak pernah mencampur Style.
- Untuk mengubah baris Fabric Room, hapus baris itu lalu tambahkan lagi. Langkah pertama wizard Create New tidak menawarkan pilihan Material atau Style Set.
- Rajutara menghitung ulang Cut Order setiap frame, jadi rencana dengan sangat banyak Fabric Roll memperlambat panelnya.

Lapisan perintah agen:

- Klien MCP bertanya kepada penggunanya sebelum simpan, timpa, hapus, atau buang yang dijaga hanya bila klien memakai protokol 2026-07-28 dan bisa menampilkan formulir. Klien lain tetap mendapat `confirmation_required` kecuali server berjalan dengan `--yes`.
- State bertanda tangan dari konfirmasi MCP untuk checkpoint playbook menyebut run-nya, bukan tahapnya, jadi dalam 300 detik state itu bisa meloloskan checkpoint berikutnya dari run yang sama.
- `rajutara batch` mencetak keluarannya di akhir proses; berkas `--log` ditulis baris demi baris.
- Ke-13 nilai profil bengkel `profil-bengkel.toml` belum punya sumber dan dilaporkan sebagai "perlu konfirmasi operator" sampai bengkel mengisinya.
- Indeks pengetahuan hanya membaca PDF dengan lapisan teks, memuat seluruh indeks di setiap panggilan, dan bisa kehilangan satu dari dua penambahan yang dilakukan bersamaan.
- Replay playbook memberi hasil nesting yang sama hanya dengan penghentian berdasarkan iterasi dan satu thread.

Asisten:

- Balasan tidak dialirkan. Panel menghitung detik sampai seluruh jawaban tiba.
- Pemanggilan alat dari panel, penjalan, atau soket lokal berjalan di jendela, satu per frame, jadi pemanggilan yang panjang seperti run nesting menahan jendela sampai selesai. Hentikan berlaku di antara dua pemanggilan.
- Dengan model di komputer lain, Anda menekan Kirim di pratinjau untuk setiap permintaan sebuah tugas, termasuk percobaan ulang dan permintaan yang disesuaikan profil. Tidak ada "selalu izinkan".
- Model lokal butuh jendela konteks sekitar 8.000 token atau lebih; profil baru mulai dari 16.384.
- Keahlian dipilih berdasarkan kata kunci utuh bahasa Indonesia atau Inggris, jadi kata berimbuhan (memotong untuk potong) tidak memilih keahlian ruang potong. Daftar keahlian di kotak tulis dan `@keahlian` mengesampingkan pilihan itu.
- Catatan rilis di kartu Yang baru ditulis dalam bahasa Inggris.
- Input suara butuh unduhan opsional `rajutara-voice`, dan belum pernah dijalankan di PC Windows 7 sungguhan. Program pembantu Linux dan Windows 10 butuh CPU dengan AVX2; program pembantu Windows 7 berjalan di CPU apa saja, termasuk di Windows 10 dan 11. Anggaran memorinya (600 MB saat menuliskan ucapan di PC 32-bit) belum diukur.
- `trace_from_photo` masih eksperimental. Alat ini tidak punya model lensa, mengabaikan rotasi EXIF foto, dan foto 50 megapiksel bisa memakan sekitar 450 MB memori di PC 32-bit. Setiap piece hasil jiplakan membawa kode `TRACED` dan perlu diperiksa sebelum dipotong.
- Di Windows, `gui-socket.json` dan `keys.toml` bergantung pada izin folder `%APPDATA%` pengguna; mode berkas 0600 hanya berlaku di Linux.

## Berikutnya

- Gelombang E: perintah Optitex 15 yang tersisa, made-to-measure, keluaran pemotong dalam format publik (varian HP-GL/2, G-code ISO 6983), dan input digitizer lewat serial dan USB HID. Desainnya sudah ditulis; kodenya belum.
- 3D: drape di avatar parametrik, Seam and Stitch Manager, dan ekspor GLB. Pekerjaan ini dimulai setelah gelombang E, karena membaca ukuran tubuh yang ditambahkan gelombang E.
- Server berbagi berkas yang dihosting sendiri sudah didesain dan ditunda sampai pemiliknya membutuhkannya.

## Tidak direncanakan

- Driver pemotong vendor yang membutuhkan protokol tertutup.
- Membaca atau menulis format asli Optitex ([ADR-0001](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0001-clean-room-no-reverse-engineering.md)).

Sebelum mengerjakan salah satu butir, buka issue lebih dulu, seperti yang diminta [Berkontribusi](../contributing/).
