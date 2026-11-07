---
title: Glosarium
description: "Kosakata Rajutara: style, potongan, kontur, aturan grade, marker, lay, dan lainnya."
---

Halaman ini memuat kosakata Rajutara. Setiap istilah juga menjadi nama tipe dan modul di kode, jadi kode, menu, dan halaman ini memakai kata yang sama. Istilah ditulis dalam bahasa Inggris karena itulah nama di kode; padanan Indonesia yang dipakai antarmuka ada di kolom Arti. Kolom ketiga memuat kata yang di proyek ini berarti lain atau mudah tertukar dengan istilahnya.

| Istilah | Arti | Hindari |
|---|---|---|
| **Style** | Desain garmen sebagai sekumpulan potongan pola beserta tabel ukuran dan aturan grade-nya. Satuan yang disimpan sebuah dokumen. | Model, design file, project |
| **Piece** | Satu komponen pola dari style (Potongan), dibatasi kontur potong tertutup, membawa notch, Garis Serat, garis dalam, dan anotasinya. | Panel, part, pattern |
| **Contour** | Garis tepi tertutup sebuah potongan: urutan segmen (garis, Bézier kubik, busur). Kontur potong adalah yang terluar; kontur jahit adalah kontur potong dikurangi kampuh. | Outline, boundary, path, polygon |
| **Seam Allowance** | Pita antara kontur jahit dan kontur potong (kampuh), dengan lebar per segmen. | Margin, offset, SA |
| **Notch** | Tanda pada kontur yang menyelaraskan potongan saat menjahit (penandaan). Punya bentuk (V, T, I, L (check), U, Box), kedalaman, dan lebar. Box adalah notch "castle" ASTM D6673 (layer 81). | Clip, snip, mark, castle |
| **Grainline** | Garis berarah pada potongan (Garis Serat) yang harus sejajar dengan lusi kain saat penataan marker. | Grain, arrow, warp line |
| **Size Table** | Daftar berurutan ukuran yang menjadi target grade sebuah style, dengan satu base size. | Size range, size set |
| **Grade Rule** | Perpindahan X/Y satu titik potongan (kontur, garis dalam, lubang bor, atau ujung Garis Serat) dari base size ke setiap ukuran lain. | Grading increment, growth, delta table |
| **Marker** | Tata letak potongan satu style atau lebih dan satu ukuran atau lebih pada kain dengan lebar tertentu, siap diplot atau dipotong. | Layout, nest, lay plan |
| **Marker Table** | Kanvas ruang kerja Marker: pita kain selebar Material Marker tempat potongan ditata. X membentang sepanjang panjang marker (lusi), Y melintang lebarnya. | Canvas, desk, work area |
| **Piece Bar** | Jalur di ruang kerja Marker yang menampung instans potongan yang masih menunggu ditata: satu thumbnail per Style, potongan, dan ukuran dengan sisa jumlahnya. Urutannya menjadi benih Nesting. | Piece tray, palette, queue |
| **Piece List** | Tabel ruang kerja Marker dengan satu baris per potongan dan ukuran dari Style yang tertanam, tempat properti khusus Marker (kode, material, jumlah, rotasi, balik, buffer) disunting pada salinan yang tertanam. | Pieces Table (panel PDS), parts list |
| **Cluster** | Dua potongan atau lebih yang sudah ditata di Marker, yang mempertahankan susunannya dan dipindah, ditembak, serta di-nesting sebagai satu potongan. Selama menunggu, Piece Bar menampilkannya sebagai satu thumbnail. | Group, bundle (Bundle adalah potongan satu permintaan ukuran), assembly |
| **Fuse Block** | Cluster dengan batas (persegi panjang di sekeliling potongan atau kontur yang mengikutinya, pada celah tertentu) yang dipotong oleh Export Cut File alih-alih potongannya, sehingga blok bisa di-fuse sebelum potongannya dipotong. | Fusing zone, interlining block |
| **Cutting Order** | Urutan potongan sebuah Marker masuk ke mesin potong, dengan titik awal dan arah setiap potongan. Bukan Cut Order milik Cut Plan. | Cut sequence, plot order, Cut Order (itu milik Cut Plan) |
| **Bump Line** | Dinding vertikal atau horizontal pada Marker yang tidak dilewati potongan selama Nesting dan Shoot. Bump Line juga bisa berupa Cut Line, atau garis No Bump yang boleh dilewati potongan. | Wall, barrier, stop line |
| **Cut Line** | Bump Line yang ditulis Export Cut File sebagai potongan melintang kain, dengan overcut di setiap ujung dan segmen terpendek yang dipertahankan. | Cross cut, split line |
| **Flaw** | Persegi kain, ditandai pada Marker, yang tidak boleh ditimpa potongan mana pun (cacat kain). Flaw bisa membentang sepanjang seluruh marker atau selebar seluruh Material. | Defect, hole, damage |
| **Nesting** | Tindakan menata potongan pada marker, dengan tangan atau algoritma, untuk meminimalkan panjang kain. | Packing, layout, optimisation |
| **Lay** | Setumpuk lapis kain yang dipotong bersama di bawah satu marker (hamparan). | Spread, ply stack |
| **Order** | Jumlah sebuah style per ukuran dan warna yang harus dipenuhi perencanaan potong. | Job, production order |
| **Base Size** | Satu-satunya ukuran di Size Table yang geometri potongannya digambar; setiap ukuran lain diturunkan darinya oleh Grade Rule. | Master size, sample size, reference size |
| **Ply** | Satu lapis kain dalam sebuah Lay. | Layer, sheet |
| **Plot** | Keluaran marker atau potongan berskala 1:1 ke plotter (HPGL/2) atau ke PDF, termasuk PDF berubin untuk printer kecil. | Print, export drawing |
| **Operator** | Orang yang memakai rajutara di bengkel garmen: pembuat pola, grader, atau pembuat marker yang terlatih di Optitex. | User, designer, admin |
| **Turn Point** | Titik kontur tempat garis boleh berbelok tajam. Dua Turn Point tanpa Curve Point di antaranya dihubungkan garis lurus. | Corner point, anchor, node |
| **Curve Point** | Titik kontur yang dilalui kurva mulus; Curve Point berurutan membentuk satu kurva. | Spline point, control point, handle |
| **Grade Point** | Titik potongan yang membawa Grade Rule-nya sendiri. Titik kontur tanpa aturan bergerak sebanding dengan Grade Point di sekitarnya. | Rule point, cardinal point |
| **Internal Line** | Garis di dalam potongan yang digambar, dipotong, atau dijahit tetapi bukan bagian dari konturnya. | Internal, inner line, drawing line |
| **Drill Hole** | Titik di dalam potongan yang dilubangi atau ditandai saat potongan dipotong, dengan diameter opsional. | Punch, hole, button |
| **Annotation** | Teks yang ditempatkan pada potongan dan diplot bersamanya. | Label, comment, note |
| **Mirror Line** | Tepi lurus potongan separuh yang menjadi sumbu potongan itu terbuka menjadi potongan utuh yang simetris. | Fold line, symmetry line, half line |
| **Dart** | Baji kain yang diambil dari potongan (kup), ditentukan oleh dua kaki pada kontur dan satu ujung. | Tuck, suppression |
| **Pleat** | Lipatan kain yang dimasukkan ke potongan dari kontur (lipit), ditentukan oleh garis lipatnya, jenis (knife, box, axe), dan kedalaman. | Tuck, fold |
| **Track Line** | Bayangan tipis putus-putus sebuah Piece seperti saat Track Lines dinyalakan, hanya base size, beserta objek dalamnya. Bertahan selama sesi dan tidak disimpan. Restore By Track Line mengembalikan bentuk yang diingat. | Trace, history line, undo ghost |
| **Zone** | Area pada Map Piece yang ditandai dengan mengklik di dalamnya (Build Zone) atau dengan menelusuri deret yang membatasinya (Trace Zone). Create Pieces From Map mengubah setiap Zone menjadi Piece. | Region, area, section |
| **Map Piece** | Piece yang memuat Zone: sketsa datar garmen yang area-areanya menjadi Piece sebenarnya. Piece yang dibuat darinya mengingat Zone-nya, sehingga Correct All Pieces By Map bisa membangunnya ulang. | Block, master piece, base pattern |
| **Equal Segments Group** | Deret kontur atau Internal Line dalam satu Style yang tetap sama selama Operator menyunting: hanya panjangnya, atau juga bentuknya. Deret yang pertama disunting memimpin dan yang lain mengikuti. | Linked segments, match group, sibling lines |
| **Stripe Group** | Nomor yang diberikan pada Piece yang berbagi satu pencocokan belang atau kotak-kotak di Marker. Relate Piece To Stripes menandai titik Piece yang berada di garis belang. | Match group, pattern group |
| **Spread Pieces** | Piece yang diberi tanda sehingga Work Area dan Plot menampilkan satu salinan turunan untuk setiap Quantity dan Pair berikutnya di sampingnya. Gather Pieces menghapus tandanya. Bukan penghamparan sebuah Lay. | Duplicate, copy pieces, array |
| **Material** | Kain bernama tempat potongan dipotong. Sebuah Marker dibuat pada satu Material, yang menyediakan lebar, mode lapis, penyusutan, dan biayanya. | Fabric type, cloth, textile |
| **Ply Mode** | Cara setiap Ply sebuah Material terhampar di meja: tunggal (terbuka), tubular, berhadapan (muka ke muka), atau terlipat. | Layout mode, spread type, fabric layout |
| **Bundle** | Kumpulan potongan yang membuat satu garmen satu ukuran dari sebuah style. Sebuah Marker meminta sejumlah Bundle per ukuran. | Set, kit, garment |
| **Buffer** | Ruang ekstra yang dikosongkan di sekitar potongan dalam Marker. | Gap, clearance, spacing |
| **Efficiency** | Luas potongan yang ditata dibagi lebar Marker kali panjang terpakainya, dalam persen. | Utilisation, yield, usage |
| **Graded Nest** | Semua ukuran sebuah potongan yang ditampilkan atau diekspor bersama, diselaraskan pada Stack Point. | Size stack, nest |
| **Stack Point** | Titik atau Garis Serat tempat ukuran-ukuran sebuah Graded Nest diselaraskan untuk tampilan. Memilihnya tidak pernah mengubah geometri atau Grade Rule. | Anchor point, reference point |
| **Rule Table** | Kumpulan Grade Rule bernomor yang disimpan bersama Style, disalin ke Grade Point, dan dipertukarkan sebagai berkas ASTM RUL. | Rules library, rule file, RUL |
| **Cut Plan** | Lay-lay, masing-masing sebuah Marker dengan jumlah lapis, yang bersama-sama memotong Order setiap Purchase Order-nya dari Material-nya, beserta panjang kain dan biaya yang dihabiskannya (Rencana Potong). | Cutting plan, spreading plan |
| **Cut Order** | Urutan Lay sebuah Cut Plan dihampar dan dipotong, beserta Fabric Roll tempat tiap Lay mengambil Ply-nya. Optitex menyebut seluruh rencana sebagai "cut order"; di rajutara itu adalah Cut Plan. | Spreading order, cutting sequence, roll plan |
| **Fabric Roll** | Satu gulungan sebuah Material dalam satu warna Order sebagaimana datang dari Fabric Room, dengan kode, Shade, lebar, dan panjangnya. Setiap Ply diambil utuh dari satu Fabric Roll. | Bolt, piece goods, roll stock |
| **Shade** | Kelas nuansa warna tempat sebuah Fabric Roll digolongkan saat inspeksi ("Shade" Optitex: A, B, C, …). Ply dalam satu Lay berasal dari satu Shade selama gulungan memungkinkan. | Lot, dye lot, tone |
| **Remnant** | Kain yang tersisa pada Fabric Roll setelah Cut Order mengambil Ply darinya; kembali ke Fabric Room. | Roll end, end bit, leftover, offcut |
| **Purchase Order** | Order buyer di dalam Cut Plan: Order-nya (jumlah), marker sendiri, dan Lay sendiri. Satu Cut Plan memuat satu atau lebih, masing-masing direncanakan terpisah dan dibandingkan berdampingan. Ditulis PO di antarmuka. | Order (itu hanya jumlahnya), job, batch |
| **Spreading Group** | Material sebuah Cut Plan yang dipotong bersama dari satu kain. Material pertama memberi lebar, penyusutan, dan biaya, dan satu marker memuat potongan dari semuanya. | Fabric group, material set |
| **Cutting Table** | Meja tempat Cut Plan bisa memotong: panjang, lapis paling sedikit dan paling banyak, dan secara opsional satu Material atau Spreading Group yang dilayaninya. | Spreading table, cutting bed, Marker Table (itu kanvasnya) |
| **Roll Group** | Fabric Roll satu Material yang direncanakan bersama karena berbagi langkah lebar, penyusutan, atau Shade. Setiap grup punya markernya sendiri. | Roll batch, fabric lot |
| **Fabric Room** | Inventaris Fabric Roll bengkel (gudang kain) sebagai berkas CSV atau Excel. Cut Plan mengambil gulungan darinya dan menulis Remnant kembali setelah Operator mengonfirmasi. | Warehouse, stock list, roll database |
| **Style Set** | Daftar bernama dari potongan satu Style, setiap baris dengan nama, kode, deskripsi, Material, jumlah, pasangan, dan penyusutan sendiri. Marker atau Cut Plan bisa menanamkan Style Set alih-alih seluruh Style. | Piece group, kit, collection |
| **Measurement Chart** | Ukuran-ukur yang ditetapkan buyer untuk sebuah Style, masing-masing jumlah bagian yang diambil di antara dua titik potongan di setiap ukuran, dengan nilai buyer dan toleransi per ukuran. Rajutara memeriksa potongan terhadapnya dan tidak pernah mengubah potongan agar sesuai. | Size chart, spec sheet, POM table |
| **Size Variation** | Satu set ukuran tambahan dengan grading sendiri, disimpan di samping Size Table utama (misalnya Short, Regular, dan Long). Reshape Variation Grading menggabungkannya menjadi satu Size Table. | Size group, size run, fit |
| **Merged Base Size** | Base Size sebuah Style yang digabung ke Style lain oleh Cross Grading, ditandai `*` di tabel ukuran. Potongannya mempertahankan geometri pada ukuran itu dan delta miliknya sendiri. | Second base, extra base |
| **Notch Preset** | Penandaan yang disimpan: bentuk, kedalaman, lebar, Top Width, Reverse, dan perintah, dipilih menurut nama di Notch Tool dan Notch Properties. Setiap Style memakai daftar yang sama. | Notch template, favourite notch |
| **Stripe Definition** | Garis belang atau kotak-kotak kain di Marker Table: titik mulainya, jarak antara belang vertikal dan antara belang horizontal, serta sudutnya. | Check pattern, fabric grid |
| **Folded Piece** | Sepasang potongan yang ditata terlipat di Marker Table sebagai separuh di sisi meja dari garis lipatnya, sepanjang tepi atau sebagai seperempat di sudut. | Half piece (itu separuh tersimpan dari Mirror Line), mirrored piece |
| **Side Buffer** | Buffer tambahan di satu sisi Piece (Up, Down, Left, atau Right dari bingkai seratnya), dengan opsi Convex dan Round Corners. Buffer Chain memberi satu ruas kontur Buffer-nya sendiri. | Edge buffer, offset |
| **Lane** | Salah satu dari paling banyak enam pita melintang lebar Material tempat Auto Nesting menjaga Bundle utuh (lajur). | Column, strip, horizontal group |
| **Cut Elsewhere** | Potongan sebuah order yang dipotong Marker lain dari order yang sama (Auto Save Of Markers). Marker menyembunyikannya, tidak pernah me-nesting-nya, dan tidak menghitungnya hilang. | Excluded piece, hidden piece |
| **Command Layer** | Satu set alat bertipe yang dipakai skrip batch, server MCP, dan Playbook untuk membaca dan mengubah dokumen (lapisan perintah). Setiap alat punya nama, skema JSON, Tool Tier, dan Role yang boleh menjalankannya, dan setiap perubahan melewati Undo. | API, plugin interface, scripting layer |
| **Tool Tier** | Tingkat sebuah alat Command Layer: basic, standard, atau advanced. Sesi menetapkan tingkat tertinggi yang boleh dipanggilnya. | Level, permission |
| **Role** | Peran yang dijalankan sesi Command Layer: Designer, Grader, Marker maker, Cutter, atau Supervisor. Supervisor adalah bawaan dan menjalankan semuanya. | User level, account, permission |
| **Approval Policy** | Ask atau Yolo. Dengan Ask, bawaannya, alat yang menyimpan, menimpa, menghapus, atau membuang menunggu Operator. Yolo melewati pertanyaan tetapi selalu menyimpan cadangan, sampah, dan log aksi. | Auto-approve, trust mode, autopilot |
| **Untrusted Text** | Teks yang berasal dari berkas (nama potongan, teks DXF, sel sheet, nama buyer dan PO). Teks ini sampai ke pemanggil hanya di bidangnya sendiri dan tidak pernah menjadi instruksi. | User input, external text |
| **Playbook** | Resep TOML berisi tahap bernama dengan parameter, pemeriksaan, dan Approval Checkpoint, dijalankan lewat Command Layer. Statusnya disimpan setelah setiap tahap, dan setiap run menulis Run Record. | Macro, workflow, script |
| **Approval Checkpoint** | Titik dalam Playbook tempat run berhenti dan meminta Operator melanjutkan, memilih, atau berhenti. | Confirmation, gate |
| **Quick Action** | Awal Playbook bernama dengan parameter yang sudah terisi (aksi cepat). | Shortcut, preset, macro |
| **Run Record** | Berkas yang ditulis run Playbook: versi dan hash aplikasi, Playbook, Workshop Profile, dan Prompt File, id model, dan seed nesting. Memutarnya ulang mengulang run. | Log, audit trail, history |
| **Workshop Profile** | Satu berkas TOML berisi standar bengkel, berlabel bahasa Indonesia (profil bengkel). Playbook membacanya, dan nilai tanpa sumber dilaporkan sebagai perlu konfirmasi Operator. | Settings, factory config, template |
| **Assistant Memory** | Pelajaran, preferensi, fakta, dan koreksi yang disimpan di PC ini antarsesi. Hasil dokumen dan alat mengalahkan Workshop Profile, yang mengalahkan memori. | History, chat log, cache |
| **Knowledge Index** | Indeks pencarian BM25 lokal atas SOP bengkel dan manual buyer sendiri (indeks pengetahuan). Berkasnya dibaca dan tidak pernah diubah. | Library, wiki, vector store |
| **Prompt File** | Teks berversi yang memberi tahu model siapa Rajutara dan cara menjawab: satu berkas inti dan satu per Role. Salinan yang dikelola di folder konfigurasi mengalahkan berkas bawaan. | System prompt, template |
| **Action Contract** | Aturan bahwa model menjawab dengan tepat satu aksi JSON per giliran: alat dengan argumennya, satu kalimat, atau pertanyaan dengan dua sampai enam pilihan. | Output format, protocol |
