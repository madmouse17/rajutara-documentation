---
title: Cut Plan
description: Dari purchase order warna per ukuran ke marker, lay, kain, dan biaya, lintas beberapa style, material, dan meja potong, lalu Cut Order dengan gulungan kain, sisa, dan Fabric Room.
---

Cut Plan (Rencana Potong) dimulai dari sebuah Order, garmen yang diinginkan per warna dan ukuran, dan merencanakan Lay yang memotongnya. Lay adalah marker dengan jumlah lapis. Rencana melaporkan kain yang dipakai setiap lay dan biaya seluruh order. Cut Order kemudian menyusun lay dalam urutan penghamparan dan mengambil lapisnya dari gulungan kain Anda. Satu rencana bisa memuat beberapa Purchase Order, beberapa Style, dan beberapa Material.

![Ruang kerja Cut Plan untuk order PO-100: panel Plan di kiri, panel Results di kanan dengan tiga marker, sembilan lay, tabel dipesan, direncanakan, dan selisih, serta total.](../../../../../assets/screens/full-cutplan.jpg)

## Create New

Cut Plan, Create New… membuka wizard dengan langkah-langkah Optitex: Adding Style Files, Defining the Order Details, Adding Colors and Defining Quantity for each Size, Defining Material Properties, dan Defining the Marker. Back, Next, Finish, dan Cancel berpindah di dalamnya; `Enter` melanjutkan dan `Esc` membatalkan. Langkah pertama menawarkan Style yang terbuka di PDS sebelum berkas Style. Rencana terbuka saat Finish. Panel Plan, Results, atau Cut Order yang kosong juga punya tombol Create New….

Rencana yang disimpan Rajutara 1.5.x atau yang lebih lama terbuka sebagai rencana dengan satu Purchase Order. Rencana yang disimpan 2.0.0 tidak terbuka di 1.5.x.

## Panel Plan

Setiap langkah wizard tetap ada di panel Plan, sebagai daftar bagian yang bisa dilipat, jadi Anda bisa kembali ke langkah mana pun dan menyelesaikan ulang.

| Bagian | Bidang |
|---|---|
| Purchase Orders | PO milik rencana, dengan Add PO, Duplicate PO, Rename, dan Remove PO. Bagian lain menampilkan PO yang terpilih. |
| Style | Style milik rencana, masing-masing tertanam utuh atau sebagai satu Style Set, dan ukuran yang direncanakan. |
| Order | Nama order, klien, dan operator. |
| Colours and quantities | Satu baris per warna, satu kolom per ukuran, dengan total. Setiap baris warna menyebut Style-nya. Mode rasio, deviasi, dan impor dari sheet. |
| Material | Nama, lebar, mode lapis, penyusutan, harga per meter, dan berat. |
| Marker limits | Panjang marker maksimum, lapis minimum dan maksimum, bundle maksimum per marker, kelonggaran di ujung tiap lapis, dan batas limbah dalam persen. |
| Cost and efficiency | Efisiensi yang diasumsikan sebelum marker di-nesting, bagian material dalam biaya produksi, dan apakah marker di-nesting. |

**Mode rasio** mengambil rasio per ukuran dan total per warna lalu membagi jumlahnya dengan pembulatan sisa terbesar, sehingga setiap baris berjumlah sama dengan totalnya. **Deviasi** adalah kelebihan potong yang Anda terima, sebagai persen dari jumlah yang dipesan, per sel: pemotongan kurang tidak pernah direncanakan. **Import quantities…** membaca berkas `.csv`, `.xlsx`, atau `.ods`, sheet pertama, dengan baris judul, warna di kolom pertama dan satu kolom per nama ukuran.

## Purchase Order

Satu rencana memuat satu Purchase Order (PO) atau lebih. Setiap PO punya Order, jumlah, marker, dan Lay sendiri. Add PO menambah satu, Duplicate PO menyalin yang terpilih, Rename menamainya, dan Remove PO menghapusnya; PO terakhir tidak bisa dihapus.

Viewing the Final Results dan Main Algorithm with Nesting bekerja pada PO terpilih. Solve All POs dan Nest All POs bekerja pada setiap PO, masing-masing sebagai satu langkah urungkan. Dengan dua PO atau lebih, panel Results menampilkan perbandingan PO di atas marker dan Lay PO terpilih: satu kolom per PO dan Total, dengan garmen dipesan dan direncanakan, marker, Lay, lapis, kain termasuk limbah, efisiensi, biaya, dan biaya per garmen.

