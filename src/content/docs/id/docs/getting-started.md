---
title: Memulai
description: Pasang Rajutara di Linux atau Windows, buka contoh kaos, dan pelajari tombol pintas yang paling sering dipakai.
---

Halaman ini membawa Anda dari berkas unduhan sampai contoh kaos tampil di layar. Istilah dalam bahasa Indonesia belum dikonfirmasi oleh operator berbahasa Indonesia, jadi koreksi sangat diterima. Versi bahasa Inggris: [Getting started](../../../docs/getting-started/).

## Pasang

Setiap rilis ada di [halaman rilis](https://github.com/madmouse17/rajutara/releases) beserta checksum-nya. Pilih berkas yang cocok dengan komputer Anda.

| Berkas | Untuk |
|---|---|
| `rajutara-<versi>-x86_64.AppImage` | Linux, x86_64. Jalankan `chmod +x` pada berkas itu, lalu mulai. Tanpa FUSE 2, mulai dengan `APPIMAGE_EXTRACT_AND_RUN=1`. |
| `rajutara-<versi>-windows-x64.msi` | Windows 7 SP1 sampai Windows 11, 64-bit. Pemasang. |
| `rajutara-<versi>-windows-x64.zip` | Sama, tanpa pemasangan: ekstrak lalu jalankan `rajutara.exe`. |
| `rajutara-<versi>-windows-x86.msi` | Windows 7 SP1 sampai Windows 11, 32-bit. Pemasang. |
| `rajutara-<versi>-windows-x86.zip` | Sama, tanpa pemasangan. |

Setiap paket membawa berkas lisensi dan `THIRD-PARTY.html`, daftar perangkat lunak pihak ketiga. Jika di Windows program menyatakan tidak bisa membuat konteks OpenGL, baca [Windows 7](../../../docs/windows-7/) (dalam bahasa Inggris).

## Buka contoh kaos

[Galeri](../../../gallery/) menyediakan contoh kaos sebagai sekumpulan berkas: satu style, satu marker, DXF ASTM beserta RUL-nya, hasil plot, dua PDF, dan satu laporan. Unduh style dan marker, lalu buka lewat menu File, atau mulai program dengan berkas itu:

```sh
rajutara [--lang en|id] [BERKAS...]
```

`rajutara` membuka style, marker, rencana potong, dan berkas DXF. Membuka berkas langsung berpindah ke ruang kerja yang sesuai. `--lang id` memulai antarmuka dalam bahasa Indonesia. Ekstensi bawaan yang lama, `.optx`, `.optm`, dan `.optc`, tetap bisa dibuka; berkas baru disimpan sebagai `.rjx`, `.rjm`, dan `.rjc`.

Style contoh berisi empat potongan pola: badan depan, badan belakang, lengan, dan kerah rib, dengan ukuran S, M, L, dan XL. Marker-nya menata 20 potongan pada kain selebar 180 cm: panjang 253,03 cm, efisiensi 84,10 %.

## Jendela

Empat ruang kerja ada di tab di bawah menu: PDS, Grading, Marker, dan Cut Plan. Panel bisa dilepas dan dipasang kembali, dan setiap ruang kerja mengingat tata letaknya sendiri. Tema terang adalah bawaan; tema gelap ada di menu View, Theme.

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

Simpan otomatis berjalan setiap lima menit. Jika berkas simpan otomatis lebih baru daripada dokumennya saat program dimulai lagi, Rajutara menawarkan untuk memulihkannya.

## Bangun dari sumber

Linux adalah platform acuan, Xubuntu atau Ubuntu 24.04.

```sh
sudo apt install build-essential pkg-config xvfb mesa-utils libgl1 libgl1-mesa-dri \
  libegl1 libxkbcommon-x11-0 libxcursor1 libxi6 libxrandr2
mise install            # rustup dan toolchain stable yang disematkan di rust-toolchain.toml
cargo run -p rajutara --release -- --version
```

Uji coba menjalankan jendela sungguhan, jadi dijalankan di layar virtual: `LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" cargo test --workspace`.

## Berikutnya

- [Workflows](../../../docs/workflows/): lima jalur kerja di dalam program (dalam bahasa Inggris).
- [PDS](../../../docs/workspaces/pds/), [Grading](../../../docs/workspaces/grading/), [Marker](../../../docs/workspaces/marker/), dan [Cut Plan](../../../docs/workspaces/cut-plan/): satu panduan untuk setiap ruang kerja (dalam bahasa Inggris).
