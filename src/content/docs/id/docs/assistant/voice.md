---
title: Suara
description: Ucapkan tugas dalam bahasa Indonesia atau Inggris. Program pembantu opsional rajutara-voice, unduhan mana yang cocok untuk PC Anda, di mana menaruhnya, dan statusnya di Windows 7.
---

Input suara bersifat opsional. Program terpisah, `rajutara-voice`, merekam mikrofon dan menuliskan ucapan Anda secara offline dengan whisper.cpp dan model `ggml-base-q5_1`. Hasil tulisannya masuk ke kotak tulis, tempat Anda memeriksanya lalu menekan **Kirim** sendiri. Rajutara tidak pernah mengirim hasil tulisan itu dengan sendirinya ([ADR-0033](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0033-offline-voice-helper.md)).

Program utama tidak punya kode audio. Tanpa program pembantu, kotak tulis tidak punya tombol mikrofon dan tidak ada hal lain yang berubah.

## Unduhan

Setiap rilis mulai 2.1.0 di [halaman rilis](https://github.com/madmouse17/rajutara/releases) menyertakan program pembantu di samping programnya:

| Berkas | Untuk |
|---|---|
| `rajutara-voice-<version>-linux-x86_64.tar.gz` | Linux x86_64 dengan CPU yang punya AVX2 |
| `rajutara-voice-<version>-windows-x86_64.zip` | Windows 10 dan 11, 64-bit, dengan CPU yang punya AVX2 |
| `rajutara-voice-<version>-win7-x86_64.zip` | Windows 7 SP1 dan sesudahnya, 64-bit, CPU apa saja |
| `rajutara-voice-<version>-win7-i686.zip` | Windows 7 SP1 dan sesudahnya, 32-bit, CPU apa saja |

Zip Windows 7 juga berjalan di Windows 10 dan 11. Pakai salah satunya di PC yang CPU-nya tidak punya AVX2. Setiap arsip berisi folder `rajutara-voice` dengan program pembantu, modelnya, lisensi, dan `THIRD-PARTY.html`.

## Memasang

Buka arsipnya. Lalu pilih salah satu:

- taruh folder `rajutara-voice` di samping executable Rajutara, sehingga program pembantu ada di `rajutara-voice/rajutara-voice` (`rajutara-voice\rajutara-voice.exe` di Windows); atau
- isi Preferensi › Asisten › **Input suara** › **Program pembantu** dengan path program pembantu.

AppImage di Linux berjalan dari mount sementara, jadi di sana isi **Program pembantu**. Halaman itu menampilkan "Ditemukan: _path_" bila Rajutara menemukan program pembantu, dan "Belum terpasang" bila tidak.

## Mengucapkan tugas

Tekan **Bicara** di kotak tulis. Tekanan pertama menjalankan program pembantu, lalu program itu tetap berjalan sampai jendela ditutup. Panel menampilkan "Mendengarkan…" dengan level suara, lalu "Menuliskan ucapan Anda…". Tekan **Berhenti mendengarkan** setelah selesai bicara. Satu ucapan paling lama 60 detik.

**Bahasa** di Preferensi › Asisten › **Input suara** bisa **Otomatis**, **Bahasa Indonesia**, atau **Bahasa Inggris**. Otomatis membiarkan model mengenali bahasanya.

Jika ada yang gagal, panel menampilkan "Input suara gagal:" dengan alasannya: tidak ada mikrofon, berkas model tidak ada, model tidak bisa dimuat, galat perekaman, atau ucapan lebih dari 60 detik.

## Privasi

Program pembantu tidak punya kode jaringan; build-nya melarang crate HTTP dan async. Audio tetap di memorinya dan tidak pernah ditulis ke disk atau dikirim ke mana pun.

## Status di Windows 7

Build Windows 7 lolos pemeriksaan impor yang menjaga setiap build Rajutara bisa dimuat di Windows 7, tetapi belum ada yang menjalankan program pembantu di PC Windows 7 sungguhan. Anggaran memori 600 MB saat menuliskan ucapan di PC 32-bit juga belum diukur. Laporkan pengalaman Anda di [GitHub](https://github.com/madmouse17/rajutara/issues), dan lihat [Windows 7](../../windows-7/) untuk programnya sendiri.
