---
title: Daftar paritas
description: Apa yang ditemukan Operator terlatih Optitex 15 di Rajutara 1.1.0, modul demi modul.
---

Apa yang ditemukan Operator terlatih Optitex 15 di rajutara 1.0.0, modul demi modul. rajutara meniru pembagian modul, nama alat, dan workflow Optitex 15 ([`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §3); rajutara tidak menyalin berkas atau format Optitex apa pun ([ADR-0001](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0001-clean-room-no-reverse-engineering.md)).

Baris-barisnya berasal dari tabel cakupan di akhir rencana implementasi ([`04-pds-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/04-pds-part2.md), [`05-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/05-grading.md), [`06-marker-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/06-marker-part2.md), [`07-cutplan.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/07-cutplan.md)), dari tabel "not mirrored" pada spesifikasi, dan dari kode: aksi yang didaftarkan sebagai nonaktif, atau kontrol yang digambar nonaktif, tidak dihitung sebagai sudah dirilis. Ke-117 id aksi PDS pada tabel cakupan PDS semuanya ada di `crates/rajutara-pds`. Nomor alat (`T01`, `G01`) adalah nomor spesifikasi ([`02-pds.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/02-pds.md) §5, [`03-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/03-grading.md) §6). Apa yang ditambahkan Optitex setelah versi 15 ada di [`08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md).

| Status | Arti |
|---|---|
| Ya | Ada di 1.0.0 dan aktif. |
| Sebagian | Ada di 1.0.0 dengan celah yang terdokumentasi: sebagian dinonaktifkan, didekati, atau dijangkau dengan cara lain. Catatan menyebut yang mana. |
| Tidak | Tidak ada di 1.0.0. Catatan menyebut apakah spesifikasi menjadwalkannya (Fase 3) atau mengesampingkannya. |

## Ringkasan

| Modul | Ya | Sebagian | Tidak |
|---|---|---|---|
| PDS | 95 | 1 | 4 |
| Grading | 33 | 0 | 4 |
| Marker | 23 | 4 | 9 |
| Cut Plan | 16 | 1 | 6 |
| Pertukaran, shell, dan platform | 8 | 3 | 6 |

## PDS (desain pola)

Seluruh 89 alat T01 sampai T89. "Baseline" Optitex adalah "Grainline" dan "Button" adalah "Drill Hole" di rajutara ([`GLOSSARY.md`](https://github.com/madmouse17/rajutara/blob/main/GLOSSARY.md)).

### Umum: seleksi, tampilan, berkas, dan laporan

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T01 Select Tool | Ya | |
| T02 Zoom By Rectangle, Zoom In, Zoom Out, Zoom All, Zoom Real, Zoom Selection | Ya | Pintasan keypad dipetakan ulang: egui tidak bisa membedakan tombol keypad dari tombol baris utama. |
| T03 Pan | Ya | |
| T04 Guide Lines, Guideline Through | Ya | |
| T05 Piece Info, Piece Properties | Ya | |
| T06 Lock Piece | Ya | |
| T19 Cut, Copy and Paste pieces | Ya | Menempel ke Style dengan Size Table lain membuka dialog pemetaan ukuran. |
| T20 Delete Piece | Ya | |
| T21 Piece Update, Save Active as New | Ya | |
| T22 Merge Style File | Ya | |
| T23 Arrange For Plot | Ya | |
| T24 Style Area And Perimeter | Ya | |
| T65 Select Internals Tool | Ya | |
| T69 Text Tool | Ya | |
| T79 Measure Tool | Ya | |
| T80 Compare Length window | Ya | |

### Pemindahan dan rotasi potongan

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T07 Move Piece Tool | Ya | |
| T08 Rotate Piece Tool | Ya | |
| T09 Rotate Clockwise, Rotate Counter Clockwise | Ya | |
| T10 Rotate To Horizontal, Rotate To Vertical | Ya | |
| T11 Flip Horizontal, Flip Vertical | Ya | |
| T12 Flip Along Line Tool | Ya | |
| T13 Scale | Ya | |

### Garis serat dan simetri separuh

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T14 Set Baseline Direction, New Baseline, Rotate To Initial Baseline, Baseline Parallel to Segment | Ya | |
| T15 Set Half Tool, Set Mirror Line Tool | Ya | |
| T16 Open Half, Close Half | Ya | |

### Potongan baru

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T17 Create A Rectangular, Polygonal, Circular, Sector, Arc Piece | Ya | |
| T18 Create A Spiral Piece | Ya | |
| T74 Build Piece Tool | Ya | |
| T75 Trace Segments Tool | Ya | |

### Drafting dan titik

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T25 Draft Tool | Ya | |
| T26 Arc | Ya | |
| T27 Add Point On Contour Tool | Ya | |
| T28 Point Tool | Ya | |
| T29 Move Point Tool | Ya | |
| T30 Move Point Along Contour | Ya | |
| T31 Move Points Proportionally Tool | Ya | |
| T32 Move Points Parallelly | Ya | |
| T33 Multi Move Tool | Ya | |
| T34 Toggle Grade Point, Toggle Curve Point | Ya | Pintasan dipetakan ulang seperti tombol keypad di atas. |
| T35 Contour Point Properties | Ya | |
| T36 Delete Tool | Ya | |

### Kontur

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T37 Align Points (Horizontal, Vertical, By Line) | Ya | |
| T38 Round Corner Tool | Ya | |
| T39 Cut Corner Tool | Ya | |
| T40 Smooth Tool | Ya | |
| T41 Points Cleanup | Ya | |
| T42 Add Spline Support Points | Ya | |
| T43 Segment Length | Ya | |
| T44 Create Parallel | Ya | |
| T45 Extend in Parallel | Ya | |
| T46 Create By Offsets | Ya | |
| T47 Create Point Connection, Add Points and Create Connection | Ya | |

### Notch dan garis dalam

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T48 Notch Tool | Ya | |
| T49 Notch On Point | Ya | |
| T50 Add Points To All Notches | Ya | |
| T51 Change Multiple Internal Attributes | Ya | |
| T60 Circle Tool, Circle By Three Points | Ya | |
| T61 Button Tool | Ya | Disebut Drill Hole. |
| T62 Add Several Buttons | Ya | Disebut Several Drill Holes. |
| T63 Add Several Lines | Ya | |
| T64 Move Or Copy Internal Tool | Ya | |
| T66 Join Internal Contours Tool | Ya | |
| T67 Trim Tool | Ya | |
| T68 Extend Internal Object | Ya | |
| T70 Copy, Paste Internal Object | Ya | |

### Kampuh

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T52 Add Seam, Seam Tool | Ya | |
| T53 Remove Seam, Remove Seam On Segment | Ya | |
| T54 Switch to Cut, Switch to Sew, Switch Pieces to SEW, Switch Pieces to CUT | Ya | |
| T55 Reseam | Ya | Dipertahankan demi kebiasaan: garis kedua selalu diturunkan dari Seam Allowance, jadi tidak ada kampuh yang basi. |
| T56 Copy Seam, Paste Seam | Ya | |
| T57 Convert Seam To Internal | Ya | |
| T58 Convert Sew Internals To Seam | Ya | |
| T59 Cut Seam Angle Tool (Seam Corner) | Sebagian | Intersect, Bevel, Square, dan Mirror berfungsi. Sudut Custom adalah tombol nonaktif sampai Fase 3. |

### Pisah, gabung, dan lipat

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T71 Cut Tool (Cut a Piece) | Ya | |
| T72 Cut Along Internal | Ya | |
| T73 Join Pieces Tool | Ya | |
| T76 Fold In Tool, Fold Out | Ya | |
| T77 Fold onto Point Tool (Point To Point Fold) | Ya | |
| T78 Walk Tool | Ya | |

### Kup, lipit, dan fullness

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T81 Dart Tool | Ya | |
| T82 Close Dart | Ya | |
| T83 Change Darts Overlap | Ya | |
| T84 Rotate Dart | Ya | Aksi yang sama dengan T81, seperti di Optitex. |
| T85 Add Fullness Tool | Ya | |
| T86 Pleat Tool | Ya | |
| T87 Pleat Line Tool | Ya | |
| T88 Removing Excess Cloth Tool | Ya | |
| T89 Gusset Tool | Ya | |

### Panel, tampilan, dan menu

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Pieces Window dan Pieces Table | Ya | |
| Panel Properties untuk potongan, titik, dan notch | Ya | |
| Panel View and Selection, History, Import Report, dan Compare Length | Ya | |
| Toolbox dengan kategori yang bisa dilipat | Ya | |
| Penggaris, grid, garis panduan, dan snapping | Ya | |
| Sakelar bilah status: panjang segmen, kampuh, titik non-grade, snap | Ya | |
| Satuan kerja: sentimeter, milimeter, inci | Ya | |
| Digitizer, Data Exchange, Batch, Test Alternative Start Points, Printer Setup, Customize Excel Report | Tidak | Driver perangkat keras, skrip batch, dan titik awal pemotong di luar lingkup; dialog OS menggantikan Printer Setup. |
| Cutting Order, Fabric and Stripes, Spread/Gather Pieces | Tidak | Keluaran pemotong di luar lingkup; pencocokan belang adalah Fase 3. |
| Wave, Deform Internals, Zones (Build, Trace, Swap Zone), Equal Segments | Tidak | Fase 3, atau fitur zona di luar lingkup. |
| Segment Editor, Track Lines, Theme Settings, Seam and Stitch Manager | Tidak | Fase 3. Tema ada di menu View; Seam and Stitch Manager milik 3D. |

## Grading

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| G01 Set Grading Tool | Ya | |
| G02 Copy Grading | Ya | |
| G03 Paste Grading, Paste X Grading, Paste Y Grading | Ya | |
| G04 Paste Relatively | Ya | |
| G05 Paste Grading Around | Ya | |
| G06 Flip X Grading, Flip Y Grading | Ya | |
| G07 Equal X Grading, Equal Y Grading (Grade Equally) | Ya | |
| G08 Zero Grading, Zero X, Zero Y (Clear Grading) | Ya | |
| G09 Grade Along Line | Ya | |
| G10 Grade Proportional Tool | Ya | |
| G11 Move Point Size | Ya | |
| G12 Move Size Along | Ya | |
| G13 Move Size Proportional | Ya | |
| G14 Move Size by Rectangle | Ya | |
| G15 Move Size Parallel | Ya | |
| G16 Align Points Size | Ya | |
| G17 Align Vertical Size, Align Horizontal Size | Ya | |
| G18 Align Size by Line | Ya | |
| G19 Match Segment | Ya | |
| G20 Stack Point | Ya | |
| G21 Stack by Baseline | Ya | |
| G22 Stack Along Line | Tidak | Tercantum di menu Grading dan dinonaktifkan, dengan alasannya, sampai Fase 3: memerlukan mode stack yang belum dimiliki model. |
| G23 Restore Stack | Ya | |
| G24 Remove Baseline Grading | Ya | |
| G25 Create Piece for Selected Size | Ya | |
| G26 Rules Library (Rule Table) | Ya | |
| G27 Apply Rule | Ya | |
| G28 Select Grade Points | Ya | |
| G29 Graded Nest Tool | Ya | |
| Sizes Table: insert, append, delete, delete all, rename, order, set Base Size, break sizes, Regrade By Break, hingga 99 ukuran | Ya | |
| Panel Grading Table: dX, dY, dd per ukuran, absolut atau inkremental, titik grading sebelumnya dan berikutnya | Ya | |
| Tampilan Graded Nest, tampilan Stack Point, Base Size only, Show Non Grade Points | Ya | |
| Ekspor graded nest dan berkas RUL, impor graded nest | Ya | |
| Update Seam Grading, Reseam Segment (Keep Grading), Keep Grading In Auto Reseam | Ya | Tidak diperlukan: kampuh diturunkan pada setiap ukuran. |
| Sistem ukuran multidimensi (variations), Cross Grading dengan menggabungkan berkas Style | Tidak | Fase 3. |
| Measurement Charts, Dynamic Measurement Chart, made-to-measure | Tidak | Measurement Charts adalah Fase 3. Pengubahan ukuran parametrik dikecualikan oleh [ADR-0004](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0004-rule-based-grading-not-parametric.md). |
| Berkas rule-table Optitex | Tidak | Dikecualikan oleh ADR-0001. Format ASTM RUL yang terbuka dibaca dan ditulis sebagai gantinya ([ADR-0013](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0013-astm-rul-is-open-format.md)). |

## Marker

### Penyiapan dan panel

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| New Marker dengan Marker Properties: lebar, panjang, margin, buffer, penyusutan, berat kain, biaya per meter | Ya | |
| Material dan Ply Mode: Single | Ya | |
| Ply Mode Tubular, Faced, Folded | Sebagian | Digambar nonaktif di Marker Properties. Cut Plan merencanakan mode ini. |
| Add Style dari berkas atau dari Style yang terbuka di PDS | Ya | |
| Update from Style, pemberitahuan "style changed on disk" | Ya | |
| Order: Bundles dan arah per ukuran (One Way, Opposite, Any) | Ya | |
| Marker Table: pita kain, margin, garis panjang terpakai, penggaris, arsiran tumpang tindih | Ya | |
| Piece Bar: thumbnail dengan sisa jumlah, urut ulang, multi-seleksi, klik ganda untuk menata | Ya | |
| Panel Piece List, Marker Properties, Order, dan Report | Ya | |
| Bilah status: potongan, bundle, tumpang tindih, efisiensi, lebar, panjang, per garmen, lapis | Ya | |

### Penataan manual

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Menata dari Piece Bar dengan seret atau klik ganda | Ya | |
| Pindah dengan seret, tumpang tindih diizinkan dan disorot | Ya | |
| Kembalikan ke Piece Bar | Ya | |
| Putar dan balik: klik kanan, `R`, `Shift+R`, `F` | Ya | |
| Rotate tool, rotasi bebas untuk Any, snap ke 90° dalam 8° | Ya | |
| Shoot: seret kanan, alat Shoot, `Ctrl+Arrow` | Ya | |
| Geser sedikit menurut Manual Moving Step | Ya | |
| Place Selected Bundles, Place All, Place One Bundle | Ya | |
| Select Whole Bundle, multi-seleksi dengan `Ctrl`, `Shift`, dan persegi | Ya | |
| Clear Marker | Ya | |
| Text Tool (anotasi marker) | Tidak | Dijadwalkan untuk Fase 2; belum dirilis. |
| Cutting Order, Optimize Cut Order, Bump/Cut Lines | Tidak | Dijadwalkan untuk Fase 2; belum dirilis. |
| Tilt, Insert To Hole | Tidak | Fase 3. Preferensi Tilt Step tetap disimpan. |
| Cluster Pieces, Delete Cluster, Fix On Marker | Tidak | Fase 3. |
| Optimum Block Fuse, Rectangular Block Fuse | Tidak | Fase 3. |
| Substitute Size | Tidak | Fase 3. |
| Pencocokan belang dan kotak-kotak, cacat kain, buffer potongan per sisi | Tidak | Fase 3. |

### Auto nesting, laporan, dan keluaran

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Start Auto Nesting dengan kemajuan langsung dan Cancel | Ya | Mesin sendiri (no-fit polygon, bottom-left fill, annealing); Optitex menjalankan mesin pihak ketiga. |
| Auto Nesting Setup: batas waktu, batas efisiensi, panjang tak terbatas, pertahankan potongan yang ditata, seed | Sebagian | Optitex juga menawarkan pilihan mesin, pengelompokan bundle, dan opsi blok; itu tidak ditiru. |
| Nesting Queue | Tidak | Fase 3. |
| Metrik marker: panjang terpakai, efisiensi, limbah, panjang potong, per garmen, berat per bundle | Ya | |
| Report to Excel | Sebagian | Ditulis sebagai CSV, bukan berkas Excel: bagian General, Order, Pieces, dan Notches. |
| Report as PDF | Ya | |
| Plot ke PDF (ubin A4, A0) dan HPGL/2, Plotter Setup | Ya | |
| Berkas potong | Sebagian | Satu berkas potong HPGL/2 generik. Format pemotong vendor tidak ditulis. |
| Time Calculation, Label Text Order, Opstop, Auto Save of Markers | Tidak | Fitur driver pemotong dan otomatisasi Optitex, di luar lingkup. |

## Cut Plan

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Style dan rincian order: Order Name, Client, Operator | Ya | |
| Warna dan jumlah per ukuran, dengan total | Ya | |
| Use Sizes Ratio, pembulatan sisa terbesar | Ya | |
| Deviasi per sel, tanpa pemotongan kurang | Ya | |
| Impor CSV jumlah | Ya | |
| Material: nama, lebar, ply mode (Single, Tubular, Faced, Folded), penyusutan, biaya per meter, berat | Ya | |
| Batas marker: panjang maksimum, lapis minimum dan maksimum, bundle maksimum, batas limbah, kelonggaran ujung | Ya | |
| Efisiensi perkiraan, bagian biaya material | Ya | |
| Perencanaan lay: marker, lapis, dan rasio | Ya | Penyelesai greedy deterministik; Optitex tidak menerbitkan miliknya sendiri. |
| Nest Markers: panjang nesting sebenarnya menggantikan perkiraan, marker disimpan sebagai `.rjm` | Ya | |
| Results: marker, lay, dipesan, direncanakan, dan selisih, total dan biaya | Ya | |
| Sunting manual lapis dan rasio | Ya | |
| Laporan Cut Plan (CSV, PDF) dan Production Report | Ya | |
| Cut Order: urutan lay | Ya | |
| Fabric Rolls: kode, warna, shade, lebar, panjang, impor CSV | Ya | |
| Alokasi gulungan, Remnants, kain yang kurang | Ya | Ply utuh per gulungan; menyambung satu Ply lintas dua gulungan tidak direncanakan. |
| Validasi: ukuran, jumlah, batas, lebar | Sebagian | Panjang maksimum di bawah Bundle tunggal terpanjang ditandai, tidak ditolak. Potongan yang lebih lebar daripada Material tertangkap saat nesting, bukan saat memperkirakan. |
| Grup penghamparan yang mencampur Material | Tidak | Fase 3. |
| Inventaris gudang kain yang dipakai bersama antarrencana, ekspor daftar gulungan | Tidak | Fase 3. Gulungan disimpan di tiap rencana. |
| Grup gulungan menurut lebar dan penyusutan, masing-masing dengan marker sendiri | Tidak | Fase 3. |
| Beberapa meja potong per Material | Tidak | Fase 3. |
| Beberapa Style dalam satu Cut Plan | Tidak | Fase 3. |
| Eksekusi baris perintah | Tidak | Tidak direncanakan. |

## Pertukaran, shell, dan platform

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Impor dan ekspor DXF ASTM D6673 | Ya | Hanya DXF ASCII; DXF biner ditolak dengan pesan. Setiap entitas yang dilewati atau didekati dicantumkan di Import Report. |
| Impor dan ekspor DXF AAMA-292 | Sebagian | AAMA-292 sendiri tidak dibuka untuk umum. Layer mengikuti peninggalan ASTM D6673; ekspor menulis header R12 dan hanya layer 1 sampai 15. |
| Graded nest dan berkas aturan grade ASTM RUL | Ya | |
| Plot ke PDF (ubin A4, A0, A4 fit) dan HPGL/2 | Ya | |
| Laporan CSV dan daftar jumlah | Ya | |
| Dokumen Style, Marker, dan Cut Plan | Ya | `.rjx`, `.rjm`, dan `.rjc` milik rajutara sendiri (zip dan JSON). Simpan bersifat atomik dan menyimpan `.bak`. |
| Urungkan dan ulangi | Ya | |
| Simpan otomatis dan pemulihan setelah crash | Ya | |
| Panel yang bisa di-dock, satu jendela untuk PDS, Grading, Marker, dan Cut Plan | Ya | Optitex menyediakannya sebagai program terpisah. |
| Menu, toolbar, dan pintasan bawaan Optitex 15 | Sebagian | Pintasan keypad dipetakan ulang karena egui tidak bisa membedakan tombol keypad dari tombol baris utama. |
| Windows 7 dan yang lebih baru, 32-bit dan 64-bit | Sebagian | Dibuat dan diperiksa di bawah Wine dan oleh gerbang tabel impor; belum dijalankan di perangkat keras Windows 7 sungguhan. |
| macOS | Tidak | Belum diuji, tidak dikecualikan. |
| Berkas asli Optitex (`.pds`, `.mrk`, `.dsn`, `.ord`) | Tidak | Tidak pernah dibaca atau ditulis (ADR-0001). |
| Driver pemotong vendor | Tidak | Di luar lingkup; keluarannya HPGL/2. |
| Simulasi garmen 3D (jendela PDS 3D, 3D Runway) | Tidak | Hanya kontrak antarmuka ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |
| O/Cloud | Tidak | Tidak ditiru. |
| Skrip batch Optitex Shell | Tidak | Tidak ditiru. |
