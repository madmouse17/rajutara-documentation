---
title: Workflows
description: "Lima jalur di Rajutara: impor DXF lalu plot, susun dan grade blok, nesting marker, rencanakan potong, dan jalankan semuanya dari skrip."
---

Setiap jalur di bawah ini berupa daftar langkah singkat dalam urutan yang ditempuh Operator. Nama menu sama dengan di program, tombol adalah bawaan, dan setiap jalur diakhiri panduan yang menjelaskan rinciannya. Keempat ruang kerja memakai Style terbuka yang sama, jadi potongan yang Anda impor atau gambar di satu ruang kerja adalah potongan yang Anda grade, nesting, dan rencanakan di ruang kerja berikutnya.

## 1. Impor DXF dan plot setiap ukuran

1. Di PDS, pilih File, Import From CAD/CAM Files lalu pilih DXF-nya. Rajutara membaca berkas ASTM D6673 dan AAMA-292. Untuk style yang sudah di-grade, Rajutara juga membaca berkas RUL yang disebut DXF pada baris `Grade Rule Table:`, dari folder yang sama.
2. Jika impor menemui masalah, tab Import Report terbuka. Bacalah sebelum memercayai potongannya: setiap masalah menyebut satu potongan atau satu entitas.
3. Periksa potongan di Pieces Window dan Pieces Table: nama, jumlah, material, rotasi, luas.
4. Tekan `Ctrl+Shift+2` untuk Grading. Tampilan Graded Nest menggambar setiap ukuran dengan warnanya sendiri, dan `Shift+F4` membuka Sizes Table dengan Base Size.
5. Kembali di PDS, tekan `Ctrl+L` untuk plot. Pilih potongan dan ukuran, lalu target: PDF sebagai ubin A4 untuk printer meja, PDF di A0, atau berkas HPGL/2. Biarkan Arrange first menyala dan Rajutara menata potongan pada lebar lembar.

Panduan: [PDS](../workspaces/pds/), [Format berkas](../formats/).

## 2. Susun blok dan grade

1. Mulai Style baru. Ukuran pertama adalah Base Size, bernama `M` secara bawaan; Preferences, Sizes System mengubah namanya.
2. Gambar dengan alat Draft (`D`): klik titik, tahan `Shift` untuk curve point, selesaikan dengan `Z` atau klik kanan dua kali. Garis tepi tertutup yang digambar di luar potongan menjadi potongan baru. `A` melengkungkan segmen menjadi busur, `O` menambah titik pada kontur, `M` memindahkan titik.
3. Tambahkan kampuh (`S`), notch (`N`), Garis Serat (`/`), kup (`Ctrl+Alt+D`), dan lipit (`L`). Untuk potongan simetris, gambar separuhnya dan pakai `H` untuk menetapkan garis cermin, lalu `Shift+H` untuk melihatnya terbuka.
4. Tekan `F8` untuk menampilkan panjang segmen, dan bandingkan dengan ukuran Anda. Panel Compare Length (`5`) membandingkan dua ruas satu sama lain.
5. Tekan `Ctrl+Shift+2` untuk Grading. Di Sizes Table (`Shift+F4`) tambahkan ukuran yang diperlukan. Pilih grade point dan ketik dX dan dY per ukuran di Grading Table, atau salin aturan dari satu titik (`Shift+C`) dan tempel ke titik lain (`Shift+V`).
6. Simpan aturan yang sering dipakai di Rule Table (`Ctrl+Shift+Alt+R`) dan terapkan aturan bernomor ke titik terpilih mana pun.
7. Simpan dengan `Ctrl+S`. Untuk menyerahkan style yang sudah di-grade ke CAD lain, ekspor DXF beserta berkas RUL, atau sebagai graded nest.

Panduan: [PDS](../workspaces/pds/), [Grading](../workspaces/grading/).

## 3. Nesting marker dan baca angkanya

1. Di Marker, pilih File, New Marker (`Ctrl+N`). Atur Material, lebar kain, buffer antarpotongan, dan margin.
2. Pilih Marker, Add Style dan pilih style-nya, atau ambil yang terbuka di PDS. Buka panel Order dan ketik bundle yang diperlukan per ukuran, dengan arah untuk masing-masing: One Way, Opposite, atau Any.
3. Tata potongan. Seret dari Piece Bar, klik ganda thumbnail, atau tekan Place All. Agar mesin yang mengerjakannya, pilih Nesting, Start Auto Nesting (`F9`). Pengaturannya menanyakan batas waktu (bawaan 60 detik), batas efisiensi opsional, apakah panjang tak terbatas, apakah potongan yang sudah ditata dipertahankan, dan seed yang membuat satu proses bisa diulang.
4. Baca bilah status: potongan, bundle, tumpang tindih, efisiensi, lebar, panjang terpakai, dan panjang per garmen. Tumpang tindih diarsir merah di meja. Piece, Rotate dan Flip, klik kanan pada potongan, dan tombol panah menyempurnakan penempatan.
5. Tulis laporan dengan File, Report to Excel (CSV) atau File, Report (PDF).
6. Plot dengan `Ctrl+L`: PDF di lembar A0, atau berkas HPGL/2 untuk plotter gulungan. File, Export Cut File menulis berkas potong HPGL/2 generik.

`Ctrl+C` mengosongkan marker, dan `Ctrl+Z` mengembalikan setiap potongan.

Panduan: [Marker](../workspaces/marker/).

## 4. Rencanakan potong dari order

1. Di Cut Plan, kerjakan panel Plan dari atas ke bawah. Style: berkas style dan ukuran yang direncanakan. Order: nama, klien, dan operator.
2. Warna dan jumlah: satu baris per warna, satu kolom per ukuran. Nyalakan mode rasio untuk memberi rasio dan total per warna, atur deviasi untuk kelebihan potong yang Anda terima, atau impor jumlah dari berkas CSV.
3. Material: nama, lebar, mode lapis, penyusutan, harga per meter. Batas marker: lapis minimum dan maksimum, bundle per marker, panjang marker, kelonggaran di tiap ujung lapis, dan batas limbah.
4. Tekan Solve (`F5`). Tab Results mencantumkan marker dengan rasio, panjang, dan efisiensinya, lay dengan lapis dan kainnya, tabel dipesan, direncanakan, dan selisih per ukuran dan warna, serta total beserta biaya.
5. Sunting lapis sebuah lay atau rasio sebuah marker dengan tangan jika lantai produksi membutuhkannya. Rencana lalu ditandai sebagai sudah disunting.
6. Buka tab Cut Order. Masukkan gulungan kain dengan kode, warna, shade, lebar, dan panjang. Rajutara mengurutkan lay, mengambil lapis utuh dari gulungan, dan melaporkan sisa serta kain yang kurang.
7. Tulis laporan sebagai CSV atau PDF, dan Production Report untuk lantai pemotongan.

Panduan: [Cut Plan](../workspaces/cut-plan/).

## 5. Jalankan tanpa jendela

1. Periksa sebuah build: `rajutara --smoke` membuka jendela sungguhan, merender 60 frame, mencetak satu baris JSON dan keluar dengan 0, atau bukan nol jika jendela atau OpenGL gagal.
2. Susun, grade, nesting, dan tulis setiap keluaran workflow dengan contoh headless: kode yang sama dengan yang dijalankan program, tanpa jendela.
3. Baca atau tulis dokumen dengan pustaka zip apa pun: berkas asli adalah arsip zip berisi JSON.

Panduan: [Headless dan agen](../headless/).
