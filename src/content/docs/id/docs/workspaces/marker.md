---
title: Marker
description: Tentukan kain, minta bundle per ukuran, tata potongan dengan tangan atau biarkan mesin nesting yang mengerjakannya, baca efisiensi, plot, potong, dan laporkan.
---

Marker adalah tata letak potongan satu style atau lebih dan satu ukuran atau lebih pada kain dengan lebar tertentu, siap diplot atau dipotong. Di ruang kerja ini Anda menentukan kain, meminta garmen yang dibutuhkan, menata potongan, dan membaca berapa kain yang dihabiskan tata letak itu.

![Ruang kerja Marker dengan kaos contoh yang ditata dengan tangan: Marker Table di tengah, Piece Bar di atas, Marker Properties di kiri, Piece List di bawah.](../../../../../assets/screens/full-marker.jpg)

## Layar

| Panel | Isinya |
|---|---|
| Marker Table | Pita kain, di tengah. X membentang sepanjang panjang marker, yaitu lusi, dan Y melintang lebarnya. Sebuah garis menunjukkan panjang terpakai beserta nilainya. Penggaris menandai setiap 10 cm. |
| Pieces | View, Pieces, tab pertama di kiri. Satu tabel per Style dengan `placed/total` untuk setiap potongan dan ukuran, dan baris Total. |
| Piece Bar | Tab pertama panel bawah. Satu thumbnail per style, potongan, dan ukuran, berlabel nama potongan dan jumlah yang masih harus ditata; tooltip-nya memberi potongan, Style, dan ukuran. Seret untuk mengurutkan ulang: urutannya menjadi benih nesting. |
| Piece List | Satu baris per potongan dan ukuran. Kode, material, jumlah, rotasi, balik, dan buffer bisa disunting; koordinat, luas, dan keliling hanya baca. |
| Marker Definitions | Nama, material, lebar, panjang, lapis, mode lapis, margin, buffer, penyusutan, berat kain, biaya per meter, dan Total Pieces Area. |
| Order | Bundle per ukuran, dan arah untuk setiap ukuran: One Way, Opposite, atau Any. |
| Report | Laporan sebelum ditulis. Marker, Report… menampilkannya lagi setelah Anda menutupnya. |

Marker Table mengisi setiap potongan dengan warna ukurannya secara pekat, mengarsir tumpang tindih dengan merah, dan menggaris tepi oranye pada potongan yang berada di dalam margin. Potongan yang dipaku menampilkan pin. Marker baru atau yang dibuka menyesuaikan lebar kain ke tampilan.

Bilah status menjaga bidang berikut tetap hidup: posisi kursor, potongan yang ditata dari yang diminta, bundle lengkap dari yang diminta, tumpang tindih, efisiensi, lebar, panjang terpakai, panjang per garmen, lapis, dan kemajuan proses nesting. Bilah status juga punya sakelar Cut/Plot Order.

## Penyiapan

File, New Marker (`Ctrl+N`) membuka satu dialog berisi Marker Definitions, Style (yang terbuka di PDS, atau sebuah berkas lewat Browse), Material dengan potongan yang diambil satu Bundle dari masing-masing, serta Bundle dan arah per ukuran. Create tetap terkunci, dengan alasannya, sampai Style dipilih dan sesuatu dipesan.

Marker, Add Style… (`Shift+O`) menambahkan berkas style lain. Setiap style disematkan di marker, jadi marker tetap berfungsi jika berkas style dipindahkan. Jika berkas style berubah kemudian, marker memberi tahu dan menawarkan Update from Style, yang mempertahankan pose potongan yang masih ada. Marker, Marker Definitions… (`Ctrl+M`) mengubah kain dan batas-batasnya sebagai satu langkah urungkan.

Bundle adalah kumpulan potongan yang membuat satu garmen satu ukuran. Ketik bundle per ukuran di panel Order. Arah menentukan bagaimana potongan boleh berputar 180 derajat: One Way menjaga setiap bundle sama, Opposite berganti-ganti antarbundle, Any bebas.

**Mode lapis.** Marker Definitions, New Marker, dan wizard menawarkan Single, Tubular, Faced, dan Folded. Faced dan Folded memuat potongan berpasangan sekali, karena lapis lawan memberi cerminnya. Potongan separuh masih di-nesting tanpa dilipat pada Tubular dan Folded, dan panelnya menyebutkan itu.

## Marker Creation Wizard

