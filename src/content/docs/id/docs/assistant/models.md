---
title: Model
description: Profil model untuk asisten. Enam jenis penyedia, dua belas preset, alamat, kunci, header tambahan, format jawaban, Windows 7, token, biaya, dan batas waktu.
---

Asisten baru memanggil model setelah Anda memilihnya. **Model Profile** (profil model) menyebut di mana dan bagaimana Rajutara memanggil model: jenis penyedia, alamat, nama model, header masuk, sumber kunci, dan batas-batasnya. Preferensi › Asisten (Preferences › Assistant) menampilkan profil di bawah **Profil model** dan menyunting satu profil setiap kali. Profil hanya berubah ketika Anda menekan **Simpan** di editornya.

## Mati sejak awal

Instalasi baru belum punya profil, dan **Model bawaan** bernilai **Mati**. Panel lalu menampilkan **Asisten belum aktif**. Saat pertama kali itu terjadi, Rajutara menanyakan versi dan daftar model kepada Ollama di `127.0.0.1:11434`, 2 detik per permintaan, lalu menampilkan hasilnya. **Pakai model ini** membuat profil dari preset Ollama dan menjadikannya bawaan. **Deteksi Ollama** di Preferensi › Asisten bertanya lagi kapan saja.

## Jenis penyedia

Rajutara memakai enam jenis API. Banyak vendor berbagi satu jenis: Groq, DeepSeek, dan LM Studio semuanya memakai jenis yang kompatibel dengan OpenAI.

| Jenis | Di editor | API |
|---|---|---|
| `ollama` | Ollama | API milik Ollama |
| `llama-cpp` | Server llama.cpp | `llama-server` dari llama.cpp |
| `openai-compatible` | Kompatibel OpenAI (Chat Completions) | OpenAI Chat Completions dan server yang menirunya |
| `openai-responses` | OpenAI Responses API | Responses API milik OpenAI |
| `anthropic` | Anthropic Messages | Messages API milik Anthropic |
| `gemini` | Google Gemini | API Gemini milik Google |

## Preset

**Tambah profil…** dimulai dari sebuah **Preset**. Preset mengisi jenis, alamat, header masuk, versi API, format jawaban, apakah temperatur dikirim, dan isian batas token. Setiap isian tetap bisa Anda ubah, dan profil tidak ikut berubah bila presetnya berubah kemudian. Ada dua belas preset:

| Preset | Jenis | Alamat | Header masuk | Format awal | Variabel kunci |
|---|---|---|---|---|---|
| OpenAI | `openai-compatible` | `https://api.openai.com/v1` | Authorization: Bearer | Otomatis, tanpa temperatur | `OPENAI_API_KEY` |
| Anthropic | `anthropic` | `https://api.anthropic.com` | `x-api-key` | Skema JSON, tanpa temperatur | `ANTHROPIC_API_KEY` |
| Google Gemini | `gemini` | `https://generativelanguage.googleapis.com` | `x-goog-api-key` | Otomatis | `GEMINI_API_KEY` |
| OpenRouter | `openai-compatible` | `https://openrouter.ai/api/v1` | Authorization: Bearer | Otomatis | `OPENROUTER_API_KEY` |
| Groq | `openai-compatible` | `https://api.groq.com/openai/v1` | Authorization: Bearer | Otomatis | `GROQ_API_KEY` |
| DeepSeek | `openai-compatible` | `https://api.deepseek.com` | Authorization: Bearer | JSON apa saja (DeepSeek tidak punya mode skema JSON) | `DEEPSEEK_API_KEY` |
| Mistral | `openai-compatible` | `https://api.mistral.ai/v1` | Authorization: Bearer | Otomatis | `MISTRAL_API_KEY` |
| Azure OpenAI | `openai-compatible` | `https://<resource>.openai.azure.com/openai/v1` | api-key (Azure) | Otomatis, tanpa temperatur | `AZURE_OPENAI_API_KEY` |
| Ollama | `ollama` | `http://127.0.0.1:11434` | Tidak ada | Skema JSON | |
| Server llama.cpp | `llama-cpp` | `http://127.0.0.1:8080/v1` | Tidak ada | Grammar (llama.cpp) | |
| LM Studio | `openai-compatible` | `http://127.0.0.1:1234/v1` | Tidak ada | Otomatis | |
| Kustom | `openai-compatible` | kosong | Authorization: Bearer | Otomatis | |

Pakai **Kustom** untuk Together, vLLM, LiteLLM, dan server lain yang meniru API OpenAI Chat Completions. Jenis `openai-responses` tidak punya preset: pilih jenis itu di daftar **Penyedia** pada profil mana pun.

## Editor profil

