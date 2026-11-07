---
title: Jiplak foto dan evaluasi
description: Ubah foto piece di atas lembar acuan menjadi draf piece, dan ukur model pada kasus uji Anda sendiri dengan rajutara eval.
---

## Jiplak dari foto

Jiplak dari foto masih eksperimental. Fitur ini mengubah foto sebuah piece yang terletak di atas lembar berukuran diketahui menjadi draf piece baru di Style yang terbuka. Hasilnya adalah draf yang harus diperiksa, bukan piece yang langsung dipotong.

### Mengambil foto

Letakkan piece rata di atas lembar acuan berukuran diketahui, misalnya kertas A4 atau A3. Warna piece harus jelas berbeda dari lembar dan permukaan di sekitarnya. Foto dari tepat di atas, dengan keempat sudut lembar terlihat. Lembar itu memberi skala dan mengoreksi perspektif. Tidak ada model lensa, jadi distorsi lensa tetap terbawa ke garis tepi.

### Kalibrasi dan jiplak

**Jiplak dari Foto…** (Trace From Photo…, peran Desainer Pola, di palet perintah) membuka jendela **Jiplak dari foto (eksperimental)**.

1. **Pilih foto…** lalu pilih berkas PNG atau JPEG.
2. Klik empat sudut lembar acuan, mulai kiri atas, lalu searah jarum jam. Seret sudut untuk memindahkannya, atau pilih dengan Tab lalu geser dengan tombol panah: 1 px per tekan, 10 px dengan Shift.
3. Klik di dalam piece.
4. Pilih **Lembar acuan**: **A4 tegak**, **A4 mendatar**, **A3**, atau **Ukuran lain** dengan **Lebar (mm)** dan **Tinggi (mm)**.
5. Atur **Toleransi warna** (bawaannya 40), **Penyederhanaan (mm)** (bawaannya 1 mm), dan **Nama piece**.
6. Tekan **Jiplak**.

Selama Anda menggeser titik di dalam piece atau toleransinya, pratinjau menunjukkan seberapa jauh area itu menjangkau. Hasilnya muncul sebagai kartu Langkah di utas: "Piece TRACED-1 ditambahkan dan ditandai TRACED. Periksa setiap garis sebelum dipotong." **Tampilkan di PDS** beralih ke piece itu. Piece baru ditaruh di kanan piece yang sudah ada, dan satu kali urungkan membatalkannya.

### Peringatan dan batasan

Kartu memberi peringatan bila:

- area menyentuh tepi foto: piece mungkin terpotong, atau klik mengenai latar;
- warna piece dan latar hanya sedikit berbeda: ubah toleransi warna;
- lembar terlihat terlalu miring: ambil foto tegak dari atas.

Rajutara menolak sudut yang berada di luar foto atau tidak searah jarum jam mengelilingi bentuk cembung, titik dalam yang berada di luar lembar, area yang lebih kecil dari 1 % lembar, dan foto yang tidak bisa dibaca. Rajutara membaca ukuran foto lebih dulu dan menolak lebih dari 50 juta piksel sebelum mendekodenya, lalu mengecilkan sisi terpanjang menjadi paling besar 3.000 px. Rotasi EXIF foto tidak diterapkan, jadi tegakkan foto lebih dulu bila kamera Anda menyimpannya miring. Foto 50 megapiksel bisa memakan sekitar 450 MB memori di PC 32-bit.

Setiap piece hasil jiplakan membawa kode `TRACED`. Periksa setiap garis dengan pola kertasnya sebelum Anda melakukan grading atau memotongnya.

Pekerjaan yang sama tersedia sebagai alat `trace_from_photo` (tier Advanced, peran Desainer Pola), yang bisa dipanggil asisten dan klien MCP dengan foto sebagai lampiran.

## Penjalan evaluasi

`rajutara eval DIR` mengukur sebuah profil model pada kasus uji Anda sendiri. Setiap kasus memberi tugas, berkas yang dibuka, dan pemeriksaan pada hasilnya, sehingga Anda bisa membandingkan model, atau satu model sebelum dan sesudah setelannya diubah, pada pekerjaan bengkel Anda.

