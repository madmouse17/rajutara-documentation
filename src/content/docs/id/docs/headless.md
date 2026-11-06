---
title: Headless dan skrip
description: Periksa build dengan satu perintah, jalankan skrip batch, layani lapisan perintah MCP, jalankan playbook, kelola indeks pengetahuan lokal, dan baca dokumen dengan pustaka zip, dari skrip, CI, dan proses batch.
---

Skrip, tugas CI, dan proses batch bisa memeriksa build dan menghasilkan setiap keluaran workflow tanpa orang di depan layar. Halaman ini membahas pemeriksaan smoke, skrip batch, server MCP, playbook, indeks pengetahuan, contoh headless, dan dokumen itu sendiri.

## Baris perintah

```text
rajutara [--lang en|id] [FILE...]   open the window, then the files
rajutara --version                  print the version, the git hash and the target, exit 0
rajutara --smoke [FILE]             open the real window, render 60 frames, print one JSON line, exit 0
rajutara batch SCRIPT [--log FILE] [--json]
rajutara mcp [--tier basic|standard|advanced]
rajutara playbook list | show NAME|FILE
rajutara playbook start NAME|FILE [--param NAME=VALUE]... [--out DIR] [--profile FILE] [--model ID]
rajutara playbook step|resume RUN_DIR [--approve | --choose ID]
rajutara playbook replay RUN_DIR [--force]
rajutara playbook quick [ID [--param NAME=VALUE]...]
rajutara playbook compare NAME|FILE STAGE --scenarios FILE.json [--time-s N] [--open FILE]...
rajutara kb add FILE [--tag WORD]... | search WORDS... | list | remove ID
```