File, Marker Creation Wizard… membuat beberapa Marker sekaligus. Langkahnya adalah Select Style Files, Define Marker Files, Define Quantities (Bundle per Marker dan ukuran), Define Table Properties, Define Global Properties (dengan buffer), Define Piece Properties (rotasi, balik, dan buffer setiap potongan), dan Finish. Create Markers membuka satu Marker belum tersimpan per baris. Pengaturan potongan masuk ke salinan Style milik setiap Marker, tidak pernah ke Style yang terbuka di PDS.

## Tata dengan tangan

| Untuk | Lakukan ini |
|---|---|
| Menata potongan | Seret thumbnail ke meja, atau klik ganda untuk tempat kosong pertama, kiri bawah. Klik pada thumbnail atau sel Pieces menyiapkan penataan: salinan berikutnya menggantung di bawah penunjuk sebagai bayangan, diarsir merah di tempat yang akan tumpang tindih, dan setiap klik pada meja menatanya. `Esc` berhenti. |
| Menata banyak | `P` mengaktifkan Place Tool, `Shift+P` menata bundle terpilih, dan Place All menata setiap potongan yang belum ditata, kiri bawah lebih dulu. |
| Memindahkannya | Seret. Tumpang tindih diizinkan dan ditampilkan. |
| Mengembalikannya ke bar | Klik ganda pada potongan yang sudah ditata, atau pilih lalu tekan `Del`. |
| Memutar | `Shift+R` melangkah ke orientasi berikutnya yang diizinkan aturannya, seperti klik kanan. `F3` atau `=` memutar 90°, `F4` atau `-` memutar 180°. |
| Membalik | Flip X (`Shift+X`) dan Flip Y (`Shift+Y`). |
| Menembak (Shoot) | Klik kanan dan seret ke satu arah, lalu lepas, atau tekan `Shift+Arrow`. Potongan meluncur sampai menyentuh potongan lain, margin, atau tepi kain, dengan mempertahankan buffer. |
| Menggeser sedikit | Tombol panah, atau angka 2, 4, 6, dan 8. Langkahnya 1 mm kecuali Preferences menentukan lain. |
| Memilih satu bundle | `Ctrl+K` memilih seluruh bundle dari potongan terpilih. |
| Memaku potongan | Piece, Fix on Marker memakunya: potongan menolak seret, Shoot, geser sedikit, dan putar, dan Auto Nesting membiarkannya di tempat. Unfix Selected dan Unfix All melepasnya. |
| Mengosongkan marker | `Ctrl+C` mengembalikan setiap potongan ke bar. `Ctrl+Z` mengembalikannya. |

`Z` mengaktifkan Select.

## Insert to Hole

Piece, Insert to Hole mengaktifkan mode di samping Select, Shoot, dan Rotate Piece. Seret potongan yang sudah ditata ke atas lubang dengan tombol kiri atau kanan. Potongan mengambil tempat kosong terdekat yang muat, dan berputar ke orientasi apa pun yang diizinkan aturannya bila perlu. Lalu potongan itu menabrak sepanjang arah seretan, seperti Shoot. Perpindahannya satu langkah urungkan. Potongan yang dipaku, anggota cluster, dan jatuhan tanpa lubang yang muat dalam jangkauan ditolak dengan pemberitahuan. Satu seretan memindahkan satu potongan.

## Cluster dan Fuse Block

Grouping, Cluster Pieces membekukan susunan dua potongan atau lebih yang sudah ditata. Cluster dipilih, diseret, digeser sedikit, ditembak, dipaku, dikembalikan, ditata, dan di-nesting sebagai satu potongan. Selama menunggu, Piece Bar menampilkannya sebagai satu thumbnail "Cluster n", ditata dengan klik ganda atau seret. Cluster hanya bergeser: memutar atau membalik anggotanya ditolak dengan pemberitahuan. Grouping, Delete Cluster melepas potongannya di tempat.

Grouping, Optimum Block Fuse… dan Rectangular Block Fuse… menanyakan celah di sekeliling potongan (0 sampai 1000 mm, mula-mula 10 mm). Keduanya membuat Fuse Block: cluster dengan batas, berupa kontur yang mengikuti potongan atau persegi panjang. Auto Nesting menjauhkan potongan lain dari batas itu, plot menggambarnya, dan berkas potong memotong batasnya alih-alih potongannya, jadi blok bisa di-fuse sebelum potongannya dipotong. Berkas potong kedua berisi isi blok dan Thrifty Block Fuse belum dibuat.

## Bump line dan cut line

