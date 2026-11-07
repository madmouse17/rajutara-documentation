---
title: Asisten Rajutara
description: Ketik tugas, ikuti setiap pemanggilan alat di kartu, setujui yang menulis berkas, dan urungkan perubahan apa pun. Panel asisten, utas, dan kartunya, mulai Rajutara 2.1.0.
---

Asisten adalah panel di samping ruang kerja. Anda mengetik tugas, misalnya "tambah kampuh 1 cm di semua piece lalu simpan", dan model pilihan Anda mengerjakannya dengan alat yang sama dengan yang dipakai `rajutara batch` dan `rajutara mcp` ([Headless dan skrip](../headless/)). Setiap pemanggilan alat tampil sebagai kartu di panel. Model bisa membaca dan mengubah dokumen yang terbuka, tetapi tidak bisa menyimpan, menimpa, menghapus, atau menutup dokumen yang belum disimpan sebelum Anda menekan Setujui. Setiap perubahan yang dibuatnya bisa Anda urungkan.

Asisten baru ada di Rajutara 2.1.0. Panelnya tetap tertutup sampai Anda membukanya, dan peran Supervisor, peran bawaan, membiarkan semua aksi menu aktif.

Halaman ini memakai label antarmuka bahasa Indonesia. Nama bahasa Inggrisnya ada di dalam kurung pada penyebutan pertama.

## Menyalakan asisten

Asisten mati sampai Anda memilih model. Tampilan › Asisten (View › Assistant, `Ctrl+Shift+A`) membuka panel. Tanpa model, panel menampilkan **Asisten belum aktif**.

Saat panel pertama kali terbuka dalam keadaan ini, Rajutara menanyakan versi dan daftar model kepada Ollama di komputer ini (`127.0.0.1:11434`). Jika Ollama menjawab, panel menampilkan modelnya: pilih satu lalu tekan **Pakai model ini**. Rajutara membuat profil dari preset Ollama dan menjadikannya bawaan. **Tambah penyedia lain…** membuka Preferensi › Asisten, tempat Anda menambah profil untuk llama.cpp, LM Studio, penyedia daring, atau server di jaringan Anda. [Model](models/) menjelaskan setiap isian.

Aksi cepat, penjalan playbook, dan Bandingkan Skenario… bisa dipakai tanpa model ([Peran, keahlian, dan playbook](skills-and-playbooks/)).

## Panel

Panel terbuka di kanan setiap ruang kerja, lebarnya 380 pt. Seret tepinya untuk mengubah lebar antara 280 dan 720 pt. Kepala panel berisi:

- pemilih utas, dengan **Utas baru**;
- chip keahlian;
- pengalih **Model**, yang menampilkan setiap profil dengan lencananya: **Di komputer ini**, atau **Keluar dari komputer ini** (ditambah **Tidak terenkripsi** untuk alamat `http` di jaringan Anda);
- menu berisi **Hapus utas**, **Memori Asisten…**, **Penjalan Playbook…**, dan **Pengaturan Asisten…**.

Model yang dipilih di pengalih berlaku mulai tugas berikutnya, selama jendela terbuka. **Jadikan bawaan** menyimpannya ke preferensi.

Di bagian bawah ada kotak tulis. Ketik tugas; Enter mengirim dan Shift+Enter membuat baris baru. **Lampirkan berkas** menambahkan berkas PNG, JPEG, PDF, CSV, atau XLSX sebagai lampiran. Daftar **Keahlian** memilih **Otomatis** atau salah satu dari delapan keahlian, dan **Kirim** berubah menjadi **Hentikan** selama tugas berjalan. Jika program pembantu suara terpasang, tombol **Bicara** ada di sebelahnya ([Suara](voice/)).

Selama permintaan belum dijawab, satu baris di atas kotak tulis menghitung detik. Balasan tidak dialirkan: jawaban muncul setelah model selesai menulisnya.

## Utas

