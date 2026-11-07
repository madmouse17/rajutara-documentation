---
title: Peran, keahlian, dan playbook
description: Peran di menu, nama dan gaya bicara asisten, delapan keahlian, cara tugas berjalan, aksi cepat, penjalan playbook, perbandingan skenario, memori, dan umpan balik.
---

## Peran dan menu

Bilah status menampilkan peran yang sedang dipakai, misalnya **Peran: Supervisor**. Klik untuk memilih peran lain: Desainer Pola, Grader, Pembuat Marker, Pemotong, atau Supervisor. Pilihannya disimpan di preferensi, dan Supervisor adalah bawaannya.

Aksi di luar peran tetap terlihat tetapi dinonaktifkan, dengan alasan "Bukan bagian peran Grader. Ganti peran di bilah status." Ini berlaku di menu, bilah alat, palet perintah, dan pintasan.

| Aksi | Peran yang boleh menjalankannya |
|---|---|
| Tab ruang kerja, aksi Berkas, Ubah, Tampilan, dan kanvas | Semua |
| PDS | Desainer Pola |
| Grading | Grader |
| Marker | Pembuat Marker. Juga Pemotong untuk plot, berkas potong, laporan, ekspor, cetak, dan keluaran |
| Rencana Potong (Cut Plan) | Supervisor. Pemotong untuk aksi keluaran yang sama |

Supervisor menjalankan semuanya, jadi pengguna 2.0.0 tidak melihat perubahan. Panel asisten dan soket lokal berjalan dengan peran yang sama, sehingga model hanya mendapat alat yang diizinkan menu. Peran memandu pekerjaan; peran bukan kontrol akses, karena siapa pun di depan PC bisa menggantinya.

## Nama dan gaya bicara

Preferensi › Asisten › **Peran dan persona** mengatur **Nama asisten** (1 sampai 30 huruf, angka, spasi, `.`, `-`, dan `'`; bawaannya "Rajutara") dan **Gaya bicara**: **Formal** (bawaan, memakai "Anda") atau **Santai** (memakai "kamu"). Gaya bicara hanya mengubah kata-kata jawaban, tidak pernah mengubah alat yang dijalankan.

## Keahlian

Keahlian memberi tahu model tentang apa sebuah tugas: berkas prompt pendek, daftar paling banyak 16 alat, tag pengetahuan yang dicari lebih dulu, dan lingkup memori asal pelajarannya. Ada delapan keahlian:

| Keahlian | Ruang kerja | Tentang | Alat |
|---|---|---|---|
| Pembuatan pola | PDS | Piece, kampuh, penandaan, dan pemeriksaan Style | 14 |
| Grading | Grading | Ukuran, aturan grading, dan tabel ukuran | 14 |
| Marker | Marker | Menata dan menyusun piece (nesting) | 14 |
| Ruang potong | Rencana Potong | Rencana Potong, gelaran, plot, dan berkas potong | 14 |
| Bahan | | Pemakaian kain, susut, dan biaya | 8 |
| Pemeriksaan mutu (QC) | | Pemeriksaan, toleransi, dan playbook QC | 10 |
| Pertukaran berkas | | DXF, RUL, plot, dan impor | 14 |
| Pengajar | | Menjelaskan cara mengerjakan sesuatu di Rajutara | 9 |

Rajutara memilih keahlian setiap tugas:

1. Tugas yang diawali `@` dan id keahlian menyebut keahliannya langsung: `@grading`, `@cutting-room`, `@teacher`, dan seterusnya.
2. Jika tidak, kata kunci pertama yang cocok dengan satu kata utuh di tugas yang menentukan. Pertanyaan bagaimana atau mengapa ("bagaimana", "cara", "how", "jelaskan", "explain", "kenapa", "why", "apa itu", "what is") masuk ke Pengajar. Sesudah itu Grading, Marker, Ruang potong, Bahan, Pemeriksaan mutu, dan Pertukaran berkas dicoba dengan kata kunci bahasa Indonesia dan Inggris masing-masing.
3. Jika tidak ada yang cocok, keahlian ruang kerja yang aktif yang berlaku, dan Pembuatan pola bila tidak ada keahlian untuk ruang kerja itu.

Daftar **Keahlian** di kotak tulis mengesampingkan pilihan itu; **Otomatis** menampilkan keahlian yang akan dipilih, misalnya "Otomatis (Grading)". Kata kunci hanya cocok dengan kata utuh, jadi kata berimbuhan tidak cocok: "memotong" tidak memilih Ruang potong seperti "potong". Dalam kasus itu, pilih keahlian di daftar atau awali tugas dengan `@cutting-room`.

Bengkel bisa mengganti berkas prompt sebuah keahlian atau gaya bicara dengan salinannya sendiri di `prompts/skills/` atau `prompts/persona/` di folder asisten. Salinan bengkel mengalahkan berkas bawaan.

## Cara tugas berjalan

Di setiap giliran, Rajutara menyusun prompt dari instruksi (inti, peran, keahlian, dan persona), alat-alat keahlian, enam hasil alat terakhir, paling banyak empat hasil dari indeks pengetahuan, pelajaran dari lingkup memori keahlian, dan percakapan sebelumnya di utas. Rajutara mengirim permintaan, memeriksa satu aksi dalam balasan, lalu menjalankannya lewat lapisan perintah dengan peran yang sedang dipakai. Ini berulang sampai model menjawab, run playbook yang dimulainya selesai, atau Anda harus memutuskan sesuatu.

