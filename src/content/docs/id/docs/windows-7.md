---
title: Windows 7
description: Apa yang diverifikasi di Windows 7 SP1 sampai Windows 11, bagaimana build dibuat, dan apa yang dilakukan di PC tanpa driver OpenGL.
---

Banyak PC bengkel menjalankan Windows 7, sering edisi 32-bit. Rajutara menjadikan Windows 7 SP1 sebagai batas bawah, jadi build 64-bit dan 32-bit sama-sama dirilis, masing-masing sebagai pemasang `.msi` dan `.zip` portabel. Berkas yang sama berjalan di Windows 10 dan 11.

## Apa yang diverifikasi

- Build Windows berjalan di bawah Wine pada mesin acuan Linux, yang merender dengan OpenGL perangkat lunak Mesa. Setiap build mulai, melaporkan versinya, dan lolos pemeriksaan `--smoke`.
- Setiap build lolos pemeriksaan tabel impor: tidak ada dependensi yang boleh memerlukan API lebih baru daripada Windows 7, seperti fungsi tunggu, DirectX 12, atau WinRT. Pemeriksaan ini bagian dari rilis.
- **Belum diverifikasi: PC Windows 7 sungguhan.** Uji di perangkat keras nyata, dengan driver GPU vendor, dialog berkas, dan pemasang, adalah gerbang rilis yang masih tertunda. Sampai lolos, anggap Windows 7 diharapkan berfungsi, bukan terbukti.

Build 32-bit mengalamatkan paling banyak sekitar 2 GB, dan anggaran memori program berlaku tanpa perubahan. Dukungan aksesibilitas bisa tidak ada di build Windows 7 jika uji smoke menunjukkan dukungan itu gagal di sana; catatan rilis akan menyebutkannya.

## Cara build dibuat

Target stabil Rust saat ini memerlukan Windows 10, jadi build Windows memakai target Windows 7 dari Rust, `x86_64-win7-windows-gnu` dan `i686-win7-windows-gnu`. Build dibuat silang di Linux dengan toolchain nightly yang disematkan dan MinGW. Toolchain itu ada pada pemelihara, bukan di repositori, begitu pula skrip build paket Windows. Pull request yang menyentuh windowing, dialog, sistem berkas, atau dependensi menyebutkannya, dan pemelihara menjalankan pemeriksaan Windows.

Jendela digambar lewat OpenGL 2.1 (renderer `glow` milik eframe), bukan Vulkan atau DirectX, karena itulah yang disediakan Windows 7 dan grafis terintegrasi.

## Tanpa driver OpenGL

Sebagian mesin Windows 7 tidak punya driver grafis yang bisa dipakai: mesin virtual dengan adaptor VGA standar, sesi remote desktop, atau driver OEM yang rusak. Windows lalu hanya menyediakan OpenGL 1.1, dan program yang butuh 2.1 tidak bisa membuka jendela. Rajutara menampilkan pesan yang menyebut masalah dan perbaikannya, lalu keluar dengan status bukan nol.

Perbaikannya adalah OpenGL perangkat lunak yang disertakan dalam paket Windows, di folder `software-gl/`. Isinya Mesa 3D dengan renderer llvmpipe, tanpa modifikasi, dari build mesa-dist-win.

1. Jalankan `rajutara.exe --smoke`. Jika mencetak satu baris JSON dan keluar dengan 0, Anda tidak memerlukan ini.
2. Jika program menyatakan tidak bisa membuat konteks OpenGL, salin `opengl32.dll` dan `libgallium_wgl.dll` dari `software-gl/` ke folder yang berisi `rajutara.exe`.
3. Mulai program lagi. Program berjalan di CPU, jadi lebih lambat, tetapi berjalan.
4. Setelah memasang driver grafis, hapus kedua berkas itu lagi supaya program memakai perangkat keras.

Berkas itu tidak berada di samping program secara bawaan, jadi mesin dengan driver yang berfungsi tetap memakai renderer perangkat keras. Berkas lisensi Mesa ikut disertakan, dan `THIRD-PARTY.html` mencantumkan Mesa.
