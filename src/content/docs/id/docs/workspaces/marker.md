---
title: Marker
description: Tentukan kain, minta bundle per ukuran, tata potongan dengan tangan, terlipat, dimiringkan, atau pada belang, atau biarkan mesin nesting yang mengerjakannya, baca efisiensi, plot, potong, dan laporkan.
---

Marker adalah tata letak potongan satu style atau lebih dan satu ukuran atau lebih pada kain dengan lebar tertentu, siap diplot atau dipotong. Di ruang kerja ini Anda menentukan kain, meminta garmen yang dibutuhkan, menata potongan, dan membaca berapa kain yang dihabiskan tata letak itu.

![Ruang kerja Marker dengan kaos contoh yang ditata dengan tangan: Marker Table di tengah, Piece Bar di atas, Marker Properties di kiri, Piece List di bawah.](../../../../../assets/screens/full-marker.jpg)

## Layar

| Panel | Isinya |
|---|---|
| Marker Table | Pita kain, di tengah. X membentang sepanjang panjang marker, yaitu lusi, dan Y melintang lebarnya. Sebuah garis menunjukkan panjang terpakai beserta nilainya. Penggaris menandai setiap 10 cm. |
| Pieces | View, Pieces, tab pertama di kiri. Satu tabel per Style dengan `placed/total` untuk setiap potongan dan ukuran, dan baris Total. |
| Piece Bar | Tab pertama panel bawah. Satu thumbnail per style, potongan, dan ukuran, berlabel nama potongan dan jumlah yang masih harus ditata; tooltip-nya memberi potongan, Style, dan ukuran. Seret untuk mengurutkan ulang: urutannya menjadi benih nesting. |
| Piece List | Satu baris per potongan dan ukuran. Kode, material, jumlah, rotasi, balik, buffer, Max Tilt (°), Folding, dan buffer sisi bisa disunting; koordinat, luas, dan keliling hanya baca. Panjang memakai satuan kerja. Angka yang diketik atau diseret diterapkan sekali, saat `Enter`, di akhir seretan, atau saat Anda mengklik di tempat lain; `Esc` membuangnya. |
| Marker Definitions | Nama, material, lebar, panjang, lapis, mode lapis, margin, buffer, penyusutan, berat kain, biaya per meter, dan Total Pieces Area. |
| Order | Bundle per ukuran, dan arah untuk setiap ukuran: One Way, Opposite, atau Any. Angka yang diketik diterapkan seperti di Piece List. |
| Report | Laporan sebelum ditulis. Marker, Report… menampilkannya lagi setelah Anda menutupnya. |

Marker Table mengisi setiap potongan dengan warna ukurannya secara pekat, mengarsir tumpang tindih dengan merah, dan menggaris tepi oranye pada potongan yang berada di dalam margin. Potongan yang dipaku menampilkan pin. Marker baru atau yang dibuka menyesuaikan lebar kain ke tampilan.

Bilah status selalu memperbarui bidang berikut: posisi kursor, potongan yang ditata dari yang diminta, bundle lengkap dari yang diminta, tumpang tindih, efisiensi, lebar, panjang terpakai, panjang per garmen, lapis, dan kemajuan proses nesting. Bilah status juga punya sakelar Cut/Plot Order.

## Penyiapan

File, New Marker (`Ctrl+N`) membuka satu dialog berisi Marker Definitions, Style (yang terbuka di PDS, atau sebuah berkas lewat Browse), Material dengan potongan yang diambil satu Bundle dari masing-masing, serta Bundle dan arah per ukuran. Alih-alih seluruh Style, Anda bisa memilih salah satu Style Set-nya. Create tetap terkunci, dengan alasannya, sampai Style dipilih dan sesuatu dipesan.