| Isian | Isinya |
|---|---|
| **Nama profil** | Huruf kecil, angka, dan tanda hubung, paling banyak 32 karakter. Tidak bisa diubah setelah disimpan. |
| **Penyedia** | Salah satu dari enam jenis. |
| **Alamat** | URL dasar. |
| **Nama model** | Paling banyak 200 karakter. Untuk Azure OpenAI, isi nama deployment. **Tampilkan model** mengisinya dari penyedia. |
| **Header masuk** | Authorization: Bearer, `x-api-key`, `x-goog-api-key`, api-key (Azure), atau Tidak ada. |
| **Kunci API** | **Variabel lingkungan** atau **Disimpan di komputer ini**. Tidak pernah kuncinya sendiri. |
| **Versi API** | Untuk Azure, nilai `?api-version=`; kosongkan untuk alamat yang berakhiran `/openai/v1`. Untuk Anthropic, header `anthropic-version` (bawaannya `2026-10-21`; proxy yang meniru API Anthropic mungkin memerlukan `2023-06-01`). |
| **Header tambahan** | Header yang diminta penyedia atau gateway selain kunci. |
| **Batasi jawaban** | Cara balasan diikat ke format yang dibaca Rajutara (lihat di bawah). |
| **Jendela konteks (token)** | Jendela konteks model. Prompt boleh memakai tiga perempatnya. Profil baru mulai dari 16.384. |
| **Batas waktu (detik)** | 10 sampai 900 detik, bawaannya 120. |
| Harga dan **Mata uang** | **Harga per sejuta token masukan** dan **Harga per sejuta token keluaran**, keduanya atau tidak sama sekali, dan mata uang tiga huruf seperti USD atau IDR. |

Di bawah **Lanjutan**: **Kirim temperatur** (bawaannya 0; jika dimatikan, nilai bawaan penyedia yang berlaku), **Token jawaban maksimum** (16 sampai 65.536, bawaannya 1.024), dan **Isian batas token** (`max_tokens` atau `max_completion_tokens`, untuk jenis Chat Completions).

### Alamat

Alamat diawali `https://`. `http://` biasa hanya diterima untuk komputer ini dan jaringan Anda sendiri: loopback, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, `fc00::/7`, `fe80::/10`, nama `.local`, dan nama satu label yang diawali huruf, misalnya `http://pc-potong:11434`. Editor menandai alamat seperti itu **Tidak terenkripsi**, karena komputer lain di jaringan Anda bisa membaca permintaannya. Alamat yang masih berisi bagian dalam kurung sudut, seperti `<resource>` milik Azure, ditolak sampai Anda menggantinya. Alamat tidak boleh berisi nama pengguna, query, atau fragmen.

### Kunci

**Kunci API** punya dua sumber:

- **Variabel lingkungan**: kunci dibaca dari variabel, misalnya `OPENAI_API_KEY`, setiap kali permintaan keluar. Editor memberi tahu jika variabelnya belum diatur untuk program ini.
- **Disimpan di komputer ini**: ketik kuncinya lalu tekan **Simpan kunci**. Rajutara menulisnya ke `keys.toml` di folder asisten dan hanya menyimpan rujukannya di preferensi. **Uji koneksi**, **Tampilkan model**, dan **Simpan** juga menyimpan kunci yang sudah diketik. Editor lalu menampilkan "Tersimpan (berakhir 1a2b)" dengan empat karakter terakhir kunci, dan teks yang diketik dihapus dari isian.

**Batal** di editor mengembalikan apa yang ditimpa oleh penulisan kunci editor itu. **Hapus** pada profil bisa sekaligus **Hapus juga kunci dan header rahasia yang tersimpan**. [Privasi dan persetujuan](../privacy/) menjelaskan cara `keys.toml` dilindungi.

### Header tambahan

**Header tambahan** membawa apa yang dibutuhkan penyedia atau gateway selain kunci, misalnya header atribusi OpenRouter, `anthropic-workspace-id`, atau kunci milik gateway. Nama header memakai huruf, angka, dan tanda hubung, paling banyak 64 karakter. Rajutara menolak header yang diaturnya sendiri: `host`, `content-length`, `content-type`, `transfer-encoding`, `connection`, `accept`, `accept-encoding`, dan `user-agent`.

Centang **Rahasia (disimpan seperti kunci)** agar nilainya disimpan di `keys.toml`, bukan di preferensi. Header yang namanya mengandung `authorization`, `cookie`, `key`, `token`, `secret`, `auth`, `password`, atau `session` selalu disimpan seperti kunci, dan editor menyebutkannya.

## Uji koneksi dan Tampilkan model

**Tampilkan model** meminta daftar model kepada penyedia: `/api/tags` untuk Ollama, `/models` untuk jenis OpenAI, `/v1/models` untuk Anthropic, dan `/v1beta/models` untuk Gemini. Daftarnya menyimpan paling banyak 2.000 model, menampilkan ukuran konteks bila penyedia memberikannya, dan punya isian **Saring**. Alamat deployment Azure tidak punya daftar: ketik nama modelnya.

**Uji koneksi** mengirim permintaan daftar yang sama bila jenisnya punya. Jika tidak, ia mengirim satu pesan uji singkat yang meminta jawaban satu kata. Hasilnya berbunyi "Terhubung. 42 model ditemukan." atau "Terhubung. Model menjawab dalam 1,2 detik."

