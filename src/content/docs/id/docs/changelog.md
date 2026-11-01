---
title: Catatan perubahan
description: Apa yang berubah di setiap rilis Rajutara.
---

Semua perubahan penting pada rajutara. Format: [Keep a Changelog](https://keepachangelog.com/), versi: [SemVer](https://semver.org/).

## [Unreleased]

## [1.3.0] - 2026-11-01

### Ditambahkan
- Membuka, menjatuhkan, atau memilih berkas `.pds`, `.mrk`, `.dsn`, atau `.ord` menampilkan dialog "Optitex file not supported" (bahasa Inggris dan Indonesia) yang mengarahkan ke ekspor DXF Optitex (AAMA/ASTM, dengan grading) dan punya tombol **Import DXF…**. Dideteksi hanya dari ekstensi; berkasnya tidak pernah dibaca, dan ekstensi itu tidak ada di filter dialog berkas mana pun (ADR-0001).
- **Select kini memindahkan potongan dengan seret** (`docs/spec/02-pds.md` T01). Tekan sebuah potongan (garis potongnya atau bagian dalamnya) dan seret: semua potongan terpilih berpindah, atau hanya potongan yang ditekan jika belum terpilih, dalam satu suntingan `cmd-move-piece` saat dilepas dengan snap, kunci sumbu, dan perilaku Grade Rule yang sama seperti Move Piece. Menyeret dari meja kosong tetap menggambar persegi seleksi, menekan titik, notch, atau garis dalam tetap memilihnya, seret dengan Shift dan Ctrl mempertahankan artinya, dan Esc membatalkan. Matikan di Preferences › Tools (`tools.select_drag_moves`, bawaan nyala).
- Contoh `line_25cm`: garis lurus 25 cm pada selembar

### Diperbaiki
- Menampilkan lagi panel yang disembunyikan membuat ulang panelnya di tempat bawaan (atas, kiri, atau bawah) alih-alih menambahkan tab ke Work Area; **View › Reset Layout** adalah aksi yang sama dengan Tools › Reset Workspace Layout.
- Alat Select aktif saat dokumen dibuka; alat yang sudah aktif dipertahankan.
- Tata letak dock tidak lagi bisa berakhir tersangkut sebagai satu panel. Menutup panel samping dan bawah lalu menampilkan lagi sebuah panel memasukkan tab-nya ke bilah tab Work Area, dan tata letak itu disimpan dan dimuat selamanya. Tata letak tersimpan yang panelnya berada di lebih sedikit panel daripada yang diberikan tata letak bawaan, atau yang tidak menampilkan maupun menyembunyikan panel bawaan, kini diganti dengan tata letak bawaan (dicatat di log) dan berkasnya ditimpa; panel yang disembunyikan dicatat dalam berkas (`hidden`), jadi menyembunyikannya tetap bertahan. Dock hanya digambar jika jendela memberinya setidaknya 400 × 300 poin (jendela splash tidak pernah), dan tata letak hanya ditulis untuk ruang kerja yang dock-nya digambar pada ukuran itu dan hanya jika berbeda dari isi berkas.

## [1.2.0] - 2026-11-01

### Ditambahkan
- **Wizard impor DXF** (`docs/spec/02-pds.md` §8.1). File › File Utilities › Import From CAD/CAM Files… membuka tiga langkah: **File** (DXF dan `.rul` opsional; `.rul` dengan nama sama dengan DXF diisikan otomatis), **Preview** (dibaca pada pekerjaan latar yang dihentikan Back atau Esc: format, satuan, potongan, ukuran, ukuran gambar, jumlah kesalahan dan peringatan, layer dalam berkas, masalah, dan thumbnail garis tepi) dan **Options** (mode garis Sew atau Cut, satuan, ukuran yang mana, dan bidang Import Setup lama di bawah More options). Berkas yang tidak bisa diimpor, path yang tidak ada, dan bidang yang tidak bisa diurai menghalangi langkah berikutnya dengan alasannya. Esc menutup wizard di setiap langkah. Membuka, menjatuhkan, atau memilih `.dxf` terbaru langsung mulai membaca berkas; impor dengan opsi dari preview membuka Style yang dibaca preview alih-alih membaca berkas lagi.
- **Tur pertama kali** (`docs/spec/07-ui-shell.md` §2). Start pertama menampilkan lima langkah di atas jendela, masing-masing dengan cincin di sekeliling bagian yang dijelaskan (kartu awal, Toolbox, tab Grading, Marker, dan Cut Plan), Next, Back, Skip Tour, dan Esc. Tur tidak muncul lagi setelah selesai atau dilewati; Help › Show Tour membukanya lagi. Berkas preferensi yang ditulis sebelum versi ini dianggap sudah melihatnya.
- `rajutara-io`: `DxfImportOptions::line_mode` (`Sew` mempertahankan perilaku lama, `Cut` mempertahankan batas sebagai garis potong dan layer 14 sebagai garis Sew dalam), `import_dxf_with_rul_cancellable` (berkas aturan eksplisit), dan `DxfFileInfo` (satuan, dialek, dan entitas per layer).

### Diperbaiki
- Opsi impor tidak pernah muncul selama tidak ada dokumen terbuka (**Import DXF…** pada kartu sambutan): ruang kerja PDS kini menggambar jendelanya lewat hook `Module::dialogs` yang baru.

## [1.1.0] - 2026-11-01

Namanya diganti dari Rajutara menjadi **Rajutara** (*rajut* = knit, *tara* = seimbang). Berkas asli kini `.rjx` / `.rjm` / `.rjc`; berkas lama tetap terbuka.

### Ditambahkan
- Splash saat start seperti LibreOffice: jendela kecil (640 × 262), di tengah, tanpa bingkai dengan karya seni pemilik, bilah kemajuan sungguhan, dan baris status (bahasa, ikon, modul, tata letak, setiap argumen berkas), ditampilkan setidaknya 600 md. Setelah itu berubah menjadi jendela ruang kerja dalam satu frame (dekorasi nyala, tanpa pudar). Ruang kerja terbuka **maksimal** pada run pertama; sesudahnya ukuran, posisi, dan status maksimal dari keluar terakhir dipulihkan dari `window.json` di direktori konfigurasi. `--smoke` tetap membuka satu jendela tetap 1280 × 800 tanpa menunggu, jadi `first_frame_ms` tetap mengukur waktu sampai kanvas siap dipakai.
- Help › About mencantumkan karya seni sebagai milik pemilik proyek.
- Panel History: arahkan kursor ke satu baris untuk mempratinjau langkah itu di kanvas (hanya baca, tidak ada yang diurungkan), nama potongan dan waktu relatif ("2 min ago") pada setiap baris, tanda disk pada baris tempat dokumen terakhir disimpan, dan sakelar "Compare with before" hanya per sesi yang menggambar potongan yang disentuh perintah terakhir sebagai bayangan putus-putus abu-abu dari langkah sebelumnya. `History::peek`, `History::entries`, `History::saved_generation`, dan `Command::touched` baru di `rajutara-core` (bersifat tambahan); `Document::mark_saved` kini mencatat generasi tersimpan di `History`.
- **Mode tema.** Tema kini bisa mengikuti sistem operasi: `System` adalah bawaan baru di samping `Dark` dan `Light`, diterapkan setiap frame sehingga perubahan OS langsung terlihat (gelap bila sistem tidak menyatakan; Windows 7 melaporkan terang). Kontrol tiga tombol (System, Dark, Light) berada di ujung kanan bilah menu; View › Theme dan Preferences › Appearance tetap selaras dengannya. Preferensi kini versi 2; `Light` atau `Dark` yang tersimpan dipertahankan, dan build 1.0 menolak berkas yang lebih baru alih-alih salah membacanya.
- **Pemeriksaan pembaruan dan pembaruan mandiri** (`docs/spec/07-ui-shell.md` §14, ADR-0015). Sekali sehari saat start, diam-diam, Rajutara menanyakan rilis terbaru ke GitHub (`update.repo`, bawaan `madmouse17/rajutara`; Preferences › General mematikannya). Selama rilis yang lebih baru ada, tombol oranye **Update available · v1.x** muncul di kiri kontrol tema dan membuka dialog dengan catatan rilis dan **Download and Install**; Help › Check for Updates… memeriksa atas permintaan dan selalu menjawab. Linux mengganti AppImage secara atomik dan menawarkan **Restart Now**; Windows menjalankan `.msi` lewat `msiexec` setelah **Install and Close**. Dependensi baru `ureq` 3 (`rustls`, `json`; tanpa OpenSSL, tanpa runtime async); `deny.toml` dan `about.toml` mengizinkan `CDLA-Permissive-2.0` (data `webpki-roots`) dan melewati `getrandom` 0.2 yang duplikat. Build debug menghormati `RAJUTARA_FAKE_UPDATE=1.9.9` untuk menampilkan tombol tanpa permintaan.
- **Layar sambutan.** Selama PDS atau Grading belum punya dokumen, Work Area menampilkan kartu dengan logo, **New Style**, **Open…**, **Import DXF…**, **Open sample "Kaos Lengan Pendek"**, dan lima berkas terbaru. Contohnya dikompilasi ke dalam program dan ditulis ke `samples/` di direktori konfigurasi setiap kali dibuka.
- **File › Close** (`Ctrl+Shift+W`) menutup dokumen aktif. Dokumen dengan perubahan belum tersimpan bertanya Save / Don't Save / Cancel lebih dulu (`Esc` adalah Cancel); berkas simpan otomatisnya ikut hilang. Keluar dan tombol tutup jendela bertanya hal yang sama.
- **File › Open Recent** menyimpan 10 berkas terbaru dari setiap jenis (Style, DXF, Marker, Cut Plan), mengelompokkannya menurut jenis, memindahkan berkas ke depan pada setiap buka dan simpan, dan menampilkan berkas yang sudah hilang dalam warna abu-abu. Sebelumnya satu daftar berisi 8.
- **Seret dan jatuhkan:** berkas yang dijatuhkan di jendela terbuka menurut ekstensi (`.rjx`, `.rjm`, `.rjc`, `.dxf`); berkas lain mendapat pemberitahuan.
- **Pencarian Toolbox** (View › Search Tools): menyaring alat secara langsung menurut nama Inggris, Indonesia, atau Optitex; `Enter` menjalankan kecocokan pertama, `Esc` mengosongkan; `/` saat panel Toolbox terfokus, atau mengetik dengan fokus keyboard pada tombol alat, memulai pencarian. Tidak punya chord: `Ctrl+Shift+F` tetap Fold Out milik Optitex.
- **Diganti namanya dari Rajutara.** Berkas dengan ekstensi lama `.optx`, `.optm`, dan `.optc` tetap terbuka (File › Open, seret dan jatuhkan, baris perintah; dialog buka mencantumkannya di bawah "Legacy Rajutara files"); berkas terbuka tanpa judul dan Save menulis `.rjx`, `.rjm`, atau `.rjc`. Pada run pertama, direktori konfigurasi lama `Rajutara` (preferensi, tata letak, jendela) disalin ke `rajutara` sekali. AppImage mendaftarkan tipe MIME untuk keenam ekstensi.
- Tooltip toolbar dan Toolbox berbunyi `Name  · shortcut  · Optitex: name`.
- `Ctrl` + roda menggeser kanvas secara horizontal dan `Shift` + roda secara vertikal; peta roda ada di `docs/spec/07-ui-shell.md` §4.1. Ctrl + roda tidak lagi men-zoom; pinch tetap.

## [1.0.0] - 2026-11-01

Rilis pertama. CAD pakaian clean-room untuk Linux (acuan) dan Windows 7+ (dibuat silang), lihat `docs/adr/`.

### Ditambahkan
- Ruang kerja **PDS**: 89 alat pola (drafting, titik, notch, kampuh, kup, lipit, walk, cermin, pisah/gabung, fullness, spiral, gusset), panel Pieces/Properties/History, Plot (A4 berubin, A0, HPGL/2).
- Ruang kerja **Grading**: Size Table, Grade Rules, Rule Table, tampilan Graded Nest, 29 alat grading, ekspor graded nest ASTM + RUL.
- Ruang kerja **Marker**: penataan manual (seret, putar, balik, bump, Shoot), mesin nesting otomatis (no-fit polygon dengan ring convolution, bottom-left fill, simulated annealing; deterministik menurut seed; `Stop::Time` adalah batas waktu dinding yang keras), laporan marker, plot HPGL/2 dan berkas potong.
- Ruang kerja **Cut Plan**: order (mode rasio, impor CSV), penyelesai perencanaan lay, nesting, konsumsi dan biaya, Cut Order dengan Fabric Rolls (urutan, alokasi gulungan, sisa), laporan CSV/PDF.
- Pertukaran: impor dan ekspor DXF ASTM D6673 / AAMA-292, berkas aturan grade RUL; `.rjx` / `.rjm` / `.rjc` asli (zip + JSON, format 2).
- Shell: panel yang bisa di-dock, palet perintah, pintasan keyboard, tema terang/gelap, UI bahasa Inggris dan Indonesia, simpan otomatis dengan pemulihan setelah crash, pemeriksaan mandiri `--smoke`.
- Pengemasan: AppImage Linux; `.zip` (portabel) dan `.msi` (pemasang) Windows x64/x86 dengan OpenGL perangkat lunak Mesa opsional, Windows 7 SP1 sampai Windows 11.

### Batasan yang diketahui
- Build Windows hanya diverifikasi di bawah Wine dan gerbang impor; uji di perangkat keras nyata masih tertunda.
- 3D (setara Runway) hanya antarmuka (ADR-0005).
- Driver pemotong vendor tidak disertakan; berkas potongnya hanya HPGL/2 generik.