```text
rajutara eval DIR [--model ID] [--out DIR] [--case ID] [--allow-remote] [--role ROLE]
```

| Opsi | Arti | Bawaan |
|---|---|---|
| `--model ID` | Profil model, menurut namanya di Preferensi › Asisten | Model bawaan |
| `--out DIR` | Tempat hasil ditulis. Tidak boleh di dalam `DIR` | `evals/` di folder asisten |
| `--case ID` | Jalankan kasus itu saja | Semua kasus |
| `--allow-remote` | Izinkan model di komputer lain | Mati |
| `--role ROLE` | Jalankan setiap kasus dengan peran ini, bukan perannya sendiri | Peran kasus |

`eval` menolak `--yes`, `--yolo`, dan `--root`: setiap kasus menyebut persetujuannya sendiri dan berjalan pada salinan.

### Folder kasus

Setiap subfolder `DIR` yang berisi `case.toml` adalah satu kasus. Berkas lainnya adalah dokumen dan lampiran yang dipakai kasus itu.

```toml
[case]
id = "kampuh-1cm"             # 1 sampai 64 huruf, angka, - dan _
goal = "Tambah kampuh 1 cm di semua piece lalu simpan"
role = "designer"             # opsional, bawaannya supervisor
skill = "pattern-making"      # opsional, bawaannya dipilih dari tugas
open = ["kaos.rjx"]           # berkas di folder kasus, dibuka dari salinannya
attach = []                   # berkas di folder kasus, dilampirkan dari salinannya
max_turns = 12                # 1 sampai 40
approve = "all"               # "all": setujui setiap penjagaan, rencana, dan checkpoint, dan ambil pilihan pertama
                              # "none": yang pertama di antaranya menggagalkan kasus

[[check]]                     # alat baca yang dijalankan setelah tugas; setiap pemeriksaan harus terpenuhi
tool = "piece_detail"
args = { piece = "Back" }     # opsional
path = "/height_mm"           # JSON pointer ke dalam hasil
op = "=="                     # == != >= <= > < contains
value = 420
```

Rajutara memeriksa setiap folder kasus sebelum kasus mana pun berjalan. Berkas setiap kasus (bukan `case.toml`, dan tanpa tautan) disalin ke folder sementara, tugasnya dijalankan di sesinya sendiri, lalu pemeriksaannya dijalankan sebagai Supervisor. Angka dibandingkan dengan toleransi 0,000001. Permintaan yang ditolak penyedia dicoba sekali lagi setelah waktu tunggu dari penyedia, paling lama 30 detik. Tidak ada yang ditulis di dalam `DIR`.

### Hasil

Setiap kasus mencetak satu baris JSON di stdout, dan ringkasannya ke stderr: "rajutara: 5 cases, 4 passed, 1 failed; results in …". Kode keluarnya 0 bila semua kasus lolos, 2 bila ada yang gagal, dan 1 bila baris perintah atau folder kasus ditolak.

Berkas hasilnya `eval-<stamp>.jsonl` di folder keluaran. Isinya satu baris per kasus dengan `case`, `passed`, pemeriksaan beserta nilai yang diharapkan dan nilai sebenarnya, `turns`, `invalid_actions`, `model_calls`, `prompt_tokens`, `completion_tokens`, `millis`, `error`, dan `adaptations`, ditambah satu baris ringkasan.

### Model di komputer lain

Profil jarak jauh hanya berjalan dengan `--allow-remote`. Flag itu adalah persetujuan Anda untuk setiap permintaan dalam run, karena tidak ada orang di depan jendela untuk menekan **Kirim**. Sebelum setiap permintaan keluar, Rajutara menyimpan isinya ke `eval-<stamp>/<case>/request-<n>.json` di folder keluaran, sehingga Anda bisa membaca nanti persis apa yang dikirim.