Bump Line adalah dinding vertikal atau horizontal yang tidak dilewati potongan selama Auto Nesting, perintah Place, dan Shoot. Cut Line adalah Bump Line yang dipotong berkas potong melintang kain.

- Seret garis keluar dari tepi meja, seret untuk memindahkannya, dan klik kanan untuk menunya. Marker, Add Bumpline at Current Marker End menambahkan satu di panjang terpakai.
- Marker, Bump/ Cut Lines… mencantumkan garis dengan Coordinate, Line Direction, Hide, Fixed, Cut, dan No Bump. Dialog ini juga memuat overcut Top dan Bottom Marker, Show Bump Lines Description, Minimal Cut Line Segment, dan opsi yang menambahkan garis vertikal di ujung marker setelah setiap Auto Nesting.
- Berkas potong memotong Cut line dan melewatkan bagian yang berada di dalam potongan. Plot menggambar cut line padat dan bump line putus-putus.

## Cacat kain

Flaw adalah persegi kain yang tidak boleh ditimpa potongan mana pun. Marker, Flaws punya:

- **Mark Flaw on the Marker**: seret persegi, atau isi Left, Right, Top, dan Bottom. Whole Length Flaw dan Whole Width Flaw membentang sepanjang marker atau selebar Material.
- **Import Flaws…** dari daftar CSV dengan satu baris `x_from,y_from,x_to,y_to` per cacat, dalam milimeter. Baris yang salah menolak berkasnya dan disebut.
- **Remove Pieces Hitting Flaws** dan **Delete All Flaws**.

Auto Nesting dan perintah Place menjauhkan potongan dari cacat. Cacat digambar berarsir di meja dan tidak diplot.

## Teks pada marker

Piece, Internal Text mengaktifkan Text Tool. Klik meja atau potongan yang ditata untuk menambahkan teks, dengan Size, Angle, serta X dan Y Position. Teks pada potongan ikut berpindah dan berputar dengannya, dan Apply To All Sizes menaruhnya pada setiap salinan potongan yang ditata. Klik teks untuk menyuntingnya, Remove atau Remove All, dan seret untuk memindahkannya. Teks diplot, tidak pernah dipotong.

## Substitute Size dan Single Piece Gap

- **Substitute Size For Selected Pieces** (Grouping, Bundles) menukar setiap potongan terpilih yang sudah ditata dengan salinan yang menunggu dari potongan yang sama pada ukuran berikutnya, dalam satu langkah urungkan, dan hitungan order tetap benar. Pada ukuran terakhir, atau tanpa salinan yang menunggu, potongan tetap di tempatnya dan peringatan menyebut alasannya.
- **Single Piece Gap** (menu Tools). Dengan celah Shoot yang diatur di Preferences, Marker, Shoot berhenti sejauh itu dari potongan lain, margin, dan bump line.

## Auto-nesting

Nesting, Start AutoNesting (`Shift+N`) menata potongan untuk Anda. Mesinnya milik Rajutara sendiri: ia membangun no-fit polygon dengan ring convolution, mengisi dari kiri bawah, dan memperbaiki hasil dengan simulated annealing, mengikuti metode terbitan Burke dan kawan-kawan. Mesin berjalan di thread pekerja. Dialognya menampilkan waktu berjalan terhadap Time limit, panjang terbaik dan Efficiency sejauh ini, dan potongan yang sudah ditata, dengan Stop (`Esc`, atau `Ctrl+Shift+N`), lalu ringkasan. Dokumen berubah sekali, dengan satu perintah, saat proses berakhir.

Nesting, Auto Nesting Setup… (`Ctrl+Shift+Alt+N`) memuat pengaturannya, dan Save menyimpannya.

| Pengaturan | Bawaan | Arti |
|---|---|---|
| Time limit | 60 detik | Batas waktu dinding yang keras. |
| Efficiency limit | mati | Berhenti lebih awal ketika marker mencapainya. |
| Unlimited marker length | nyala | Abaikan panjang maksimum saat nesting. |
| Keep placed pieces | nyala | Nesting potongan yang belum ditata di sekitar yang sudah ditata. Potongan yang dipaku tetap di tempat walaupun ini mati. |
| Seed | 1 | Membuat satu proses bisa diulang. |

Proses yang berhenti karena batas waktu bergantung pada kecepatan mesin. Dalam tolok ukur rilis, 300 potongan di-nesting dalam 58 detik dengan efisiensi 90,1 %. Mesin tidak pernah meninggalkan tumpang tindih pada hasilnya, dan pemeriksaan eksak terpisah memastikannya.

