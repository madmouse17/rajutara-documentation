---
title: Grading
description: "Grading berbasis aturan: tabel ukuran dengan satu base size, aturan grade pada setiap grade point, graded nest, dan pertukaran ASTM RUL."
---

Rajutara men-grade berdasarkan aturan, seperti sistem aturan-titik pada rangkaian CAD lain. Sebuah style punya Size Table dengan tepat satu Base Size, dan Grade Rule, dX dan dY per ukuran, pada setiap Grade Point. Ukuran selain base tidak pernah digambar ulang: ukuran itu diturunkan dari base size oleh aturan. Base size adalah ukuran yang Anda gambar.

![Ruang kerja Grading dengan kaos contoh: Grading Table dengan dX dan dY per ukuran di kiri, graded nest badan depan, badan belakang, rib kerah, dan lengan di Lembar Kerja.](../../../../../assets/screens/full-grading.jpg)

## Layar

Grading memakai style dan riwayat urungkan yang sama dengan PDS, dengan panel dan toolbar lain. Berpindah tab mempertahankan seleksi dan zoom. Pieces Window adalah tab pertama panel bawah, jadi Work Area tetap mengisi sebagian besar jendela.

| Panel | Isinya | Tombol |
|---|---|---|
| Work Area (Lembar Kerja) | Potongan, dengan graded nest terlihat. | |
| Pieces Window | Tab pertama panel bawah, seperti di PDS. | `1` |
| Grading Table | Aturan grade point terpilih: terlihat, warna, ukuran, dX, dY, dan dd (panjang perpindahan). | `2` |
| Rule Table | Aturan bernomor yang disimpan bersama style. | `Ctrl+Shift+Alt+R` |
| Properties, Pieces Table, History | Seperti di PDS. | `Ctrl+I`, `6` |

`F4` hanya menampilkan base size, dan `Ctrl+Shift+F4` menampilkan ukuran kecil, besar, dan base. Legenda Sizes bisa diseret dan diciutkan, dan tetap berada di dalam Work Area. Potongan ter-grade membawa tanda seleksi sekali saja, pada Base Size-nya.

## Memilih di Work Area

- **Seleksi persegi.** Seret dengan alat Select untuk memilih satu deret titik; `Shift` menambah ke seleksi. Cincin hover menandai titik yang akan diambil klik, dan tanda pegangan tampil per ukuran selama alat seret aktif.
- **Menu klik kanan.** Objek di bawah penunjuk dipilih lebih dulu; deret yang sudah terpilih dipertahankan, jadi Paste menjangkau semuanya.

| Di bawah penunjuk | Menu |
|---|---|
| Titik | Copy, Paste, Set Grading Tool, Flip, Grade Equally, Clear, Apply Rule |
| Potongan | Sizes Table, Set Grading Tool, Stack, Select Grade Points, Create Piece |
| Meja kosong | Sizes Table dan item tampilan |

## Tabel ukuran

`Shift+F4` membuka Sizes Table. Ini dialog karena penyuntingan ukuran menyentuh semua aturan sekaligus.

- Sisipkan atau tambahkan ukuran. Delta baru melanjutkan langkah dua ukuran terdekat, di tengah tabel maupun di ujungnya.
- Hapus ukuran saat ini, atau semua ukuran kecuali base.
- Ganti nama ukuran dan ubah urutannya. Nama berupa teks bebas tanpa spasi dan tidak bermakna bagi geometri. Change Size Order memindahkan warna, jenis garis, ketebalan, dan visibilitas bersama namanya.
- Set Base Size. Setiap titik berpindah ke posisinya pada ukuran yang dipilih dan setiap aturan diungkapkan ulang darinya.
- Tandai break size, lalu Regrade By Break Size: ukuran di antara dua break mengambil interpolasi linear dari break-nya. Perintah ini men-grade ulang setiap potongan yang tidak terlindungi, apa pun yang terpilih.
- Beri setiap ukuran warna, jenis garis, dan ketebalan garis (0,05 sampai 5 mm, bawaan 0,25 mm). Ini hanya mengubah cara ukuran digambar; Base Size digambar 0,10 mm lebih tebal.

Rajutara dibuat untuk satu dimensi ukuran hingga 12 ukuran. Program menerima hingga 99, batas yang melindungi memori pada build 32-bit.

## Tabel grading

