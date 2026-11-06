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
2. Gambar dengan alat Draft (`D`): klik titik, tahan `Shift` untuk curve point, selesaikan dengan `Z` atau klik kanan dua kali. Dengan Dynamic Input nyala, ketik Length, `Tab` ke Angle, lalu tekan `Enter` untuk menempatkan titik pada nilai yang tepat. Garis tepi tertutup yang digambar di luar potongan menjadi potongan baru. `A` melengkungkan segmen menjadi busur, `O` menambah titik pada kontur, `M` memindahkan titik.
3. Tambahkan kampuh (`S`), penandaan (`N`), Garis Serat (`/`), kup (`Ctrl+Alt+D`), dan lipit (`L`). Untuk potongan simetris, gambar separuhnya dan pakai `H` untuk menetapkan garis cermin, lalu `Shift+H` untuk melihatnya terbuka.
4. Tekan `F8` untuk menampilkan panjang segmen, dan bandingkan dengan ukuran Anda. Panel Compare Length (`5`) membandingkan dua ruas satu sama lain.
5. Tekan `Ctrl+Shift+2` untuk Grading. Di Sizes Table (`Shift+F4`) tambahkan ukuran yang diperlukan. Pilih grade point dan ketik dX dan dY per ukuran di Grading Table, atau salin aturan dari satu titik (`Shift+C`) dan tempel ke titik lain (`Shift+V`). Tabel menampilkan langkah dari ukuran ke ukuran sampai Anda mencentang Absolute.
6. Simpan aturan yang sering dipakai di Rule Table (`Ctrl+Shift+Alt+R`) dan terapkan aturan bernomor ke titik terpilih mana pun.
7. Simpan dengan `Ctrl+S`. Untuk menyerahkan style yang sudah di-grade ke CAD lain, ekspor DXF beserta berkas RUL, atau sebagai graded nest.

Panduan: [PDS](../workspaces/pds/), [Grading](../workspaces/grading/).

## 3. Nesting marker dan baca angkanya

1. Di Marker, pilih File, New Marker (`Ctrl+N`). Dalam satu dialog itu, atur Marker Definitions (lebar kain, buffer, margin), ambil Style yang terbuka di PDS atau cari berkasnya, periksa Material, dan ketik Bundle per ukuran, dengan arah untuk masing-masing: One Way, Opposite, atau Any. Create tetap terkunci sampai ada yang dipesan.
2. Tata potongan. Seret dari Piece Bar, klik ganda thumbnail, klik thumbnail lalu meja, atau tekan Place All. Agar mesin yang mengerjakannya, pilih Nesting, Start AutoNesting (`Shift+N`). Dialognya menampilkan waktu, panjang terbaik, dan efisiensi selama berjalan, dan Stop (`Esc`) mempertahankan hasil terbaik sejauh ini. Nesting, Auto Nesting Setup… mengatur Algorithm (bawaan Standard), batas waktu (bawaan 60 detik), batas efisiensi opsional, apakah panjang tak terbatas, apakah potongan yang sudah ditata dipertahankan, seed yang membuat satu proses bisa diulang, dan cara Bundle dikelompokkan.
3. Baca bilah status: potongan, bundle, tumpang tindih, efisiensi, lebar, panjang terpakai, dan panjang per garmen. Tumpang tindih diarsir merah di meja. Sempurnakan dengan Rotate (`Shift+R`), Flip X dan Flip Y (`Shift+X`, `Shift+Y`), Shoot (`Shift+Arrow`), dan tombol panah. Piece, Fix on Marker memaku satu potongan, dan Grouping, Cluster Pieces menyatukan beberapa potongan.
4. Untuk mengatur jalur pisau, pilih Marker, Optimize Cut Order…, lalu nyalakan View, Cut/Plot Order untuk melihat nomornya.
5. Tulis laporan dengan File, Report to Excel… (`Ctrl+R`, workbook `.xlsx`) atau File, Print… (`Ctrl+P`, PDF).
6. Plot dengan File, Plot/Cut… (`Ctrl+L`): PDF sebagai ubin A4 atau di lembar A0, berkas HPGL/2 untuk plotter gulungan, atau berkas potong HPGL/2 generik.