![Marker 300 potongan badan depan kemeja pada kain 150 cm, di-nesting oleh mesin, tanpa tumpang tindih.](../../../../../assets/screens/full-nest.jpg)

## Auto Nest Queue

Nesting, Auto Nest Queue… me-nesting beberapa berkas `.rjm` berurutan dalam satu pekerjaan latar, tanpa Marker terbuka. Tambahkan berkasnya dengan Add Markers…, lalu beri setiap baris modenya di kolom Advanced, waktu maksimum, dan batas efisiensi, lalu tekan Run. Regular me-nesting ulang setiap potongan; Continue mempertahankan potongan yang sudah ditata dan me-nesting yang menunggu di sekitarnya. Setiap hasil masuk ke `<stem>-nested.rjm` di samping masukannya, dan masukannya tidak pernah ditulis. Berkas yang gagal menampilkan alasannya dan antrean berlanjut. Stop menyimpan baris yang sedang berjalan dan membiarkan yang lain Pending. Menutup dialog membiarkan pekerjaan tetap berjalan, dengan strip yang menyebut barisnya. Mesinnya hanya satu, jadi antrean tidak punya pilihan algoritma, dan tidak ada berkas antrean yang ditulis.

## Arti angka-angkanya

- **Used length**: X terbesar dari garis potong mana pun yang ditata, ditambah margin kanan.
- **Efficiency**: luas potongan yang ditata dibagi lebar kali panjang terpakai, dalam persen.
- **Waste area**: lebar kali panjang terpakai, dikurangi luas yang ditata.
- **Per garment**: panjang terpakai dibagi bundle lengkap yang ditata, dengan menghitung garmen yang dipotong mode lapisnya.

Cacat dan bump line menghalangi penataan, tetapi tidak pernah menambah panjang terpakai atau mengubah Efficiency.

Marker kaos contoh terbaca 253,03 cm terpakai pada lebar 180 cm, efisiensi 84,10 %, dan 63,26 cm per garmen.

## Urutan potong

Cutting Order adalah urutan potongan masuk ke mesin potong, dengan titik awal dan arah pisau setiap potongan. Ini bukan Cut Order milik Cut Plan.

- **Marker, Selected Piece Cut Order…** mengatur tempat satu potongan dalam urutan potong, titik awalnya, dan arahnya (Clockwise atau Counter-clockwise). Set to all the same placed pieces menerapkannya pada setiap potongan sejenis yang sudah ditata.
- **Marker, Optimize Cut Order…** mengurutkan potongan menurut tetangga terdekat dari sudut meja, atau dari atas marker, dan bisa memilih titik awal masing-masing.
- **View, Cut/Plot Order**, juga sakelar di bilah status, memberi nomor pada potongan dan menandai setiap titik awal.

Tanpa Cutting Order, setiap potongan dipotong searah jarum jam dari titik kiri bawahnya.

## Laporan, plot, dan potong

File, Report to Excel… (`Ctrl+R`) menulis workbook Excel (`.xlsx`) dengan satu lembar kerja per bagian, dan File, Print… (`Ctrl+P`) menulis PDF. Keduanya punya bagian yang sama: angka umum, order, setiap potongan, dan penandaan menurut bentuk.

File, Plot/Cut… (`Ctrl+L`) menawarkan PDF sebagai ubin A4, PDF di lembar A0 (berubin sepanjang panjangnya ketika marker lebih panjang dari satu lembar), HPGL/2 untuk plotter gulungan, dan berkas potong. Plot membawa label pada setiap potongan, teks marker, dan blok header berisi nama marker, material, lebar, panjang, dan efisiensi. Berkas potong adalah satu berkas HPGL/2 generik dengan satu pena per elemen; pena 0 melewati elemen itu. Berkas ini mengikuti Cutting Order, titik awal, dan arahnya, memotong Fuse Block sebagai batasnya saja, dan menambahkan Cut line. File, Plotter Setup… memuat lebar kertas, offset, dan kalibrasi.

## Belum dibuat

- Tilt, pencocokan belang dan kotak-kotak, dan buffer potongan per sisi.
- Menata potongan separuh di tepi lipatan pada Tubular dan Folded.
- Pilihan mesin nesting, dan pengelompokan bundle di Auto Nesting Setup.
- Pemilih ukuran untuk Substitute Size: perintah ini hanya mengambil ukuran berikutnya.
- Quality Text dan Exclusive View untuk Text Tool, Lock dan OpStop untuk bump line, dan properti Overlay di wizard.

Lihat [peta jalan](../../roadmap/).
