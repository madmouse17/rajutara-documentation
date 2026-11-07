---
title: MCP dan soket lokal
description: Izinkan klien MCP atau skrip di komputer ini memakai jendela Rajutara yang terbuka dengan rajutara mcp --gui, dan cara klien MCP bertanya kepada penggunanya sebelum perubahan yang dijaga.
---

`rajutara mcp` menyajikan lapisan perintah ke klien MCP tanpa jendela dan dengan dokumennya sendiri ([Headless dan skrip](../../headless/#server-mcp)). Mulai 2.1.0, klien juga bisa bekerja pada dokumen yang terbuka di jendela, dan Anda menyetujui perubahannya di panel asisten ([ADR-0032](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0032-gui-socket-and-mcp-confirmations.md)).

## Menyalakan soket

Preferensi › Asisten › **Program lokal** punya sakelar **Izinkan program di komputer ini memakai jendela ini (MCP)**. Sakelar ini mati sejak awal. **Port (0 = bebas)** mengatur port; 0 membiarkan sistem memilih port yang kosong.

Selama aktif, halaman itu menampilkan "Mendengarkan di 127.0.0.1:_port_" dan tombol **Salin perintah koneksi**, yang menyalin `rajutara mcp --gui`. Halaman itu juga memperingatkan: "Program yang bisa membaca folder pengguna Anda bisa terhubung selama ini aktif. Setiap perubahan tetap perlu persetujuan Anda." Setiap kali soket dinyalakan, Rajutara membuat token baru.

## Cara program terhubung

Jendela hanya mendengarkan di `127.0.0.1` dan menulis `gui-socket.json` ke folder asisten berisi port, token acak 32 byte, dan id proses jendela. Di Linux berkas itu bermode 0600; di Windows berkas itu memakai izin folder `%APPDATA%` Anda. Jendela menghapus berkas itu saat soket berhenti atau jendela ditutup.

`rajutara mcp --gui` membaca berkas itu, terhubung, dan meneruskan stdin dan stdout-nya ke jendela. Arahkan klien MCP ke perintah ini seperti ke `rajutara mcp`:

```sh
rajutara mcp --gui
```

Perintah ini tidak menerima opsi lain: peran jendela dan operatornya yang menentukan apa yang boleh dilakukan program. Jika tidak ada jendela yang mendengarkan, perintah ini menulis galat di stderr dan keluar dengan kode 1.

Skrip juga bisa berbicara langsung ke soket:

- Koneksi harus datang dari alamat loopback, dan hanya satu program yang bisa terhubung sekaligus. Program kedua mendapat `{"error":"busy"}`.
- Baris pertama harus `{"token":"<64 karakter hex>"}`, dalam 5 detik dan paling besar 256 byte. Jika tidak, program mendapat `{"error":"unauthorized"}` dan koneksinya ditutup.
- Setelah token, pesan MCP JSON-RPC menyusul, satu pesan per baris, paling besar 1 MiB per baris, seperti di stdio.
- Koneksi yang tidak mengirim apa pun selama 10 menit ditutup.

Selama program terhubung, panel menampilkan "_klien_ terhubung" dengan **Putuskan**, dan bilah status menampilkan "MCP: _klien_". Namanya berasal dari `clientInfo` klien.

## Menyetujui perubahan dari program

Program bekerja lewat sesi jendela dengan peran dari bilah status. Program membaca dan mengubah dokumen yang terbuka, dan setiap perubahan melewati riwayat urungkannya. Simpan, timpa, hapus, tutup tanpa menyimpan, atau checkpoint playbook tidak langsung dijalankan. Jendela menahan panggilan itu, dan sebuah kartu di panel menulis "_klien_ ingin: _operasi_ _target_".

- **Setujui** menjalankan panggilan itu satu kali dengan persetujuan tersebut.
- **Tolak** menjawab program dengan galat alat yang kodenya `operator_declined`.

Panggilan yang menemui operasi terjaga kedua setelah persetujuan Anda ditahan lagi. Baris yang dikirim program setelah panggilan yang ditahan menunggu berurutan sampai Anda menjawab.

## Konfirmasi di klien MCP

Lewat stdio, `rajutara mcp` bisa bertanya kepada pengguna klien alih-alih menolak. Syaratnya, klien memakai protokol MCP 2026-07-28 dan menyatakan form elicitation di kemampuannya. Untuk panggilan yang dijaga, atau `playbook_step` yang melewati checkpoint atau mengambil pilihan, server menjawab `input_required` dengan formulir berisi satu isian ya-atau-tidak, `approve`, dan pesan yang menyebut operasi dan targetnya. Klien menampilkan formulir itu, lalu mengulang panggilan dengan jawabannya dan `requestState` yang diterimanya.

State itu ditandatangani server, hanya berlaku sekali, dan kedaluwarsa setelah 300 detik. State itu menyebut alat, argumen, klien, operasi, dan target. Formulir yang ditolak membatalkan panggilan dengan `operator_declined`. Klien dengan revisi protokol yang lebih lama mendapat `confirmation_required`, seperti di 2.0.0, kecuali server dijalankan dengan `--yes`.

State untuk checkpoint playbook menyebut run-nya, bukan tahapnya. Karena itu, dalam 300 detik state itu bisa meloloskan checkpoint berikutnya dari run yang sama.
