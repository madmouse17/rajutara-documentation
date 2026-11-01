---
title: Headless dan agen
description: Periksa build dengan satu perintah, hasilkan setiap keluaran workflow tanpa jendela, baca dokumen dengan pustaka zip, dan beri agen pengodean fakta yang benar.
---

Skrip atau agen pengodean bisa memeriksa build dan menghasilkan setiap keluaran workflow tanpa orang di depan layar. Halaman ini membahas tiga jalur masuk: pemeriksaan smoke, contoh headless, dan dokumen itu sendiri, lalu kit agen yang menyertainya.

## Baris perintah

```text
rajutara [--lang en|id] [FILE...]   open the window, then the files
rajutara --version                  print the version, the git hash and the target, exit 0
rajutara --smoke [FILE]             open the real window, render 60 frames, print one JSON line, exit 0
```

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

Contoh itu menulis style, marker hasil nesting, DXF ter-grade beserta RUL-nya, PDF marker A0, plot HPGL/2, laporan CSV, dan PDF potongan berubin A4. Itulah berkas di [galeri](/rajutara-documentation/id/gallery/). Dua contoh lain ada di kit agen di bawah: satu mengimpor DXF beserta RUL-nya dan memplot setiap ukuran setiap potongan ke satu PDF A0, dan satu memuat style, membuat marker dengan satu bundle per ukuran, melakukan nesting, lalu menulis marker dan plot HPGL/2.

Masukan dan pengaturan yang sama menghasilkan berkas identik byte demi byte. Header ekspor membawa cap waktu UTC, jadi hanya baris itu yang berbeda di antara dua ekspor. Mesin nesting menerima seed eksplisit, jadi uji coba bisa mengunci keluarannya. Proses yang berhenti karena batas waktu juga bergantung pada kecepatan mesin.

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

## Kit agen

Agen yang belum pernah melihat Rajutara menebak modelnya: milimeter, grading turunan, batas waktu atau batas iterasi. **rajutara-boost** memberinya fakta, dalam bentuk seperti yang dilakukan Laravel Boost untuk Laravel. Kit ini ada di repositorinya sendiri, [rajutara-boost](https://github.com/madmouse17/rajutara-boost).

| Bagian | Isinya |
|---|---|
| Guidelines | Apa itu Rajutara, peta crate, dan invarian, lalu satu berkas masing-masing untuk model inti, I/O berkas, nesting, grading, perencanaan potong, menambah ruang kerja, pengujian, dan gaya. Cukup singkat untuk dimuat sesuai kebutuhan. |
| API reference | Tanda tangan sungguhan dalam blok berpagar, diperiksa terhadap checkout oleh sebuah skrip, sehingga referensi tidak bisa melenceng tanpa disadari. |
| Examples | Tiga program headless, dikompilasi terhadap rilis. |
| MCP server | Server kecil lewat stdio yang menautkan crate Rajutara secara langsung, dengan alat untuk memeriksa apakah berkas terbuka, mengimpor DXF, melakukan nesting marker, dan memplotnya. Kesalahan kembali sebagai kesalahan alat, dan berkas masukan tidak pernah diubah. |
| Skill | Guidelines yang dikemas untuk agen yang memuat skill. |

Invarian yang harus dijaga agen ada di [Berkontribusi](../contributing/): milimeter sebagai `f64`, tanpa panic pada data pengguna, tanpa runtime async, keluaran deterministik, dan aturan clean-room.