Marker, Add Style… (`Shift+O`) menambahkan berkas style lain. Setiap style disematkan di marker, jadi marker tetap berfungsi jika berkas style dipindahkan. Jika berkas style berubah kemudian, marker memberi tahu dan menawarkan Update from Style, yang mempertahankan pose potongan yang masih ada dan Style Set yang tertanam. Pratinjau dan pemberitahuannya menghitung pasangan terlipat yang dibukanya, dan menyebut berkas sumber yang hilang. Marker, Marker Definitions… (`Ctrl+M`) mengubah kain dan batas-batasnya sebagai satu langkah urungkan.

Bundle adalah kumpulan potongan yang membuat satu garmen satu ukuran. Ketik bundle per ukuran di panel Order. Arah menentukan bagaimana potongan boleh berputar 180 derajat: One Way menjaga setiap bundle sama, Opposite berganti-ganti antarbundle, Any bebas.

Marker Definitions, New Marker, dan wizard menawarkan mode lapis Single, Tubular, Faced, dan Folded. Faced dan Folded memuat potongan berpasangan sekali, karena lapis lawan memberi cerminnya. Mode lapis juga menentukan di mana pasangan bisa berbaring terlipat; lihat [Potongan terlipat](#potongan-terlipat).

## Marker Creation Wizard

File, Marker Creation Wizard… membuat beberapa Marker sekaligus. Langkahnya adalah Select Style Files, Define Marker Files, Define Quantities (Bundle per Marker dan ukuran), Define Table Properties, Define Global Properties (dengan buffer), Define Piece Properties (rotasi, balik, dan buffer setiap potongan), dan Finish. Berkas Style bisa ditanamkan sebagai salah satu Style Set-nya. Create Markers membuka satu Marker belum tersimpan per baris. Pengaturan potongan masuk ke salinan Style milik setiap Marker, tidak pernah ke Style yang terbuka di PDS.

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

Piece, Insert to Hole mengaktifkan mode di samping Select, Shoot, dan Rotate Piece. Seret potongan yang sudah ditata ke atas lubang dengan tombol kiri atau kanan. Potongan mengambil tempat kosong terdekat yang muat, dan berputar ke orientasi apa pun yang diizinkan aturannya bila perlu. Lalu potongan itu menabrak sepanjang arah seretan, seperti Shoot. Perpindahannya satu langkah urungkan. Insert to Hole menolak potongan yang dipaku, anggota cluster, dan jatuhan tanpa lubang yang muat dalam jangkauan, lalu menampilkan pemberitahuan. Satu seretan memindahkan satu potongan. Potongan yang dijatuhkan kembali ke lubang asalnya masuk, meski dilepas beberapa sentimeter dari situ.

## Buffer potongan per sisi

Piece, Edit Piece Buffer… memberi potongan ruang lebih di beberapa sisi daripada sisi lain. Around adalah buffer di setiap sisi. Up, Down, Left, dan Right menambah satu sisi dari bingkai serat potongan, jadi ikut berputar bersama potongan; salinan yang dicerminkan menukar Up dan Down. Convex memberi buffer pada selubung cembung, bukan garis tepi, dan Round Corners membulatkan sudut yang diberi buffer. Rantai memberi satu ruas garis potong lebarnya sendiri; pilih titiknya One by One atau Start-End. Apply to Selected Pieces atau Apply to All Pieces membuat perubahan dalam satu langkah urungkan.

View, Piece Buffer menggambar garis tepi yang sudah diberi buffer. Potongan tanpa buffer sisi dan tanpa rantai di-nesting persis seperti sebelumnya. Satu buffer melayani setiap ukuran.

## Potongan terlipat

Sepasang potongan bisa berbaring di meja sebagai satu separuh pada lipatan, seperti saat dipotong dari kain terlipat.

- Piece, Foldable Up & Down (`Ctrl+U`), Foldable Left & Right, dan Not Foldable (`Ctrl+Q`) mengatur aturan salinan potongan di Marker.
- Piece, Place Folded menawarkan empat tepi dan empat sudut. Atau tahan `U`, `D`, `L`, atau `R` saat menjatuhkan atau mengklik ganda potongan yang menunggu; dua tombol membuat sudut.
- Mode lapis menentukan tepinya. Tubular melipat di atas dan bawah, Faced di kiri dan kanan, dan Folded di keempatnya. Sudut memerlukan Folded dengan 4 lapis atau lebih, dan tepi kanan memerlukan panjang Marker.
- Pasangan terlipat adalah dua salinan yang berbaring sebagai satu separuh pada garis lipat. Keduanya berbagi satu bentuk, jadi pasangan itu tidak bisa dipindah, ditembak, atau diputar sampai dibuka. Klik ganda, atau pakai Piece, Unfold, untuk mengembalikan keduanya.

Plot dan berkas potong menggambar separuh itu dengan tanda lipat. Auto Nesting membiarkan potongan terlipat di tempatnya dan tidak melipat potongan sendiri.

## Belang dan kotak-kotak

Marker, Stripe Definition… mengatur belang kain di meja: Start X dan Y, jarak antara belang vertikal dan antara belang horizontal, sudut masing-masing, dan Stripe Adjust According To Set Only. Nilai awalnya diambil dari Fabric Pattern milik Style. View, Stripes Lines menggambar belangnya.

Potongan ikut serta bila punya titik belang, yaitu titik yang berada di garis belang; PDS mengaturnya dengan Relate Piece To Stripes. Marker, Relate Piece to Stripes… memberi potongan jarak X dan Y dari belang, dan Grouping, Stripe Adjust Group (`Ctrl+G`) mempertahankan posisi belang potongan terpilih. Dengan Tools, Stripe Adjust menyala, potongan yang punya titik belang menempel ke belang saat dijatuhkan, diseret sendirian, ditembak, atau dimasukkan ke lubang, dan Auto Nesting hanya menaruh potongan seperti itu di posisi belang. Seleksi atau cluster bergerak sesuai seretan, tanpa menempel.

## Tilt

Piece, Tilt Left (`F11`) dan Tilt Right (`F12`) memutar potongan terpilih yang sudah ditata sebesar Tilt Step dari Preferences, Marker, dalam satu langkah urungkan. Potongan tidak pernah berputar melewati Max Tilt-nya, yang diatur dalam derajat di PDS Piece Properties atau di Piece List. Preferences, Marker, Ignore Automatic Tilt Rotations menyala secara bawaan. Matikan, dan Auto Nesting juga mencoba setiap orientasi yang dimiringkan sebesar Max Tilt ke kedua arah.

## Cluster dan Fuse Block

Grouping, Cluster Pieces membekukan susunan dua potongan atau lebih yang sudah ditata. Rajutara memperlakukan cluster sebagai satu potongan saat Anda memilih, menyeret, menggeser sedikit, menembak, memaku, mengembalikan, dan menatanya, dan saat nesting. Selama menunggu, Piece Bar menampilkannya sebagai satu thumbnail "Cluster n", yang Anda tata dengan klik ganda atau seret. Cluster hanya bisa digeser: Rajutara menolak memutar atau membalik anggotanya, dengan pemberitahuan. Grouping, Delete Cluster melepas potongannya di tempat.

Grouping, Optimum Block Fuse… dan Rectangular Block Fuse… menanyakan celah di sekeliling potongan (0 sampai 1000 mm, mula-mula 10 mm). Keduanya membuat Fuse Block: cluster dengan batas, berupa kontur yang mengikuti potongan atau persegi panjang. Auto Nesting menjauhkan potongan lain dari batas itu, plot menggambarnya, dan berkas potong memotong batasnya alih-alih potongannya, jadi blok bisa di-fuse sebelum potongannya dipotong. Berkas potong kedua berisi isi blok dan Thrifty Block Fuse belum dibuat.

## Bump line dan cut line

Bump Line adalah dinding vertikal atau horizontal yang tidak dilewati potongan selama Auto Nesting, perintah Place, dan Shoot. Cut Line adalah Bump Line yang dipotong berkas potong melintang kain.

- Seret garis keluar dari tepi meja, seret untuk memindahkannya, dan klik kanan untuk menunya. Marker, Add Bumpline at Current Marker End menambahkan satu di panjang terpakai.
- Marker, Bump/ Cut Lines… mencantumkan garis dengan Coordinate, Line Direction, Hide, Fixed, Cut, dan No Bump. Dialog ini juga memuat overcut Top dan Bottom Marker, Show Bump Lines Description, Minimal Cut Line Segment, dan opsi yang menambahkan garis vertikal di ujung marker setelah setiap Auto Nesting.
- Berkas potong memotong Cut line dan melewatkan bagian yang berada di dalam potongan. Plot menggambar cut line padat dan bump line putus-putus.

## Cacat kain

Flaw adalah persegi kain yang tidak boleh ditimpa potongan mana pun. Marker, Flaws punya:

- **Mark Flaw on the Marker**: seret persegi, atau isi Left, Right, Top, dan Bottom. Whole Length Flaw dan Whole Width Flaw membentang sepanjang marker atau selebar Material.
- **Import Flaws…** dari daftar CSV dengan satu baris `x_from,y_from,x_to,y_to` per cacat, dalam milimeter. Satu baris yang salah membuat seluruh berkas ditolak, dan pesannya menyebut baris itu.
- **Remove Pieces Hitting Flaws** dan **Delete All Flaws**.

Auto Nesting dan perintah Place menjauhkan potongan dari cacat. Meja menggambar cacat dengan arsiran, dan plot tidak mencetaknya.

## Teks pada marker

Piece, Internal Text mengaktifkan Text Tool. Klik meja atau potongan yang ditata untuk menambahkan teks, dengan Size, Angle, serta X dan Y Position. Teks pada potongan ikut berpindah dan berputar dengannya, dan Apply To All Sizes menaruhnya pada setiap salinan potongan yang ditata. Klik teks untuk menyuntingnya, Remove atau Remove All, dan seret untuk memindahkannya. Teks diplot, tidak pernah dipotong.

## Substitute Size dan Single Piece Gap

- **Substitute Size For Selected Pieces** (Grouping, Bundles) menukar setiap potongan terpilih yang sudah ditata dengan salinan yang menunggu dari potongan yang sama pada ukuran berikutnya, dalam satu langkah urungkan, dan hitungan order tetap benar. Pada ukuran terakhir, atau tanpa salinan yang menunggu, potongan tetap di tempatnya dan peringatan menyebut alasannya.
- **Single Piece Gap** (menu Tools). Dengan celah Shoot yang diatur di Preferences, Marker, Shoot berhenti sejauh itu dari potongan lain, margin, dan bump line.

## Auto-nesting

Nesting, Start AutoNesting (`Shift+N`) menata potongan untuk Anda. Mesinnya milik Rajutara sendiri: ia membangun no-fit polygon dengan ring convolution, mengisi dari kiri bawah, dan memperbaiki hasil dengan simulated annealing, mengikuti metode terbitan Burke dan kawan-kawan. Mesin berjalan di thread pekerja. Dialognya menampilkan waktu berjalan terhadap Time limit, panjang terbaik dan Efficiency sejauh ini, dan potongan yang sudah ditata, dengan Stop (`Esc`, atau `Ctrl+Shift+N`), lalu ringkasan. Efficiency langsung diukur sama seperti hasilnya. Dokumen berubah sekali, dengan satu perintah, saat proses berakhir.

Nesting, Auto Nesting Setup… (`Ctrl+Shift+Alt+N`) memuat pengaturannya, dan Save menyimpannya.

| Pengaturan | Bawaan | Arti |
|---|---|---|
| Algorithm | Advanced | Standard adalah mesin di atas. Standard Quick hanya menjalankan putaran awal dan pemadatannya. Advanced dimulai dengan Standard, lalu meminimalkan tumpang tindih pada no-fit polygon dan mengembalikan yang lebih baik dari keduanya. |
| Time limit | 60 detik | Batas waktu dinding yang keras. |
| Efficiency limit | mati | Berhenti lebih awal ketika marker mencapainya. |
| Unlimited marker length | nyala | Abaikan panjang maksimum saat nesting. |
| Keep placed pieces | nyala | Nesting potongan yang belum ditata di sekitar yang sudah ditata. Potongan yang dipaku tetap di tempat walaupun ini mati. |
| Seed | 1 | Membuat satu proses bisa diulang. |
| Write efficiency log (CSV) | mati | Menulis `<stem>-nesting.csv`, satu baris per perbaikan: `time_s,length_mm,efficiency_pct,placed`. Memerlukan Marker yang sudah disimpan. |
| Save interim markers | mati | Menulis ulang `<stem>-interim.rjm` dengan susunan terbaik sejauh ini, paling sering sekali semenit. Memerlukan Marker yang sudah disimpan. |

Advanced menjadi bawaan sejak 2.0.0. Dalam keputusan tolok ukur [ADR-0019](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0019-nesting-engine-v2.md) (lima set garmen ESICUP, tiga seed, masing-masing 60 detik) Advanced mengungguli Standard di setiap set, rata-rata 2,54 poin Efficiency. Pilih Standard untuk mesin 1.x; baris Auto Nest Queue, `@NEST` tanpa `/AL`, dan `marker_nest` tanpa `algorithm` juga memakai Advanced.

Bagian Grouping di dialog menjaga potongan satu garmen tetap bersama. Pilihan pengelompokan dan lajur disimpan di Marker; Block Fuse During Nesting dan Separate Blocks hanya bertahan selama sesi.

- **Nesting According To Bundles** memberi setiap Bundle areanya sendiri sepanjang marker. Groups According to Sizes melakukan hal yang sama per ukuran. Bundles Overlap (Small, Medium, Large) membiarkan area itu bertumpang tindih.
- **Maintain Piece Orientation Within Bundles** menjaga setiap potongan dalam satu Bundle pada orientasi yang sama.
- **Horizontal Groups** membagi lebar menjadi 1 sampai 6 lajur, untuk kain yang shade-nya berubah melintang lebar. Setiap Bundle tetap di satu lajur, dan area bundle setiap lajur berjalan berdampingan. Horizontal Groups Overlap membiarkan potongan keluar dari lajurnya sejauh itu.
- **Block Fuse During Nesting** adalah Regular, Nest Blocks First, Nest Blocks Last, Nest Blocks Only, atau Nest With No Blocks, dengan Separate Blocks.

Proses yang berhenti karena batas waktu bergantung pada kecepatan mesin. Dalam tolok ukur rilis, 300 potongan di-nesting dalam 58 detik dengan efisiensi 90,1 %. Mesin tidak pernah meninggalkan tumpang tindih pada hasilnya, dan pemeriksaan eksak terpisah memastikannya.

![Marker 300 potongan badan depan kemeja pada kain 150 cm, di-nesting oleh mesin, tanpa tumpang tindih.](../../../../../assets/screens/full-nest.jpg)

## Auto Save Of Markers

Nesting, Auto Save Of Markers membagi satu order ke beberapa marker bila satu sudah penuh. Bila menyala dan panjang Marker diisi, Start AutoNesting meninggalkan susunan pertama di Marker yang terbuka dan me-nesting yang tidak muat ke `<file>-1.rjm`, `<file>-2.rjm`, dan seterusnya. Proses berhenti bila setiap potongan sudah ditata atau satu putaran tidak menata apa pun.

Potongan yang dipotong oleh marker lain dari rangkaian ini berstatus "cut elsewhere": disembunyikan dari Piece Bar, tidak di-nesting, dan tidak dihitung hilang. Save Only Nested Pieces (And Zero Remainders) dan Write Log Report To File (satu baris CSV per marker yang disimpan, dengan kolom `date_utc`) adalah opsi. Ringkasan mendaftar berkasnya dengan tombol Open. Skrip batch mencapai hal yang sama dengan `@NEST /SM`.

## Auto Nest Queue

Nesting, Auto Nest Queue… me-nesting beberapa berkas `.rjm` berurutan dalam satu pekerjaan latar, tanpa Marker terbuka. Tambahkan berkasnya dengan Add Markers…, lalu beri setiap baris modenya di kolom Advanced, Algorithm dan mode Block Fuse-nya, waktu maksimum, dan batas efisiensi, lalu tekan Run. Regular me-nesting ulang setiap potongan; Continue mempertahankan potongan yang sudah ditata dan me-nesting yang menunggu di sekitarnya. Baris baru dimulai sebagai Regular. Setiap hasil masuk ke `<stem>-nested.rjm` di samping masukannya, dan Rajutara tidak pernah menimpa berkas masukan. Berkas yang gagal menampilkan alasannya dan antrean berlanjut. Stop menyimpan baris yang sedang berjalan dan membiarkan yang lain Pending; baris yang dihentikan menampilkan efisiensi dan panjang hasil yang disimpannya. Menutup dialog membiarkan pekerjaan tetap berjalan, dengan strip yang menyebut barisnya. Rajutara tidak menulis berkas antrean.

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

File, Report to Excel… (`Ctrl+R`) menulis workbook Excel (`.xlsx`) dengan satu lembar kerja per bagian, dan File, Print… (`Ctrl+P`) menulis PDF. Keduanya punya bagian yang sama: angka umum, order, setiap potongan, dan penandaan menurut bentuk. Order mencantumkan Lane setiap Bundle, dan potongan mencantumkan Tilt (°) dan Folded. Hitungan terbaca "1 piece" dan "2 pieces", dan tanggal terbaca "Date (UTC)".

File, Customize Excel Report… punya satu tab per tabel laporan. Setiap kolom punya Show, Title, Move Up, dan Move Down, dan Restore Defaults mengembalikan kolom bawaan. Rajutara menyimpan pilihan itu di preferensi. Laporan Excel dan PDF mengikutinya, panel Report di layar tidak.

Preferences, Marker, Piece Description mengatur label setiap potongan yang ditata: bidang (Style Name, Piece Name, Code, Size, Bundle, Material, Description Text) dalam urutan yang Anda atur, Multi-Line Piece Description, Separator, Alphabetical Bundle Names, Don't Reset Bundle Numbering for Each Size, Orientation Next to Bundle Number, Auto Adjust Description Text, dan Show Piece Description Text in non-flipped form. Tabel, plot, label berkas potong, dan ekspor DXF mengikutinya.

File, Plot/Cut… (`Ctrl+L`) menawarkan PDF sebagai ubin A4, PDF di lembar A0 (berubin sepanjang panjangnya ketika marker lebih panjang dari satu lembar), HPGL/2 untuk plotter gulungan, dan berkas potong. Plot membawa label pada setiap potongan, teks marker, dan blok header berisi nama marker, material, lebar, panjang, dan efisiensi. Berkas potong adalah satu berkas HPGL/2 generik dengan satu pena per elemen; pena 0 melewati elemen itu. Berkas ini mengikuti Cutting Order, titik awal, dan arahnya, memotong Fuse Block sebagai batasnya saja, menggambar separuh terlipat dengan tanda lipat, dan menambahkan Cut line. File, Plotter Setup… memuat lebar kertas, offset, dan kalibrasi.

File, Export to CAD/CAM Files… menulis DXF (rilis 12, milimeter) dari isi plot, dengan label sebagai teks, satu warna per Bundle, dan satu layer per jenis elemen. Translate piece names mencetak nama lewat Tools, Piece Name Dictionary…. [Format berkas](../../formats/) memuat rinciannya.

## Belum dibuat

- Pemilih ukuran untuk Substitute Size: perintah ini hanya mengambil ukuran berikutnya.
- Quality Text dan Exclusive View untuk Text Tool, Lock dan OpStop untuk bump line, dan properti Overlay di wizard.
- Pelipatan otomatis oleh Auto Nesting, dan menyunting garis tepi buffer titik demi titik.
- Opsi Nesting Additional Mixing, Optimize Last Bundles, dan Idle Time.
- Ukuran belang diagonal, warna belang, Revise Pieces Placements, dan motif bunga.

Lihat [peta jalan](../../roadmap/).