`Ctrl+C` mengosongkan marker, dan `Ctrl+Z` mengembalikan setiap potongan. Untuk me-nesting beberapa marker tersimpan sekaligus, pakai Nesting, Auto Nest Queue….

Panduan: [Marker](../workspaces/marker/).

## 4. Rencanakan potong dari order

1. Di Cut Plan, pilih Cut Plan, Create New…. Wizard menjalani langkahnya berurutan: Adding Style Files (style yang terbuka di PDS, atau sebuah berkas), Defining the Order Details (nama, klien, operator), Adding Colors and Defining Quantity for each Size, Defining Material Properties, dan Defining the Marker. Setiap langkah tetap ada di panel Plan sesudahnya. Tambahkan Purchase Order, Style, atau Material lain di sana bila order membutuhkannya.
2. Warna dan jumlah: satu baris per warna, satu kolom per ukuran. Nyalakan mode rasio untuk memberi rasio dan total per warna, atur deviasi untuk kelebihan potong yang Anda terima, atau impor jumlah dari berkas `.csv`, `.xlsx`, atau `.ods`.
3. Material: nama, lebar, mode lapis, penyusutan, harga per meter. Batas marker: lapis minimum dan maksimum, bundle per marker, panjang marker, kelonggaran di tiap ujung lapis, dan batas limbah. Bundle yang lebih panjang dari panjang marker maksimum diperingatkan selagi Anda mengetik.
4. Tekan Viewing the Final Results (`F5`). Tab Results mencantumkan marker dengan rasio, panjang, dan efisiensinya, lay dengan lapis dan kainnya, tabel dipesan, direncanakan, dan selisih per ukuran dan warna, serta total beserta biaya. Potongan yang lebih lebar dari Material menghentikan penyelesaian dengan menyebut namanya.
5. Sunting lapis sebuah lay atau rasio sebuah marker dengan tangan jika lantai produksi membutuhkannya. Rencana lalu ditandai sebagai sudah disunting.
6. Buka tab Cut Order. Masukkan gulungan kain dengan kode, warna, shade, lebar, dan panjang, atau ambil dari Fabric Room. Rajutara mengurutkan lay, mengambil lapis utuh dari gulungan, dan melaporkan sisa serta kain yang kurang. Return Remnants menulis sisa kembali ke Fabric Room.
7. Tulis laporan dengan Generating a Cut Plan Report (CSV) atau (PDF), dan Viewing the Production Report untuk lantai pemotongan.

Panduan: [Cut Plan](../workspaces/cut-plan/).

## 5. Jalankan tanpa jendela

1. Periksa sebuah build: `rajutara --smoke` membuka jendela sungguhan, merender 60 frame, mencetak satu baris JSON dan keluar dengan 0, atau bukan nol jika jendela atau OpenGL gagal.
2. Jalankan pekerjaan yang sama untuk banyak order dengan `rajutara batch SCRIPT`: satu `@COMMAND /KEY=VALUE` per baris membuka marker, me-nesting-nya, menulis plot dan laporan, menyelesaikan Rencana Potong, atau mengekspor graded nest.
3. Ulangi satu prosedur utuh, seperti mengimpor dan memeriksa pola atau mengoptimalkan marker, dengan `rajutara playbook`. Setiap run menyimpan catatan, jadi `replay` mengulangnya.
4. Beri klien MCP alat yang sama dengan `rajutara mcp`.
5. Baca atau tulis dokumen dengan pustaka zip apa pun: berkas asli adalah arsip zip berisi JSON.

Panduan: [Headless dan skrip](../headless/).
