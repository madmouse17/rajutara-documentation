---
title: Daftar paritas
description: Apa yang ditemukan Operator terlatih Optitex 15 di Rajutara 2.0.0, modul demi modul.
---

Apa yang ditemukan Operator terlatih Optitex 15 di rajutara, modul demi modul, per 2.0.0 (batch 0 serta gelombang A dan B, dirilis di 1.5.0 bersama perbaikan 1.5.1, dan gelombang C, dirilis di 2.0.0; lihat `CHANGELOG.md`). rajutara meniru pembagian modul, nama alat, dan workflow Optitex 15 ([`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §3); rajutara tidak menyalin berkas atau format Optitex apa pun ([ADR-0001](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0001-clean-room-no-reverse-engineering.md)).

Baris-barisnya berasal dari tabel cakupan rencana implementasi (disimpan di luar repositori), dari tabel "not mirrored" pada spesifikasi, dan dari kode: aksi yang didaftarkan sebagai nonaktif, atau kontrol yang digambar nonaktif, tidak dihitung sebagai sudah dirilis. Ke-117 id aksi PDS pada tabel cakupan PDS semuanya ada di `crates/rajutara-pds`. Nomor alat (`T01`, `G01`) adalah nomor spesifikasi ([`02-pds.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/02-pds.md) §5, [`03-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/03-grading.md) §6). Dalam catatan, "(1.5.0)" menandai apa yang berubah setelah 1.4.0 dan "(2.0.0)" apa yang ditambahkan gelombang C. `[gap]` menandai titik yang tidak dijelaskan sumber publik mana pun tentang perilaku Optitex, sehingga rajutara memilih aturannya sendiri atau tidak membuat butir itu. Apa yang ditambahkan Optitex setelah versi 15 ada di [`08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md). Lapisan perintah agen (`rajutara mcp`, `playbook`, `kb`, memori asisten) tidak punya padanan Optitex dan tidak dicantumkan di sini; lihat [`07-ui-shell.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/07-ui-shell.md) §15.

| Status | Arti |
|---|---|
| Ya | Sudah dibuat dan aktif. |
| Sebagian | Sudah dibuat dengan celah yang terdokumentasi: sebagian dinonaktifkan, didekati, atau dijangkau dengan cara lain. Catatan menyebut yang mana. |
| Tidak | Belum dibuat. Catatan menyebut apakah spesifikasi menjadwalkannya atau mengesampingkannya, dan alasannya. |

## Ringkasan

| Modul | Ya | Sebagian | Tidak |
|---|---|---|---|
| PDS | 114 | 4 | 5 |
| Grading | 38 | 0 | 2 |
| Marker | 44 | 3 | 1 |
| Cut Plan | 24 | 0 | 0 |
| Pertukaran, shell, dan platform | 11 | 4 | 5 |

Tidak dibuat, berdasarkan keputusan: Seam and Stitch Manager (3D), Swap Zone Segment Tool, dan Move Piece On Piece Tool (tidak ada perilaku publik), Dynamic Measurement Chart dan made-to-measure (ADR-0004). Ditunda: panel Segment Editor dan Use Darts, Snap To Track Lines, Options dan jendela grup Equal Segments, Quality Text di Marker, pelipatan otomatis oleh Auto Nesting, opsi Nesting Additional Mixing, Optimize Last Bundles, dan Idle Time, serta dialog Batch di jendela. Catatan setiap baris menyebut celah yang lebih kecil.

## PDS (desain pola)

Seluruh 101 alat T01 sampai T101. "Baseline" Optitex adalah "Grainline" dan "Button" adalah "Drill Hole" di rajutara ([`GLOSSARY.md`](https://github.com/madmouse17/rajutara/blob/main/GLOSSARY.md)).

### Umum: seleksi, tampilan, berkas, dan laporan

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T01 Select Tool | Ya | |
| T02 Zoom By Rectangle, Zoom In, Zoom Out, Zoom All, Zoom Real, Zoom Selection | Ya | `Num+`, `Ctrl+Num+`, dan `Ctrl+Shift+Num+` bekerja seperti di Optitex (1.5.0): egui melaporkan `+` keypad dan `Shift+=` sebagai tombol yang sama, jadi tombol fisiknya yang membedakan. `Num-` tetap `Ctrl+-`. |
| T03 Pan | Ya | |
| T04 Guide Lines, Guideline Through | Ya | |
| T05 Piece Info, Piece Properties | Ya | (1.5.0) Piece Properties mendapat Color (isian milik potongan sendiri, atau Auto), One line dan Separator untuk Description Text, serta Fixed Placement (`02-pds.md` §4.3). Di menu Piece item ini berbunyi "Info", seperti submenu Optitex. (2.0.0) Tilt, Max Tilt potongan di Marker (0 sampai 90°). |
| T06 Lock Piece | Ya | |
| T19 Cut, Copy and Paste pieces | Ya | Menempel ke Style dengan Size Table lain membuka dialog pemetaan ukuran. (2.0.0) Paste antar-Style dengan Base Size berbeda mempertahankan setiap ukuran di tempatnya. Preferences › PDS › Copied pieces › Auto Renumber menamai salinan dengan akhiran `_n` sumber ditambah satu, atau `_1`. |
| T20 Delete Piece | Ya | |
| T21 Piece Update, Save Active as New | Ya | (2.0.0) Save Active as New mengikuti Auto Renumber. |
| T22 Merge Style File | Ya | (2.0.0) Special Merge Sizes List juga menggabungkan ukuran (Cross Grading, lihat Grading). |
| T23 Arrange For Plot | Ya | |
| T24 Style Area And Perimeter | Ya | |
| T65 Select Internals Tool | Ya | |
| T69 Text Tool | Ya | (1.5.0) Tekan blok deskripsi sebuah potongan dan seret untuk memindahkannya; `Alt+klik` pada blok itu menyunting tinggi dan sudutnya (tata letak label O/25). (2.0.0) Annotation Properties › Text in sizes memuat satu teks per ukuran; kosong berarti teks utama. |
| T79 Measure Tool | Ya | |
| T80 Compare Length window | Ya | |
| Report to Excel | Ya | (1.5.0) Menulis workbook Excel `.xlsx` (satu lembar kerja); sebelumnya CSV. |

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
| T74 Build Piece Tool | Ya | (2.0.0) Titik pada Internal Line mengambil grading yang diinterpolasi sepanjang garis itu (`02-pds.md` §12.6). |
| T75 Trace Segments Tool | Ya | |

### Drafting dan titik

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T25 Draft Tool | Ya | (1.5.0) Dynamic Input: ketik Length, `Tab` ke Angle, `Enter` menempatkan titik. Polar Tracking mendaratkan titik pada sinar 45° atau tegak lurus. Keduanya sakelar di bilah status dan di View (`02-pds.md` §2.3, §6.1). Advanced Snap dan Interactive Guide Lines belum dibuat. |
| T26 Arc | Ya | |
| T27 Add Point On Contour Tool | Ya | (1.5.0) Tempat dan jaraknya tampil sebelum klik; `Alt+klik` dan Proportional 0.5 menaruh titik di tengah, seperti di Optitex. Point Name adalah bidang di dialog dan di Point Properties; namanya disimpan di berkas, tidak digambar. |
| T28 Point Tool | Ya | |
| T29 Move Point Tool | Ya | (1.5.0) Bekerja dengan tekan, seret, dan lepas, selain klik, klik. |
| T30 Move Point Along Contour | Ya | (1.5.0) Meluncur dari Grade Point ke Grade Point, dengan klik atau seret. |
| T31 Move Points Proportionally Tool | Ya | |
| T32 Move Points Parallelly | Ya | |
| T33 Multi Move Tool | Ya | |
| T34 Toggle Grade Point, Toggle Curve Point | Ya | `Alt+1` dan `Alt+2` menggantikan angka keypad, yang tidak bisa dibedakan egui dari baris utama. |
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
| T43 Segment Length | Ya | (2.0.0) Moving end Both ends menggeser setiap ujung setengah dari perubahan; Extend By Curve ditolak dengan Both ends. |
| T44 Create Parallel | Ya | |
| T45 Extend in Parallel | Ya | (1.5.0) Menanyakan jarak dalam dialog setelah titik pertama dan terakhir dipilih. (2.0.0) Tetangga yang tidak terjangkau disambung dengan langkah lurus, dan pemberitahuan menyebut titiknya (`02-pds.md` §12.6). |
| T46 Create By Offsets | Ya | |
| T47 Create Point Connection, Add Points and Create Connection | Ya | |

### Notch dan garis dalam

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T48 Notch Tool | Ya | (1.5.0) Type I (celah lurus Optitex), Depth, dan Relationship Proportional 0.5 membuat penandaan celah di tengah segmen. (2.0.0) Preset penandaan: Preset dan Save as Preset… di dialog Notch Tool dan Notch Properties, View › Notch Presets… untuk mengganti nama dan menghapus; penandaan Box mendapat Top Width (`02-pds.md` §12.1). Penandaan yang jangkarnya dipasang ulang oleh suntingan titik tetap di tempatnya di setiap ukuran. Bentuk penandaan khusus buatan sendiri belum dibuat [gap]. |
| T49 Notch On Point | Ya | |
| T50 Add Points To All Notches | Ya | |
| T51 Change Multiple Internal Attributes | Ya | (2.0.0) Filter Min dan Max untuk kedalaman, lebar, dan Top Width penandaan, serta untuk jari-jari lubang bor. |
| T60 Circle Tool, Circle By Three Points | Ya | |
| T61 Button Tool | Ya | Disebut Drill Hole. (2.0.0) Drill Hole Properties › Appearance in sizes: satu centang per ukuran. |
| T62 Add Several Buttons | Ya | Disebut Several Drill Holes. |
| T63 Add Several Lines | Ya | |
| T64 Move Or Copy Internal Tool | Ya | |
| T66 Join Internal Contours Tool | Ya | |
| T67 Trim Tool | Ya | |
| T68 Extend Internal Object | Ya | (1.5.0) Jumlah yang diketik menjadi jangkauan bawaan; segmen kontur ditolak dengan petunjuk ke Extend in Parallel. |
| T70 Copy, Paste Internal Object | Ya | |

### Kampuh

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T52 Add Seam, Seam Tool | Ya | |
| T53 Remove Seam, Remove Seam On Segment | Ya | |
| T54 Switch to Cut, Switch to Sew, Switch Pieces to SEW, Switch Pieces to CUT | Ya | (2.0.0) Menyebut berapa potongan yang garis tersimpannya berubah dan meminta Continue, dengan Do not ask again; Preferences › PDS › Confirm switching between sew and cut lines memunculkan pertanyaannya lagi. |
| T55 Reseam | Ya | Dipertahankan demi kebiasaan: garis kedua selalu diturunkan dari Seam Allowance, jadi tidak ada kampuh yang basi. |
| T56 Copy Seam, Paste Seam | Ya | |
| T57 Convert Seam To Internal | Ya | |
| T58 Convert Sew Internals To Seam | Ya | (2.0.0) Kup, lipit, dan garis cermin pindah ke garis jahit baru, atau tetap sebagai objek dalam dan pemberitahuan menyebut alasannya (`02-pds.md` §12.6). |
| T59 Cut Seam Angle Tool (Seam Corner) | Ya | (1.5.0) Intersect, Bevel, Square, Mirror, dan Custom; Custom menanyakan Depth A dan Depth B (mula-mula 5 mm) di dialog Seam Corner, bidang sudut Seam Tool, dan Point Properties. |

### Pisah, gabung, dan lipat

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T71 Cut Tool (Cut a Piece) | Ya | |
| T72 Cut Along Internal | Ya | |
| T73 Join Pieces Tool | Ya | |
| T76 Fold In Tool, Fold Out | Ya | |
| T77 Fold onto Point Tool (Point To Point Fold) | Ya | |
| T78 Walk Tool | Ya | (1.5.0) Support Notch: klik kontur potongan ketiga untuk berjalan terus di sepanjangnya; potongan yang bergerak mendapat penandaan di sambungan dengan Type dan Command dari Walk Options. Reconnect dan Grading Walking belum dibuat. |

### Kup, lipit, dan fullness

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T81 Dart Tool | Ya | |
| T82 Close Dart | Ya | (1.5.0) Tools › Darts › Reopen Darts (T101) membuka lagi setiap kup yang tertutup. |
| T83 Change Darts Overlap | Ya | |
| T84 Rotate Dart | Ya | Aksi yang sama dengan T81, seperti di Optitex. |
| T85 Add Fullness Tool | Ya | |
| T86 Pleat Tool | Ya | |
| T87 Pleat Line Tool | Ya | Garis lipat dan garis penempatan mengikuti aturan rajutara sendiri: halaman publik T87 tidak memberi geometrinya, dan gelombang C membiarkannya apa adanya [gap] (`02-pds.md` §12.6). |
| T88 Removing Excess Cloth Tool | Ya | (2.0.0) Garis dalam, lubang bor, dan teks dari area yang dipindah ikut berputar bersama Grade Rule-nya (`02-pds.md` §12.6). |
| T89 Gusset Tool | Ya | |

### Alat gelombang B (T90–T101)

| Alat Optitex 15 | Status | Catatan |
|---|---|---|
| T90 Segment Editor (Copy, Flip X/Y, Inverse, Use Grading, Use Notches, Paste Proportional, Paste Notches, Paste Between 2 Points, Paste As Internal Contour) | Sebagian | (1.5.0) Tools › Segment Editor, `Ctrl+G` menyalin. Tanpa panel Segment Editor ("Show"): alat tempel menggambar deret yang disalin di bawah penunjuk sebagai gantinya; Use Darts ditunda. |
| T91 Track Lines, Show Track Lines, Restore By Track Line, Clear Track Lines | Sebagian | (1.5.0) Bayangan kontur dan objek dalam (O/22), Base Size, hanya untuk sesi itu. Snap To Track Lines ditunda (perubahan mesin snap, nilai rendah). |
| T92 Wave Tool | Ya | (1.5.0) Toolbar Insert dan Design › Contour; New Wave atau Contour Change; `Tab` / `Shift+Tab` menambah dan mengurangi gelombang. |
| T93 Deform Internals (Transform Circle To Contour, Circle To Button, Button To Circle) | Ya | (1.5.0) Design › Deform Internals. |
| T94 Equal Segments (Definition, Show With Color) | Sebagian | (1.5.0) Grup deret tetap sama panjang atau bentuknya setelah setiap suntingan, dalam langkah urungkan yang sama. Tanpa jendela daftar grup; Equal Segments › Options (grup yang dibuat setelah Cut) ditunda. |
| T95 Fold Line to Line Tool | Ya | (1.5.0) Piece › Modify; melipat seluruh potongan, seperti Flip Along Line. |
| T96 Swap Piece Properties Tool | Ya | (1.5.0) Piece › General; dua potongan terpilih bertukar properti, bukan bentuk. |
| T97 Build Zone Tool, Trace Zone Tool, Create Pieces From Map, Correct All Pieces By Map | Ya | (1.5.0) Design › Internal to Piece. Preferensi zona memakai bawaan tetap (objek dalam ikut, Garis Serat dipertahankan). |
| Swap Zone Segment Tool | Tidak | Di luar: satu-satunya halaman publik hanya memberi ikon dan letaknya, tanpa perilaku. |
| T98 Spread Pieces, Gather Pieces | Ya | (1.5.0) Piece › Fabric And Stripes; Work Area dan plot menggambar salinan turunannya, Arrange For Plot menyisakan tempat untuknya. |
| T99 Fabric Pattern, View Fabric, Set Stripes Group, Stripes Ungroup, Relate Piece To Stripes | Ya | (1.5.0) Data belang disimpan dan digambar. (2.0.0) Marker mencocokkannya dengan Stripe Adjust (lihat Marker, `04-marker.md` §5.10). |
| T100 Save Placement, Restore Placement, Fixed Placement | Ya | (1.5.0) Piece › General dan Piece Properties. |
| T101 Reopen Darts | Ya | (1.5.0) Tools › Darts. |
| Move Piece On Piece Tool | Tidak | Di luar: satu-satunya halaman publik hanya memberi ikon dan letaknya (toolbar Edit, Toolbox Movement), tanpa perilaku. |

### Panel, tampilan, dan menu

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Pieces Window dan Pieces Table | Ya | |
| Panel Properties untuk potongan, titik, dan notch | Ya | |
| Panel View and Selection, History, Import Report, dan Compare Length | Ya | (1.5.0) View and Selection mendapat Show Track Lines dan View Fabric. |
| Style Set (View › Style Set, tombol `4`) | Ya | (2.0.0) Create, Remove, Duplicate (`@<name>`), Description, Add Pieces, Remove Pieces, dan Place, bidang cari, serta per baris Code, Description, Material, Quantity, Pair, dan X/Y Shrink (`02-pds.md` §12.3). New Marker, Marker Creation Wizard, dan Cut Plan › Add Style bisa menanamkan satu set. Set tidak bisa diganti namanya setelah dibuat. |
| Production Sheet | Ya | (2.0.0) File › Production Sheet…: PDF A4 berisi data Style, tabel potongan, gambar potongan Base Size, dan satu tabel per Measurement Chart. Tabel chart hanya menampilkan nilai terukur, tanpa kolom Spec dan Diff; Date adalah hari pencetakan (UTC), karena Style tidak punya bidang tanggal. |
| Toolbox dengan kategori yang bisa dilipat | Ya | |
| Penggaris, grid, garis panduan, dan snapping | Ya | |
| Sakelar bilah status: panjang segmen, kampuh, titik non-grade, snap | Ya | (1.5.0) Grade Point selalu digambar; sakelar Non Grade Points menambahkan titik lainnya. Sakelar Track Lines di bilah status (O/17) belum dibuat. |
| Penunjuk alat, garis karet, dan bacaan langsung | Ya | (1.5.0) Setiap alat punya penunjuknya (ikonnya pada crosshair, silang pindah, tanda dilarang di atas potongan terlindungi); setiap alat dua titik menampilkan garis karet dan bacaan sejak pilihan pertama. |
| Objek terpilih, aktif, dan yang di bawah kursor ditandai | Ya | (1.5.0) Warna tipis, garis tepi lebih tebal, tanda sudut pada potongan aktif, cincin dan goresan lebih tebal pada apa yang akan kena klik. |
| Piece Information Text di meja | Ya | (1.5.0) View › Piece Information Text; baris yang sama ikut ke plot dan DXF; One line dan Separator menggabungkannya. |
| Alat aktif ditandai di toolbar, Toolbox, dan bilah status | Ya | (1.5.0) |
| Keterangan submenu yang berbeda dari nama alat (Piece › Info, Contour › Smooth Segment, Equal Segments › Definition…) | Ya | (1.5.0) Keterangan Fluent `.menu` di menu; toolbar, tooltip, palet, dan menu klik kanan tetap memakai nama lengkap (`07-ui-shell.md` §9). |
| Theme Settings (menu Tools) | Ya | (1.5.0) Tools › Theme Settings › System / Dark / Light, sama dengan View › Theme. |
| Satuan kerja: sentimeter, milimeter, inci | Ya | |
| Digitizer, Data Exchange, Test Alternative Start Points, Printer Setup, Customize Excel Report | Tidak | Driver perangkat keras dan titik awal pemotong di luar lingkup; dialog OS menggantikan Printer Setup. Report to Excel di PDS punya kolom tetap; Marker dan Rencana Potong punya Customize Report sendiri (lihat di bawah). |
| Batch | Sebagian | (2.0.0) Tidak ada dialog Batch di jendela. `rajutara batch SCRIPT` menjalankan perintah Style (`@OPENSTYLE`, `@IMPORT`, `@SAVESTYLE`, `@EXPORTGRADEDNEST`, `@PRODUCTIONSHEET`, `@MEASUREMENTREPORT`) tanpa jendela (`07-ui-shell.md` §1.1, ADR-0016). |
| Piece › Cutting Order (PDS) | Tidak | Keluaran pemotong di luar lingkup. Marker punya Cutting Order sendiri (lihat Marker di bawah). |
| Seam and Stitch Manager | Tidak | Bagian dari 3D ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |

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
| G22 Stack Along Line | Ya | (1.5.0) Pilih satu segmen kontur, lalu Grading › Stack › Stack Along Line: deret setiap ukuran dipusatkan pada deret Base Size di titik tengah panjang busurnya dan diputar sejajar dengannya. Hanya tampilan; Restore Stack menghapusnya. Nonaktif, dengan alasannya, kecuali tepat satu segmen kontur terpilih. |
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
| Tampilan Check Grading | Ya | Bukan celah: pohon menu publik 2013 tidak punya item itu; topiknya dicakup Graded Nest (G29), Stack (G20–G23), dan Compare Length (T80). |
| Ekspor graded nest dan berkas RUL, impor graded nest | Ya | (2.0.0) Export Graded Nest › L-notches as L shapes, mati secara bawaan, menambahkan garis tepi L sebagai polyline di samping titik penandaan (`03-grading.md` §12.4). |
| Update Seam Grading, Reseam Segment (Keep Grading), Keep Grading In Auto Reseam | Ya | Tidak diperlukan: kampuh diturunkan pada setiap ukuran. |
| Sistem ukuran multidimensi (variations) | Ya | (2.0.0) Sizes Table › Current Size Variation, Insert, Append, Delete, dan Name; alat Grading dan Graded Nest bekerja pada variasi yang aktif. Grading › Reshape Variation Grading membuat satu daftar ukuran bernama `<variation size>-<main size>` dan ditolak di atas 99 ukuran (`03-grading.md` §12.1). Marker dan Rencana Potong baru melihat ukuran variasi setelah Reshape. |
| Cross Grading dengan menggabungkan berkas Style | Ya | (2.0.0) Merge Style File › Special Merge Sizes List: Style mempertahankan ukurannya dan mendapat ukuran lain dari berkas dalam urutan berkas; Base Size berkas ditandai `*`; satu langkah urungkan (§12.2). |
| Measurement Charts | Ya | (2.0.0) View › Measurement Charts dan Grading › Measure Definition: beberapa chart per Style, satu ukuran-ukur adalah jumlah bagian-bagiannya dikali faktor, toleransi, spesifikasi buyer per ukuran dengan baris Spec dan Diff, nilai di luar spesifikasi terbaca `OUT +5.0`. Import Spec… membaca `.csv`, `.xlsx`, atau `.ods`; Report… dan Out of Spec Report… menulis `.csv`, `.xlsx`, atau `.pdf` (§12.3). |
| Dynamic Measurement Chart, made-to-measure | Tidak | Pengubahan ukuran parametrik dikecualikan oleh [ADR-0004](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0004-rule-based-grading-not-parametric.md); Measurement Charts mengukur, tidak pernah mengubah ukuran. |
| Berkas rule-table Optitex | Tidak | Dikecualikan oleh ADR-0001. Format ASTM RUL yang terbuka dibaca dan ditulis sebagai gantinya ([ADR-0013](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0013-astm-rul-is-open-format.md)). |

## Marker

### Penyiapan dan panel

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| New Marker dengan Marker Properties: lebar, panjang, margin, buffer, penyusutan, berat kain, biaya per meter | Ya | (1.5.0) Satu dialog dengan Style (yang terbuka di PDS atau sebuah berkas), Material, dan Bundle per ukuran. (2.0.0) Style bisa ditanamkan sebagai salah satu Style Set-nya. |
| Material dan Ply Mode: Single | Ya | |
| Ply Mode Tubular, Faced, Folded | Ya | (1.5.0) Aktif di Marker Properties, Marker Definitions, New Marker, dan Marker Creation Wizard. Faced dan Folded memuat potongan berpasangan sekali (lapis lawan memberi cerminnya); per garmen memakai garmen setiap mode (`04-marker.md` §4, §8.1). (2.0.0) Piece › Place Folded, atau `U`, `D`, `L`, `R` yang ditahan saat menjatuhkan, membaringkan sepasang potongan sebagai satu separuh di tepi atau sudut lipat; mode lapis menentukan tepi mana yang dilipat (§5.9). Auto Nesting tidak pernah melipat sendiri (pelipatan otomatis Optitex) [gap]: potongan terlipat dibiarkan di tempatnya dan sisanya di-nesting tanpa dilipat. Pasangan terlipat memakai satu pose dan bentuk bersama [gap]. |
| Marker Creation Wizard (dengan bidang buffer) | Ya | (1.5.0) File › Marker Creation Wizard…: berkas Style, berkas Marker, jumlah, meja, properti global dengan buffer, properti potongan dengan rotasi, balik, dan buffer, lalu satu Marker belum tersimpan per baris (`04-marker.md` §1.1). (2.0.0) Berkas Style bisa ditanamkan sebagai salah satu Style Set-nya. Properti Overlay belum dibuat. |
| Add Style dari berkas atau dari Style yang terbuka di PDS | Ya | |
| Update from Style, pemberitahuan "style changed on disk" | Ya | (2.0.0) Mempertahankan Style Set yang tertanam, menghitung pasangan terlipat yang dibukanya, dan menyebut berkas sumber yang hilang. |
| Order: Bundles dan arah per ukuran (One Way, Opposite, Any) | Ya | |
| Marker Table: pita kain, margin, garis panjang terpakai, penggaris, arsiran tumpang tindih | Ya | |
| Piece Bar: thumbnail dengan sisa jumlah, urut ulang, multi-seleksi, klik ganda untuk menata | Ya | |
| Panel Piece List, Marker Properties, Order, dan Report | Ya | |
| Panel Pieces: yang ditata dan total per potongan dan ukuran | Ya | (1.5.0) |
| Bilah status: potongan, bundle, tumpang tindih, efisiensi, lebar, panjang, per garmen, lapis | Ya | |

### Penataan manual

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Menata dari Piece Bar dengan seret atau klik ganda | Ya | |
| Tata dengan klik, dengan bayangan potongan di bawah penunjuk | Ya | (1.5.0) Dari Piece Bar atau panel Pieces. |
| Pindah dengan seret, tumpang tindih diizinkan dan disorot | Ya | |
| Kembalikan ke Piece Bar | Ya | |
| Putar dan balik: klik kanan, `Shift+R`, `F3` atau `=` (90°), `F4` atau `-` (180°), `Shift+X`, `Shift+Y` | Ya | (1.5.0) Tombol mengikuti daftar Marker Optitex; `R`, `F`, dan `F9` khas rajutara sudah dihapus. |
| Rotate tool, rotasi bebas untuk Any, snap ke 90° dalam 8° | Ya | |
| Shoot: seret kanan, alat Shoot, `Shift+Arrow` | Ya | (1.5.0) `Shift+Arrow` menggantikan `Ctrl+Arrow` khas rajutara. Shoot berhenti di bump line. |
| Single Piece Gap | Ya | (1.5.0) Tools › Single Piece Gap dengan celah tembak dari Preferences › Marker: Shoot berhenti sejauh itu dari potongan lain, margin, dan bump line (`04-marker.md` §5.7). |
| Geser sedikit menurut Manual Moving Step | Ya | |
| Place Selected Bundles, Place All, Place One Bundle | Ya | |
| Select Whole Bundle, multi-seleksi dengan `Ctrl`, `Shift`, dan persegi | Ya | |
| Clear Marker | Ya | |
| Text Tool (anotasi marker) | Ya | (1.5.0) Piece › Text Tool (keterangan menu "Internal Text"): teks di meja atau pada potongan yang ditata, yang diikutinya; Apply To All Sizes; Remove dan Remove All; diplot, tidak pernah dipotong (`04-marker.md` §5.3). Quality Text dan Exclusive View belum dibuat. |
| Cutting Order (Selected Piece Cut Order), Optimize Cut Order, Cut/Plot Order | Ya | (1.5.0) Berkas potong mengikuti urutan, titik awal setiap potongan, dan arahnya, searah jarum jam secara bawaan (`04-marker.md` §9.2). Alat atau layer per urutan, overlap, dan Use Frame adalah kendali mesin potong dan belum dibuat. |
| Bump/Cut Lines | Ya | (1.5.0) Marker › Bump/ Cut Lines… dan Add Bumpline at Current Marker End; seret garis keluar dari tepi meja; menu klik kanan. Garis menghalangi Auto Nesting, perintah Place, dan Shoot; Cut line masuk ke berkas potong dengan overcut dan segmen minimal; garis ujung otomatis O/26 adalah sebuah pengaturan (`04-marker.md` §5.4). Lock dan OpStop adalah kendali mesin potong dan belum dibuat. |
| Insert To Hole | Ya | (1.5.0) Piece › Insert to Hole: seret potongan ke atas lubang dan potongan itu mengambil tempat terdekat yang muat, berputar bila perlu (`04-marker.md` §5). Beberapa potongan per seretan, Adjust, dan Adjust Rotate belum dibuat. |
| Tilt | Ya | (2.0.0) Piece › Tilt Left (`F11`) dan Tilt Right (`F12`) memutar potongan terpilih yang sudah ditata sebesar Tilt Step, dalam batas Max Tilt potongan (PDS Piece Properties atau Piece List), satu langkah urungkan (`04-marker.md` §5.11). Preferences › Marker › Ignore Automatic Tilt Rotations menyala secara bawaan [gap]; bila mati, Auto Nesting juga mencoba orientasi yang dimiringkan. |
| Fix On Marker (Fix on Marker, Unfix Selected, Unfix All) | Ya | Ikon pin, gerakan ditolak, dipertahankan oleh Auto Nesting (04 §5). |
| Cluster Pieces, Delete Cluster | Ya | (1.5.0) Cluster ditata, dipindah, ditembak, di-nesting, dan dikembalikan sebagai satu potongan. Cluster hanya bergeser: memutar atau membalik anggotanya ditolak dengan pemberitahuan (`04-marker.md` §5.1). |
| Optimum Block Fuse, Rectangular Block Fuse | Ya | (1.5.0) Fuse Block adalah cluster dengan batas pada celah tertentu; berkas potong memotong batasnya, bukan potongannya (`04-marker.md` §5.2). Berkas potong kedua berisi isi blok dan Thrifty Block Fuse (hanya Optitex 8) belum dibuat. |
| Substitute Size For Selected Pieces | Sebagian | (1.5.0) Grouping › Bundles: setiap potongan terpilih bertukar dengan salinan yang menunggu pada ukuran berikutnya, satu langkah urungkan (`04-marker.md` §5.6). Hanya ukuran berikutnya; dialog untuk memilih ukuran belum dibuat. |
| Flaws: Mark Flaw on the Marker, impor daftar cacat, Remove Pieces Hitting Flaws | Ya | (1.5.0) Marker › Flaws; Auto Nesting dan perintah Place menjauhkan potongan dari cacat, yang tidak pernah menambah panjang terpakai; daftar cacat memakai tata letak CSV milik rajutara sendiri (`04-marker.md` §5.5). Cacat digambar berarsir tetapi tidak diplot. |
| Pencocokan belang dan kotak-kotak | Ya | (2.0.0) Marker › Stripe Definition…, View › Stripes Lines, Tools › Stripe Adjust, Marker › Relate Piece to Stripes…, dan Grouping › Stripe Adjust Group (`Ctrl+G`), di atas Fabric Pattern, Stripe Group, dan titik belang dari PDS (T99). Potongan dengan titik belang menempel ke belang saat dijatuhkan, diseret sendirian, ditembak, atau dimasukkan ke lubang, dan Auto Nesting hanya menaruhnya di posisi belang (`04-marker.md` §5.10). Hanya potongan tunggal yang menempel: seleksi atau cluster bergerak sesuai seretan. Ukuran diagonal A/B/C/D (kedua sudut mencakupnya), warna belang yang berubah-ubah, Revise Pieces Placements, dan motif bunga belum dibuat [gap]. |
| Buffer potongan per sisi | Ya | (2.0.0) Piece › Edit Piece Buffer…: Around, Convex, Up, Down, Left, Right, rantai garis potong yang dipilih One by One atau Start-End dengan lebarnya sendiri, dan Round Corners; Apply to Selected atau to All Pieces, satu langkah urungkan; View › Piece Buffer menggambarnya (`04-marker.md` §5.8). Satu buffer melayani setiap ukuran, dan garis tepi buffer tidak bisa disunting titik demi titik [gap]. |

### Auto nesting, laporan, dan keluaran

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Start Auto Nesting dengan kemajuan langsung dan Stop | Ya | (1.5.0) Satu dialog: Start, kemajuan, Stop, dan ringkasan. Mesin sendiri (no-fit polygon, bottom-left fill, annealing); Optitex menjalankan mesin pihak ketiga. (2.0.0) Efficiency langsung diukur sama seperti hasilnya. |
| Auto Nesting Setup: batas waktu, batas efisiensi, panjang tak terbatas, pertahankan potongan yang ditata, seed | Sebagian | (2.0.0) Algorithm: Advanced (bawaan; minimisasi tumpang-tindih setelah awal Standard, mengembalikan yang lebih baik dari keduanya), Standard, dan Standard Quick (`04-marker.md` §6.3, §6.4, ADR-0019). Grouping: Nesting According To Bundles, Groups According to Sizes, Bundles Overlap Small, Medium, Large (5, 15, dan 30 % dari panjang area [gap]), Maintain Piece Orientation Within Bundles, Horizontal Groups 1 sampai 6 (Bundle k masuk ke lajur k mod n [gap]) dengan overlap-nya, dan Block Fuse During Nesting dengan lima modenya (§6.5). Write efficiency log (CSV) dan Save interim markers (O/25). Belum dibuat: Additional Mixing dan Optimize Last Bundles (tidak ada perilaku publik selain namanya), Idle Time, dan nama mesin Nest++ [gap]. |
| Nesting Queue | Ya | (1.5.0) Nesting › Auto Nest Queue…: beberapa berkas Marker di-nesting berurutan, masing-masing disimpan di samping masukannya sebagai `<stem>-nested.rjm` (`04-marker.md` §6.7). Setiap baris Regular atau Continue. (2.0.0) Setiap baris punya Algorithm dan mode Block Fuse sendiri. Tanpa berkas antrean. |
| Metrik marker: panjang terpakai, efisiensi, limbah, panjang potong, per garmen, berat per bundle | Ya | (1.5.0) Per garment menghitung garmen menurut mode lapis; cacat dan bump line tidak pernah menambah panjang terpakai. |
| Report to Excel | Ya | (1.5.0) Workbook Excel `.xlsx` dengan satu lembar kerja per bagian: General, Order, Pieces, dan Notches (`04-marker.md` §8.2). Sebelumnya CSV. (2.0.0) File › Customize Excel Report…: Show, Title, Move Up, dan Move Down per kolom dan tab, Restore Defaults, disimpan di Preferences; laporan Excel dan PDF mengikutinya, panel Report di layar tidak (§8.3). |
| Piece Description (Preferences › Marker) | Ya | (2.0.0) Bidang dan urutannya, Multi-Line, Separator, Alphabetical Bundle Names, Don't Reset Bundle Numbering for Each Size, Orientation Next to Bundle Number, Auto Adjust Description Text, teks tidak terbalik; tabel, plot, DXF, dan laporan mengikutinya (`04-marker.md` §9.4). |
| Laporan sebagai PDF (Print) | Ya |  |
| Plot ke PDF (ubin A4, A0) dan HPGL/2, Plotter Setup | Ya | |
| Berkas potong | Sebagian | Satu berkas potong HPGL/2 generik, dengan Cut line milik Marker (1.5.0). Format mesin potong vendor tidak ditulis. |
| Export to CAD/CAM Files | Ya | (2.0.0) File › Export to CAD/CAM Files…: DXF (rilis 12, milimeter) dari isi plot, label sebagai teks, satu warna per Bundle, dan satu layer per jenis elemen; Translate piece names memakai Piece Name Dictionary (`04-marker.md` §9.3, ADR-0017). |
| Time Calculation, Label Text Order, Opstop | Tidak | Fitur driver pemotong dan otomatisasi Optitex, di luar lingkup. |
| Auto Save of Markers | Ya | (2.0.0) Nesting › Auto Save Of Markers…, atau `@NEST /SM` di skrip batch: dengan panjang Marker terisi, susunan pertama tetap di Marker yang terbuka dan yang tidak muat di-nesting ke `<file>-1.rjm`, `<file>-2.rjm`, dan seterusnya (Optitex menamainya `MARKER-n`) [gap]. Save Only Nested Pieces (And Zero Remainders) dan Write Log Report To File (`04-marker.md` §6.8). Berkas NST (cncKad) di luar lingkup. |

## Cut Plan

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Style dan rincian order: Order Name, Client, Operator | Ya | (2.0.0) Per Purchase Order. |
| Purchase Orders | Ya | (2.0.0) Satu rencana memuat satu PO atau lebih, masing-masing dengan Order, jumlah, marker, dan Lay sendiri: Add PO, Duplicate PO, Rename, Remove PO; Solve All POs dan Nest All POs; perbandingan PO di Results dan satu set bagian laporan per PO (`05-cutplan.md` §11). |
| Warna dan jumlah per ukuran, dengan total | Ya | |
| Use Sizes Ratio, pembulatan sisa terbesar | Ya | |
| Deviasi per sel, tanpa pemotongan kurang | Ya | |
| Impor jumlah | Ya | `.csv`; (2.0.0) juga `.xlsx` dan `.ods`, sheet pertama. |
| Material: nama, lebar, ply mode (Single, Tubular, Faced, Folded), penyusutan, biaya per meter, berat | Ya | |
| Batas marker: panjang maksimum, lapis minimum dan maksimum, bundle maksimum, batas limbah, kelonggaran ujung | Ya | |
| Efisiensi perkiraan, bagian biaya material | Ya | |
| Perencanaan lay: marker, lapis, dan rasio | Ya | Penyelesai greedy deterministik; Optitex tidak menerbitkan miliknya sendiri. |
| Nest Markers: panjang nesting sebenarnya menggantikan perkiraan, marker disimpan sebagai `.rjm` | Ya | |
| Results: marker, lay, dipesan, direncanakan, dan selisih, total dan biaya | Ya | |
| Sunting manual lapis dan rasio | Ya | |
| Laporan Rencana Potong (CSV, PDF) dan Production Report | Ya | (2.0.0) Cut Plan › Customize Report… menyembunyikan, mengganti nama, dan mengubah urutan kolom setiap tabel, sama di CSV dan PDF (`05-cutplan.md` §14). |
| Cut Order: urutan lay | Ya | (2.0.0) Setiap Lay ditaruh di Cutting Table yang muat dengan kain terhampar paling sedikit sejauh ini. Dengan beberapa PO ada satu urutan, PO demi PO, dan PO berbagi gulungan [gap]. |
| Fabric Rolls: kode, warna, shade, lebar, panjang, impor | Ya | `.csv`; (2.0.0) juga `.xlsx` dan `.ods`. |
| Alokasi gulungan, Remnants, kain yang kurang | Ya | Ply utuh per gulungan; menyambung satu Ply lintas dua gulungan tidak direncanakan. |
| Validasi: ukuran, jumlah, batas, lebar | Ya | (1.5.0) Potongan yang lebih lebar dari Material ditolak oleh Solve dan Nest Markers, dengan namanya, sebelum nesting apa pun; berkasnya tetap terbuka, dengan peringatan, sehingga lebarnya bisa diperbaiki (`05-cutplan.md` §6). Panjang maksimum di bawah satu Bundle terpanjang tetap berupa peringatan: Bundle itu masih bisa dipotong, dan marker-nya ditandai "too long". |
| Grup penghamparan yang mencampur Material | Ya | (2.0.0) Cut Plan › Spreading Groups…: Material grup dipotong dari satu kain (lebar, penyusutan, dan biaya Material pertama), jadi markernya memuat potongan dari semuanya (`05-cutplan.md` §12). |
| Inventaris gudang kain yang dipakai bersama antarrencana, ekspor daftar gulungan | Ya | (2.0.0) Cut Plan › Fabric Room…, berkas gulungan `.csv` atau `.xlsx` yang diatur di Preferences › Cut Plan: Add, Remove, Import, Export, Take Rolls, dan Return Remnants (`05-cutplan.md` §13). Baris diubah dengan menghapus lalu menambahkannya lagi. |
| Grup gulungan menurut lebar dan penyusutan, masing-masing dengan marker sendiri | Ya | (2.0.0) Pengelompokan gulungan di panel Cut Order, menurut langkah lebar, penyusutan, dan shade; setiap grup direncanakan pada lebarnya sendiri dengan markernya sendiri (`05-cutplan.md` §12). |
| Beberapa meja potong per Material | Ya | (2.0.0) Cut Plan › Cutting Tables…: nama, panjang, lapis, dan kain opsional; satu kain mendapat batas dari mejanya yang terpanjang (`05-cutplan.md` §12). |
| Beberapa Style dalam satu Rencana Potong | Ya | (2.0.0) Cut Plan › Add Style…, utuh atau sebagai satu Style Set; setiap baris warna menyebut Style-nya; Styles and Materials… mendaftarnya (`05-cutplan.md` §12). Satu marker tidak pernah mencampur Style [gap]. |
| Eksekusi baris perintah | Ya | (2.0.0) `rajutara batch SCRIPT` dengan `@OPENCUTPLAN`, `@SOLVE`, `@NESTMARKERS`, `@CUTPLANREPORT`, `@SAVEMARKERS`, dan `@SAVECUTPLAN` (`07-ui-shell.md` §1.1, ADR-0016). |

## Pertukaran, shell, dan platform

| Fitur Optitex 15 | Status | Catatan |
|---|---|---|
| Impor dan ekspor DXF ASTM D6673 | Ya | Hanya DXF ASCII; DXF biner ditolak dengan pesan. Setiap entitas yang dilewati atau didekati dicantumkan di Import Report. |
| Impor dan ekspor DXF AAMA-292 | Sebagian | AAMA-292 sendiri tidak dibuka untuk umum. Layer mengikuti peninggalan ASTM D6673; ekspor menulis header R12 dan hanya layer 1 sampai 15. |
| Graded nest dan berkas aturan grade ASTM RUL | Ya | |
| Plot ke PDF (ubin A4, A0, A4 fit), HPGL/2, dan DXF | Ya | (2.0.0) Dialog Plot PDS mendapat target DXF (rilis 12, milimeter, warna pena) dan mengingat target terakhir (ADR-0017). |
| Berkas CSV dan spreadsheet | Ya | Laporan Rencana Potong, daftar jumlah, Fabric Roll, dan daftar cacat Marker. (2.0.0) Jumlah, Fabric Roll, Fabric Room, spesifikasi Measurement Chart, dan Piece Name Dictionary juga membaca `.xlsx` dan `.ods` (sheet pertama), dalam batas ukuran tetap. Workbook `.xls` lama ditolak. |
| Laporan workbook Excel (`.xlsx`) | Ya | (1.5.0) Report to Excel di PDS dan Marker; penulis minimal milik rajutara sendiri. (2.0.0) Membaca workbook memakai `calamine`. |
| Dokumen Style, Marker, dan Rencana Potong | Ya | `.rjx`, `.rjm`, dan `.rjc` milik rajutara sendiri (zip dan JSON). Simpan bersifat atomik dan menyimpan `.bak`. (2.0.0) Format native 3 (ADR-0018): 1.5.x dan yang lebih lama menolak berkas 2.0; 2.0 membuka berkas lama, dan Rencana Potong lama menjadi satu Purchase Order. |
| Piece Name Dictionary | Ya | (2.0.0) Tools › Piece Name Dictionary…: Name → Translation, Import dan Export (`.csv` atau `.xlsx`), disimpan di Preferences; plot PDS dan Marker serta Export to CAD/CAM mencetak terjemahannya bila Translate piece names menyala. |
| Pencarian Preferences | Ya | (2.0.0) Bidang di atas daftar halaman menemukan pengaturan menurut namanya dalam bahasa antarmuka atau bahasa Inggris, mengabaikan huruf besar-kecil dan aksen (`07-ui-shell.md` §10). |
| Urungkan dan ulangi | Ya | |
| Simpan otomatis dan pemulihan setelah crash | Ya | |
| Panel yang bisa di-dock, satu jendela untuk PDS, Grading, Marker, dan Cut Plan | Ya | Optitex menyediakannya sebagai program terpisah. |
| Menu, toolbar, dan pintasan bawaan Optitex 15 | Sebagian | Pintasan keypad dipetakan ulang karena egui tidak bisa membedakan tombol keypad dari tombol baris utama. (1.5.0) Submenu menampilkan keterangan Optitex bila berbeda dari nama alat. |
| Windows 7 dan yang lebih baru, 32-bit dan 64-bit | Sebagian | Dibuat dan diperiksa di bawah Wine dan oleh gerbang tabel impor; belum dijalankan di perangkat keras Windows 7 sungguhan. |
| macOS | Tidak | Belum diuji, tidak dikecualikan. |
| Berkas asli Optitex (`.pds`, `.mrk`, `.dsn`, `.ord`) | Tidak | Tidak pernah dibaca atau ditulis (ADR-0001). |
| Driver pemotong vendor | Tidak | Di luar lingkup; keluarannya HPGL/2. |
| Simulasi garmen 3D (jendela PDS 3D, 3D Runway) | Tidak | Hanya kontrak antarmuka ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |
| O/Cloud | Tidak | Tidak ditiru. |
| Skrip batch Optitex Shell | Sebagian | (2.0.0) `rajutara batch SCRIPT` membaca satu `@COMMAND /KEY=VALUE` per baris dengan nama batch Marker Optitex yang publik (`@OPEN`, `@NEST`, `@SAVE`, `@PLOTTER`, `@REPORT`, `@EXPORT`, dan lainnya) ditambah nama menu untuk perintah Style dan Rencana Potong (`07-ui-shell.md` §1.1, ADR-0016). Daftarnya tertutup: perintah atau kunci yang tidak dikenal menghentikan skrip sebelum berjalan, `@PAUSE` ditolak, dan `@CHNT`, `@CHBTN`, `/AF`, dan `/IB` belum dibuat. Arti `/BG`, `/BO`, `/GMIR`, `/SA`, `/ST`, `/CSP`, dan `/CCO` disimpulkan, belum dicocokkan dengan daftar publik [gap]. |