Pilih grade point dan aturannya muncul. Ketik dX dan dY per ukuran. Sakelar Absolute mulai dalam keadaan mati, seperti di Optitex: tabel menampilkan langkah dari satu ukuran ke ukuran berikutnya. Centang Absolute untuk melihat jarak dari base size, yaitu cara nilainya disimpan. Nilai yang diketik sebelum sakelar diubah diterapkan pada tampilan tempat nilai itu diketik. Pemilih Grade by angle menampilkan angka yang sama sepanjang titik sebelumnya, titik berikutnya, atau tangen. Tombol panah berpindah antarsel, `Enter` menetapkan satu perintah, dan `Esc` mengembalikan sel.

Titik kontur tanpa aturan sendiri bergerak sebanding di antara grade point tetangganya. Sel dX dan dY-nya tetap bisa disunting: mengetik nilai men-grade titik itu dan menjadikannya Grade Point. Nilai yang diketik dipertahankan saat seleksi berpindah tanpa `Enter`. `Alt+1` mengalihkan grade point, dan menghapusnya menghapus aturannya setelah konfirmasi.

Menu tabel itu sendiri punya Equal All, Zero, Equal, Flip, Copy, dan Paste. Equal dan Equal All mengambil langkah dari ukuran pertama, yang terkecil. Zero, Flip, dan Equal bekerja pada kolom yang Anda klik.

## Alat grading

| Grup | Alat |
|---|---|
| Copy and paste | Copy Grading (`Shift+C`), Paste Grading (`Shift+V`), Paste X (`Shift+X`), Paste Y (`Shift+Y`), Paste Relatively, Paste Grading Around |
| Set and clear | Set Grading, Flip Grading, Grade Equally, Clear Grading |
| Grade | Grade Along Line, Grade Proportional, Match Segment, Grading Notch Tool |
| Move one size | Move Point Size, Move Size Along, Move Size Proportional, Move Size by Rectangle, Move Size Parallel, Align Points Size, Align Vertical and Horizontal Size, Align Size by Line |
| Stack | Stack Point, Stack by Grainline, Stack Along Line, Restore Stack, Remove Grainline Grading |
| Rules | Rules Library, Apply Rule, Select Grade Points |
| Pieces | Create Piece for Selected Size, Graded Nest |

**Stack Along Line.** Pilih satu segmen kontur, lalu pilih Grading, Stack, Stack Along Line. Setiap ukuran ditampilkan dengan deret itu dipusatkan pada deret Base Size, di tengah panjangnya, dan diputar sejajar dengannya. Perintah ini hanya mengubah tampilan; Restore Stack menghapusnya. Bila yang terpilih bukan tepat satu segmen kontur, perintah ini nonaktif dan menyebut alasannya.

**Set Grading** punya Last used dan Show from Base Size, seperti dialog Grading Tool di Optitex. Masukan terakhir disimpan di antara pembukaan.

**Move Point Size** memindahkan ukuran yang titiknya Anda pegang, seperti Optitex. Titik yang diseret menjadi seleksi, jadi Grading Table menampilkan grading barunya, dan seretan menampilkan garis karet dengan L, sudut, dX, dan dY. Tahan `Shift` untuk ikut memindahkan ukuran yang lebih besar, dan `Ctrl` untuk yang lebih kecil.

## Men-grade penandaan

Grading, Grade, Grading Notch Tool men-grade posisi sebuah penandaan. Klik penandaan, lalu titik sebelumnya atau titik berikutnya. Sebuah tabel menampilkan jarak penandaan dari titik itu di setiap ukuran. Apply men-grade-nya dalam satu langkah urungkan, dan Reset mengembalikan apa yang disimpan Style. Penandaan yang berada tepat pada titik ditolak.

## Graded nest

Tampilan Graded Nest menggambar setiap ukuran dengan warna dan ketebalan garisnya sendiri, diselaraskan pada Stack Point, dan tidak pernah mengubah geometri atau aturan. Graded Nest juga sebuah alat: ia membangun satu potongan ter-grade dari potongan per ukuran yang terpisah, untuk style yang diimpor dengan ukurannya sebagai potongan terpisah.

## Pertukaran

Style yang sudah di-grade keluar sebagai DXF ASTM D6673 ukuran sampel ditambah berkas ASTM RUL yang memuat aturan, atau sebagai graded nest dengan satu blok per ukuran. Keduanya bisa dibaca kembali. Sintaks RUL ditunjukkan di [Format berkas](../../formats/). Tabel aturan dalam format asli Optitex tidak dibaca atau ditulis.

Sistem ukuran multidimensi, cross grading dengan menggabungkan berkas style, dan bagan ukuran adalah Fase 3. Lihat [peta jalan](../../roadmap/).