Tugas menunggu Anda saat menyimpan, menimpa, menghapus, atau menutup tanpa menyimpan, saat ada rencana, checkpoint atau pilihan playbook, pertanyaan dari model, batas anggaran utas, dan galat penyedia yang layak dicoba lagi. Hanya klik Anda yang sampai ke persetujuan; aksi model tidak pernah sampai ke sana.

Model juga bisa memulai playbook dan aksi cepat. Di dalam run playbook, model mendapat alat-alat tahap itu, dan checkpoint run tetap menunggu Anda.

## Aksi cepat

Jalur **Cepat** setelah bilah alat ruang kerja menampilkan paling banyak enam aksi cepat dari playbook ruang kerja yang aktif, dan **Lainnya…** untuk sisanya. Aksi cepat adalah playbook yang parameternya sudah terisi, misalnya `optimasi-cepat` untuk optimasi marker cepat. Aksi cepat bisa dipakai tanpa model.

Tombol yang playbook-nya masih butuh nilai menyebutkannya ("Perlu 2 nilai") dan membuka formulir **Mulai** _playbook_. Formulir itu menandai nilai yang diambil **dari profil bengkel** dan nilai yang **perlu dikonfirmasi operator**. **Mulai** memulai run.

## Penjalan playbook

**Penjalan Playbook…** (di menu panel atau palet perintah) menampilkan run tahap demi tahap. Untuk tahap yang sedang berjalan, ia menampilkan laporan, pemeriksaan dengan **Lolos** atau **Gagal**, berkas yang ditulis, dan nilai yang perlu dikonfirmasi. Tombolnya **Tahap berikutnya**, **Setujui dan lanjutkan**, pilihan-pilihan tahap pilihan, dan **Hentikan**. **Run terbaru** mendaftar run sebelumnya dan **Lanjutkan** meneruskan salah satunya. Status setiap tahap berbunyi **Selesai**, **Gagal**, **Menunggu persetujuan**, **Menunggu pilihan**, **Dilewati**, atau **Belum dijalankan**. Tahap yang gagal dikembalikan.

Penjalan bekerja lewat sesi jendela, satu tahap per frame. Tahap yang panjang, seperti run nesting, menahan jendela sampai selesai.

## Bandingkan skenario

**Bandingkan Skenario…** menjalankan satu tahap playbook dengan paling banyak 12 set parameter dan menampilkan hasilnya berdampingan. Pilih **Playbook** dan **Tahap**, lalu **Tambah skenario**, **Duplikat**, atau **Hapus** baris dan atur **Detik per skenario**. **Jalankan perbandingan** menjalankannya satu per frame. **Mulai run dengan skenario ini** memulai run sungguhan dari baris yang Anda pilih. Tahap yang menulis berkas tidak bisa dibandingkan, dan tombolnya menulis "Tahap ini menulis berkas, jadi tidak bisa dibandingkan."

## Memori

Asisten menyimpan pelajaran, preferensi, fakta, dan koreksi di komputer ini. Saat menyusun prompt, hasil dokumen dan alat didahulukan, profil bengkel kedua, dan memori terakhir. Pelajaran yang bertentangan dengan profil atau hasil alat ditandai usang dan menyimpan kedua nilainya.

Asisten mengingat pada tiga saat, dan masing-masing menampilkan "Diingat: …" dengan **Tinjau**:

1. Run playbook selesai: pemeriksaan yang gagal dan pilihan yang Anda buat.
2. Anda menandai jawaban **Tidak membantu**, menulis apa yang salah, dan membiarkan **Ingat ini sebagai koreksi** tercentang. Komentarnya menjadi koreksi di lingkup memori keahlian.
3. Anda menjawab pertanyaan dengan **Ingat pilihan saya** tercentang. "Pertanyaan → pilihan" menjadi preferensi di lingkup memori keahlian.

**Memori Asisten…** membuka tabel setiap entri dengan **Jenis**, **Lingkup**, **Teks**, **Sumber**, **Diperbarui**, dan **Usang** (beserta alasannya). Saring menurut lingkup dan jenis, centang **Hanya yang usang**, atau **Cari**. Teks yang berasal dari berkas tampil sebagai teks biasa. **Lupakan** bertanya "Lupakan 3 entri? Entri dipindah ke folder sampah." lalu memindahkannya ke sana. **Tambah pelajaran…** menambahkan pelajaran Anda sendiri.

## Umpan balik

Setiap jawaban punya **Membantu** dan **Tidak membantu**. **Tidak membantu** membuka **Apa yang salah?** dengan **Ingat ini sebagai koreksi** dan **Simpan**. Kartunya lalu menulis "Terima kasih. Hanya disimpan di komputer ini."

Penilaian masuk ke utas dan ke `feedback.jsonl` di folder asisten: penilaiannya, komentarnya, dan apa yang menjawab (profil, peran, keahlian, dan versi berkas prompt). Berkas itu tidak pernah berisi kunci, permintaan, atau prompt, dan Rajutara tidak mengirimnya ke mana pun. Penilaian yang diubah menambah satu baris, dan baris terbaru yang berlaku.
