---
title: Berkontribusi
description: "Cara berkontribusi ke Rajutara: aturan clean-room, gerbang yang harus dilewati perubahan, aturan kode, terjemahan, dan lisensi."
---

Rajutara adalah penulisan ulang clean-room dalam Rust dari rangkaian CAD pakaian. Laporan bug, berkas contoh, uji coba, terjemahan, dokumentasi, dan kode semuanya disambut. Untuk apa pun yang mengubah perilaku, format berkas, atau dependensi, buka issue lebih dulu, supaya rancangannya mantap sebelum Anda menulis kode.

## Baca ini dulu

| Berkas | Apa yang ditetapkannya |
|---|---|
| `AGENTS.md` | Aturan repositori. Mengikat manusia dan agen pengodean sama-sama. |
| `GLOSSARY.md` | Kosakata. Kata-katanya adalah nama tipe dan modul Rust, dan istilah baru dimasukkan ke sana sebelum Anda memakainya. Halaman [glosarium](../glossary/) dibuat darinya. |
| `docs/adr/` | Keputusan yang sudah ditetapkan. Catatan keputusan tidak pernah disunting; yang baru menggantikannya. |
| `docs/spec/` | Apa yang dilakukan tiap ruang kerja, beserta sumber publiknya. |

## Aturan clean-room

Aturan ini mutlak. Ini keputusan pertama proyek, dan keputusan lisensi bertumpu padanya.

- Jangan pernah membuka, membaca, mendekompilasi, memasang, atau menyalin biner, pemasang, citra disk, pola contoh, ikon, berkas bantuan, atau tabel string Optitex.
- Perilaku Optitex berasal dari dokumentasi publik saja. Cantumkan URL-nya di bagian `Sources` spesifikasi yang Anda ubah.
- Jangan pernah memindahkan kode GPL. Seamly2D dan Valentina berlisensi GPL, jadi hanya menjadi acuan perilaku. FreeSewing berlisensi MIT, dan menjadi acuan perilaku dan format.
- Ikon, teks bantuan, pola contoh, dan fixture uji adalah karya asli yang dibuat untuk proyek ini.
- Jika Anda tidak yakin apakah suatu sumber bersifat publik, tanyakan di issue sebelum memakainya.

Rajutara mempertahankan pembagian modul, nama alat, dan tata letak layar Optitex 15 agar Operator terlatih tahu ke mana harus mencari. Rajutara tidak berafiliasi dengan Optitex, dan tidak membaca atau menulis satu pun format berkasnya.

## Gerbang

Setiap hal berikut harus lolos sebelum pull request siap.

```sh
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" cargo test --workspace
cargo deny check
scripts/test-scripts.sh          # when you touch scripts/ or the budgets
```

`cargo test --workspace` menggerakkan jendela sungguhan pada uji UI, jadi memerlukan layar. Bentuk `xvfb-run` di atas dijalankan CI. Anggaran adalah uji coba, bukan cita-cita. Setelah `cargo build --release`:

```sh
scripts/check-budgets.sh size target/release/rajutara
scripts/check-budgets.sh linux target/release/rajutara
```

Build Windows dibuat silang dan diperiksa di bawah Wine oleh alat pemelihara, bukan di repositori ini. Sebutkan di pull request jika perubahan Anda menyentuh windowing, dialog, sistem berkas, atau dependensi, dan pemelihara menjalankan pemeriksaannya.

## Aturan kode

Daftar lengkapnya ada di `AGENTS.md`. Yang pertama diperiksa peninjau:

- Crate pustaka (`rajutara-core`, `rajutara-io`, `rajutara-nest`, dan lainnya) tidak memakai `unwrap`, `expect`, atau `panic!` di luar uji coba. Kesalahan berupa enum `thiserror`, dan `rajutara-core` tidak punya dependensi UI atau I/O.
- Geometri adalah milimeter sebagai `f64`. Satuan tampilan tidak pernah disimpan. Toleransi adalah konstanta bernama.
- Tanpa runtime async. Pekerjaan panjang berjalan di `std::thread` dengan `std::sync::mpsc`, dan UI melakukan polling.
- Setiap tipe publik di `rajutara-core` menurunkan `Debug`, `Clone`, `PartialEq`, dan trait serde.
- Dependensi baru memerlukan satu baris pembenaran, lisensi dari daftar yang diizinkan di `deny.toml` (MIT, Apache-2.0, BSD, Zlib, MPL-2.0, dan sejenisnya), dan mengutamakan crate yang sudah ada di `Cargo.lock`.
- Uji coba mengunci perilaku, batas, dan invarian. Snapshot dengan `insta` mencakup keluaran DXF dan HPGL. Jangan mengunci format yang kebetulan.
- String UI lewat Fluent. Bahasa Inggris adalah sumbernya, dan berkas Indonesia diperbarui dalam perubahan yang sama.
- Komentar menjelaskan mengapa, bukan apa. Tidak ada TODO atau FIXME dalam kode yang di-commit.

## Terjemahan

Setiap crate menyimpan string-nya di `i18n/en/` dan `i18n/id/`. Koreksi terhadap kata-kata bahasa Indonesia disambut: belum ada Operator berbahasa Indonesia yang mengonfirmasi string yang ada. Sebuah uji coba memeriksa bahwa setiap pesan bahasa Inggris punya pesan bahasa Indonesia, dengan placeholder yang sama.

## Pull request

- Satu urusan per pull request. Isi templatnya. "Not verified" adalah jawaban yang dapat diterima jika Anda menyebut apa yang tidak Anda jalankan.
- Perbarui changelog, serta spesifikasi atau rencana yang disentuh perubahan.
- Perubahan UI disertai tangkapan layar, di tema terang dan gelap.

## Lisensi kontribusi

Rajutara berlisensi `MIT OR Apache-2.0`. Kecuali Anda menyatakan lain secara eksplisit, kontribusi yang Anda ajukan untuk dimasukkan berlisensi ganda dengan cara yang sama, tanpa syarat tambahan. Tidak ada DCO dan tidak ada CLA.

## Apa yang menjadi landasannya

`THIRD-PARTY.html` adalah daftar resmi perangkat lunak pihak ketiga, dengan setiap teks lisensi. Berkas ini disertakan di setiap paket rilis. Bagian utamanya:

| Komponen | Dipakai untuk |
|---|---|
| `egui`, `eframe`, `egui_dock` | Antarmuka immediate-mode, jendela asli yang digambar lewat OpenGL, dan panel yang bisa di-dock |
| `kurbo` | Evaluasi Bezier dan busur |
| `i_overlay` | Operasi boolean poligon: pembersihan kampuh, buffer nesting, gabungan no-fit polygon |
| `lyon_tessellation` | Mentriangulasi potongan cekung untuk penggambaran dan nesting |
| `dxf`, `pdf-writer`, `zip`, `csv` | DXF ASTM, PDF vektor, wadah asli, laporan |
| `serde`, `serde_json` | JSON dokumen |
| `i18n-embed` | Terjemahan Fluent dengan pemeriksaan kunci saat kompilasi |
| Mesa 3D | OpenGL perangkat lunak opsional di paket Windows |

Mesin nesting mengikuti makalah terbitan tentang heuristik bottom-left-fill dan pembuatan no-fit polygon. Kepiting, kain tenun, dan jarum adalah karya seni yang disediakan pemilik proyek, di bawah lisensi proyek. Ikon toolbar dan pola contoh adalah karya asli untuk proyek ini.
