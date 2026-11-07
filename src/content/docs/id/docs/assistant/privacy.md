---
title: Privasi dan persetujuan
description: Apa yang dikirim asisten, ke mana, dan kapan. Model lokal dan jarak jauh, jendela pratinjau, penyamaran, kunci, dan berkas yang disimpan asisten di komputer ini.
---

Rajutara tidak punya telemetri dan tidak punya akun cloud. Asisten hanya mengirim prompt ke model yang Anda pilih, dan sebelum permintaan pergi ke komputer lain selain komputer ini, Anda melihatnya persis seperti yang akan dikirim lalu memutuskan. [`SECURITY.md`](https://github.com/madmouse17/rajutara/blob/main/SECURITY.md) di repositori mendaftar setiap koneksi yang dibuka program; halaman ini membahas bagian asisten ([ADR-0031](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0031-egress-consent-and-secrets.md)).

## Lokal dan jarak jauh

Hanya komputer ini yang dianggap lokal: alamat loopback `127.0.0.0/8`, `::1`, dan `localhost`. Setiap host lain adalah jarak jauh, termasuk PC di jaringan Anda sendiri. Pengalih model dan daftar profil menampilkan lencana setiap profil: **Di komputer ini** atau **Keluar dari komputer ini**.

| Data | Keluar dari komputer ini | Kapan |
|---|---|---|
| Prompt ke model di komputer ini | Tidak | |
| Prompt ke model di komputer lain | Ya, persis seperti yang ditampilkan pratinjau | Hanya setelah **Kirim** untuk permintaan itu. Percobaan ulang atau permintaan yang disesuaikan bertanya lagi |
| Isi lampiran | Tidak pernah ke model. Model hanya melihat hasil alat tentang berkas itu | |
| Kunci API dan nilai header rahasia | Hanya di header permintaan profilnya sendiri | Setiap permintaan profil itu |
| **Uji koneksi** dan **Tampilkan model** ke komputer lain | Header masuk, header tambahan, dan permintaan daftar model atau pesan uji satu kata; tanpa data dokumen | Hanya setelah **Kirim** di jendela uji koneksi |
| Utas, penilaian, memori, indeks pengetahuan, hasil evaluasi, catatan run | Tidak | |
| Lalu lintas soket lokal | Tidak, tetap di `127.0.0.1` | Selama soket aktif |
| Audio suara | Tidak. Program pembantu suara tidak punya kode jaringan | |
| Catatan rilis | Tidak. Catatannya tertanam di program | |
| Permintaan `rajutara eval` ke model di komputer lain | Ya, dan setiap isinya disimpan lebih dulu | Hanya dengan `--allow-remote` |

Permintaan ke model di komputer ini langsung dikirim dan tidak pernah lewat proxy.

## Jendela pratinjau

Setiap permintaan ke komputer lain membuka jendela **Sebelum mengirim ke** _host_. Jendela ini memegang keyboard sampai Anda memutuskan. Isinya:

- "Permintaan ini keluar dari komputer Anda menuju _host_ (model _model_).", ukurannya, dan perkiraan token;
- **Perkiraan biaya**, bila profil punya harga;
- "Tidak terenkripsi: komputer lain di jaringan Anda bisa membaca permintaan ini." untuk alamat `http`;
- "Permintaan ini lewat proxy _proxy_." bila lingkungan mengatur proxy (`HTTPS_PROXY`, `HTTP_PROXY`, atau `ALL_PROXY`, kecuali `NO_PROXY` mencakup host-nya);
- catatan bila permintaan mengulang permintaan yang ditolak host, atau berubah setelah profil menyesuaikan diri.

Jendela ini punya tiga tab:

- **Ringkasan** mendaftar bagian permintaan beserta ukurannya (**Instruksi**, **Alat**, **Pelajaran**, **Hasil pengetahuan**, **Ringkasan dokumen**, hasil alat, **Teks dari berkas**, **Pesan sebelumnya**, dan **Tugas Anda**), bagian yang baru sejak permintaan terakhir yang Anda kirim, serta penggantian oleh penyamaran beserta aslinya. Aslinya tetap di komputer ini.
- **Permintaan persis** menampilkan isi permintaan persis seperti yang akan dikirim. **Salin** menyalinnya.
- **Header** menampilkan metode, alamat lengkap, dan setiap header. Rahasia tampil sebagai `•••• (kunci tersimpan sebagai openai)` atau `•••• (dari OPENAI_API_KEY)`, tidak pernah nilainya.

Kotak centang **Ganti nama, kode PO, harga, dan path** menyalakan atau mematikan penyamaran untuk permintaan ini. Permintaan lalu disusun ulang dan jendela menampilkan versi barunya.

**Kirim** mengirim satu permintaan ini. **Jangan kirim** dan Esc menolaknya, dan tugas berakhir dengan "Tidak dikirim. Tidak ada data yang keluar dari komputer ini." Enter tidak menekan apa pun sampai sebuah tombol mendapat fokus keyboard. Tidak ada "selalu izinkan": tugas yang butuh lima panggilan model bertanya lima kali, begitu juga percobaan ulang dan permintaan yang disesuaikan.

Rajutara mencocokkan persetujuan dengan host yang dituju dan byte persis yang dikirim. Permintaan ke komputer lain tanpa **Kirim** yang cocok ditolak sebelum nama host-nya dicari.

## Jendela uji koneksi

**Uji koneksi** dan **Tampilkan model** untuk profil di komputer lain membuka **Uji koneksi ke** _host_. Jendela ini menyebut isi permintaannya: kunci profil bila ada, tanpa data dokumen, dan permintaan daftar model atau satu pesan uji singkat yang meminta jawaban satu kata. Tidak ada yang keluar sebelum Anda menekan **Kirim**.

## http hanya di jaringan Anda sendiri

Penyedia di internet wajib memakai `https`. `http` biasa hanya diterima untuk komputer ini serta rentang alamat privat dan nama lokal di jaringan Anda sendiri ([Model](../models/#alamat)), dan editor maupun pratinjau menandainya **Tidak terenkripsi**.

## Pengalihan dan proxy

Rajutara tidak pernah mengikuti pengalihan, karena pengalihan bisa membawa isi yang Anda setujui untuk satu host ke host lain. Kartunya menulis "_host_ mengalihkan permintaan ke _target_. Rajutara tidak mengikuti pengalihan: masukkan alamat itu ke profil jika Anda memercayainya."

Permintaan ke komputer lain memakai proxy dari lingkungan bila ada, dan pratinjau menyebutnya. Permintaan ke komputer ini tidak pernah memakai proxy.

## Penyamaran

Penyamaran aktif sejak awal untuk setiap permintaan ke komputer lain: Preferensi › Asisten › **Privasi** › **Ganti nama, kode PO, harga, dan path sebelum dikirim ke komputer lain**. Yang diganti:

- nama buyer menjadi `⟦BUYER_1⟧`, `⟦BUYER_2⟧`, dan seterusnya;
- kode PO menjadi `⟦PO_1⟧`;
- harga, yaitu setiap nilai bersatuan uang dan angka tiga karakter atau lebih di teks bebas, menjadi `⟦PRICE_1⟧`;
- folder home Anda menjadi `⟦PATH_1⟧`, sedangkan path di dalam folder sesi menjadi relatif;
- rahasia yang ditulis sebagai `password: …` atau kunci privat PEM menjadi `⟦SECRET_1⟧`.

Peta baliknya tetap di komputer ini dan tidak pernah menjadi bagian permintaan. Penyamaran mencocokkan string persis: nama buyer yang dieja lain di teks bebas masih bisa lolos. Tab Ringkasan di pratinjau mendaftar setiap penggantian, jadi periksa sebelum menekan **Kirim**.

## Kunci dan header rahasia

Kunci atau nilai header rahasia berasal dari variabel lingkungan, yang dibaca tepat sebelum permintaan keluar, atau dari `keys.toml` di folder asisten. Di Linux, Rajutara menulis `keys.toml` dengan mode 0600, sehingga hanya pengguna Anda yang bisa membacanya. Di Windows, berkas itu memakai izin folder `%APPDATA%` Anda. Rajutara tidak pernah membaca atau menulis berkas itu lewat tautan.

Kunci tidak pernah masuk ke preferensi, utas, log, log aksi, pratinjau, catatan run, atau teks galat. Jika pesan galat penyedia mengulang rahasia dari permintaan, Rajutara menghapusnya sebelum pesan ditampilkan.

## Berkas di komputer ini

Folder asisten adalah `~/.config/rajutara/assistant/` di Linux dan `%APPDATA%\rajutara\config\assistant\` di Windows. Tidak ada isinya yang keluar dari komputer. Menghapusnya menghilangkan riwayat dan ingatan, tidak pernah dokumen.

| Berkas | Isinya |
|---|---|
| `preferences.json`, bagian `assistant` | Keadaan dan lebar panel, model bawaan, profil (hanya rujukan kunci), peran, persona, penyamaran, anggaran utas, sakelar dan port soket, path dan bahasa program pembantu suara, dan versi terakhir yang catatannya sudah ditampilkan |
| `keys.toml` | Kunci API dan nilai header rahasia |
| `threads/<thread-id>.jsonl` | Satu utas. Setiap keputusan pratinjau dicatat dengan host, ukuran, SHA-256 permintaan, dan apakah dikirim. Utas yang dihapus pindah ke `threads/.rajutara-trash/` |
| `feedback.jsonl` | Penilaian dan komentar, dengan profil, peran, keahlian, dan versi prompt yang menjawab. Tidak pernah berisi kunci, permintaan, atau prompt |
| `memory/memory.jsonl` | Memori asisten (memori milik proyek masuk ke `.rajutara/memory/` di proyek itu) |
| `kb/` | Indeks pengetahuan. Berkas Anda hanya dibaca dan tidak pernah diubah |
| `runs/<run>/` | Run playbook dan catatannya |
| `playbooks/`, `prompts/`, `profil-bengkel.toml` | Playbook yang dikelola, berkas prompt milik bengkel, dan profil bengkel |
| `gui-socket.json` | Port, token, dan id proses soket lokal, hanya selama soket mendengarkan |
| `evals/` | Hasil `rajutara eval`, dan untuk model jarak jauh, isi permintaannya |

Di samping setiap dokumen, lapisan perintah menyimpan pengamannya: log aksi `<stem>.agent-log.jsonl`, salinan `.bak` bertanggal, folder sampah `.rajutara-trash/`, dan salinan pemulihan.
