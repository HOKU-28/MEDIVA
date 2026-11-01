import articleImg1 from "../assets/blogs/article-1.jpg";
import articleImg2 from "../assets/blogs/article-2.webp";
import articleImg3 from "../assets/blogs/article-3.jpg";
import articleImg4 from "../assets/blogs/article-4.webp";
import articleImg5 from "../assets/blogs/article-5.webp";
import articleImg6 from "../assets/blogs/article-6.jpg";
import articleImg7 from "../assets/blogs/article-7.webp";
import articleImg8 from "../assets/blogs/article-8.jpg";
import articleImg9 from "../assets/blogs/article-9.jpg";
import articleImg10 from "../assets/blogs/article-10.avif";
import articleImg11 from "../assets/blogs/article-11.jpg";
import articleImg12 from "../assets/blogs/article-12.jpg";

export const CATEGORIES = [
  "Semua",
  "Gaya Hidup",
  "Kesehatan Gigi",
  "Kesehatan Anak",
  "Penyakit Umum",
  "Nutrisi",
  "Kesehatan Mental",
  "Kesehatan Lansia",
];

export const blogsData = [
  {
    id: 1,
    slug: "pola-tidur-sehat-meningkatkan-imunitas",
    title: "Pola Tidur Sehat untuk Meningkatkan Imunitas dan Energi",
    category: "Gaya Hidup",
    readTime: "4 menit baca",
    date: "12 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: true,
    image: {
      src: articleImg1,
      alt: "Pola Tidur Sehat untuk Meningkatkan Imunitas dan Energi",
    },
    summary:
      "Tidur bukan sekadar waktu istirahat pasif, melainkan fase aktif tubuh melakukan regenerasi sel imun dan pemulihan energi fisik. Kenali bagaimana pola tidur yang teratur dapat memperkuat daya tahan tubuh harian Anda.",
    takeaways: [
      "Orang dewasa membutuhkan waktu tidur berkualitas rata-rata 7 hingga 9 jam setiap malam untuk mendukung regenerasi sel imun.",
      "Kurang tidur kronis menurunkan produksi sitokin pelindung tubuh, sehingga meningkatkan kerentanan terhadap infeksi saluran pernapasan.",
      "Higiene tidur yang konsisten, seperti mematikan gawai 30 menit sebelum tidur dan menjaga suhu kamar yang sejuk, membantu mempercepat proses terlelap.",
      "Konsultasikan ke dokter umum jika mengalami insomnia lebih dari tiga minggu berturut-turut atau rasa lelah berlebih di siang hari.",
    ],
    sections: [
      {
        heading: "Hubungan Antara Siklus Sirkadian dan Sistem Imun",
        image: null,
        paragraphs: [
          "Setiap sel dalam tubuh manusia beroperasi mengikuti ritme sirkadian, yaitu jam biologis internal berdurasi 24 jam yang mengatur pelepasan hormon, suhu tubuh, dan respons kekebalan. Ketika Anda tidur lelap di malam hari, sistem imun melepaskan protein sitokin yang berperan penting dalam meredakan peradangan dan melawan patogen.",
          "Sebaliknya, saat seseorang secara berulang mengalami defisit tidur atau jadwal tidur yang tidak beraturan, produksi sitokin dan sel pembunuh alami (natural killer cells) mengalami penurunan. Akibatnya, tubuh membutuhkan waktu lebih lama untuk pulih dari paparan virus atau bakteri ringan seperti rhinovirus penyebab selesma.",
        ],
      },
      {
        heading: "Langkah Sederhana Menerapkan Higiene Tidur",
        image: null,
        paragraphs: [
          "Membangun rutinitas tidur yang sehat tidak memerlukan perubahan drastis, melainkan konsistensi kebiasaan harian. Mulailah dengan menetapkan jam tidur dan jam bangun yang sama setiap hari, termasuk di akhir pekan, untuk mengunci ritme sirkadian tubuh.",
          "Paparan cahaya biru dari layar ponsel, laptop, dan televisi memicu penekanan hormon melatonin yang bertugas memberi sinyal kantuk. Hindari penggunaan layar digital setidaknya 30 hingga 45 menit sebelum berbaring di tempat tidur. Gantilah dengan aktivitas relaksasi seperti membaca buku fisik atau latihan pernapasan santai.",
        ],
      },
      {
        heading: "Kapan Gangguan Tidur Memerlukan Perhatian Medis?",
        image: null,
        paragraphs: [
          "Sesekali mengalami kesulitan tidur akibat stres kerja atau perubahan jadwal adalah hal wajar. Namun, apabila Anda mengalami kesulitan memulai atau mempertahankan tidur selama lebih dari tiga minggu, sering terbangun dengan sensasi tercekik, atau mendengkur keras, hal tersebut dapat mengindikasikan gangguan seperti sleep apnea.",
          "Jangan mengonsumsi obat tidur secara bebas tanpa resep dan pengawasan dokter, karena berisiko menimbulkan ketergantungan serta menutupi akar penyebab masalah kesehatan yang sebenarnya.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Masalah Tidur",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 2,
    slug: "panduan-merawat-kesehatan-gusi-gigi",
    title: "Panduan Merawat Kesehatan Gusi dan Mencegah Gigi Berlubang",
    category: "Kesehatan Gigi",
    readTime: "5 menit baca",
    date: "10 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg2,
      alt: "Panduan Merawat Kesehatan Gusi dan Mencegah Gigi Berlubang",
    },
    summary:
      "Kesehatan rongga mulut berawal dari perawatan gusi yang tepat dan kebiasaan menyikat gigi yang benar. Pelajari cara mencegah penumpukan plak bakteri sebelum berkembang menjadi karies gigi dan radang gusi.",
    takeaways: [
      "Menyikat gigi minimal dua kali sehari selama dua menit dengan pasta gigi berfluoride merupakan standar dasar perlindungan gigi.",
      "Benang gigi (dental floss) efektif membersihkan sisa makanan dan plak pada sela-sela gigi yang tidak terjangkau bulu sikat.",
      "Gusi yang mudah berdarah saat menyikat gigi merupakan tanda awal radang gusi (gingivitis) yang membutuhkan evaluasi medis.",
      "Pemeriksaan berkala ke dokter gigi setiap 6 bulan sekali membantu mendeteksi karies dini dan membersihkan karang gigi yang mengeras.",
    ],
    sections: [
      {
        heading: "Plak Bakteri dan Dampaknya pada Struktur Gigi",
        image: null,
        paragraphs: [
          "Plak gigi adalah lapisan tipis dan lengket yang terbentuk dari sisa makanan dan koloni bakteri alami di mulut. Bakteri dalam plak memecah karbohidrat dan gula dari makanan yang kita konsumsi, menghasilkan asam yang secara perlahan melarutkan enamel gigi terluar.",
          "Jika plak tidak dibersihkan secara teratur melalui teknik menyikat gigi yang tepat, lapisan tersebut akan mengeras dan berikatan dengan mineral air liur membentuk karang gigi (kalkulus). Karang gigi yang terbentuk tidak dapat dihilangkan dengan sikat biasa dan menjadi sarang peradangan bagi jaringan gusi di sekitarnya.",
        ],
      },
      {
        heading: "Teknik Menyikat dan Membersihkan Sela Gigi yang Efektif",
        image: null,
        paragraphs: [
          "Banyak orang menyikat gigi dengan tekanan terlalu keras ke arah horizontal, yang dapat mengikis lapisan leher gigi dan menyebabkan gusi menyusut. Gerakan yang dianjurkan adalah memutar lembut dengan sudut 45 derajat mengarah ke garis gusi, membersihkan seluruh permukaan luar, dalam, dan permukaan kunyah gigi.",
          "Menggunakan benang gigi sekali sehari pada malam hari sangat krusial. Bulu sikat gigi terbaik sekalipun hanya mampu menjangkau sekitar 60% permukaan gigi. Benang gigi secara lembut mengangkat serpihan makanan di antara dua gigi yang berhimpitan sebelum bakteri sempat merombaknya menjadi asam.",
        ],
      },
      {
        heading: "Tanda-Tanda Peringatan untuk Segera ke Dokter Gigi",
        image: null,
        paragraphs: [
          "Gusi sehat memiliki warna merah muda pucat dan kenyal saat disentuh. Apabila gusi Anda tampak memerah, membengkak, terasa berdenyut, atau mengeluarkan darah saat menyikat gigi, Anda mungkin mengalami gingivitis.",
          "Jika dibiarkan tanpa pembersihan karang gigi profesional (scaling), gingivitis dapat berkembang menjadi periodontitis yang merusak ligamen penyangga dan tulang rahang, yang pada akhirnya dapat menyebabkan gigi goyang dan tanggal.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Gigi",
      label: "Konsultasi Kesehatan Gigi",
      link: "/dokter?spesialisasi=Dokter%20Gigi",
    },
  },
  {
    id: 3,
    slug: "tanda-dehidrasi-pada-anak-waspada",
    title: "Tanda-Tanda Dehidrasi pada Anak yang Perlu Diwaspadai Orang Tua",
    category: "Kesehatan Anak",
    readTime: "4 menit baca",
    date: "8 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg3,
      alt: "Tanda-Tanda Dehidrasi pada Anak yang Perlu Diwaspadai Orang Tua",
    },
    summary:
      "Anak-anak dan balita lebih rentan kehilangan cairan tubuh dengan cepat saat demam, muntah, atau diare. Ketahui gejala dehidrasi dari derajat ringan hingga tanda bahaya darurat yang membutuhkan penanganan medis segera.",
    takeaways: [
      "Frekuensi buang air kecil yang berkurang drastis atau popok tetap kering lebih dari 4-6 jam adalah indikator awal dehidrasi pada balita.",
      "Bibir kering, tidak ada air mata saat menangis, dan mata tampak cekung menandakan dehidrasi sedang.",
      "Oralit adalah larutan rehidrasi oral terbaik untuk menggantikan cairan dan elektrolit yang hilang akibat muntah atau diare.",
      "Anak yang tampak sangat lemas, sulit dibangunkan, atau napasnya cepat merupakan tanda darurat medis yang memerlukan penanganan ke IGD.",
    ],
    sections: [
      {
        heading: "Mengapa Anak Lebih Cepat Mengalami Dehidrasi?",
        image: null,
        paragraphs: [
          "Secara fisiologis, proporsi air dalam tubuh anak-anak lebih tinggi dibandingkan orang dewasa, dan laju metabolisme mereka berlangsung lebih cepat. Selain itu, ginjal anak yang masih berkembang belum seefisien ginjal orang dewasa dalam memekatkan urine untuk mempertahankan cairan saat asupan berkurang.",
          "Kondisi seperti gastroenteritis akut (muntah dan diare), demam tinggi, atau radang tenggorokan yang membuat anak enggan menelan dapat memicu dehidrasi hanya dalam hitungan beberapa jam jika tidak diimbangi asupan cairan yang adekuat.",
        ],
      },
      {
        heading: "Mengenali Derajat Dehidrasi pada Anak",
        image: null,
        paragraphs: [
          "Pada tahap awal atau dehidrasi ringan, anak biasanya tampak haus, sedikit rewel, dan frekuensi berkemih mulai berkurang. Air seni yang keluar tampak lebih pekat dan berwarna kuning tua.",
          "Ketika dehidrasi bertambah menjadi derajat sedang, kelembapan membran mukosa mulut dan bibir berkurang, elastisitas kulit melambat kembali saat dicubit lembut (turgor kulit menurun), dan air mata tidak keluar saat anak menangis.",
        ],
      },
      {
        heading: "Langkah Penanganan Pertama di Rumah dan Kapan Harus ke Dokter",
        image: null,
        paragraphs: [
          "Berikan larutan oralit dalam jumlah kecil namun sering, misalnya satu sendok teh setiap 2 hingga 3 menit, terutama jika anak masih muntah. Hindari memberikan jus buah kemasan atau minuman berkarbonasi manis karena kadar gula tinggi dapat memperburuk diare melalui mekanisme osmotik.",
          "Segera bawa anak ke dokter spesialis anak atau instalasi gawat darurat apabila anak menolak semua cairan, muntah terus-menerus lebih dari 6 jam, ubun-ubun kepala tampak cekung, tangan dan kaki teraba dingin, atau anak tampak sangat mengantuk dan sulit dibangunkan.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Anak",
      label: "Konsultasi Dokter Anak",
      link: "/dokter?spesialisasi=Dokter%20Anak",
    },
  },
  {
    id: 4,
    slug: "gejala-awal-hipertensi-dan-pencegahan",
    title: "Mengenal Gejala Awal Hipertensi dan Langkah Pencegahannya",
    category: "Penyakit Umum",
    readTime: "5 menit baca",
    date: "5 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg4,
      alt: "Mengenal Gejala Awal Hipertensi dan Langkah Pencegahannya",
    },
    summary:
      "Hipertensi kerap tidak menimbulkan gejala spesifik hingga terjadi komplikasi pada organ vital. Pelajari faktor risiko, batasan tekanan darah normal, serta intervensi gaya hidup yang terbukti menurunkan tekanan darah.",
    takeaways: [
      "Tekanan darah normal orang dewasa berada di kisaran di bawah 120/80 mmHg; nilai di atas 140/90 mmHg pada pemeriksaan berulang dikategorikan hipertensi.",
      "Hipertensi sering dijuluki 'silent killer' karena sebagian besar pengidap tidak merasakan keluhan fisik apa pun pada fase awal.",
      "Membatasi konsumsi garam hingga kurang dari 1 sendok teh (5 gram garam atau 2000 mg natrium) per hari membantu mengontrol tekanan darah.",
      "Pemeriksaan tensi rutin setidaknya satu kali setahun bagi dewasa muda dan lebih sering bagi yang memiliki riwayat keluarga dianjurkan oleh pedoman klinis.",
    ],
    sections: [
      {
        heading: "Mengapa Tekanan Darah Tinggi Sering Tidak Disadari?",
        image: null,
        paragraphs: [
          "Tekanan darah adalah kekuatan dorongan darah terhadap dinding pembuluh arteri saat jantung memompa. Pada fase awal hipertensi primer, pembuluh darah mampu mengompensasi peningkatan tekanan tersebut dengan menebalkan dinding ototnya tanpa menimbulkan rasa sakit.",
          "Mitos umum menganggap bahwa hipertensi selalu ditandai dengan pusing, leher kaku, atau wajah memerah. Kenyataannya, gejala-gejala tersebut umumnya baru muncul saat tekanan darah melonjak sangat tinggi atau telah menimbulkan komplikasi vaskular lanjut.",
        ],
      },
      {
        heading: "Faktor Risiko yang Dapat dan Tidak Dapat Dimodifikasi",
        image: null,
        paragraphs: [
          "Beberapa faktor risiko hipertensi berada di luar kendali kita, seperti bertambahnya usia yang menyebabkan pengerasan dinding pembuluh darah serta riwayat genetik keluarga langsung yang memiliki penyakit kardiovaskular.",
          "Namun, sebagian besar faktor pemicu utama dapat dikendalikan melalui gaya hidup. Asupan natrium tinggi dari makanan olahan, kurangnya aktivitas fisik, kebiasaan merokok, konsumsi alkohol berlebih, dan obesitas sentral berkontribusi langsung terhadap kenaikan resistensi pembuluh darah perifer.",
        ],
      },
      {
        heading: "Langkah Nyata Pencegahan dan Pengelolaan Tekanan Darah",
        image: null,
        paragraphs: [
          "Menerapkan pola makan gizi seimbang seperti diet DASH (Dietary Approaches to Stop Hypertension) yang kaya akan sayuran berdaun hijau, buah-buahan berserat tinggi, kacang-kacangan, dan produk susu rendah lemak terbukti klinis membantu menurunkan tekanan darah sistolik.",
          "Kombinasikan dengan olahraga aerobik intensitas sedang seperti jalan cepat selama 30 menit minimal 5 hari seminggu. Jika Anda terdiagnosis hipertensi oleh dokter, minumlah obat antihipertensi sesuai anjuran secara teratur dan jangan menghentikan konsumsi obat secara mandiri meskipun merasa sudah sehat.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Dokter Umum",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 5,
    slug: "prinsip-gizi-seimbang-isi-piringku",
    title: "Prinsip Gizi Seimbang: Memahami 'Isi Piringku' dalam Keseharian",
    category: "Nutrisi",
    readTime: "4 menit baca",
    date: "3 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg5,
      alt: "Prinsip Gizi Seimbang: Memahami 'Isi Piringku' dalam Keseharian",
    },
    summary:
      "Panduan 'Isi Piringku' dari Kementerian Kesehatan RI menggantikan konsep empat sehat lima sempurna dengan pembagian porsi makronutrien dan mikronutrien yang lebih proporsional untuk pencegahan penyakit metabolik.",
    takeaways: [
      "Setengah piring makan sebaiknya diisi dengan sayur (dua pertiga) dan buah-buahan (sepertiga).",
      "Setengah piring lainnya dibagi seimbang antara makanan pokok sumber karbohidrat kompleks dan lauk pauk sumber protein.",
      "Protein nabati dan hewani saling melengkapi asam amino esensial yang diperlukan untuk perbaikan jaringan sel tubuh.",
      "Membatasi konsumsi gula, garam, dan lemak (GGL) adalah pilar penting gizi seimbang harian.",
    ],
    sections: [
      {
        heading: "Dari Empat Sehat Lima Sempurna ke Isi Piringku",
        image: null,
        paragraphs: [
          "Konsep 'Isi Piringku' diluncurkan untuk memberikan visualisasi yang lebih aplikatif mengenai porsi makanan sekali makan. Pendekatan ini menekankan bahwa kebutuhan tubuh tidak hanya sekadar keberadaan jenis makanan tertentu, melainkan rasio proporsi nutrisi yang masuk ke dalam tubuh.",
          "Dengan memprioritaskan sayuran dan buah pada separuh piring makan, tubuh mendapatkan suplai serat pangan, vitamin, mineral, dan antioksidan yang cukup untuk memperlambat penyerapan glukosa dan melancarkan mikrobioma usus.",
        ],
      },
      {
        heading: "Memilih Karbohidrat dan Protein Berkualitas",
        image: null,
        paragraphs: [
          "Untuk sepertiga piring yang diperuntukkan bagi karbohidrat, utamakan sumber karbohidrat kompleks seperti nasi merah, jagung, ubi jalar, kentang dengan kulit, atau havermut. Karbohidrat kompleks memiliki indeks glikemik yang lebih moderat sehingga menjaga rasa kenyang lebih lama tanpa lonjakan insulin drastis.",
          "Pada bagian lauk pauk, kombinasikan sumber protein hewani tanpa lemak berlebih (seperti ikan, ayam tanpa kulit, telur) dengan protein nabati (tempe, tahu, kacang kedelai). Ikan laut seperti kembung, sarden, dan tuna juga menyediakan asam lemak omega-3 yang mendukung kesehatan jantung dan pembuluh darah.",
        ],
      },
      {
        heading: "Pilar Tambahan: Air Putih, Higiene, dan Aktivitas Fisik",
        image: null,
        paragraphs: [
          "Prinsip gizi seimbang bukan hanya tentang piring makan. Panduan resmi juga mencakup konsumsi air putih minimal 8 gelas sehari, mencuci tangan dengan sabun sebelum dan sesudah makan, serta melakukan aktivitas fisik aktif minimal 30 menit setiap hari.",
          "Jika Anda memiliki kondisi metabolik seperti diabetes melitus, dislipidemia, atau penyakit ginjal, konsultasikan pembagian porsi makan Anda dengan dokter atau ahli gizi untuk penyesuaian individual.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Pola Makan & Gizi",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 6,
    slug: "mengelola-stres-kerja-mencegah-burnout",
    title: "Mengelola Stres Kerja dan Mencegah Burnout di Era Digital",
    category: "Kesehatan Mental",
    readTime: "5 menit baca",
    date: "1 Oktober 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg6,
      alt: "Mengelola Stres Kerja dan Mencegah Burnout di Era Digital",
    },
    summary:
      "Tuntutan konektivitas konstan sering mengaburkan batas antara pekerjaan dan kehidupan pribadi. Pahami tanda-tanda kelelahan emosional (burnout) serta mekanisme koping adaptif untuk menjaga kesejahteraan psikologis.",
    takeaways: [
      "Burnout ditandai oleh tiga dimensi utama: kelelahan emosional mendalam, sinisme terhadap pekerjaan, dan perasaan efikasi diri yang menurun.",
      "Menetapkan batas digital yang jelas, seperti menonaktifkan notifikasi kerja di luar jam kantor, membantu menurunkan hormon kortisol.",
      "Latihan pernapasan diafragma (misalnya teknik 4-7-8) terbukti menurunkan stimulasi sistem saraf simpatis saat stres memuncak.",
      "Mencari dukungan profesional kesehatan bukan tanda kelemahan, melainkan langkah proaktif merawat kesehatan holistik.",
    ],
    sections: [
      {
        heading: "Membedakan Stres Normal dengan Sindrom Burnout",
        image: null,
        paragraphs: [
          "Stres dalam kadar wajar merupakan respons adaptif tubuh yang membantu kita tetap fokus dan termotivasi menyelesaikan tenggat waktu pekerjaan. Namun, ketika stres berlangsung tanpa jeda pemulihan yang cukup, tubuh dan pikiran memasuki fase kelelahan kronis yang dikenal sebagai burnout.",
          "Organisasi Kesehatan Dunia (WHO) mengklasifikasikan burnout sebagai fenomena pekerjaan yang ditandai oleh rasa lelah berkepanjangan, jarak mental atau perasaan negatif terhadap karier, serta penurunan produktivitas profesional secara nyata.",
        ],
      },
      {
        heading: "Strategi Praktis Menetapkan Batasan Kerja",
        image: null,
        paragraphs: [
          "Di era kerja hibrida dan aplikasi pesan instan yang aktif 24 jam, batas antara jam kerja dan waktu pribadi sering kali memudar. Mengabaikan jeda istirahat membuat sistem saraf terus berada dalam mode siaga (fight or flight).",
          "Terapkan aturan 'pintu keluar digital' dengan mematikan pemberitahuan surel kerja setelah jam kerja usai. Sediakan waktu minimal 30 hingga 60 menit setiap malam untuk aktivitas tanpa layar, seperti berjalan santai, memasak, atau berbincang langsung dengan anggota keluarga.",
        ],
      },
      {
        heading: "Mekanisme Relaksasi Cepat dan Bantuan Profesional",
        image: null,
        paragraphs: [
          "Saat Anda merasakan ketegangan memuncak di tengah hari kerja, luangkan 3 menit untuk melakukan latihan pernapasan diafragma: tarik napas perlahan melalui hidung selama 4 hitungan, tahan selama 4 hitungan, lalu hembuskan lembut melalui mulut selama 6 hitungan. Teknik ini mengirimkan sinyal ke otak untuk mengaktifkan sistem saraf parasimpatis.",
          "Apabila perasaan cemas, kehilangan motivasi, atau gangguan tidur terus menetap dan mengganggu fungsi hidup sehari-hari, jangan ragu untuk berkonsultasi dengan dokter umum atau tenaga profesional kesehatan jiwa untuk mendapatkan pendampingan yang tepat.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Dokter Umum",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 7,
    slug: "perbedaan-flu-biasa-batuk-alergi-ispa",
    title: "Perbedaan Batuk Alergi, Flu Biasa, dan Gejala Awal ISPA",
    category: "Penyakit Umum",
    readTime: "5 menit baca",
    date: "28 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg7,
      alt: "Perbedaan Batuk Alergi, Flu Biasa, dan Gejala Awal ISPA",
    },
    summary:
      "Batuk dan pilek dapat disebabkan oleh alergi debu, infeksi virus musiman, maupun infeksi bakteri saluran napas. Mengenali karakteristik gejalanya penting agar terhindar dari penggunaan antibiotik yang tidak tepat.",
    takeaways: [
      "Batuk alergi umumnya tidak disertai demam dan dipicu oleh alergen lingkungan seperti debu, bulu hewan, atau udara dingin.",
      "Flu biasa (influenza) cenderung datang mendadak dengan demam tinggi, nyeri sendi hebat, dan kelelahan seluruh tubuh.",
      "Infeksi Saluran Pernapasan Akut (ISPA) bagian atas umumnya disebabkan oleh virus dan dapat sembuh sendiri dengan istirahat serta hidrasi yang cukup.",
      "Antibiotik tidak efektif melawan infeksi virus dan hanya boleh dikonsumsi atas indikasi serta resep dokter jika dicurigai infeksi bakteri.",
    ],
    sections: [
      {
        heading: "Karakteristik Batuk Alergi",
        image: null,
        paragraphs: [
          "Batuk alergi adalah reaksi hipersensitivitas sistem imun terhadap partikel di udara yang sebenarnya tidak berbahaya bagi orang kebanyakan. Gejalanya ditandai dengan batuk kering atau menggelitik di tenggorokan, bersin berulang kali, mata berair dan gatal, serta hidung berair bening.",
          "Ciri khas batuk alergi adalah ketiadaan demam dan kecenderungannya memburuk pada waktu tertentu, misalnya di pagi hari saat suhu dingin atau saat berada di ruangan berdebu dan ber-AC yang filternya jarang dibersihkan.",
        ],
      },
      {
        heading: "Membedakan Selesma (Common Cold) dengan Influenza",
        image: null,
        paragraphs: [
          "Selesma biasanya berkembang perlahan selama satu hingga dua hari dengan keluhan hidung tersumbat, bersin, dan sakit tenggorokan ringan. Demam jarang terjadi pada orang dewasa atau hanya berupa demam subfebris ringan.",
          "Sebaliknya, influenza (flu sejati) menyerang secara tiba-tiba dalam hitungan jam. Pasien sering kali mengeluhkan demam tinggi (38°C atau lebih), menggigil, sakit kepala berdenyut, nyeri otot punggung dan kaki yang nyata, serta kelelahan ekstrem yang membuat sulit beranjak dari tempat tidur.",
        ],
      },
      {
        heading: "Penggunaan Obat yang Rasional dan Tanda Bahaya",
        image: null,
        paragraphs: [
          "Mayoritas kasus infeksi saluran napas atas akut (ISPA) ringan bersifat swasirna (self-limiting) dan sembuh dalam 7 sampai 10 hari dengan istirahat cukup, konsumsi air hangat, dan obat simtomatik seperti parasetamol untuk meredakan nyeri kepala atau demam.",
          "Jangan pernah mengonsumsi sisa antibiotik di rumah tanpa pemeriksaan dokter. Segera cari pertolongan medis apabila batuk disertai sesak napas, napas berbunyi mengi, dahak berwarna kecokelatan atau bercampur darah, demam tinggi yang tidak turun lebih dari 3 hari, atau nyeri dada tajam saat menarik napas.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Keluhan Batuk & ISPA",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 8,
    slug: "menjaga-kesehatan-sendi-mobilitas-lansia",
    title: "Menjaga Kesehatan Sendi dan Mobilitas di Usia Lanjut",
    category: "Kesehatan Lansia",
    readTime: "4 menit baca",
    date: "25 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg8,
      alt: "Menjaga Kesehatan Sendi dan Mobilitas di Usia Lanjut",
    },
    summary:
      "Penuaan alami dapat menurunkan cairan sendi dan kepadatan tulang rawan. Ketahui latihan fisik low-impact dan asupan nutrisi yang aman untuk menjaga kelenturan sendi dan kemandirian gerak di usia emas.",
    takeaways: [
      "Osteoartritis (pengapuran sendi) merupakan kondisi keausan bantalan tulang rawan sendi, paling sering menyerang lutut dan panggul.",
      "Latihan fisik intensitas ringan seperti jalan santai, berenang, dan senam aerobik air membantu melumasi sendi tanpa membebani tulang.",
      "Kombinasi asupan kalsium, vitamin D, dan hidrasi yang cukup mendukung kepadatan tulang dan volume cairan sinovial sendi.",
      "Menjaga berat badan ideal menurunkan beban mekanis pada sendi penopang tubuh bagian bawah secara signifikan.",
    ],
    sections: [
      {
        heading: "Perubahan Alami Sendi Seiring Bertambahnya Usia",
        image: null,
        paragraphs: [
          "Sendi menghubungkan tulang dan dilapisi oleh tulang rawan halus serta dilumasi oleh cairan sinovial agar gerak tubuh berlangsung mulus tanpa gesekan. Seiring bertambahnya usia, kandungan air dalam tulang rawan berkurang dan laju regenerasi jaringan melambat.",
          "Kondisi ini dapat menyebabkan bantalan sendi menipis secara bertahap, terutama pada sendi lutut, pinggul, dan ruas tulang belakang yang menopang berat badan tubuh sehari-hari. Akibatnya, timbul rasa kaku di pagi hari dan nyeri saat mulai beraktivitas.",
        ],
      },
      {
        heading: "Pilihan Latihan Fisik yang Aman dan Efektif",
        image: null,
        paragraphs: [
          "Banyak lansia menghindari bergerak karena takut nyeri sendi bertambah parah. Padahal, kurang gerak justru membuat otot di sekitar sendi melemah dan sendi menjadi semakin kaku. Kuncinya adalah memilih jenis olahraga yang bersifat low-impact.",
          "Berenang atau berjalan di dalam air adalah pilihan ideal karena daya apung air mengurangi tekanan gravitasi pada sendi lutut hingga 80%. Latihan peregangan lembut, yoga untuk lansia, atau bersepeda statis juga efektif memperkuat otot quadriceps yang menopang tempurung lutut.",
        ],
      },
      {
        heading: "Pola Makan Pendukung Sendi dan Penilaian Medis",
        image: null,
        paragraphs: [
          "Konsumsi makanan kaya antioksidan dan asam lemak omega-3, seperti ikan kembung, alpukat, dan minyak zaitun, dapat membantu menekan reaksi peradangan sendi. Pastikan juga asupan vitamin D dan kalsium harian tercukupi melalui paparan sinar matahari pagi dan produk olahan susu atau kedelai.",
          "Jika nyeri sendi disertai pembengkakan panas, kemerahan, atau membatasi kemampuan berjalan, konsultasikan dengan dokter umum untuk evaluasi klinis dan rujukan fisioterapi yang terarah.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Kesehatan Lansia",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 9,
    slug: "manfaat-aktivitas-fisik-ringan-30-menit",
    title: "Manfaat Aktivitas Fisik Ringan 30 Menit Sehari bagi Tubuh",
    category: "Gaya Hidup",
    readTime: "4 menit baca",
    date: "22 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg9,
      alt: "Manfaat Aktivitas Fisik Ringan 30 Menit Sehari bagi Tubuh",
    },
    summary:
      "Anda tidak harus berolahraga berat di pusat kebugaran untuk merasakan manfaat kesehatan. Jalan kaki 30 menit sehari telah terbukti secara ilmiah membantu mengontrol gula darah dan meningkatkan kesehatan kardiovaskular.",
    takeaways: [
      "Jalan cepat atau aktivitas aerobik ringan 30 menit sehari memenuhi rekomendasi minimum 150 menit aktivitas fisik per minggu dari WHO.",
      "Kontraksi otot rangka saat berjalan meningkatkan translokasi reseptor GLUT-4, membantu penyerapan glukosa darah tanpa bergantung penuh pada insulin.",
      "Aktivitas fisik memicu pelepasan endorfin dan dopamin yang secara signifikan menurunkan gejala kecemasan dan stres harian.",
      "Membagi waktu 30 menit menjadi tiga sesi 10 menit (misalnya pagi, siang, dan sore) memberikan manfaat metabolik yang setara.",
    ],
    sections: [
      {
        heading: "Dampak Positif pada Sensitivitas Insulin dan Gula Darah",
        image: null,
        paragraphs: [
          "Gaya hidup sedentari (banyak duduk) merupakan salah satu faktor pemicu utama resistensi insulin, di mana sel-sel tubuh menjadi kurang responsif terhadap hormon pengatur gula darah. Saat Anda berjalan kaki atau bergerak aktif, otot-otot kaki berkontraksi dan secara langsung menyerap glukosa dari aliran darah untuk dijadikan energi.",
          "Berjalan santai selama 10 hingga 15 menit setelah makan utama terbukti efektif mencegah lonjakan gula darah postprandial, terutama bagi individu dengan pra-diabetes atau riwayat keluarga diabetes tipe 2.",
        ],
      },
      {
        heading: "Kesehatan Jantung dan Regulasi Tekanan Darah",
        image: null,
        paragraphs: [
          "Jantung adalah otot yang membutuhkan stimulasi teratur untuk mempertahankan kekuatannya. Aktivitas aerobik ringan hingga sedang melatih jantung memompa volume darah yang lebih besar dengan detak yang lebih tenang saat istirahat.",
          "Aktivitas teratur juga merangsang produksi nitrat oksida (nitric oxide) oleh sel endotel pembuluh darah, yang membantu melebarkan arteri dan menurunkan tekanan darah perifer secara alami.",
        ],
      },
      {
        heading: "Tips Memulai Kebiasaan Tanpa Beban",
        image: null,
        paragraphs: [
          "Bagi pemula, mulailah dengan langkah sederhana: gunakan tangga alih-alih lift untuk satu atau dua lantai, parkir kendaraan sedikit lebih jauh dari pintu masuk, atau lakukan panggilan telepon sambil berjalan santai di sekitar ruangan.",
          "Jika Anda memiliki kondisi medis yang sudah ada sebelumnya, seperti riwayat penyakit jantung atau nyeri sendi kronis, diskusikan batas aman intensitas olahraga Anda dengan dokter terlebih dahulu.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Kebugaran & Gaya Hidup",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 10,
    slug: "mengapa-bau-mulut-terjadi-dan-solusinya",
    title: "Penyebab Bau Mulut (Halitosis) dan Cara Tepat Mengatasinya",
    category: "Kesehatan Gigi",
    readTime: "4 menit baca",
    date: "19 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg10,
      alt: "Penyebab Bau Mulut (Halitosis) dan Cara Tepat Mengatasinya",
    },
    summary:
      "Bau mulut tak sedap sering kali bersumber dari akumulasi bakteri anaerob pada permukaan lidah dan sela gigi. Pahami langkah-langkah kebersihan mulut yang terbukti menghilangkan aroma tak sedap secara tuntas.",
    takeaways: [
      "Lebih dari 80% kasus bau mulut bersumber dari kondisi rongga mulut lokal, terutama lapisan keputihan pada sepertiga belakang lidah.",
      "Bakteri anaerob memecah protein dari air liur dan sisa makanan, menghasilkan senyawa sulfur volatil (VSC) yang berbau tajam.",
      "Membersihkan permukaan lidah dengan alat pembersih lidah (tongue scraper) efektif memotong populasi bakteri penyebab bau.",
      "Mulut kering (xerostomia) akibat kurang minum atau efek samping obat memperparah bau mulut karena berkurangnya efek pembersihan alami air liur.",
    ],
    sections: [
      {
        heading: "Mekanisme Pembentukan Senyawa Sulfur Volatil",
        image: null,
        paragraphs: [
          "Di dalam mulut terdapat ratusan jenis mikroorganisme alami. Sebagian di antaranya adalah bakteri anaerob gram negatif yang hidup di area minim oksigen, seperti celah gusi dalam, kantong periodontal, dan papila di permukaan lidah.",
          "Bakteri ini memecah sisa-sisa protein dari makanan, sel epitel mati, dan cairan mulut menjadi asam amino yang mengandung belerang. Hasil perombakan ini melepaskan senyawa volatil sulfur (seperti hidrogen sulfida dan metil merkaptan) yang menimbulkan aroma tidak sedap saat kita berbicara atau menghembuskan napas.",
        ],
      },
      {
        heading: "Langkah-Langkah Pembersihan Mulut Menyeluruh",
        image: null,
        paragraphs: [
          "Mengunyah permen penyegar napas hanya menutupi bau untuk sementara waktu tanpa menyelesaikan sumber masalah. Langkah esensial dimulai dari membersihkan permukaan lidah dengan alat pembersih lidah secara lembut dari arah pangkal ke ujung setiap selesai menyikat gigi.",
          "Pastikan juga membersihkan sela-sela gigi dengan dental floss setiap hari. Sisa makanan berserat (seperti daging atau sayuran) yang terselip di sela gigi akan membusuk dalam waktu 24 jam dan menjadi sumber bau mulut yang persisten.",
        ],
      },
      {
        heading: "Kapan Halitosis Memerlukan Pemeriksaan Lanjutan?",
        image: null,
        paragraphs: [
          "Jika bau mulut tetap menetap meskipun Anda telah menjaga kebersihan gigi dan lidah secara disiplin, periksakan ke dokter gigi untuk memeriksa kemungkinan adanya gigi berlubang tersembunyi, infeksi pulpa gigi, atau radang gusi.",
          "Dalam beberapa kasus, halitosis kronis juga dapat berhubungan dengan kondisi medis non-gigi, seperti sinusitis kronis, post-nasal drip, refluks asam lambung (GERD), atau penyakit metabolik yang memerlukan penanganan dokter spesialis terkait.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Gigi",
      label: "Konsultasi Dokter Gigi",
      link: "/dokter?spesialisasi=Dokter%20Gigi",
    },
  },
  {
    id: 11,
    slug: "pentingnya-hidrasi-kebutuhan-air-harian",
    title: "Pentingnya Hidrasi: Berapa Banyak Air yang Benar-Benar Kita Butuhkan?",
    category: "Nutrisi",
    readTime: "4 menit baca",
    date: "16 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg11,
      alt: "Pentingnya Hidrasi: Berapa Banyak Air yang Benar-Benar Kita Butuhkan?",
    },
    summary:
      "Kebutuhan cairan setiap orang bervariasi bergantung pada suhu lingkungan, tingkat aktivitas fisik, dan metabolisme tubuh. Pelajari cara mengenali status hidrasi harian melalui indikator warna urine yang sederhana.",
    takeaways: [
      "Aturan umum 2 liter atau 8 gelas sehari adalah patokan dasar, namun kebutuhan aktual dapat meningkat saat berolahraga atau cuaca panas terik.",
      "Warna urine kuning jernih atau jerami pucat menandakan hidrasi optimal; warna kuning pekat mengindikasikan perlunya minum lebih banyak.",
      "Dehidrasi ringan (penurunan 1-2% berat badan akibat cairan) sudah cukup untuk menurunkan konsentrasi, daya ingat kerja, dan memicu sakit kepala.",
      "Minum air putih secara teratur sepanjang hari lebih efektif dibandingkan minum dalam jumlah besar sekaligus dalam satu waktu.",
    ],
    sections: [
      {
        heading: "Fungsi Vital Air dalam Fisiologi Tubuh Manusia",
        image: null,
        paragraphs: [
          "Air menyusun sekitar 60% dari berat badan orang dewasa dan terlibat dalam hampir setiap proses biokimia tubuh. Air bertindak sebagai pelarut nutrisi, pelumas sendi dan jaringan mata, pengatur suhu tubuh melalui keringat, serta media pembuangan sisa metabolik melalui ginjal.",
          "Ketika tubuh kekurangan cairan, volume plasma darah menyusut. Hal ini memaksa jantung bekerja lebih keras memompa darah yang lebih kental, memicu penurunan tekanan darah ortostatik, rasa pusing saat berdiri mendadak, dan rasa lelah berlebih.",
        ],
      },
      {
        heading: "Menggunakan Bagan Warna Urine sebagai Panduan Harian",
        image: null,
        paragraphs: [
          "Rasa haus sebenarnya adalah sinyal yang sedikit terlambat—saat Anda mulai merasa haus, tubuh telah mengalami defisit cairan sekitar 1%. Oleh karena itu, cara paling praktis untuk memantau kecukupan hidrasi adalah dengan mengamati warna air seni pertama saat buang air kecil di siang hari.",
          "Urine yang berwarna kuning pucat seperti jerami atau hampir jernih menandakan tubuh terhidrasi dengan baik. Sebaliknya, jika urine berwarna kuning tua keruh, menyerupai warna teh pekat, atau berbau menyengat, itu adalah tanda tegas bahwa Anda perlu segera minum dua hingga tiga gelas air putih.",
        ],
      },
      {
        heading: "Pertimbangan Khusus pada Kondisi Tertentu",
        image: null,
        paragraphs: [
          "Meskipun hidrasi sangat penting, individu dengan kondisi medis tertentu seperti gagal jantung kongestif atau penyakit ginjal kronis stadium lanjut mungkin memerlukan pembatasan cairan sesuai arahan dokter spesialis untuk mencegah penumpukan cairan di paru-paru dan tungkai.",
          "Bagi populasi umum yang sehat, utamakan air putih alami dan batasi minuman manis berpemanis buatan atau berkafein tinggi yang bersifat diuretik ringan.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Umum",
      label: "Konsultasi Kesehatan Umum",
      link: "/dokter?spesialisasi=Dokter%20Umum",
    },
  },
  {
    id: 12,
    slug: "pertolongan-pertama-demam-pada-balita",
    title: "Pertolongan Pertama Demam pada Balita: Kapan Harus ke Dokter?",
    category: "Kesehatan Anak",
    readTime: "5 menit baca",
    date: "14 September 2026",
    author: "Redaksi MEDIVA",
    featured: false,
    image: {
      src: articleImg12,
      alt: "Pertolongan Pertama Demam pada Balita: Kapan Harus ke Dokter?",
    },
    summary:
      "Demam pada balita merupakan mekanisme pertahanan alami tubuh saat melawan infeksi. Ketahui cara merawat anak demam di rumah dengan kompres hangat yang benar serta tanda bahaya 'red flags' yang memerlukan penanganan medis darurat.",
    takeaways: [
      "Suhu tubuh anak di atas 38°C per rektal atau per aksila (ketiak) dikategorikan sebagai demam.",
      "Gunakan kompres air hangat suam-suam kuku (tepid sponging) di lipatan ketiak dan selangkangan; jangan gunakan air es atau alkohol.",
      "Pastikan anak mengenakan pakaian tipis berbahan katun yang menyerap keringat dan cukup minum cairan agar tidak dehidrasi.",
      "Bayi berusia di bawah 3 bulan dengan suhu 38°C atau lebih harus segera diperiksa dokter tanpa menunggu penanganan rumah.",
    ],
    sections: [
      {
        heading: "Memahami Arti Demam pada Anak",
        image: null,
        paragraphs: [
          "Banyak orang tua mengalami kecemasan berlebih (fever phobia) ketika suhu tubuh anak naik. Perlu dipahami bahwa demam itu sendiri bukanlah penyakit, melainkan respons fisiologis alami yang diatur oleh hipotalamus otak untuk menciptakan lingkungan yang tidak ramah bagi replikasi virus dan bakteri.",
          "Oleh karena itu, tujuan utama penanganan demam di rumah bukanlah semata-mata menurunkan angka termometer ke 36°C secepat mungkin, melainkan membuat anak merasa lebih nyaman dan mencegah dehidrasi.",
        ],
      },
      {
        heading: "Langkah Penanganan Mandiri yang Tepat dan Aman",
        image: null,
        paragraphs: [
          "Gunakan pakaian tipis dan selimut tipis agar panas tubuh dapat keluar secara alami melalui radiasi. Membungkus anak dengan jaket tebal atau selimut bertumpuk justru menjebak panas dan berisiko menaikkan suhu tubuh ke tingkat yang membahayakan.",
          "Jika anak merasa rewel atau gelisah, kompres dengan kain yang dibasahi air hangat (bukan air dingin atau es) pada area dahi, lipatan ketiak, dan paha atas selama 10 hingga 15 menit. Obat penurun panas seperti parasetamol dapat diberikan sesuai dosis berat badan anak yang tercantum pada kemasan atau resep dokter.",
        ],
      },
      {
        heading: "Tanda Bahaya (Red Flags) yang Wajib Diwaspadai",
        image: null,
        paragraphs: [
          "Segera bawa anak ke dokter spesialis anak atau instalasi gawat darurat rumah sakit jika demam disertai gejala: kejang demam, leher kaku, ruam merah keunguan yang tidak pudar saat ditekan gelas kaca, sesak napas atau tarikan dinding dada ke dalam (retraksi), muntah terus-menerus, atau anak tampak sangat lesu dan tidak merespons panggilan.",
          "Demam yang berlangsung lebih dari 72 jam (3 hari) tanpa perbaikan juga memerlukan pemeriksaan fisik dan laboratorium darah oleh dokter untuk menyingkirkan kemungkinan infeksi bakteri serius seperti demam tifoid atau demam berdarah dengue.",
        ],
      },
    ],
    doctorCta: {
      specialty: "Dokter Anak",
      label: "Konsultasi Dokter Anak",
      link: "/dokter?spesialisasi=Dokter%20Anak",
    },
  },
];

export function getAllBlogs() {
  return blogsData;
}

export function getFeaturedBlog() {
  return blogsData.find((b) => b.featured) || blogsData[0];
}

export function getBlogBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.trim().toLowerCase();
  return blogsData.find((b) => b.slug.toLowerCase() === cleanSlug) || null;
}

export function getRelatedBlogs(currentSlug, limit = 3) {
  const current = getBlogBySlug(currentSlug);
  if (!current) {
    return blogsData.slice(0, limit);
  }

  const sameCategory = blogsData.filter(
    (b) => b.category === current.category && b.slug !== current.slug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherCategory = blogsData.filter(
    (b) => b.category !== current.category && b.slug !== current.slug
  );

  return [...sameCategory, ...otherCategory].slice(0, limit);
}