Utas adalah satu percakapan beserta tugas, langkah, dan jawabannya. Setiap utas adalah satu berkas di komputer ini, `threads/<thread-id>.jsonl` di folder asisten (`~/.config/rajutara/assistant/` di Linux, `%APPDATA%\rajutara\config\assistant\` di Windows). **Hapus utas** bertanya dulu, lalu memindahkan berkasnya ke folder sampah `threads/.rajutara-trash/`.

Model melihat percakapan sebelumnya di utas sebagai konteks, setiap sisi dipotong menjadi 300 karakter. Preferensi › Asisten › **Anggaran** mengatur **Token per utas (0 = tanpa batas)**. Jika sebuah permintaan butuh lebih dari sisa token utas, kartu "Utas ini memakai A dari B token." muncul dan menunggu: **Lanjutkan** menambah token, **Hentikan** mengakhiri tugas.

## Kartu

Setiap pesan dalam utas adalah kartu, yang terbaru di bawah. Setiap kartu punya glif status dan satu kata, sehingga statusnya tidak bergantung pada warna saja. Tombol hanya muncul di kartu yang sedang ditunggu tugas, dan hanya klik Anda yang menjawabnya.

| Kartu | Isinya | Tombol |
|---|---|---|
| Tugas | Teks dan lampiran Anda | |
| Jawaban | Ucapan model, profil, jumlah token (ditandai "sekitar" bila diperkirakan), dan "gratis" untuk model di komputer ini | **Membantu**, **Tidak membantu** |
| Langkah | Alat, satu kalimat tentang hasilnya, dan waktunya. **Rincian** menampilkan argumen, hasil, dan teks yang berasal dari berkas. Gambar **Sebelum** dan **Sesudah** bila alatnya memberi gambar | **Batalkan perubahan ini** |
| Persetujuan | "Setujui: Timpa kaos.rjx?", pengaman yang berlaku (salinan cadangan, folder sampah, atau salinan pemulihan), dan peringatan bila nama itu berasal dari berkas | **Setujui**, **Batal** |
| Rencana | Langkah-langkah rencana yang uji keringnya lolos | **Setujui rencana**, **Batal** |
| Pertanyaan | Pertanyaan model dengan 2 sampai 6 pilihan | Pilihan-pilihannya, **Ingat pilihan saya** |
| Checkpoint, pilihan, run | Tahap playbook dengan pemeriksaannya, berkas yang ditulisnya, dan nilai yang perlu Anda konfirmasi | **Setujui dan lanjutkan**, pilihan-pilihannya, **Hentikan run**, **Buka di penjalan** |
| Terkirim atau tidak | Ukuran yang dikirim dan host-nya, atau "Tidak dikirim. Tidak ada data yang keluar dari komputer ini." | |
| Galat | Apa yang salah dan apa yang harus dilakukan, dengan pesan asli penyedia di bawahnya | **Coba lagi**, atau **Buka Pengaturan Asisten** |
| Penyesuaian | Apa yang ditolak penyedia dan apa yang sekarang dikirim profil | **Buka Pengaturan Asisten** |
| Anggaran | "Utas ini memakai A dari B token." | **Lanjutkan**, **Hentikan** |
| Yang baru | Catatan rilis versi yang sedang berjalan | **Tampilkan semua**, **Mengerti** |
| Permintaan program | "_program_ ingin: _operasi_ _target_" dari program di soket lokal | **Setujui**, **Tolak** |

Jawaban model tampil sebagai teks dengan sebagian kecil markdown: paragraf, judul, tebal, miring, kode, daftar, dan kutipan. Tautan tampil sebagai "teks (url)". Tidak ada yang bisa diklik di jawaban, dan Rajutara tidak mengambil apa pun yang disebutnya.

**Coba lagi** muncul untuk pembatasan permintaan, server yang kelebihan beban atau bermasalah, batas waktu habis, dan host yang tidak menjawab, dan tombol ini menunggu selama waktu yang diminta penyedia. Kunci yang ditolak atau belum ada, kuota yang habis, alamat atau model yang tidak dikenal, permintaan yang terlalu panjang, parameter yang ditolak, pengalihan, atau dua jawaban berturut-turut yang tidak bisa dipakai mendapat **Buka Pengaturan Asisten**.

## Persetujuan dan urungkan

Model bekerja lewat pemanggilan alat, dan hanya klik Anda yang menyetujui apa pun yang menulis atau membuang. Empat operasi menunggu di kartu Persetujuan: Simpan, Timpa, Hapus, dan Tutup tanpa menyimpan. Pengaman lapisan perintah juga berlaku: setiap penimpaan lebih dulu menulis salinan `.bak` bertanggal, penghapusan memindahkan berkas ke `.rajutara-trash/` di sebelahnya, dan dokumen yang ditutup tanpa disimpan mendapat salinan pemulihan.

Rencana adalah daftar langkah yang lebih dulu dijalankan Rajutara sebagai uji kering lalu dikembalikan. Jika uji keringnya lolos, kartu Rencana menampilkan langkah-langkahnya dan **Setujui rencana** menjalankannya.

**Batalkan perubahan ini** di kartu Langkah mengurungkan satu perubahan itu selama riwayat urungkan dokumen masih menyimpan keadaan sebelumnya. Jika tidak lagi, kartu menulis "Keadaan sebelumnya sudah tidak ada di riwayat urungkan." Perubahan yang dibuat satu tugas di antara dua jawaban Anda juga menjadi satu langkah urungkan, sehingga `Ctrl+Z` mengurungkan semuanya sekaligus.

Tugas berakhir ketika model menjawab, ketika Anda menekan **Hentikan**, setelah 12 panggilan model, setelah dua balasan berturut-turut yang tidak bisa dipakai, ketika penyedia gagal, atau ketika Anda tidak mengirim permintaan ke komputer lain. **Hentikan** berlaku di antara dua pemanggilan alat.

## Yang baru

Setelah pembaruan, utas pertama menampilkan kartu **Yang baru di 2.1.0** dengan catatan rilis versi yang sedang berjalan, sekali untuk setiap versi. Kartu menampilkan 12 baris pertama; **Tampilkan semua** menampilkan sisanya dan **Mengerti** menutupnya. Catatannya diambil dari catatan perubahan yang tertanam di program dan ditulis dalam bahasa Inggris, dan antarmuka bahasa Indonesia menyebutkan hal itu. Kemudian, keahlian Pengajar bisa mengambil catatan yang sama, atau catatan versi sebelumnya, dengan alat `release_notes`.

## Selanjutnya

- [Model](models/): profil, preset, kunci, dan format jawaban.
- [Privasi dan persetujuan](privacy/): apa yang keluar dari komputer dan jendela yang bertanya lebih dulu.
- [Peran, keahlian, dan playbook](skills-and-playbooks/): peran di menu, delapan keahlian, aksi cepat, dan memori.
- [MCP dan soket lokal](mcp-and-socket/): izinkan program lain memakai jendela yang terbuka.
- [Suara](voice/): program pembantu opsional untuk tugas yang diucapkan.
- [Jiplak foto dan evaluasi](trace-and-eval/): ubah foto menjadi draf piece, dan uji model pada kasus Anda sendiri.