`batch`, `mcp`, `playbook`, dan `kb` juga menerima `--yes` (atau `--yolo`), `--role ROLE`, dan `--root DIR`; [Keamanan](#keamanan-root-peran-persetujuan-dan-cadangan) di bawah menjelaskannya. Keempatnya berjalan tanpa jendela. Mereka mencetak JSON atau baris hasil ke stdout dan semua yang lain ke stderr, jadi pemanggil bisa membaca stdout baris demi baris. Mereka memakai preferensi pengguna yang menjalankannya.

Flag yang tidak dikenal mencetak cara pakai dan keluar dengan 1.

## Pemeriksaan smoke

`--smoke` membuka jendela utama (dengan berkas, jika Anda memberikannya), merender 60 frame setelah frame pertama yang tergambar, mencetak satu baris JSON ke stdout, lalu menutup jendela. Keluar dengan 0, atau 2 dengan pesan di stderr jika jendela atau OpenGL gagal. Di mesin tanpa layar, jalankan di bawah layar virtual dengan rendering perangkat lunak Mesa:

```sh
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" target/release/rajutara --smoke
```

```json
{"frames":60,"first_frame_ms":56.5,"max_frame_cpu_ms":0.328,"warmup_ms":0.000,"peak_rss_kb":122392,"gl_renderer":"llvmpipe (LLVM 21.1.8, 256 bits)","gl_version":"4.5 (Core Profile) Mesa 26.0.8-1ubuntu0.3"}
```

| Bidang | Arti |
|---|---|
| `frames` | Frame yang dihitung setelah frame pertama yang tergambar. |
| `first_frame_ms` | Waktu dari mulai sampai frame pertama. |
| `max_frame_cpu_ms` | Waktu CPU frame yang paling lambat. |
| `warmup_ms` | Waktu yang terpakai sebelum frame dihitung. |
| `peak_rss_kb` | Memori residen puncak, dari `/proc/self/status` di Linux. Dihilangkan di tempat lain. |
| `gl_renderer`, `gl_version` | Konteks OpenGL yang didapat jendela. |

Nilainya berbeda di tiap mesin, kuncinya tidak. CI membaca baris ini untuk anggarannya: biner rilis, frame pertama, memori saat diam, dan waktu gambar marker 1000 potongan adalah uji coba, bukan harapan (`scripts/check-budgets.sh`). Baris yang sama menentukan apakah build Windows 7 lolos di bawah Wine. `--smoke` dengan berkas juga memuat dan memvalidasi berkas itu.

## Contoh headless

Workflow tidak punya jendela sendiri: crate pustaka penyusun program berjalan tanpa jendela. Contoh yang disertakan dengan repositori menyusun kaos contoh, men-grade-nya ke S, M, L, dan XL, melakukan nesting marker, dan menulis setiap keluaran workflow:

```sh
cargo run --release -p rajutara --example tshirt_sample -- out/
```

Contoh itu menulis style, marker hasil nesting, DXF ter-grade beserta RUL-nya, PDF marker A0, plot HPGL/2, laporan Excel (`.xlsx`), dan PDF potongan berubin A4. Itulah berkas di [galeri](/rajutara-documentation/id/gallery/).

Masukan dan pengaturan yang sama menghasilkan berkas identik byte demi byte. Header ekspor membawa cap waktu UTC, jadi hanya baris itu yang berbeda di antara dua ekspor. Mesin nesting menerima seed eksplisit, jadi uji coba bisa mengunci keluarannya. Proses yang berhenti karena batas waktu juga bergantung pada kecepatan mesin.

## Skrip batch

`rajutara batch SCRIPT` menjalankan skrip teks tanpa jendela. Setiap baris adalah satu perintah, `@NAME /KEY=VALUE`. Bila daftar batch Marker Optitex yang publik punya perintahnya, Rajutara memakai namanya. Perintah Style dan Rencana Potong, yang tidak punya nama batch di Optitex, memakai nama item menunya. Tidak ada variabel, perulangan, atau kondisi.

```text
; one order: two shirts in M and two in L on 150 cm fabric
@NEW /NA="Order 114"
@MARKER /HE=150 /LE=1000
@DESIGN /FI=shirt.rjx /SI=M /QU=2 /SI=L /QU=2
@NEST /AL=QUA /TI=1 /SEED=1
@SAVE /FI=order-114.rjm
@REPORT /FI=order-114.xlsx
@PLOTTER /FI=order-114.pdf /FO=PDF
```

- Baris yang diawali `;` adalah komentar. Nilai yang mengandung spasi ditulis dalam tanda kutip ganda. Kunci tanpa `=` berarti ya. Kunci boleh disingkat seperti bentuk Optitex: `/FI` untuk `/FILE`.
- Path relatif dimulai dari folder skrip. Panjang memakai satuan `@UNIT` (`/CM`, `/MM`, `/METER`, `/INCH`, `/FEET`, atau `/YARD`; bawaannya sentimeter). `/TIME` dalam menit.
- `@!`, `@EOF`, `@EXIT`, dan `@XEXIT` mengakhiri skrip.

| Kelompok | Perintah |
|---|---|
| Marker | `@NEW`, `@OPEN`, `@SAVE`, `@DESIGN`, `@IMPORT`, `@MARKER`, `@GLOBAL`, `@FLAW`, `@BUMPLINE`, `@PLACE`, `@NEST`, `@OPTIMIZEORDER`, `@CLEAR`, `@REPORT`, `@PLOTTER`, `@EXPORT`, `@DISPLAY` |
| Style | `@OPENSTYLE`, `@SAVESTYLE`, `@EXPORTGRADEDNEST`, `@PRODUCTIONSHEET`, `@MEASUREMENTREPORT` |
| Rencana Potong | `@OPENCUTPLAN`, `@SAVECUTPLAN`, `@SOLVE`, `@NESTMARKERS`, `@CUTPLANREPORT`, `@SAVEMARKERS` |
| Kendali skrip | `@UNIT`, `@XOE`, `@?`, `@PAUSE` (ditolak: skrip tidak punya orang untuk ditunggu) |

`@NEST` menerima Algorithm (`/AL=QUI`, `QUA`, atau `ADV` untuk Standard Quick, Standard, dan Advanced), opsi pengelompokan dan blok dari Auto Nesting Setup, `/SEED`, dan `/SM` untuk Auto Save Of Markers. `@SOLVE` dan `@NESTMARKERS` menerima `/PO` untuk menyebut satu Purchase Order.

Seluruh skrip diperiksa sebelum apa pun berjalan. Perintah yang tidak dikenal, kunci yang tidak dikenal, atau nilai dengan tipe yang salah menghentikannya dengan exit 1. Setiap baris lalu mencetak `line N @CMD ok: …` ke stdout atau `line N @CMD error: {…}` ke stderr; `--log FILE` menyimpan salinannya, dan `--json` mencetak setiap hasil sebagai JSON. Baris yang gagal tidak menghentikan skrip kecuali `@XOE` datang lebih dulu; `@?` mematikannya lagi. Kode keluar: 0 bila setiap baris berhasil, 1 untuk skrip yang ditolak, 2 bila satu baris gagal. Tanpa `--yes`, setiap simpan, timpa, dan hapus gagal dengan `confirmation_required`.

Baris hasil dicetak saat skrip selesai; berkas `--log` ditulis baris demi baris, jadi ikuti berkas itu untuk memantau skrip yang panjang.

Skrip yang ditulis untuk Rajutara tidak dijamin berjalan tanpa perubahan di Optitex, dan sebaliknya: namanya bertumpang tindih, tetapi perilakunya milik Rajutara ([ADR-0016](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0016-headless-batch.md)).

## Server MCP

`rajutara mcp` melayani lapisan perintah Rajutara ke klien MCP lewat stdin dan stdout: JSON-RPC 2.0 yang dibatasi baris baru, revisi protokol 2026-07-28, 2025-11-25, dan 2025-06-18. Log hanya ke stderr. Alat yang gagal menjawab dengan hasil bertanda `isError`, bukan galat JSON-RPC.

```sh
rajutara mcp --root ~/orders --tier standard
```

Lapisan perintah punya 85 alat bertipe, masing-masing dengan skema JSON untuk masukan dan keluarannya. Alat-alat itu mencakup dokumen, PDS, grading, Marker, Rencana Potong, biaya (pemakaian kain, biaya per garmen), pemeriksaan QC, playbook, indeks pengetahuan, dan memori asisten. `--tier basic|standard|advanced` membatasi alat yang didaftar server; advanced, bawaannya, mendaftar semuanya. Setiap perubahan melewati Undo dokumen, dan satu panggilan alat adalah satu langkah urungkan per dokumen.

Klien tidak mendapat pertanyaan konfirmasinya sendiri. Di luar titik persetujuan playbook yang sudah disetujui, simpan, timpa, hapus, atau buang menjawab `confirmation_required` kecuali server dimulai dengan `--yes`.

Server sendiri tidak melakukan panggilan jaringan. Klien MCP mengirim hasil alat ke penyedia modelnya sendiri, jadi apa yang dikembalikan alat, termasuk nama potongan dan jumlah order, keluar dari PC bila model klien berjalan di tempat lain. Rajutara 2.0.0 tidak memanggil model sendiri.

## Playbook

Playbook adalah resep TOML yang terdiri dari tahap. Setiap tahap menyebut alat yang boleh dipanggilnya, langkah yang dijalankannya, dan pemeriksaan yang dilaporkannya. Playbook berjalan lewat lapisan perintah, tanpa model.

| Playbook | Fungsinya |
|---|---|
| `impor-periksa` | Impor pola DXF dan periksa. |
| `qc-pola` | QC pola. |
| `pesanan-siap-potong` | Dari order ke rencana siap potong. |
| `optimasi-marker` | Atur dan nesting marker, bandingkan dengan target efisiensi, simpan, lalu plot dan potong. |

```sh
rajutara playbook show optimasi-marker
rajutara playbook start optimasi-marker --param marker=order-114.rjm --param width_mm=1500
rajutara playbook resume ~/.config/rajutara/assistant/runs/<run> --approve
```

`start` mencetak folder run ke stderr dan satu baris JSON per tahap ke stdout. Run menyimpan statusnya setelah setiap tahap di `runs/` dalam folder asisten (`~/.config/rajutara/assistant/` di Linux, `%APPDATA%\rajutara\config\assistant\` di Windows), atau di `--out DIR`. Run berhenti dengan exit 3 pada titik persetujuan atau pertanyaan. `resume` melanjutkan: `--approve` melewati titik persetujuan, `--choose ID` menjawab pertanyaan, dan `step` hanya menjalankan tahap berikutnya. Kode keluar: 0 selesai, 1 playbook atau parameter ditolak, 2 tahap gagal, 3 menunggu Operator.

Setiap run menyimpan catatan: versi aplikasi, versi dan hash playbook, hash profil bengkel, versi prompt, id model, dan seed nesting. `replay` mengulang run dengan parameter dan seed yang tercatat. `quick` mendaftar aksi cepat, yaitu playbook dengan parameter yang sudah terisi (`impor-dxf`, `qc-standar`, `siap-potong`, `optimasi-cepat`), dan `quick ID` memulai salah satunya. `compare` menjalankan satu tahap atas beberapa set parameter dari berkas JSON dan tidak mengubah dokumen.

Replay memberi hasil nesting yang sama hanya bila nesting berhenti berdasarkan iterasi dan berjalan di satu thread; batas waktu bergantung pada kecepatan mesin.

**Profil bengkel.** `profil-bengkel.toml` di folder asisten memuat standar bengkel, berlabel bahasa Indonesia: kampuh, penyusutan, batas lapis, buffer potongan, target efisiensi, waktu nesting, dan toleransi QC. Playbook mengambil nilai bawaannya dari sini, seperti `${profil.marker.target_efisiensi}`. Tanpa berkas itu, templat bawaan yang dipakai; `--profile FILE` menyebut berkas lain. Nilai tanpa sumber dilaporkan sebagai "perlu konfirmasi operator". Di 2.0.0, belum satu pun dari 13 nilai bawaan yang punya sumber.

**Memori.** Run yang selesai mengingat apa yang diajarkannya, seperti pemeriksaan yang gagal dan pilihan Operator, dan menyebut di stderr berapa pelajaran yang disimpan. Pelajaran, preferensi, fakta, dan koreksi tetap di PC ini, di `memory/` dalam folder asisten atau di `.rajutara/memory/` sebuah proyek. Hasil dokumen dan alat didahulukan, profil bengkel kedua, dan memori terakhir: memori yang bertentangan dengan keduanya ditandai usang.

## Indeks pengetahuan

`rajutara kb` mengelola indeks pencarian lokal berisi SOP bengkel dan manual buyer: PDF dengan lapisan teks, DOCX, TXT, dan MD.

```sh
rajutara kb add sop-potong.pdf --tag potong
rajutara kb search lebar kampuh
rajutara kb list
rajutara kb remove <id> --yes
```

Pencarian memeringkat kata dengan BM25; tidak ada model embedding. Indeks disimpan di `kb/` dalam folder asisten. Berkas Anda dibaca dan tidak pernah diubah; `remove` hanya memindahkan salinan hasil ekstraksi ke `.rajutara-trash/`. Berkas di atas 50 MB ditolak, PDF tanpa lapisan teks gagal dengan "scanned PDF: no text layer", dan PDF terenkripsi ditolak. Manual hasil pindaian perlu OCR di luar Rajutara lebih dulu.

Setiap panggilan memuat seluruh indeks, dan dua `kb add` yang berjalan bersamaan bisa kehilangan salah satu dari dua dokumennya. Tambahkan dokumen satu per satu.

## Keamanan: root, peran, persetujuan, dan cadangan

- **Root.** `batch`, `mcp`, `playbook`, dan `kb` hanya menjangkau berkas di dalam `--root DIR`, bawaannya folder saat ini. Share jaringan atau path perangkat (`\\server\share`, `\\?\UNC\…`, `\\.\…`) ditolak sebelum sistem berkas disentuh.
- **Peran.** `--role` adalah `designer`, `grader`, `marker-maker`, `cutter`, atau `supervisor`. Setiap alat mendaftar peran yang boleh menjalankannya. Supervisor, bawaannya, menjalankan semuanya.
- **Persetujuan.** Secara bawaan, simpan, timpa, hapus, atau buang menjawab `confirmation_required`. Persetujuan mencakup satu operasi pada satu target dan habis oleh panggilan itu. `--yes` (atau `--yolo`) menjalankan operasi tersebut dalam bentuk yang aman-cadangan. Rencana dan playbook menolak langkah undo dan redo.
- **Cadangan dan sampah.** Setiap penimpaan lebih dulu menulis `<file>.<YYYYmmdd-HHMMSS>.bak`. Cadangan yang lebih muda dari 24 jam tidak pernah dihapus; dari yang lebih tua, 10 terbaru disimpan. Hapus memindahkan berkas ke `.rajutara-trash/` di sampingnya. Setiap dokumen mendapat log aksi yang hanya bisa ditambah, `<stem>.agent-log.jsonl`, di sampingnya.
- **Teks berkas tidak dipercaya.** Nama potongan, teks DXF, sel spreadsheet, nama buyer dan PO, serta potongan memori dan pengetahuan kembali di bidang `untrusted` tersendiri. Semua itu data, tidak pernah instruksi. Target terlindungi yang berasal dari teks berkas ditandai di pertanyaan dan di catatan keamanan.
- **Spreadsheet punya batas tetap.** Berkas sheet di atas 20 MB, workbook yang terurai lebih dari 256 MB, dan sel di luar baris 100 000 atau kolom 1 000 ditolak. Workbook `.xls` lama tidak dibaca.
- **MCP.** Alat yang panik menjawab dengan galat internal, lalu server menolak setiap alat tulis sampai dijalankan ulang.

## Dokumen adalah zip dan JSON

Berkas asli adalah arsip zip berisi `manifest.json` dan `document.json`. Pustaka zip apa pun bisa membacanya:

```python
import json
import zipfile

with zipfile.ZipFile("kaos-lengan-pendek.rjx") as z:
    style = json.loads(z.read("document.json"))

print(style["name"], [p["name"] for p in style["pieces"]])
print([size["name"] for size in style["size_table"]["sizes"]])
```

Untuk kaos contoh, ini mencetak nama style dan keempat potongannya, FRONT, BACK, SLEEVE, dan NECK RIB, lalu ukuran S, M, L, dan XL. Satuan panjang adalah milimeter. Perlakukan kunci yang tidak dikenal sebagai data yang harus dipertahankan, dan tulis berkas kembali hanya lewat penulis bawaan Rajutara.
