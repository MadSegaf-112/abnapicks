export type ImageOption = {
  id: string;
  label: string;
  caption?: string;
  image?: string;
};

export type QuizStep =
  | {
      id: "mood" | "atmosphere" | "occasion";
      type: "image-single";
      kicker: string;
      title: string;
      subtitle: string;
      options: ImageOption[];
    }
  | {
      id: "scent_family";
      type: "image-multi";
      kicker: string;
      title: string;
      subtitle: string;
      options: ImageOption[];
    }
  | {
      id: "intensity";
      type: "slider";
      kicker: string;
      title: string;
      subtitle: string;
      min: number;
      max: number;
      labels: string[];
      valueLabels: string[];
    }
  | {
      id: "gender";
      type: "image-single";
      kicker: string;
      title: string;
      subtitle: string;
      options: ImageOption[];
    }
  | {
      id: "age_range" | "occupation" | "price_range";
      type: "text-single";
      kicker: string;
      title: string;
      subtitle: string;
      options: ImageOption[];
    };

// Curated Unsplash imagery — cinematic, grounded, natural fragrance aesthetics with high semantic match
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const QUIZ_DATA: QuizStep[] = [
  // Pertanyaan 1: Karakter Aroma
  {
    id: "mood",
    type: "image-single",
    kicker: "KENALI KARAKTERMU",
    title: "Kamu ingin parfum yang memberi kesan seperti apa?",
    subtitle: "Pilih kesan yang paling menggambarkan dirimu saat memakai parfum.",
    options: [
      {
        id: "mysterious",
        label: "Misterius",
        caption: "Wangi yang terasa dalam, elegan, dan memikat.",
        image: "/assets-new/mood-mysterious.jpeg",
      },
      {
        id: "radiant",
        label: "Ceria",
        caption: "Wangi yang terasa segar, hangat, dan penuh energi.",
        image: "/assets-new/mood-radiant.jpeg",
      },
      {
        id: "serene",
        label: "Lembut",
        caption: "Wangi yang terasa tenang, halus, dan menenangkan.",
        image: "/assets-new/mood-serene.jpeg",
      },
      {
        id: "empowered",
        label: "Percaya Diri",
        caption: "Wangi yang terasa tegas, berkelas, dan mudah diingat.",
        image: "/assets-new/mood-empowered.jpeg",
      },
    ],
  },

  // Pertanyaan 2: Jenis Aroma Favorit
  {
    id: "scent_family",
    type: "image-multi",
    kicker: "PILIH AROMA FAVORITMU",
    title: "Aroma seperti apa yang paling kamu suka?",
    subtitle: "Pilih satu atau beberapa jenis aroma yang paling dekat dengan seleramu.",
    options: [
      {
        id: "floral",
        label: "Floral",
        caption: "Wangi yang terasa dalam, elegan, dan memikat.",
        image: "/assets-new/Floral@4x.png",
      },
      {
        id: "woody",
        label: "Woody",
        caption: "Wangi yang terasa dalam, elegan, dan memikat.",
        image: "/assets-new/Woody@4x.png",
      },
      {
        id: "citrus",
        label: "Citrus",
        caption: "Wangi yang terasa dalam, elegan, dan memikat.",
        image: "/assets-new/Citrus@4x.png",
      },
      {
        id: "oriental",
        label: "Spicy",
        caption: "Wangi yang terasa dalam, elegan, dan memikat.",
        image: "/assets-new/Spicy@4x.png",
      },
      {
        id: "aquatic",
        label: "Aquatic",
        caption: "Wangi bersih dan sejuk seperti udara laut atau habis mandi.",
        image: img("photo-1505118380757-91f5f5632de0"),
      },
      {
        id: "gourmand",
        label: "Gourmand",
        caption: "Wangi manis seperti vanilla, caramel, atau dessert.",
        image: img("photo-1488477181946-6428a0291777"),
      },
      {
        id: "musky_powdery",
        label: "Musky / Powdery",
        caption: "Wangi lembut, bersih, dan halus seperti bedak atau kulit yang fresh.",
        image: img("photo-1522337360788-8b13dee7a37e"),
      },
    ],
  },

  // Pertanyaan 3: Suasana Aroma
  {
    id: "atmosphere",
    type: "image-single",
    kicker: "PILIH SUASANAMU",
    title: "Suasana seperti apa yang paling kamu suka?",
    subtitle: "Pilih suasana yang paling menggambarkan wangi yang ingin kamu rasakan.",
    options: [
      {
        id: "clean_morning",
        label: "Pagi yang Bersih",
        caption: "Terasa fresh, ringan, dan nyaman seperti selesai mandi.",
        image: img("photo-1470240731273-7821a6eeb6bd"), // Early morning mist and dew with soft fresh sunlight
      },
      {
        id: "rainy_city",
        label: "Kota Setelah Hujan",
        caption: "Terasa sejuk, tenang, dan modern.",
        image: img("photo-1493514789931-586cb221d7a7"), // Atmospheric rainy urban mood
      },
      {
        id: "flower_garden",
        label: "Taman Bunga",
        caption: "Terasa lembut, cantik, dan menyenangkan.",
        image: img("photo-1585320806297-9794b3e4eeae"), // Immersive lush blooming botanic flower garden path
      },
      {
        id: "shady_forest",
        label: "Hutan Teduh",
        caption: "Terasa natural, adem, dan menenangkan.",
        image: img("photo-1448375240586-882707db888b"), // Serene shaded tall pines
      },
      {
        id: "warm_night",
        label: "Malam Hangat",
        caption: "Terasa elegan, intim, dan sedikit sensual.",
        image: "/img/malamhangat.jpg",
      },
      {
        id: "luxury_room",
        label: "Ruang Mewah",
        caption: "Terasa rapi, mahal, dan berkelas.",
        image: img("photo-1600210492486-724fe5c67fb0"), // Editorial architectural interior
      },
    ],
  },

  // Pertanyaan 4: Momen Pemakaian
  {
    id: "occasion",
    type: "image-single",
    kicker: "PILIH MOMENNYA",
    title: "Parfum ini paling sering kamu pakai untuk apa?",
    subtitle: "Pilih momen yang paling dekat dengan aktivitasmu sehari-hari.",
    options: [
      {
        id: "daily",
        label: "Harian / Kerja / Kuliah",
        caption: "Untuk aktivitas rutin yang nyaman dipakai setiap hari.",
        image: img("photo-1522202176988-66273c2fd55f"), // Modern lifestyle study and desk workspace routine
      },
      {
        id: "casual",
        label: "Jalan Santai",
        caption: "Untuk hangout, belanja, atau kegiatan casual.",
        image: img("photo-1517841905240-472988babdf9"), // Relaxed lifestyle cafe & urban stroll
      },
      {
        id: "romance",
        label: "Kencan / Momen Spesial",
        caption: "Untuk tampil lebih menarik dan meninggalkan kesan personal.",
        image: img("photo-1516589178581-6cd7833ae3b2"), // Intimate romantic candlelit mood
      },
      {
        id: "night",
        label: "Acara Malam / Pesta",
        caption: "Untuk momen yang ingin terasa lebih standout dan berkesan.",
        image: "/img/pesta.jpg",
      },
      {
        id: "outdoor",
        label: "Outdoor / Aktivitas Aktif",
        caption: "Untuk aktivitas luar ruangan atau hari yang banyak bergerak.",
        image: img("photo-1507525428034-b723cf961d3e"), // Bright open horizon & nature
      },
      {
        id: "family",
        label: "Ibadah / Keluarga",
        caption: "Untuk suasana yang lebih tenang, sopan, dan nyaman di dekat orang lain.",
        image: img("photo-1511895426328-dc8714191300"), // Warm wholesome multigenerational family gathering
      },
    ],
  },

  // Pertanyaan 5: Intensitas Aroma (Slider Interaction)
  {
    id: "intensity",
    type: "slider",
    kicker: "ATUR KEKUATAN AROMA",
    title: "Kamu suka parfum yang seberapa terasa?",
    subtitle: "Pilih tingkat aroma yang paling nyaman untuk kamu pakai.",
    min: 1,
    max: 5,
    labels: ["Lembut", "Seimbang", "Semerbak"],
    valueLabels: ["Intim", "Halus", "Seimbang", "Tegas", "Semerbak"],
  },

  // Pertanyaan 6: Gender / Profil Pembeli (Pria & Wanita only)
  {
    id: "gender",
    type: "image-single",
    kicker: "TENTANG DIRIMU",
    title: "Apa jenis kelamin atau kategori parfum yang kamu cari?",
    subtitle: "Bantu kami memahami profil pelanggan ABNA.",
    options: [
      {
        id: "female",
        label: "Wanita",
        caption: "Pilihan parfum dengan karakter feminin dan anggun.",
        image: img("photo-1534528741775-53994a69daeb"), // Sophisticated editorial female portrait
      },
      {
        id: "male",
        label: "Pria",
        caption: "Pilihan parfum dengan karakter maskulin dan tegas.",
        image: img("photo-1507003211169-0a1dd7228f2d"), // Sophisticated editorial male portrait
      },
    ],
  },

  // Pertanyaan 7: Range Usia
  {
    id: "age_range",
    type: "text-single",
    kicker: "KENALI SEDIKIT TENTANGMU",
    title: "Kamu masuk range usia yang mana?",
    subtitle:
      "Jawaban ini membantu ABNA memahami pilihan aroma yang paling banyak disukai di setiap usia.",
    options: [
      { id: "under_18", label: "Di bawah 18 tahun" },
      { id: "18_24", label: "18-24 tahun" },
      { id: "25_34", label: "25-34 tahun" },
      { id: "35_44", label: "35-44 tahun" },
      { id: "45_plus", label: "45 tahun ke atas" },
    ],
  },

  // Pertanyaan 8: Pekerjaan / Aktivitas Utama
  {
    id: "occupation",
    type: "text-single",
    kicker: "AKTIVITAS UTAMA",
    title: "Apa aktivitas utama atau pekerjaanmu saat ini?",
    subtitle: "Bantu kami memahami profil pelanggan ABNA.",
    options: [
      { id: "student", label: "Pelajar / Mahasiswa" },
      { id: "corporate", label: "Karyawan Swasta / BUMN" },
      { id: "government", label: "PNS / ASN / Instansi Publik" },
      { id: "entrepreneur", label: "Wirausaha / Bisnis" },
      { id: "creative_freelance", label: "Kreatif / Freelancer / Content Creator" },
      { id: "health_educator", label: "Tenaga Medis / Pendidik / Dosen" },
      { id: "homemaker", label: "Ibu Rumah Tangga" },
      { id: "other", label: "Lainnya" },
    ],
  },

  // Pertanyaan 9: Range Harga Nyaman
  {
    id: "price_range",
    type: "text-single",
    kicker: "SESUAIKAN PILIHANMU",
    title: "Untuk parfum ukuran 30ml, kamu nyaman di range harga berapa?",
    subtitle:
      "Pilih kisaran harga yang paling sesuai dengan budget kamu saat membeli parfum ukuran 30ml.",
    options: [
      { id: "under_50k", label: "Di bawah Rp50.000" },
      { id: "50k_100k", label: "Rp50.000 - Rp100.000" },
      { id: "100k_150k", label: "Rp100.000 - Rp150.000" },
      { id: "150k_200k", label: "Rp150.000 - Rp200.000" },
      { id: "200k_300k", label: "Rp200.000 - Rp300.000" },
      { id: "above_300k", label: "Di atas Rp300.000" },
      { id: "depends_on_scent", label: "Tergantung kalau aromanya cocok" },
    ],
  },
];

const STEP_ORDER: QuizStep["id"][] = [
  "mood",
  "scent_family",
  "occasion",
  "intensity",
  "atmosphere",
  "age_range",
  "gender",
  "occupation",
  "price_range",
];

export const QUIZ: QuizStep[] = STEP_ORDER.map((id) => {
  const step = QUIZ_DATA.find((item) => item.id === id);

  if (!step) {
    throw new Error(`Pertanyaan tidak ditemukan: ${id}`);
  }

  return step;
});