## Style, Material, dan Spreading Group

Cut Plan, Add Style… menambah Style dari PDS atau dari berkas, utuh atau sebagai salah satu Style Set-nya. Cut Plan, Styles and Materials… mendaftar Style dan Material milik rencana dan menambah Material. Satu marker tidak pernah mencampur Style.

Setiap Material direncanakan sendiri kecuali Spreading Group memotong beberapa Material dari satu kain. Cut Plan, Spreading Groups… membuat grupnya. Grup mengambil lebar, penyusutan, dan biaya Material pertamanya, dan markernya memuat potongan dari semua Material-nya.

## Meja potong

Cut Plan, Cutting Tables… mendaftar meja di ruang potong: nama, panjang, lapis minimum dan maksimum, dan secara opsional satu Material atau Spreading Group yang dilayani meja itu. Satu kain mendapat batas dari mejanya yang terpanjang. Cut Order menaruh setiap Lay di meja yang muat dengan kain terhampar paling sedikit sejauh ini.

Bila Spreading Groups, Cutting Tables, atau pengelompokan gulungan berubah pada rencana yang sudah diselesaikan, bilah status menampilkan "Setup changed: solve again". Klik padanya menjalankan Solve All POs. Marker dari grup yang ditinggal tanpa Material mempertahankan kain asal potongnya.

## Viewing the Final Results

Tekan Viewing the Final Results (`F5`) untuk menyelesaikan rencana. Penyelesainya adalah greedy deterministik: untuk setiap warna, dari lapis terbanyak ke paling sedikit, ia memilih rasio ukuran per marker yang memotong garmen paling banyak yang benar-benar dibutuhkan, mengutamakan rasio yang sudah dipakai rencana, lalu yang kelebihan potongnya paling kecil. Marker dengan rasio sama pada warna berbeda digabung, sehingga ada lebih sedikit marker yang harus dibuat. Masukan yang sama selalu menghasilkan rencana yang sama, dan rencana untuk sepuluh warna dan dua belas ukuran memakan sepersekian detik.

Main Algorithm with Nesting me-nesting setiap marker yang direncanakan dengan mesin yang sama dengan ruang kerja Marker, sehingga panjang dan efisiensi sebenarnya menggantikan perkiraan. Marker yang lebih panjang dari batas ditandai "too long", tidak disembunyikan.

Keduanya memeriksa rencana sebelum nesting apa pun. Keduanya menolak potongan yang dipesan bila lebih lebar dari Material, dan menyebut namanya. Berkas rencana dengan potongan seperti itu tetap terbuka, dengan peringatan, jadi Anda bisa melebarkan Material. Selama Anda menyunting, panel Plan dan wizard memperingatkan bila satu Bundle lebih panjang dari panjang marker maksimum; marker itu tetap disimpan dan ditandai "too long".

## Results

| Tabel | Yang ditampilkannya |
|---|---|
| PO comparison | Dengan dua PO atau lebih: satu kolom per PO dan Total. |
| Markers | Marker, rasio seperti `S1 M2 L1`, bundle, panjang, efisiensi, lapis per warna, dan kain yang dipakainya. |
| Lays | Nomor lay, warna, marker, rasio, lapis, panjang per lapis, garmen, dan kain. Lapisnya bisa disunting. |
| Ordered, planned, difference | Per ukuran dan warna. Kelebihan potong ditandai dengan lencana teks selain warna. |
| Totals and cost | Garmen dipesan dan direncanakan, marker dan lay, kain per warna, kain termasuk limbah, biaya material, perkiraan biaya produksi, dan biaya per garmen. Order kosong terbaca 0.00. |

Sunting lapis sebuah lay atau rasio sebuah marker dengan tangan dan tabel selisih mengikuti. Rencana lalu ditandai sebagai sudah disunting, dan menyelesaikan ulang akan bertanya dulu. Untuk order contoh PO-100, 590 garmen dalam tiga warna menjadi tiga marker dan sembilan lay.

## Cut Order

Tab Cut Order mengubah rencana yang sudah diselesaikan menjadi pekerjaan untuk ruang potong: urutan lay dihampar, dan Fabric Roll tempat tiap lay mengambil lapisnya.