Kedua permintaan membawa header masuk dan header tambahan profil, tanpa data dokumen. Profil di komputer ini langsung diuji. Untuk alamat lain, jendela **Uji koneksi ke** _host_ terbuka dulu, dan tidak ada yang keluar sebelum Anda menekan **Kirim** ([Privasi dan persetujuan](../privacy/#jendela-uji-koneksi)).

## Pengalih model dan model bawaan

**Model bawaan** di Preferensi › Asisten adalah profil yang dipakai jendela baru. Pengalih **Model** di kepala panel menampilkan setiap profil dengan lencananya, **Di komputer ini** atau **Keluar dari komputer ini**. Pilihan di sana berlaku mulai tugas berikutnya selama jendela terbuka; **Jadikan bawaan** menjadikannya bawaan. `rajutara eval` memakai model bawaan kecuali Anda memberi `--model` ([Jiplak foto dan evaluasi](../trace-and-eval/#penjalan-evaluasi)).

## Format jawaban

Rajutara mengharapkan satu aksi JSON dari model di setiap giliran. **Batasi jawaban** menentukan cara permintaan mengikat model ke bentuk itu:

| Setelan | Isi permintaan |
|---|---|
| **Skema JSON** | Skema aksi, dalam bentuk milik penyedia: `format` Ollama, response format `json_schema`, satu alat wajib Anthropic, atau `responseJsonSchema` Gemini |
| **JSON apa saja** | Permintaan untuk objek JSON apa pun (`json_object`, atau `format: "json"` Ollama) |
| **Grammar (llama.cpp)** | Grammar GBNF, hanya untuk server llama.cpp |
| **Tanpa batasan** | Prompt saja |
| **Otomatis (yang terbaik yang diterima penyedia)** | Mulai dari bentuk terkuat yang dimiliki jenisnya dan turun satu tingkat bila penyedia menolaknya |

Anthropic tidak punya mode **JSON apa saja**. Dengan **Otomatis**, llama.cpp mulai dari **Grammar** dan semua jenis lain dari **Skema JSON**. Jika penyedia menolak format yang dikirim, profil menetap satu tingkat lebih rendah dan editor menampilkan "sekarang: JSON apa saja". **Atur ulang** melupakan setelan itu, begitu juga perubahan jenis, alamat, atau model.

Penyesuaian yang sama berlaku untuk dua parameter lain. Penyedia yang menolak temperatur tidak lagi dikirimi temperatur. Penyedia Chat Completions yang menyebut isian token yang lain dikirimi isian itu sejak saat itu. Satu profil menyesuaikan diri paling banyak dua kali per panggilan. Utas menampilkan kartu Penyesuaian seperti "api.example.com tidak menerima Skema JSON; profil-saya sekarang meminta JSON apa saja.", dan permintaan berikutnya ke komputer lain membuka pratinjau lagi dengan menyebut perubahannya.

Jika model dua kali berturut-turut menjawab dalam bentuk yang tidak bisa dipakai, tugas berakhir dengan "Model dua kali menjawab dalam bentuk yang tidak bisa dipakai Rajutara. Pilih model yang lebih besar, atau atur Batasi jawaban ke Skema JSON atau Grammar."

## Jendela konteks

Model lokal butuh jendela konteks sekitar 8.000 token atau lebih untuk asisten; disarankan 16.384. Bagian tetap prompt memakai 2.500 sampai 4.800 token per keahlian. Ollama menerima jendela konteks profil sebagai `num_ctx`. Untuk llama.cpp dan LM Studio, jalankan servernya dengan konteks paling tidak sebesar konteks profil.

## Windows 7

Ollama tidak berjalan di Windows 7. PC Windows 7 punya tiga jalan:

- server llama.cpp di PC yang sama, dengan preset **Server llama.cpp**;
- Ollama di PC lain dalam jaringan Anda, dengan alamat seperti `http://192.168.1.20:11434`. Alamat itu adalah komputer lain, jadi setiap permintaan membuka pratinjau lebih dulu;
- penyedia daring.

## Token dan biaya

Setiap kartu Jawaban menyebut profilnya dan menampilkan token pertukaran itu, ditandai "sekitar" bila penyedia tidak melaporkannya dan Rajutara memperkirakannya. Profil di komputer ini juga menampilkan "gratis". Jika kedua harga diisi, jendela pratinjau menampilkan perkiraan biaya setiap permintaan sebelum dikirim ke komputer lain. Setelah panggilan model pertama, bilah status menampilkan token sesi ini; tooltip-nya menambahkan jumlah panggilan model, token masuk dan keluar, serta berapa yang terkirim ke komputer lain.

## Batas waktu, batas ukuran, dan tanpa aliran

Panggilan keluar dari satu thread pekerja, satu per satu, berurutan. Koneksi mendapat 5 detik dan seluruh panggilan mendapat **Batas waktu (detik)** profil. Balasan paling besar 4 MiB. Jika waktunya habis, kartu menulis "Model tidak menjawab dalam 120 detik. Coba model yang lebih kecil atau batas waktu lebih lama."

Balasan tidak dialirkan. Panel menghitung detik selama menunggu dan menampilkan jawaban setelah lengkap. Jawaban yang berhenti di **Token jawaban maksimum** menyebutkannya, dan menaikkan isian itu memberi model ruang untuk selesai.
