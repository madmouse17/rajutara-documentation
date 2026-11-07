---
title: Memulai
description: Pasang Rajutara di Linux atau Windows, buka contoh kaos, dan pelajari tombol pintas yang paling sering dipakai.
---

Halaman ini membawa Anda dari berkas unduhan sampai contoh kaos tampil di layar. Istilah dalam bahasa Indonesia belum dikonfirmasi oleh operator berbahasa Indonesia, jadi koreksi sangat diterima. Versi bahasa Inggris: [Getting started](../../../docs/getting-started/).

## Pasang

Setiap rilis ada di [halaman rilis](https://github.com/madmouse17/rajutara/releases) beserta checksum-nya. Rilis terbaru adalah 2.0.0. Pilih berkas yang cocok dengan komputer Anda.

| Berkas | Untuk |
|---|---|
| `rajutara-2.0.0-x86_64.AppImage` | Linux, x86_64. Jalankan `chmod +x` pada berkas itu, lalu mulai. Tanpa FUSE 2, mulai dengan `APPIMAGE_EXTRACT_AND_RUN=1`. |
| `rajutara-2.0.0-windows-x64.msi` | Windows 7 SP1 sampai Windows 11, 64-bit. Pemasang. |
| `rajutara-2.0.0-windows-x64.zip` | Sama, tanpa pemasangan: ekstrak lalu jalankan `rajutara.exe`. |
| `rajutara-2.0.0-windows-x86.msi` | Windows 7 SP1 sampai Windows 11, 32-bit. Pemasang. |
| `rajutara-2.0.0-windows-x86.zip` | Sama, tanpa pemasangan. |

Rilis lain memakai nama yang sama dengan nomor versinya sendiri. Sekali sehari, saat program dibuka, Rajutara memeriksa apakah ada rilis yang lebih baru dan menawarkan untuk memasangnya. Untuk memeriksa kapan saja, pilih Help, Check for Updates….

:::caution[Berkas yang disimpan 2.0 tidak terbuka di 1.5]
Rajutara 2.0.0 menyimpan setiap Style, Marker, dan Rencana Potong dalam format native 3. Rajutara 1.5.x dan yang lebih lama menolak berkas seperti itu dengan "made by a newer rajutara (format version 3; this build reads up to 2)", jadi tidak ada data yang hilang, tetapi berkasnya tidak terbuka di sana. Berkas dari 1.5.x dan yang lebih lama terbuka di 2.0.0 seperti biasa, dan Rencana Potong lama terbuka sebagai satu Purchase Order. Bila beberapa PC berbagi berkas, perbarui semuanya pada saat yang sama.
:::

Setiap paket membawa berkas lisensi dan `THIRD-PARTY.html`, daftar perangkat lunak pihak ketiga. Jika di Windows program menyatakan tidak bisa membuat konteks OpenGL, baca [Windows 7](../windows-7/).

## Buka contoh kaos

[Galeri](../../../gallery/) menyediakan contoh kaos sebagai sekumpulan berkas: satu style, satu marker, DXF ASTM beserta RUL-nya, hasil plot, dua PDF, dan satu laporan. Unduh style dan marker, lalu buka lewat menu File, atau mulai program dengan berkas itu:

```sh
rajutara [--lang en|id] [BERKAS...]
```

`rajutara` membuka style, marker, rencana potong, dan berkas DXF, lalu langsung pindah ke ruang kerja yang sesuai. `--lang id` memulai antarmuka dalam bahasa Indonesia. Ekstensi bawaan yang lama, `.optx`, `.optm`, dan `.optc`, tetap bisa dibuka; Rajutara menyimpan berkas baru sebagai `.rjx`, `.rjm`, dan `.rjc`.

Style contoh berisi empat potongan pola: badan depan, badan belakang, lengan, dan kerah rib, dengan ukuran S, M, L, dan XL. Marker-nya menata 20 potongan pada kain selebar 180 cm: panjang 253,03 cm, efisiensi 84,10 %.

## Jendela

Empat ruang kerja ada di tab di bawah menu: PDS, Grading, Marker, dan Cut Plan. Anda bisa melepas panel dan memasangnya kembali, dan setiap ruang kerja mengingat tata letaknya sendiri. Work Area mengisi bagian tengah jendela. Di PDS, Toolbox ada di kiri, Properties di kanan, dan Pieces Window menjadi tab pertama panel bawah; Grading menaruh Pieces Window-nya dan Marker menaruh Piece Bar-nya di tempat yang sama. Secara bawaan tema mengikuti sistem operasi. Untuk beralih ke Dark atau Light, pakai kontrol di ujung kanan bilah menu, Tools, Theme Settings, atau View, Theme.

| Tombol | Fungsi |
|---|---|
| `Ctrl+Shift+1` sampai `Ctrl+Shift+4` | Pindah ke PDS, Grading, Marker, atau Cut Plan. `Ctrl+Tab` berganti berurutan. |
| `Ctrl+Shift+P` | Palet perintah. Mencari aksi apa pun berdasarkan nama. |
| `F1` | Daftar tombol pintas. |
| `Ctrl+Z`, `Ctrl+Y` | Urungkan dan ulangi. Satu riwayat urungkan melayani keempat ruang kerja. |
| Roda mouse, `Home` | Perbesar di posisi kursor, dan sesuaikan tampilan agar semuanya terlihat. |
| Geser dengan tombol tengah, atau `Shift` dan geser kiri | Menggeser tampilan. |
| `Ctrl+L` | Plot. |
| `Esc` | Batalkan langkah yang sedang berjalan. |

Rajutara menyimpan otomatis setiap lima menit. Jika saat program dibuka lagi berkas simpan otomatis lebih baru daripada dokumennya, Rajutara menawarkan untuk memulihkannya. Setiap kali Anda menyimpan, Rajutara menyimpan berkas sebelumnya sebagai `.bak`; di PDS, File, Open Backup membuka cadangan sebuah Style sebagai dokumen baru yang belum disimpan.

Tools, Preferences… punya bidang cari di atas daftar halamannya. Ketik sebagian nama pengaturan, dalam bahasa antarmuka atau bahasa Inggris. Pencarian mengabaikan huruf besar-kecil dan aksen, dan setiap hasil terbaca "Halaman › Bidang".

## Bangun dari sumber

Linux adalah platform acuan, Xubuntu atau Ubuntu 24.04.

```sh
sudo apt install build-essential pkg-config xvfb mesa-utils libgl1 libgl1-mesa-dri \
  libegl1 libxkbcommon-x11-0 libxcursor1 libxi6 libxrandr2
mise install            # rustup dan toolchain stable yang disematkan di rust-toolchain.toml
cargo run -p rajutara --release -- --version
```

Uji coba membuka jendela sungguhan, jadi jalankan di layar virtual: `LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" cargo test --workspace`. [Berkontribusi](../contributing/) mencantumkan setiap gerbang pemeriksaan.

## Berikutnya

- [Workflows](../workflows/): lima jalur kerja di dalam program.
- [PDS](../workspaces/pds/), [Grading](../workspaces/grading/), [Marker](../workspaces/marker/), dan [Cut Plan](../workspaces/cut-plan/): satu panduan untuk setiap ruang kerja.
- [Headless dan skrip](../headless/): jalankan dari skrip, dengan `rajutara batch`, `rajutara mcp`, playbook, dan indeks pengetahuan.