1. **Urutan.** Lay dikelompokkan menurut warna dalam urutan Order, sehingga setiap pergantian warna hanya sekali menukar gulungan di mesin hampar. Dalam satu warna, lapis terpanjang didahulukan, karena memerlukan bentang gulungan segar yang panjang tanpa putus dan yang lebih pendek bisa memakai ujung-ujungnya. Dengan beberapa PO ada satu urutan, PO demi PO, dan PO berbagi gulungan.
2. **Alokasi gulungan.** Setiap lapis diambil utuh dari gulungan berwarna sama dengan lay yang lebarnya setidaknya sama dengan material. Gulungan dengan shade yang sama diutamakan, sehingga lay tidak mencampur shade kecuali tidak ada satu shade pun yang bisa menyelesaikannya. Di antara gulungan yang cocok, gulungan yang sudah ada di mesin hampar dipertahankan, dan gulungan yang sisanya paling kecil menang.
3. **Sisa dan kain yang kurang.** Remnant sebuah gulungan adalah yang tersisa setelah lapis terakhir. Jika tidak ada gulungan yang bisa memberi satu lapis, Cut Order melaporkan lay, jumlah lapis, dan panjang yang kurang.

Masukkan gulungan di panel Cut Order: kode, warna, shade, lebar, dan panjang, atau pakai Import Fabric Rolls… dengan berkas `.csv`, `.xlsx`, atau `.ods`. Gulungan warna lain, atau gulungan yang lebih sempit daripada material, tidak dipakai. Menyambung satu lapis lintas dua gulungan tidak direncanakan, karena lapis utuh tidak pernah merencanakan terlalu sedikit. Cut Order tidak pernah mengubah lay atau marker.

**Pengelompokan gulungan.** Cut Order setup, Group rolls membagi setiap warna ke kelompok gulungan: By width step, By shrinkage, dan One shade per group. Jumlah setiap warna dibagi ke kelompoknya sebanding dengan kainnya, dan setiap kelompok direncanakan pada lebarnya sendiri dengan markernya sendiri.

## Fabric Room

Fabric Room adalah inventaris gulungan bengkel, dipakai bersama oleh setiap rencana. Pilih berkasnya, `.csv` atau `.xlsx`, di Preferences, Cut Plan. Cut Plan, Fabric Room… mendaftar gulungan dengan kode, Material, warna, shade, lebar, panjang, penyusutan, pemasok, biaya per meter, dan berat gulungan.

- Add, Remove, Import…, dan Export… menyunting daftar. Untuk mengubah satu baris, hapus lalu tambahkan lagi.
- Only this plan's materials and colours menyaring daftar.
- Take Rolls menyalin baris terpilih ke gulungan rencana.
- Return Remnants bertanya dulu, lalu menulis kembali sisa dari Cut Order: gulungan menjadi lebih pendek dan ringan, dan gulungan yang habis dihapus.

## Laporan

Generating a Cut Plan Report (CSV) menulis berkas UTF-8, satu per bagian, karena CSV tidak punya tab: marker rencana, lay-nya, dan seterusnya. Generating a Cut Plan Report (PDF) menulis isi yang sama di A4. Viewing the Production Report menghilangkan biaya dan menambahkan garmen per lay, untuk lantai pemotongan. Rencana dengan gulungan menambahkan bagian Cut Order ke keduanya, dan rencana dengan Cutting Tables menambahkan Lays per table. Dalam bahasa Indonesia laporannya bernama "Laporan Rencana Potong". Dua impor tetap bernama Import quantities… dan Import Fabric Rolls…, karena Optitex tidak punya perintah impor untuk keduanya.

Dengan beberapa PO, setiap bagian membawa nama PO, laporan menambahkan perbandingan PO, dan berkas CSV bernama `<stem>-<po>-<part>.csv`. Save Markers menulis `<stem>-<po>-M<n>.rjm`. Laporan satu PO sama seperti di 1.5.

Cut Plan, Customize Report… menyembunyikan, mengganti nama, dan mengubah urutan kolom setiap tabel laporan. CSV dan PDF mengikuti pilihan yang sama.

## Dari skrip

`rajutara batch` menjalankan Rencana Potong tanpa jendela: `@OPENCUTPLAN`, `@SOLVE`, `@NESTMARKERS`, `@CUTPLANREPORT`, `@SAVEMARKERS`, dan `@SAVECUTPLAN`, dengan `/PO` untuk memilih satu Purchase Order. Lihat [Headless dan skrip](../../headless/).
