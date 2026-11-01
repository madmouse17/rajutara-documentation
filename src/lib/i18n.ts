import { withBase } from './site';

export type Lang = 'en' | 'id';
export const LANGS: readonly Lang[] = ['en', 'id'];

/** Every visible string of the landing page, the gallery and the site chrome. Product names, file
 *  extensions, commands, paths and figures stay as they are; only the words around them change. */
const en = {
  // Chrome
  skip: 'Skip to content',
  'brand.home': 'Rajutara, home',
  'nav.site': 'Site',
  'nav.siteSmall': 'Site, small screens',
  'nav.footer': 'Footer',
  'nav.menu': 'Menu',
  'nav.product': 'Product',
  'nav.learn': 'Learn',
  'nav.resources': 'Resources',
  'nav.about': 'About',
  'nav.docs': 'Docs',
  'nav.gettingStarted': 'Getting started',
  'nav.workflows': 'Workflows',
  'nav.downloads': 'Downloads',
  'nav.gallery': 'Gallery',
  'nav.roadmap': 'Roadmap',
  'nav.changelog': 'Changelog',
  'nav.cleanRoom': 'Clean room',
  'nav.contributing': 'Contributing',
  download: 'Download',
  language: 'Language',
  'footer.tagline':
    'Designing patterns, crafting future. Free software under MIT or Apache-2.0, at your option.',
  'footer.disclaimer':
    'Rajutara is independent of Optitex and is not affiliated with, endorsed by or sponsored by its owner. Optitex is a trademark of its owner. Rajutara uses none of its files or formats.',
  'og.alt':
    'The Rajutara crab logo and wordmark with the line Designing patterns, crafting future, over blueprint drawings of garments.',

  // Landing: page
  'home.title': 'Rajutara: open-source apparel CAD for garment workshops',
  'home.description':
    'Draft or import pieces, grade the sizes, nest the marker and plan the lays. Rajutara is free apparel CAD for Linux and Windows 7 SP1 through Windows 11.',

  // Hero
  'hero.title': 'Pattern CAD built for real garments.',
  'hero.lede':
    'Draft, grade, nest and plan the cut in one open-source window for Linux and Windows.',
  'hero.docs': 'Read the docs',
  'hero.video':
    'Screen recording of Rajutara: the sample tee marker, zooming in on the pieces, panning along the fabric and zooming back out.',
  'hero.play': 'Play video',
  'hero.pause': 'Pause video',
  'hero.steps': 'Workflow',
  'step.import': 'Import',
  'step.draft': 'Draft',
  'step.grade': 'Grade',
  'step.nest': 'Nest',
  'step.plot': 'Plot',

  // Sequence
  'seq.title': 'From pattern to marker.',
  'seq.ledeBefore':
    'One sample tee, start to finish. Every outline is read from the sample files in the',
  'seq.ledeLink': 'gallery',
  'seq.svgTitle':
    'The sample tee as a marker: {pieces} pieces in sizes S, M, L and XL nested on 1800 mm wide fabric, {metres} m long, {efficiency} percent efficiency.',
  'seq.used': '{metres} m used',
  'seq.draft': 'Draft',
  'seq.draftBody':
    'Draw the block once, in the base size. The tee is four pieces: front, back, sleeve and neck rib, each with notches and a grainline. Base size M is a 100 cm chest.',
  'seq.grade': 'Grade',
  'seq.gradeBody':
    'A grade rule moves each point by a few millimetres. S, L and XL grow from the base size M and nest around it, with no redrawing.',
  'seq.nest': 'Nest',
  'seq.nestBody':
    'All 20 pieces of the four sizes go onto 180 cm fabric, turned to follow the grain.',
  'seq.efficiency': 'Efficiency',
  'seq.fabricUsed': 'Fabric used',
  'seq.sizes': 'Sizes',
  'seq.baseSize': 'base size',

  // Workflow
  'wf.title': 'One window, four workspaces.',
  'wf.lede':
    'PDS, Grading, Marker and Cut Plan share one open Style and one undo history. Switching tabs never means exporting a file.',
  'wf.emblems': 'Crates and formats involved',
  'wf.pdsTitle': 'Draft the pattern, or import it.',
  'wf.pdsBody':
    '89 tools in a toolbox laid out the way trained operators expect: draft, notch, add seams, darts and pleats. Import ASTM DXF from other CAD. Segment lengths, seam allowance and grainlines show on the piece.',
  'wf.pdsLink': 'PDS guide',
  'wf.pdsAlt':
    'The PDS workspace with segment lengths shown on the FRONT piece: neckline, shoulders and armholes with seam allowance and grainline',
  'wf.gradingTitle': 'Grade by rule, not by redrawing.',
  'wf.gradingBody':
    'Pick a base size and give each grade point a rule: dX and dY per size. The graded nest draws every size in its own colour, and it leaves as ASTM DXF with a RUL file.',
  'wf.gradingLink': 'Grading guide',
  'wf.gradingAlt':
    'The Grading workspace: the Grading Table with dX and dY per size next to the graded nest drawn in four size colours',
  'wf.markerTitle': 'Nest the marker by hand or by engine.',
  'wf.markerBody':
    'Drag pieces from the piece bar, or let the nesting engine fill the fabric: no-fit polygons, bottom-left fill and annealing, with live progress. 300 pieces nest in 58 s at 90.1 %.',
  'wf.markerLink': 'Marker guide',
  'wf.markerAlt':
    'The Marker workspace with the sample tee: 20 pieces of sizes S, M, L and XL placed on 180 cm fabric, the Marker Properties pane on the left',
  'wf.markerCap': 'Placed by hand: 20 pieces of S, M, L and XL on 180 cm fabric, 75.20 %.',
  'wf.nestAlt':
    'The first 4.5 metres of a 300-piece marker: three rows of nested shirt fronts on 150 cm fabric, no overlaps',
  'wf.nestCap': 'A 300-piece marker saved by the end-to-end test: 0 overlaps, 89.62 %.',
  'wf.cutTitle': 'Plan the cut, then plot it.',
  'wf.cutBody':
    'Turn an order of colours by sizes into markers and lays with plies, fabric length and cost. The Cut Order sequences the lays and draws plies from your fabric rolls. Plot to PDF or HPGL/2.',
  'wf.cutLink': 'Cut Plan guide',
  'wf.cutAlt':
    'Cut Plan results for order PO-100: three markers and nine lays for a three-colour order of 590 garments',
  'wf.cutCap': 'Order PO-100 of the end-to-end test: 590 garments in 9 lays.',
  'wf.plotAlt': 'The Plot dialog with the Target list open: PDF A4 tiles, PDF A0, HPGL/2 file',
  'wf.plotCap': 'The Plot dialog: PDF as A4 tiles or one A0 sheet, or an HPGL/2 file.',

  // Start faster
  'start.title': 'Start faster.',
  'start.lede':
    'Open the sample tee in the app, or run the examples with no window at all. The files are the ones Rajutara itself writes.',
  'start.alt':
    'The sample tee marker: 20 pieces of four sizes nested on 180 cm fabric, drawn as navy outlines with notches and grainlines.',
  'start.teeTitle': 'The sample tee',
  'start.teeBody':
    'Kaos Lengan Pendek, a basic short-sleeve tee: four pieces graded S, M, L and XL, nested on 180 cm jersey. 20 pieces, 84.10 % efficiency, 2.53 m of fabric.',
  'start.fileStyle': 'Style',
  'start.fileMarker': 'Marker',
  'start.fileDxf': 'Graded nest, DXF',
  'start.allFiles': 'All sample files in the gallery',
  'start.ex1Title': 'Draft the sample tee',
  'start.ex1Body':
    'Drafts a short-sleeve tee, grades S, M, L and XL, nests a marker on 1800 mm jersey and writes every output.',
  'start.ex2Title': 'Import a DXF, plot every size',
  'start.ex2Body':
    'Reads an ASTM DXF with its RUL grade rules and plots every size of every piece to one A0 PDF.',
  'start.ex3Title': 'Nest a style file',
  'start.ex3Body':
    'Loads a style, builds a marker with one bundle per size, nests it, and writes the marker and an HPGL/2 plot.',
  'start.viewExample': 'View the example',
  'start.kitTitle': 'Agent kit',
  'start.kitBody':
    'Guidelines, real signatures and an MCP server, so a coding agent builds on Rajutara correctly.',
  'start.kitLink': 'rajutara-boost on GitHub',

  // Made with
  'made.title': 'Made with Rajutara.',
  'made.lede': 'Real renders from the sample files and the end-to-end tests. No stock images.',
  'made.pause': 'Pause the strip',
  'made.resume': 'Resume the strip',
  'made.teeTitle': 'The sample tee, nested',
  'made.teeNote': '20 pieces, 84.10 %, 2.53 m',
  'made.teeAlt':
    'The sample tee marker in the application: 20 pieces of four sizes in four colours on 180 cm fabric.',
  'made.n300Title': '300 shirt fronts',
  'made.n300Note': '0 overlaps, 89.62 %',
  'made.n300Alt': 'Three rows of nested shirt fronts, seen at the start of a 300-piece marker.',
  'made.plotTitle': 'The same marker, plotted',
  'made.plotNote': 'A0 PDF, stitched from its tiles',
  'made.plotAlt':
    'The sample tee marker drawn as navy outlines with notches and grainlines, one piece labelled with its name and size.',
  'made.gradeTitle': 'Graded nest',
  'made.gradeNote': 'S, M, L and XL, one colour each',
  'made.gradeAlt':
    'Front, back and sleeve pieces with their graded sizes drawn as nested outlines in four colours.',

  // Numbers
  'num.title': 'Small enough for the workshop PC.',
  'num.lede':
    'The budgets are tests: CI fails when the binary, the start-up, the memory or the nesting time goes over. Measured on the Linux release build under Xvfb and Mesa software rendering.',
  'num.nestBody': 'to nest 300 pieces at 90.1 % efficiency, on worker threads with live progress.',
  'num.nestLimit': 'The limit is 60 s.',
  'num.binary': 'release binary',
  'num.binaryLimit': 'limit 40 MB',
  'num.first': 'to the first frame',
  'num.firstLimit': 'CI warns above 1.5 s',
  'num.idle': 'idle, empty document',
  'num.idleLimit': 'limit 150 MB',
  'num.frame': 'per frame, panning a 1000-piece marker',
  'num.frameLimit': 'limit 8 ms',

  // Formats
  'fmt.title': 'Formats a workshop already has.',
  'fmt.lede':
    "Interchange uses open standards only. Documents are zip files holding JSON, so a script can read them. Optitex's own file formats are never read or written.",
  'fmt.both': 'Import and export',
  'fmt.export': 'Export',
  'fmt.openSave': 'Open and save',
  'fmt.dxf': 'Patterns and graded nests, ASTM D6673 and AAMA-292.',
  'fmt.rul': 'ASTM grade rules, kept beside a graded-nest DXF.',
  'fmt.hpgl': 'Plotter files and the marker cut file.',
  'fmt.pdf': 'A4 tiles, one A0 sheet or one A4 page; markers and reports.',
  'fmt.csv': 'Order quantities and fabric rolls in, reports out.',
  'fmt.native':
    'Style, Marker and Cut Plan: zip and JSON. Earlier .optx, .optm and .optc files still open.',
  'fmt.link': 'File formats in the docs',

  // Agents
  'agents.title': 'Built for scripts and agents.',
  'agents.lede':
    'A script or a coding agent can check a build and produce every output of the workflow without a person at the screen.',
  'agents.b1': 'One JSON line on stdout. Exit code 0, or non-zero on any window or OpenGL failure.',
  'agents.b2':
    'The same input and settings give byte-identical files. Only the UTC timestamp in an export header differs.',
  'agents.b3':
    'Documents are zip files holding JSON, so a zip library is enough to read or write them.',
  'agents.link': 'Headless and agents guide',
  'agents.cap1':
    'Check a build. This opens the real window, renders 60 frames, prints one line and exits.',
  'agents.cap2':
    'Make every output without a window: it drafts the sample tee, grades it to S, M, L and XL, nests a marker and writes the files in the gallery.',
  'agents.command': 'Command',
  'agents.output': 'Output',

  // Download
  'dl.title': 'Download Rajutara {v}.',
  'dl.lede':
    'Free software under MIT or Apache-2.0. Every package ships the licences and the list of third-party software.',
  'dl.win': 'Windows 7 SP1 through Windows 11',
  'dl.win64': 'Windows 64-bit',
  'dl.win32': 'Windows 32-bit',
  'dl.installer': 'Installer',
  'dl.portable': 'Portable',
  'dl.appimageNote':
    'Make it executable and run it. Without FUSE 2, start it with APPIMAGE_EXTRACT_AND_RUN=1.',
  'dl.msiNote': 'The .msi installer.',
  'dl.zipNote': 'Unzip it and run rajutara.exe.',
  'dl.noGl':
    'No OpenGL driver on the Windows PC? The packages carry a software renderer for that case, explained in the',
  'dl.win7Link': 'Windows 7 notes',
  'dl.checksums': 'All files and checksums are on the',
  'dl.releasesLink': 'releases page',
  'dl.legacyBefore': 'Files from 1.0 (',
  'dl.legacyMiddle': ') still open in {v}; Save writes the new',
  'dl.source': 'To build from source, start with',
  'dl.gettingStartedLink': 'getting started',
  'dl.beforeTitle': 'Before you rely on it',
  'dl.beforeLede': 'Know these five things about Rajutara {v}.',
  'dl.s1h': 'Windows 7 is untested on hardware.',
  'dl.s1b':
    'The Windows builds run under Wine and pass an import-table check. The run on a real Windows 7 PC is still pending.',
  'dl.s2h': '3D is interface-only.',
  'dl.s2b': 'There is no 3D window.',
  'dl.s3h': 'No cutter drivers.',
  'dl.s3b':
    'Markers write PDF and HPGL/2, including one generic HPGL/2 cut file, and nothing vendor-specific.',
  'dl.s4h': 'The Indonesian strings are unconfirmed.',
  'dl.s4b':
    'Every English string has an Indonesian one, but no Indonesian-speaking Operator has reviewed the wording.',
  'dl.s5h': 'Phase 3 is not started.',
  'dl.s5b':
    'Stripe and plaid matching, tilt, block fuse, flaws and cross grading are on the roadmap.',
  'dl.roadmap': 'Roadmap from 1.0 to v2',

  // Closing
  'closing.label': 'Rajutara',
  'closing.alt':
    'The Rajutara banner: a crab with a woven shell holding a needle and thread above the name Rajutara and the line Designing patterns, crafting future, over blueprint drawings of vests and hoodies, a grading table, the application window, rolls of fabric, scissors and a tape measure.',

  // Gallery
  'gal.title': 'Gallery | Rajutara',
  'gal.description':
    'Markers, nests and graded nests drawn by Rajutara, with the sample tee files to download: the style, the marker, the ASTM DXF and RUL, the plot and the report.',
  'gal.h1': 'Gallery',
  'gal.lede':
    'Markers and nests as Rajutara draws them, taken from the sample files and the end-to-end tests. Every picture is a real output.',
  'gal.teeAlt':
    'The sample tee marker in the application: 20 pieces of sizes S, M, L and XL in four colours, nested on 180 cm fabric with their grainlines.',
  'gal.teeTitle': 'The sample tee, nested',
  'gal.teeBody':
    'Kaos Lengan Pendek, nested by the engine: 20 pieces of S, M, L and XL on 180 cm Single Jersey.',
  'gal.efficiency': 'Efficiency',
  'gal.usedLength': 'Used length',
  'gal.perGarment': 'Per garment',
  'gal.overlaps': 'Overlaps',
  'gal.plotAlt':
    'The sample tee marker plotted as navy outlines on white, each piece with its notches, grainline and a label giving its name and size.',
  'gal.plotTitle': 'The same marker, plotted',
  'gal.plotBody':
    'Plotted to PDF on nine A0 sheets, a tile map and eight tiles, and stitched back into one picture. Each piece carries its name and size.',
  'gal.gradeAlt':
    'The Graded Nest view: front, back and sleeve with their sizes drawn as nested outlines in four colours, grade points marked in red.',
  'gal.gradeTitle': 'Graded nest',
  'gal.gradeBody':
    'Base size M, and S, L and XL derived from it by grade rules, each in its own colour. The red squares are grade points.',
  'gal.n300Alt':
    'Three rows of nested shirt fronts on 150 cm fabric, seen at the start of a 300-piece marker, with their grainlines.',
  'gal.n300Title': '300 shirt fronts',
  'gal.n300Body':
    'A 300-piece marker on 150 cm fabric: 0 overlaps, 89.62 % efficiency. Only the first 4.5 m of its 41.67 m are in the picture. In the release benchmark 300 pieces nest in 58 s at 90.1 %.',
  'gal.filesTitle': 'Sample files',
  'gal.filesLede':
    'The sample tee in {n} files. Open the style or the marker in Rajutara, or take the DXF and its RUL into another CAD.',
  'gal.legacyBefore': 'These files carry the earlier extensions',
  'gal.legacyAnd': 'and',
  'gal.legacyAfter': 'Rajutara opens them, and saves new files as',
  'gal.groupOpen': 'Open in Rajutara',
  'gal.groupInterchange': 'Take to another CAD',
  'gal.groupOutput': 'What Rajutara wrote',
  'gal.headlessBefore': 'The files are written by the headless example that drafts the tee; see',
  'gal.headlessLink': 'headless and agents',

  // Sample file kinds and uses (src/lib/samples.ts)
  'sample.style': 'Style',
  'sample.styleUse': 'Open it in Rajutara: four pieces, sizes S, M, L and XL, grade rules.',
  'sample.marker': 'Marker',
  'sample.markerUse': 'Open it in Rajutara: the nested tee, 20 pieces on 180 cm fabric.',
  'sample.cutplan': 'Cut Plan',
  'sample.cutplanUse': 'Open it in Rajutara.',
  'sample.dxf': 'ASTM D6673 DXF',
  'sample.dxfUse': 'The graded nest. Import it into any CAD that reads ASTM.',
  'sample.rul': 'ASTM grade rules',
  'sample.rulUse': 'Keep it beside the DXF: it holds the dX and dY per size.',
  'sample.plt': 'HPGL/2 plot',
  'sample.pltUse': 'The marker as a plotter file, 40 units to the millimetre.',
  'sample.csv': 'Marker report',
  'sample.csvUse': 'Length, efficiency, areas and piece counts as a table.',
  'sample.pieces': 'Pieces, size M',
  'sample.piecesUse': 'Every piece at 1:1, tiled for an A4 printer.',
  'sample.plot': 'Marker plot',
  'sample.plotUse': 'The nested marker at 1:1 on A0 sheets, with a tile map.',
  'sample.file': 'File',
};

export type Key = keyof typeof en;

const id: Record<Key, string> = {
  skip: 'Langsung ke isi halaman',
  'brand.home': 'Rajutara, beranda',
  'nav.site': 'Situs',
  'nav.siteSmall': 'Situs, layar kecil',
  'nav.footer': 'Kaki halaman',
  'nav.menu': 'Menu',
  'nav.product': 'Produk',
  'nav.learn': 'Belajar',
  'nav.resources': 'Sumber daya',
  'nav.about': 'Tentang',
  'nav.docs': 'Dokumentasi',
  'nav.gettingStarted': 'Memulai',
  'nav.workflows': 'Alur kerja',
  'nav.downloads': 'Unduhan',
  'nav.gallery': 'Galeri',
  'nav.roadmap': 'Peta jalan',
  'nav.changelog': 'Catatan perubahan',
  'nav.cleanRoom': 'Clean room',
  'nav.contributing': 'Berkontribusi',
  download: 'Unduh',
  language: 'Bahasa',
  'footer.tagline':
    'Designing patterns, crafting future. Perangkat lunak bebas berlisensi MIT atau Apache-2.0, sesuai pilihan Anda.',
  'footer.disclaimer':
    'Rajutara independen dari Optitex dan tidak berafiliasi, didukung, atau disponsori oleh pemiliknya. Optitex adalah merek dagang pemiliknya. Rajutara tidak memakai satu pun berkas atau format miliknya.',
  'og.alt':
    'Logo kepiting dan nama Rajutara dengan tagline Designing patterns, crafting future, di atas gambar cetak biru pakaian.',

  'home.title': 'Rajutara: CAD pakaian sumber terbuka untuk konveksi',
  'home.description':
    'Gambar atau impor potongan, grading ukuran, susun marker, dan rencanakan hamparan kain. Rajutara adalah CAD pakaian gratis untuk Linux dan Windows 7 SP1 sampai Windows 11.',

  'hero.title': 'CAD pola untuk pakaian sungguhan.',
  'hero.lede':
    'Gambar, grading, susun, dan rencanakan pemotongan dalam satu jendela sumber terbuka untuk Linux dan Windows.',
  'hero.docs': 'Baca dokumentasi',
  'hero.video':
    'Rekaman layar Rajutara: marker kaos contoh, memperbesar potongan, menggeser sepanjang kain, lalu memperkecil kembali.',
  'hero.play': 'Putar video',
  'hero.pause': 'Jeda video',
  'hero.steps': 'Alur kerja',
  'step.import': 'Impor',
  'step.draft': 'Gambar',
  'step.grade': 'Grading',
  'step.nest': 'Susun',
  'step.plot': 'Plot',

  'seq.title': 'Dari pola sampai marker.',
  'seq.ledeBefore':
    'Satu kaos contoh dari awal sampai akhir. Setiap garis tepi dibaca dari berkas contoh di',
  'seq.ledeLink': 'galeri',
  'seq.svgTitle':
    'Kaos contoh sebagai marker: {pieces} potongan ukuran S, M, L, dan XL tersusun pada kain selebar 1800 mm, panjang {metres} m, efisiensi {efficiency} persen.',
  'seq.used': '{metres} m terpakai',
  'seq.draft': 'Gambar',
  'seq.draftBody':
    'Gambar blok pola sekali saja, pada ukuran dasar. Kaos terdiri dari empat potongan: badan depan, badan belakang, lengan, dan kerah rib, masing-masing dengan penandaan dan Garis Serat. Ukuran dasar M berlingkar dada 100 cm.',
  'seq.grade': 'Grading',
  'seq.gradeBody':
    'Aturan grading menggeser tiap titik beberapa milimeter. S, L, dan XL tumbuh dari ukuran dasar M dan tersusun mengelilinginya, tanpa menggambar ulang.',
  'seq.nest': 'Susun',
  'seq.nestBody':
    'Seluruh 20 potongan dari empat ukuran masuk ke kain selebar 180 cm, diputar mengikuti arah serat.',
  'seq.efficiency': 'Efisiensi',
  'seq.fabricUsed': 'Kain terpakai',
  'seq.sizes': 'Ukuran',
  'seq.baseSize': 'ukuran dasar',

  'wf.title': 'Satu jendela, empat ruang kerja.',
  'wf.lede':
    'PDS, Grading, Marker, dan Cut Plan berbagi satu Style yang terbuka dan satu riwayat urung. Berpindah tab tidak pernah berarti mengekspor berkas.',
  'wf.emblems': 'Crate dan format yang terlibat',
  'wf.pdsTitle': 'Gambar pola, atau impor.',
  'wf.pdsBody':
    '89 alat dalam toolbox yang tertata seperti yang diharapkan operator terlatih: gambar, penandaan, tambah kampuh, kupnat, dan lipit. Impor DXF ASTM dari CAD lain. Panjang segmen, kampuh, dan Garis Serat tampil pada potongan.',
  'wf.pdsLink': 'Panduan PDS',
  'wf.pdsAlt':
    'Ruang kerja PDS dengan panjang segmen pada potongan FRONT: garis leher, bahu, dan lubang lengan beserta kampuh dan Garis Serat',
  'wf.gradingTitle': 'Grading dengan aturan, bukan menggambar ulang.',
  'wf.gradingBody':
    'Pilih ukuran dasar dan beri tiap titik grading satu aturan: dX dan dY per ukuran. Nest hasil grading menggambar setiap ukuran dengan warnanya sendiri, dan keluar sebagai DXF ASTM beserta berkas RUL.',
  'wf.gradingLink': 'Panduan Grading',
  'wf.gradingAlt':
    'Ruang kerja Grading: Grading Table dengan dX dan dY per ukuran di samping nest hasil grading dalam empat warna ukuran',
  'wf.markerTitle': 'Susun marker dengan tangan atau dengan mesin.',
  'wf.markerBody':
    'Seret potongan dari bilah potongan, atau biarkan mesin penyusun mengisi kain: no-fit polygon, isi dari kiri bawah, dan annealing, dengan kemajuan langsung. 300 potongan tersusun dalam 58 detik dengan efisiensi 90,1 %.',
  'wf.markerLink': 'Panduan Marker',
  'wf.markerAlt':
    'Ruang kerja Marker dengan kaos contoh: 20 potongan ukuran S, M, L, dan XL di atas kain 180 cm, panel Marker Properties di kiri',
  'wf.markerCap': 'Disusun dengan tangan: 20 potongan S, M, L, dan XL pada kain 180 cm, 75,20 %.',
  'wf.nestAlt':
    '4,5 meter pertama marker 300 potongan: tiga baris badan depan kemeja pada kain 150 cm, tanpa tumpang tindih',
  'wf.nestCap': 'Marker 300 potongan yang disimpan oleh uji end-to-end: 0 tumpang tindih, 89,62 %.',
  'wf.cutTitle': 'Rencanakan pemotongan, lalu plot.',
  'wf.cutBody':
    'Ubah pesanan warna per ukuran menjadi marker dan hamparan lengkap dengan lapisan, panjang kain, dan biaya. Cut Order mengurutkan hamparan dan mengambil lapisan dari gulungan kain Anda. Plot ke PDF atau HPGL/2.',
  'wf.cutLink': 'Panduan Cut Plan',
  'wf.cutAlt':
    'Hasil Cut Plan untuk pesanan PO-100: tiga marker dan sembilan hamparan untuk pesanan tiga warna sebanyak 590 pakaian',
  'wf.cutCap': 'Pesanan PO-100 pada uji end-to-end: 590 pakaian dalam 9 hamparan.',
  'wf.plotAlt': 'Dialog Plot dengan daftar Target terbuka: PDF ubin A4, PDF A0, berkas HPGL/2',
  'wf.plotCap': 'Dialog Plot: PDF berupa ubin A4 atau satu lembar A0, atau berkas HPGL/2.',

  'start.title': 'Mulai lebih cepat.',
  'start.lede':
    'Buka kaos contoh di aplikasi, atau jalankan contoh tanpa jendela sama sekali. Berkasnya sama dengan yang ditulis Rajutara sendiri.',
  'start.alt':
    'Marker kaos contoh: 20 potongan empat ukuran tersusun pada kain 180 cm, digambar sebagai garis tepi biru tua dengan penandaan dan Garis Serat.',
  'start.teeTitle': 'Kaos contoh',
  'start.teeBody':
    'Kaos Lengan Pendek, kaos lengan pendek dasar: empat potongan dengan grading S, M, L, dan XL, tersusun pada kain jersey 180 cm. 20 potongan, efisiensi 84,10 %, kain 2,53 m.',
  'start.fileStyle': 'Style',
  'start.fileMarker': 'Marker',
  'start.fileDxf': 'Nest hasil grading, DXF',
  'start.allFiles': 'Semua berkas contoh di galeri',
  'start.ex1Title': 'Gambar kaos contoh',
  'start.ex1Body':
    'Menggambar kaos lengan pendek, grading S, M, L, dan XL, menyusun marker pada jersey 1800 mm, lalu menulis semua keluaran.',
  'start.ex2Title': 'Impor DXF, plot setiap ukuran',
  'start.ex2Body':
    'Membaca DXF ASTM beserta aturan grading RUL-nya, lalu memplot setiap ukuran setiap potongan ke satu PDF A0.',
  'start.ex3Title': 'Susun berkas style',
  'start.ex3Body':
    'Memuat style, membuat marker dengan satu bundel per ukuran, menyusunnya, lalu menulis marker dan plot HPGL/2.',
  'start.viewExample': 'Lihat contoh',
  'start.kitTitle': 'Agent kit',
  'start.kitBody':
    'Pedoman, signature asli, dan server MCP, agar agen pemrograman membangun di atas Rajutara dengan benar.',
  'start.kitLink': 'rajutara-boost di GitHub',

  'made.title': 'Dibuat dengan Rajutara.',
  'made.lede': 'Hasil render asli dari berkas contoh dan uji end-to-end. Tanpa gambar stok.',
  'made.pause': 'Jeda strip',
  'made.resume': 'Lanjutkan strip',
  'made.teeTitle': 'Kaos contoh, tersusun',
  'made.teeNote': '20 potongan, 84,10 %, 2,53 m',
  'made.teeAlt':
    'Marker kaos contoh di aplikasi: 20 potongan empat ukuran dalam empat warna pada kain 180 cm.',
  'made.n300Title': '300 badan depan kemeja',
  'made.n300Note': '0 tumpang tindih, 89,62 %',
  'made.n300Alt': 'Tiga baris badan depan kemeja tersusun, terlihat di awal marker 300 potongan.',
  'made.plotTitle': 'Marker yang sama, diplot',
  'made.plotNote': 'PDF A0, disambung dari ubinnya',
  'made.plotAlt':
    'Marker kaos contoh digambar sebagai garis tepi biru tua dengan penandaan dan Garis Serat, satu potongan berlabel nama dan ukurannya.',
  'made.gradeTitle': 'Nest hasil grading',
  'made.gradeNote': 'S, M, L, dan XL, masing-masing satu warna',
  'made.gradeAlt':
    'Potongan depan, belakang, dan lengan dengan ukuran hasil grading digambar sebagai garis tepi bersusun dalam empat warna.',

  'num.title': 'Cukup ringan untuk PC konveksi.',
  'num.lede':
    'Anggaran itu adalah uji: CI gagal bila biner, waktu mulai, memori, atau waktu penyusunan melebihi batas. Diukur pada build rilis Linux di bawah Xvfb dan render perangkat lunak Mesa.',
  'num.nestBody':
    'untuk menyusun 300 potongan dengan efisiensi 90,1 %, pada thread pekerja dengan kemajuan langsung.',
  'num.nestLimit': 'Batasnya 60 detik.',
  'num.binary': 'biner rilis',
  'num.binaryLimit': 'batas 40 MB',
  'num.first': 'sampai bingkai pertama',
  'num.firstLimit': 'CI memperingatkan di atas 1,5 detik',
  'num.idle': 'diam, dokumen kosong',
  'num.idleLimit': 'batas 150 MB',
  'num.frame': 'per bingkai, menggeser marker 1000 potongan',
  'num.frameLimit': 'batas 8 ms',

  'fmt.title': 'Format yang sudah dipakai konveksi.',
  'fmt.lede':
    'Pertukaran data hanya memakai standar terbuka. Dokumen berupa berkas zip berisi JSON, sehingga skrip bisa membacanya. Format berkas milik Optitex tidak pernah dibaca maupun ditulis.',
  'fmt.both': 'Impor dan ekspor',
  'fmt.export': 'Ekspor',
  'fmt.openSave': 'Buka dan simpan',
  'fmt.dxf': 'Pola dan nest hasil grading, ASTM D6673 dan AAMA-292.',
  'fmt.rul': 'Aturan grading ASTM, disimpan di samping DXF nest hasil grading.',
  'fmt.hpgl': 'Berkas plotter dan berkas potong marker.',
  'fmt.pdf': 'Ubin A4, satu lembar A0, atau satu halaman A4; marker dan laporan.',
  'fmt.csv': 'Jumlah pesanan dan gulungan kain masuk, laporan keluar.',
  'fmt.native':
    'Style, Marker, dan Cut Plan: zip dan JSON. Berkas .optx, .optm, dan .optc yang lama tetap bisa dibuka.',
  'fmt.link': 'Format berkas di dokumentasi',

  'agents.title': 'Dibuat untuk skrip dan agen.',
  'agents.lede':
    'Skrip atau agen pemrograman dapat memeriksa sebuah build dan menghasilkan setiap keluaran alur kerja tanpa orang di depan layar.',
  'agents.b1':
    'Satu baris JSON di stdout. Kode keluar 0, atau bukan nol bila jendela atau OpenGL gagal.',
  'agents.b2':
    'Masukan dan pengaturan yang sama menghasilkan berkas yang identik byte demi byte. Hanya stempel waktu UTC di header ekspor yang berbeda.',
  'agents.b3':
    'Dokumen berupa berkas zip berisi JSON, sehingga pustaka zip sudah cukup untuk membaca atau menulisnya.',
  'agents.link': 'Panduan headless dan agen',
  'agents.cap1':
    'Periksa sebuah build. Perintah ini membuka jendela asli, merender 60 bingkai, mencetak satu baris, lalu keluar.',
  'agents.cap2':
    'Hasilkan setiap keluaran tanpa jendela: menggambar kaos contoh, grading ke S, M, L, dan XL, menyusun marker, lalu menulis berkas yang ada di galeri.',
  'agents.command': 'Perintah',
  'agents.output': 'Keluaran',

  'dl.title': 'Unduh Rajutara {v}.',
  'dl.lede':
    'Perangkat lunak bebas berlisensi MIT atau Apache-2.0. Setiap paket menyertakan lisensi dan daftar perangkat lunak pihak ketiga.',
  'dl.win': 'Windows 7 SP1 sampai Windows 11',
  'dl.win64': 'Windows 64-bit',
  'dl.win32': 'Windows 32-bit',
  'dl.installer': 'Pemasang',
  'dl.portable': 'Portabel',
  'dl.appimageNote':
    'Jadikan dapat dieksekusi lalu jalankan. Tanpa FUSE 2, mulai dengan APPIMAGE_EXTRACT_AND_RUN=1.',
  'dl.msiNote': 'Pemasang .msi.',
  'dl.zipNote': 'Ekstrak lalu jalankan rajutara.exe.',
  'dl.noGl':
    'Tidak ada driver OpenGL di PC Windows? Paket membawa perender perangkat lunak untuk kasus itu, dijelaskan di',
  'dl.win7Link': 'catatan Windows 7',
  'dl.checksums': 'Semua berkas dan checksum ada di',
  'dl.releasesLink': 'halaman rilis',
  'dl.legacyBefore': 'Berkas dari 1.0 (',
  'dl.legacyMiddle': ') tetap bisa dibuka di {v}; Simpan menulis',
  'dl.source': 'Untuk membangun dari sumber, mulai dengan',
  'dl.gettingStartedLink': 'memulai',
  'dl.beforeTitle': 'Sebelum Anda mengandalkannya',
  'dl.beforeLede': 'Ketahui lima hal ini tentang Rajutara {v}.',
  'dl.s1h': 'Windows 7 belum diuji pada perangkat keras.',
  'dl.s1b':
    'Build Windows berjalan di bawah Wine dan lolos pemeriksaan import-table. Uji pada PC Windows 7 sungguhan masih tertunda.',
  'dl.s2h': '3D hanya antarmuka.',
  'dl.s2b': 'Tidak ada jendela 3D.',
  'dl.s3h': 'Tanpa driver mesin potong.',
  'dl.s3b':
    'Marker menulis PDF dan HPGL/2, termasuk satu berkas potong HPGL/2 generik, dan tidak ada yang spesifik vendor.',
  'dl.s4h': 'Teks bahasa Indonesia belum dikonfirmasi.',
  'dl.s4b':
    'Setiap teks bahasa Inggris punya padanan bahasa Indonesia, tetapi belum ada Operator berbahasa Indonesia yang meninjau pilihan katanya.',
  'dl.s5h': 'Fase 3 belum dimulai.',
  'dl.s5b':
    'Pencocokan garis dan kotak-kotak, miring, block fuse, cacat kain, dan cross grading ada di peta jalan.',
  'dl.roadmap': 'Peta jalan dari 1.0 ke v2',

  'closing.label': 'Rajutara',
  'closing.alt':
    'Banner Rajutara: kepiting bercangkang anyaman memegang jarum dan benang di atas nama Rajutara dan tagline Designing patterns, crafting future, di atas gambar cetak biru rompi dan hoodie, tabel grading, jendela aplikasi, gulungan kain, gunting, dan meteran.',

  'gal.title': 'Galeri | Rajutara',
  'gal.description':
    'Marker, nest, dan nest hasil grading yang digambar Rajutara, beserta berkas kaos contoh untuk diunduh: style, marker, DXF dan RUL ASTM, plot, dan laporan.',
  'gal.h1': 'Galeri',
  'gal.lede':
    'Marker dan nest seperti yang digambar Rajutara, diambil dari berkas contoh dan uji end-to-end. Setiap gambar adalah keluaran asli.',
  'gal.teeAlt':
    'Marker kaos contoh di aplikasi: 20 potongan ukuran S, M, L, dan XL dalam empat warna, tersusun pada kain 180 cm beserta Garis Serat-nya.',
  'gal.teeTitle': 'Kaos contoh, tersusun',
  'gal.teeBody':
    'Kaos Lengan Pendek, disusun oleh mesin: 20 potongan S, M, L, dan XL pada Single Jersey 180 cm.',
  'gal.efficiency': 'Efisiensi',
  'gal.usedLength': 'Panjang terpakai',
  'gal.perGarment': 'Per pakaian',
  'gal.overlaps': 'Tumpang tindih',
  'gal.plotAlt':
    'Marker kaos contoh diplot sebagai garis tepi biru tua di atas putih, setiap potongan dengan penandaan, Garis Serat, dan label nama serta ukurannya.',
  'gal.plotTitle': 'Marker yang sama, diplot',
  'gal.plotBody':
    'Diplot ke PDF pada sembilan lembar A0, satu peta ubin dan delapan ubin, lalu disambung kembali menjadi satu gambar. Setiap potongan membawa nama dan ukurannya.',
  'gal.gradeAlt':
    'Tampilan Graded Nest: bagian depan, belakang, dan lengan dengan ukurannya digambar sebagai garis tepi bersusun dalam empat warna, titik grading ditandai merah.',
  'gal.gradeTitle': 'Nest hasil grading',
  'gal.gradeBody':
    'Ukuran dasar M, dan S, L, serta XL diturunkan darinya oleh aturan grading, masing-masing dengan warnanya sendiri. Kotak merah adalah titik grading.',
  'gal.n300Alt':
    'Tiga baris badan depan kemeja tersusun pada kain 150 cm, terlihat di awal marker 300 potongan, beserta Garis Serat-nya.',
  'gal.n300Title': '300 badan depan kemeja',
  'gal.n300Body':
    'Marker 300 potongan pada kain 150 cm: 0 tumpang tindih, efisiensi 89,62 %. Hanya 4,5 m pertama dari 41,67 m yang ada di gambar. Pada benchmark rilis, 300 potongan tersusun dalam 58 detik dengan efisiensi 90,1 %.',
  'gal.filesTitle': 'Berkas contoh',
  'gal.filesLede':
    'Kaos contoh dalam {n} berkas. Buka style atau marker di Rajutara, atau bawa DXF beserta RUL-nya ke CAD lain.',
  'gal.legacyBefore': 'Berkas ini memakai ekstensi lama',
  'gal.legacyAnd': 'dan',
  'gal.legacyAfter': 'Rajutara membukanya, dan menyimpan berkas baru sebagai',
  'gal.groupOpen': 'Buka di Rajutara',
  'gal.groupInterchange': 'Bawa ke CAD lain',
  'gal.groupOutput': 'Yang ditulis Rajutara',
  'gal.headlessBefore': 'Berkas ditulis oleh contoh headless yang menggambar kaos; lihat',
  'gal.headlessLink': 'headless dan agen',

  'sample.style': 'Style',
  'sample.styleUse': 'Buka di Rajutara: empat potongan, ukuran S, M, L, dan XL, aturan grading.',
  'sample.marker': 'Marker',
  'sample.markerUse': 'Buka di Rajutara: kaos tersusun, 20 potongan pada kain 180 cm.',
  'sample.cutplan': 'Cut Plan',
  'sample.cutplanUse': 'Buka di Rajutara.',
  'sample.dxf': 'DXF ASTM D6673',
  'sample.dxfUse': 'Nest hasil grading. Impor ke CAD mana pun yang membaca ASTM.',
  'sample.rul': 'Aturan grading ASTM',
  'sample.rulUse': 'Simpan di samping DXF: berisi dX dan dY per ukuran.',
  'sample.plt': 'Plot HPGL/2',
  'sample.pltUse': 'Marker sebagai berkas plotter, 40 satuan per milimeter.',
  'sample.csv': 'Laporan marker',
  'sample.csvUse': 'Panjang, efisiensi, luas, dan jumlah potongan dalam bentuk tabel.',
  'sample.pieces': 'Potongan, ukuran M',
  'sample.piecesUse': 'Setiap potongan 1:1, dipecah untuk printer A4.',
  'sample.plot': 'Plot marker',
  'sample.plotUse': 'Marker tersusun 1:1 pada lembar A0, dengan peta ubin.',
  'sample.file': 'Berkas',
};

const dictionaries: Record<Lang, Record<Key, string>> = { en, id };

/** The string for `key` in `lang`; `{name}` placeholders are filled from `vars`. */
export function t(lang: Lang, key: Key, vars?: Record<string, string | number>): string {
  const text = dictionaries[lang][key];
  return vars ? text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? '')) : text;
}

/** Site path (starting with `/`) in `lang`, without the base: `/docs/` becomes `/id/docs/` in Indonesian. */
export const sitePath = (lang: Lang, path: string): string => (lang === 'id' ? `/id${path}` : path);

/** `sitePath` with the Astro base, for links and assets. */
export const href = (lang: Lang, path: string): string => withBase(sitePath(lang, path));

/** The same page in the other language, from a site path that already carries its language prefix. */
export function twinPath(path: string): { lang: Lang; path: string } {
  return path === '/id/' || path.startsWith('/id/')
    ? { lang: 'en', path: path.slice(3) || '/' }
    : { lang: 'id', path: `/id${path}` };
}
