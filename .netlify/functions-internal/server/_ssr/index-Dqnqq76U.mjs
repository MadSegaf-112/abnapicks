import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-ndLFfaJy.mjs";
import { a as createServerFn } from "./server-BpnMBpJF.mjs";
import { C as ConsultationEventInputSchema } from "./customer-events.repository-CIBRJUOG.mjs";
import "../_libs/seroval.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { X, M as Menu, A as ArrowUpRight, P as Play, a as ArrowRight, C as Compass, L as Layers, S as Sparkles, b as Check, c as ArrowLeft, V as Volume2, d as CircleCheck, D as Download, e as MessageSquare, R as RotateCcw } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, c as unionType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./supabase.server-B40vTsTo.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:process";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const QUIZ = [
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
        image: img("photo-1518709268805-4e9042af9f23")
        // Dark, moody, elegant aesthetic
      },
      {
        id: "radiant",
        label: "Ceria",
        caption: "Wangi yang terasa segar, hangat, dan penuh energi.",
        image: img("photo-1492562080023-ab3db95bfbce")
        // Genuine joyful smiling expressive radiance
      },
      {
        id: "serene",
        label: "Lembut",
        caption: "Wangi yang terasa tenang, halus, dan menenangkan.",
        image: img("photo-1584100936595-c0654b55a2e2")
        // Pure soft tactile cashmere / draped velvet texture
      },
      {
        id: "empowered",
        label: "Percaya Diri",
        caption: "Wangi yang terasa tegas, berkelas, dan mudah diingat.",
        image: "/percayadiri.jpg"
      }
    ]
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
        caption: "Wangi bunga yang lembut, cantik, dan elegan.",
        image: img("photo-1490750967868-88aa4486c946")
        // High quality lush floral bloom
      },
      {
        id: "woody",
        label: "Woody",
        caption: "Wangi kayu yang hangat, tenang, dan berkelas.",
        image: img("photo-1448375240586-882707db888b")
        // Deep cedar/forest wood grain
      },
      {
        id: "citrus",
        label: "Citrus",
        caption: "Wangi segar seperti lemon, jeruk, atau buah yang cerah.",
        image: img("photo-1547514701-42782101795e")
        // Fresh bright lemons & citrus slices
      },
      {
        id: "oriental",
        label: "Amber & Spicy",
        caption: "Wangi hangat dengan sentuhan rempah yang terasa mewah.",
        image: img("photo-1509358271058-acd22cc93898")
        // Rich warm spices & amber textures
      },
      {
        id: "aquatic",
        label: "Aquatic",
        caption: "Wangi bersih dan sejuk seperti udara laut atau habis mandi.",
        image: img("photo-1505118380757-91f5f5632de0")
        // Crisp clear ocean water breeze
      },
      {
        id: "gourmand",
        label: "Gourmand",
        caption: "Wangi manis seperti vanilla, caramel, atau dessert.",
        image: img("photo-1488477181946-6428a0291777")
        // Vanilla dessert & caramel tones
      },
      {
        id: "musky_powdery",
        label: "Musky / Powdery",
        caption: "Wangi lembut, bersih, dan halus seperti bedak atau kulit yang fresh.",
        image: img("photo-1522337360788-8b13dee7a37e")
        // Fine delicate cosmetic powder & soft velvety puff
      }
    ]
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
        image: img("photo-1470240731273-7821a6eeb6bd")
        // Early morning mist and dew with soft fresh sunlight
      },
      {
        id: "rainy_city",
        label: "Kota Setelah Hujan",
        caption: "Terasa sejuk, tenang, dan modern.",
        image: img("photo-1493514789931-586cb221d7a7")
        // Atmospheric rainy urban mood
      },
      {
        id: "flower_garden",
        label: "Taman Bunga",
        caption: "Terasa lembut, cantik, dan menyenangkan.",
        image: img("photo-1585320806297-9794b3e4eeae")
        // Immersive lush blooming botanic flower garden path
      },
      {
        id: "shady_forest",
        label: "Hutan Teduh",
        caption: "Terasa natural, adem, dan menenangkan.",
        image: img("photo-1448375240586-882707db888b")
        // Serene shaded tall pines
      },
      {
        id: "warm_night",
        label: "Malam Hangat",
        caption: "Terasa elegan, intim, dan sedikit sensual.",
        image: "/malamhangat.jpg"
      },
      {
        id: "luxury_room",
        label: "Ruang Mewah",
        caption: "Terasa rapi, mahal, dan berkelas.",
        image: img("photo-1600210492486-724fe5c67fb0")
        // Editorial architectural interior
      }
    ]
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
        image: img("photo-1522202176988-66273c2fd55f")
        // Modern lifestyle study and desk workspace routine
      },
      {
        id: "casual",
        label: "Jalan Santai",
        caption: "Untuk hangout, belanja, atau kegiatan casual.",
        image: img("photo-1517841905240-472988babdf9")
        // Relaxed lifestyle cafe & urban stroll
      },
      {
        id: "romance",
        label: "Kencan / Momen Spesial",
        caption: "Untuk tampil lebih menarik dan meninggalkan kesan personal.",
        image: img("photo-1516589178581-6cd7833ae3b2")
        // Intimate romantic candlelit mood
      },
      {
        id: "night",
        label: "Acara Malam / Pesta",
        caption: "Untuk momen yang ingin terasa lebih standout dan berkesan.",
        image: "/pesta.jpg"
      },
      {
        id: "outdoor",
        label: "Outdoor / Aktivitas Aktif",
        caption: "Untuk aktivitas luar ruangan atau hari yang banyak bergerak.",
        image: img("photo-1507525428034-b723cf961d3e")
        // Bright open horizon & nature
      },
      {
        id: "family",
        label: "Ibadah / Keluarga",
        caption: "Untuk suasana yang lebih tenang, sopan, dan nyaman di dekat orang lain.",
        image: img("photo-1511895426328-dc8714191300")
        // Warm wholesome multigenerational family gathering
      }
    ]
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
    valueLabels: ["Intim", "Halus", "Seimbang", "Tegas", "Semerbak"]
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
        image: img("photo-1534528741775-53994a69daeb")
        // Sophisticated editorial female portrait
      },
      {
        id: "male",
        label: "Pria",
        caption: "Pilihan parfum dengan karakter maskulin dan tegas.",
        image: img("photo-1507003211169-0a1dd7228f2d")
        // Sophisticated editorial male portrait
      }
    ]
  },
  // Pertanyaan 7: Range Usia
  {
    id: "age_range",
    type: "text-single",
    kicker: "KENALI SEDIKIT TENTANGMU",
    title: "Kamu masuk range usia yang mana?",
    subtitle: "Jawaban ini membantu ABNA memahami pilihan aroma yang paling banyak disukai di setiap usia.",
    options: [
      { id: "under_18", label: "Di bawah 18 tahun" },
      { id: "18_24", label: "18-24 tahun" },
      { id: "25_34", label: "25-34 tahun" },
      { id: "35_44", label: "35-44 tahun" },
      { id: "45_plus", label: "45 tahun ke atas" }
    ]
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
      { id: "other", label: "Lainnya" }
    ]
  },
  // Pertanyaan 9: Range Harga Nyaman
  {
    id: "price_range",
    type: "text-single",
    kicker: "SESUAIKAN PILIHANMU",
    title: "Untuk parfum ukuran 30ml, kamu nyaman di range harga berapa?",
    subtitle: "Pilih kisaran harga yang paling sesuai dengan budget kamu saat membeli parfum ukuran 30ml.",
    options: [
      { id: "under_50k", label: "Di bawah Rp50.000" },
      { id: "50k_100k", label: "Rp50.000 - Rp100.000" },
      { id: "100k_150k", label: "Rp100.000 - Rp150.000" },
      { id: "150k_200k", label: "Rp150.000 - Rp200.000" },
      { id: "200k_300k", label: "Rp200.000 - Rp300.000" },
      { id: "above_300k", label: "Di atas Rp300.000" },
      { id: "depends_on_scent", label: "Tergantung kalau aromanya cocok" }
    ]
  }
];
function Header({ step, total, onClose, showStep = true }) {
  const progress = Math.min(100, Math.max(0, step / total * 100));
  const stepLabel = step <= 0 ? null : step > total ? `Pertanyaan ${total} / ${total}` : `Pertanyaan ${step} / ${total}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-5 pb-4 sm:px-8 md:px-12 md:pt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl tracking-tight text-foreground sm:text-2xl", children: "ABNA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-sm font-normal italic tracking-widest text-[var(--emerald-sig)] sm:text-base", children: "Signature" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] font-semibold tracking-[0.18em] text-[var(--sand-deep)] uppercase", children: "ABNA PICKS · Konsultasi Aroma" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 sm:gap-6", children: [
        showStep && stepLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            className: "rounded-none border border-border/90 bg-card px-3 py-1 font-body text-[11px] font-semibold tracking-wider text-muted-foreground shadow-xs",
            children: stepLabel
          },
          stepLabel
        ),
        onClose && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "flex min-h-[40px] min-w-[40px] items-center justify-center rounded-none border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground shadow-xs transition-all hover:bg-muted hover:text-foreground cursor-pointer",
            "aria-label": "Selesai atau Bersihkan Sesi",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-block mr-1.5 text-[11px] uppercase tracking-wider", children: "Selesai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", strokeWidth: 2 })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] w-full bg-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)]",
        initial: false,
        animate: { width: `${progress}%` },
        transition: { duration: 0.4, ease: "easeOut" }
      }
    ) })
  ] });
}
const abnaLogo = "/assets/abna-logo-BYeMfUIR.png";
const hudVisual = "/assets/imgbawah-DyID1hnm.jpeg";
function WelcomeScreen({ onBegin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [activeModal, setActiveModal] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-svh h-svh w-screen flex-col justify-between overflow-hidden select-none bg-[#020806] text-[#fffcf5] p-0 md:p-3 lg:p-5 xl:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-1 h-full w-full flex-col justify-between overflow-y-auto lg:overflow-hidden scrollbar-hide rounded-none border-0 md:rounded-2xl lg:rounded-3xl md:border md:border-[var(--sand-gold)]/20 bg-[#030d0a] shadow-none md:shadow-2xl md:shadow-black/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            disablePictureInPicture: true,
            className: "h-full w-full object-cover scale-105 opacity-80 transition-opacity duration-1000",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: "/video-background-landing.mp4", type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#07241c]/30 mix-blend-multiply" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#020806]/85 via-transparent to-[#020907]/90" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#020806]/95 via-[#020806]/75 to-transparent lg:w-[62%]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 left-[15%] h-[380px] w-[380px] rounded-full bg-[var(--terracotta)]/10 blur-3xl pointer-events-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-20 w-full px-6 pt-6 pb-4 sm:px-10 md:px-12 lg:px-14 xl:px-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
            className: "flex flex-col items-start gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: abnaLogo,
                  alt: "ABNA Logo",
                  className: "h-7 w-auto object-contain sm:h-8 md:h-9 drop-shadow-md"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[8.5px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase sm:text-[9.5px]", children: "ABNA PICKS · SCENT DISCOVERY" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.nav,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
            className: "hidden items-center gap-8 md:flex",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs font-semibold tracking-wider text-[var(--sand-gold)] border-b-2 border-[var(--sand-gold)] pb-0.5", children: "Beranda" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModal("about"),
                  className: "font-body text-xs font-medium tracking-wider text-[#fffcf5]/75 transition-colors hover:text-[#fffcf5] cursor-pointer",
                  children: "Tentang ABNA PICKS"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModal("how"),
                  className: "font-body text-xs font-medium tracking-wider text-[#fffcf5]/75 transition-colors hover:text-[#fffcf5] cursor-pointer",
                  children: "Cara Kerja"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/30 bg-[#061e17]/65 px-3.5 py-1.5 text-[10px] font-medium tracking-wider text-[var(--sand-gold)] backdrop-blur-md shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)] ring-2 ring-[var(--sand-gold)] animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "IN-STORE DISCOVERY" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
            className: "flex items-center gap-3 md:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileMenuOpen(true),
                className: "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#061e17]/70 text-[#fffcf5] backdrop-blur-md cursor-pointer shadow-md",
                "aria-label": "Buka Menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
              }
            )
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 w-full flex-1 flex flex-col justify-end px-6 pt-4 pb-10 sm:px-10 md:px-12 lg:px-14 xl:px-16 lg:pb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start lg:col-span-7 xl:col-span-7 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
              className: "font-body text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] text-[var(--sand-gold)] uppercase opacity-90",
              children: "✦ ABNA PICKS · SCENT DISCOVERY"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
              className: "mt-4 text-left font-display font-black tracking-tight text-[#fffcf5] text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "CUMA 1 MENIT" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "KETEMU" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: "PARFUM ANDALANMU." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
              className: "mt-5 max-w-[500px] text-left font-body text-sm sm:text-base md:text-[17px] leading-[1.5] text-[#fffcf5]/85",
              children: [
                "Mulai kosultasi aroma singkat dan temukan parfum ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ABNA" }),
                " yang paling cocok dengan karakter, selera, dan kebutuhanmu"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] },
              className: "mt-7 flex flex-wrap items-center gap-3 sm:gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    onClick: onBegin,
                    whileHover: { scale: 1.025 },
                    whileTap: { scale: 0.975 },
                    className: "group relative inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#fffcf5] px-7 sm:px-8 text-xs sm:text-sm font-semibold tracking-wide text-[#020806] shadow-xl shadow-black/40 transition-all hover:bg-white hover:shadow-2xl cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mulai Konsultasi" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ArrowUpRight,
                        {
                          className: "h-4 w-4 text-[#020806] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          strokeWidth: 2.5
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    onClick: () => setActiveModal("how"),
                    whileHover: { scale: 1.025 },
                    whileTap: { scale: 0.975 },
                    className: "group inline-flex h-[48px] sm:h-[52px] items-center justify-center gap-2 rounded-full border border-white/20 bg-[#061e17]/50 px-6 sm:px-7 text-xs sm:text-sm font-medium tracking-wide text-[#fffcf5] backdrop-blur-md transition-all hover:border-[var(--sand-gold)]/50 hover:bg-[#061e17]/80 hover:text-[var(--sand-gold)] cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cara Kerja" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 fill-current opacity-75 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] },
              className: "mt-6 sm:mt-7 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-[12px] font-medium tracking-wide text-[#fffcf5]/70",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)]", children: "✦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Personal Match" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-white/20", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)]", children: "★" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Koleksi Aroma ABNA" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-white/20", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)]", children: "🏪" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coba Tester Langsung di Store" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start lg:justify-end items-end lg:col-span-5 xl:col-span-5 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] },
            className: "relative w-full max-w-[380px] rounded-2xl border border-white/[0.12] bg-[#060f0c]/55 p-4 sm:p-5 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--terracotta)] opacity-75" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[var(--emerald-sig)] ring-1 ring-[var(--sand-gold)]/60" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#fffcf5]/85 uppercase", children: "YANG AKAN KAMU DAPATKAN" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] sm:text-[11px] font-medium tracking-widest text-[#fffcf5]/60 uppercase", children: "ABNA · PICKS" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3.5 aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/40 border border-white/[0.08]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: hudVisual,
                    alt: "ABNA Olfactive Visual",
                    className: "h-full w-full object-cover object-center brightness-95 contrast-105",
                    loading: "eager"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#020806]/25" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#060f0c] via-transparent to-transparent opacity-85" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80", children: "Rekomendasi parfum utama" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)] text-xs", children: "✦" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80", children: "Persentase Kecocokan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)] text-xs", children: "✦" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80", children: "Alasan kecocokan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)] text-xs", children: "✦" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 border border-white/[0.04]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[11px] font-medium tracking-wide text-[#fffcf5]/80", children: "Pilihan alternatif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-gold)] text-xs", children: "✦" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 border-t border-white/[0.08] pt-2.5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs font-semibold text-[#fffcf5]", children: "3 Kurasi Aroma Personal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] text-[#fffcf5]/60", children: "Disesuaikan dengan suasana & momenmu" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[9px] sm:text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase", children: "ABNA PICKS" })
              ] })
            ]
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex flex-col justify-between bg-[#04120e]/95 p-6 backdrop-blur-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: abnaLogo, alt: "ABNA Logo", className: "h-7 w-auto object-contain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[8.5px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "ABNA PICKS · SCENT DISCOVERY" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileMenuOpen(false),
                className: "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#fffcf5]",
                "aria-label": "Tutup Menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "my-auto flex flex-col gap-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMobileMenuOpen(false);
                },
                className: "font-display text-2xl text-[var(--sand-gold)]",
                children: "Beranda"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMobileMenuOpen(false);
                  setActiveModal("about");
                },
                className: "font-display text-2xl text-[#fffcf5]/85 hover:text-[#fffcf5]",
                children: "Tentang ABNA PICKS"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMobileMenuOpen(false);
                  setActiveModal("how");
                },
                className: "font-display text-2xl text-[#fffcf5]/85 hover:text-[#fffcf5]",
                children: "Cara Kerja"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setMobileMenuOpen(false);
                onBegin();
              },
              className: "inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--emerald-sig)] py-4 text-xs font-semibold tracking-widest text-[#fffcf5]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MULAI KONSULTASI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: activeModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
        onClick: () => setActiveModal(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.94, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.94, opacity: 0 },
            onClick: (e) => e.stopPropagation(),
            className: "relative w-full max-w-lg rounded-2xl border border-[var(--sand-gold)]/30 bg-[#061f18] p-6 text-[#fffcf5] shadow-2xl sm:p-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveModal(null),
                  className: "absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#fffcf5]/70 hover:text-white",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              ),
              activeModal === "about" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-[var(--sand-gold)]/15 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "TENTANG ABNA PICKS" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display mt-3 text-2xl text-[#fffcf5]", children: "Oracle Olfaktif Pribadimu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm leading-relaxed text-[#fffcf5]/80", children: [
                  "ABNA PICKS adalah pengalaman konsultasi aroma digital resmi dari",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ABNA Signature" }),
                  ". Menggabungkan model profil olfaktif 10-dimensi dengan kecerdasan naratif, ABNA PICKS menerjemahkan preferensi suasana, karakter, dan momen menjadi 3 rekomendasi parfum terbaik."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setActiveModal(null);
                      onBegin();
                    },
                    className: "inline-flex items-center gap-2 rounded-xl bg-[var(--emerald-sig)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emerald-deep)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mulai Sekarang" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                ) })
              ] }),
              activeModal === "how" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-[var(--sand-gold)]/15 px-3 py-1 text-[10px] font-semibold tracking-widest text-[var(--sand-gold)] uppercase", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CARA KERJA" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display mt-3 text-2xl text-[#fffcf5]", children: "7 Pertanyaan Ringan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-xs text-[#fffcf5]/85", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "01" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Karakter Aroma:" }),
                      " Kesan diri yang ingin ditampilkan."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "02" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Jenis Aroma Favorit:" }),
                      " Keluarga aroma yang paling disukai."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "03" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Suasana Aroma:" }),
                      " Nuansa lingkungan yang terasa paling nyaman."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "04" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Momen Pemakaian:" }),
                      " Kebutuhan aktivitas pemakaian harian."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "05" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Intensitas Aroma:" }),
                      " Tingkat kekuatan pancaran wangi."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "06" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Range Usia:" }),
                      " Segmentasi preferensi usia (opsional)."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 rounded-lg bg-white/5 p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-[var(--sand-gold)]", children: "07" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Range Harga Nyaman:" }),
                      " Kisaran budget nyaman 30ml (opsional)."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setActiveModal(null);
                      onBegin();
                    },
                    className: "inline-flex items-center gap-2 rounded-xl bg-[var(--emerald-sig)] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[var(--emerald-deep)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mulai Konsultasi" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                ) })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
const TILTS = [-3.5, 1.8, -1.8, 3.5, -2.5, 2, -3];
const OFFSETS_Y = [18, -14, 28, -8, 20, -10, 24];
function Polaroid({ index, label, caption, image, selected, onClick }) {
  const tilt = TILTS[index % TILTS.length];
  const offsetY = OFFSETS_Y[index % OFFSETS_Y.length];
  const catalogNumber = String(index + 1).padStart(3, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      onClick,
      initial: { opacity: 0, y: offsetY + 16, rotate: tilt },
      animate: { opacity: 1, y: selected ? 0 : offsetY, rotate: selected ? 0 : tilt },
      transition: {
        duration: 0.45,
        delay: 0.04 + index * 0.03,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: {
        y: offsetY - 16,
        rotate: 0,
        scale: 1.025,
        transition: { duration: 0.25, ease: "easeOut" }
      },
      whileTap: { scale: 0.985 },
      style: { transformOrigin: "center" },
      className: `group relative flex w-full flex-col overflow-hidden rounded-none bg-white p-2.5 sm:p-3 pb-5 sm:pb-6 text-left transition-all duration-300 cursor-pointer ${selected ? "border-2 border-[var(--emerald-sig)] ring-2 ring-[var(--emerald-sig)]/20 shadow-[0_20px_45px_rgba(0,0,0,0.18)]" : "border border-black/[0.04] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_8px_10px_-6px_rgba(0,0,0,0.06)] hover:border-[var(--emerald-sig)]/60 hover:shadow-[0_22px_45px_rgba(0,0,0,0.18)]"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] w-full overflow-hidden rounded-none bg-[#181818]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image,
              alt: label,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-102"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 border border-black/5" }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { duration: 0.2, ease: "easeOut" },
              className: "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-none bg-[var(--emerald-sig)] text-[#fffcf5] shadow-xs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5", strokeWidth: 2.5 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between pt-3 sm:pt-3.5 px-0.5 sm:px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm sm:text-base md:text-[17px] font-black tracking-tight text-[#0a0a0a] uppercase leading-none", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[var(--sand-deep)] shrink-0", children: catalogNumber })
            ] }),
            caption && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-body text-[11px] sm:text-xs leading-relaxed text-muted-foreground break-words", children: caption })
          ] }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 2 },
              animate: { opacity: 1, y: 0 },
              className: "mt-2.5 inline-flex items-center gap-1.5 rounded-none border-l-2 border-[var(--emerald-sig)] bg-[var(--sand-gold)]/15 px-2 py-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5 text-[var(--emerald-sig)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[9px] sm:text-[9.5px] font-bold tracking-widest text-[var(--emerald-sig)] uppercase", children: "Pilihanmu" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EnergySlider({
  min,
  max,
  value,
  onChange,
  labels,
  valueLabels
}) {
  const [hover, setHover] = reactExports.useState(false);
  const pct = Math.min(100, Math.max(0, (value - min) / (max - min) * 100));
  const LEVEL_DESCRIPTIONS = {
    1: {
      subtitle: "Lembut & Intim",
      nuance: "Aroma bisikan halus yang hanya tercium saat berada sangat dekat. Sangat personal, elegan, dan menenangkan."
    },
    2: {
      subtitle: "Halus & Personal",
      nuance: "Aroma yang nyaman menemani rutinitas harian dengan kehadiran yang santun dan tidak mencolok."
    },
    3: {
      subtitle: "Seimbang & Serbaguna",
      nuance: "Keseimbangan ideal antara kesegaran dan daya tahan. Sempurna untuk aktivitas kantor, harian, dan pertemuan."
    },
    4: {
      subtitle: "Tegas & Berkarakter",
      nuance: "Meninggalkan jejak aroma (sillage) yang memikat dan berkesan saat Anda melintas."
    },
    5: {
      subtitle: "Semerbak & Kuat",
      nuance: "Karakter mewah dan semerbak yang percaya diri, langsung mengisi ruangan dan bertahan sepanjang hari hingga malam."
    }
  };
  const currentLevel = LEVEL_DESCRIPTIONS[value] || {
    subtitle: valueLabels[value] || `Level ${value}`,
    nuance: "Tingkat kekuatan aroma yang disesuaikan dengan preferensimu."
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-2xl px-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.25 },
        className: "relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 text-center shadow-card sm:p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--emerald-sig)]/5 blur-2xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/10 px-3.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tingkat Pancaran & Kekuatan Aroma" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl", children: valueLabels[value]?.toUpperCase() || `LEVEL ${value}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif mt-1 text-lg font-normal italic text-[var(--emerald-sig)] sm:text-xl", children: currentLevel.subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm", children: currentLevel.nuance })
        ]
      },
      value
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-5 gap-2 sm:gap-3", children: Array.from({ length: max - min + 1 }).map((_, i) => {
      const stepVal = min + i;
      const isSelected = stepVal === value;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(stepVal),
          className: `flex min-h-[56px] min-w-[48px] flex-col items-center justify-center rounded-xl border p-2 transition-all duration-200 cursor-pointer ${isSelected ? "border-[var(--emerald-sig)] bg-[var(--emerald-sig)] text-white shadow-md ring-2 ring-[var(--emerald-sig)]/30" : "border-border bg-card text-foreground hover:border-[var(--emerald-sig)]/40 hover:bg-muted/40"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg sm:text-xl", children: stepVal }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[9px] font-medium tracking-tight line-clamp-1 ${isSelected ? "text-white/90 font-semibold" : "text-muted-foreground"}`,
                children: stepVal === 1 ? "Intim" : stepVal === 3 ? "Seimbang" : stepVal === 5 ? "Semerbak" : `Lv ${stepVal}`
              }
            )
          ]
        },
        stepVal
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-2.5 w-full rounded-full bg-border/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--sand-gold)] via-[var(--emerald-sig)] to-[var(--emerald-deep)]",
              animate: { width: `${pct}%` },
              transition: { duration: 0.2, ease: "easeOut" }
            }
          ),
          Array.from({ length: max - min + 1 }).map((_, i) => {
            const notchPct = i / (max - min) * 100;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-1/2 h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card border border-border/80 shadow-2xs",
                style: { left: `${notchPct}%` }
              },
              i
            );
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--emerald-sig)] shadow-md ring-2 ring-[var(--emerald-sig)]/20",
              style: { left: `${pct}%` },
              animate: { scale: hover ? 1.2 : 1 },
              transition: { duration: 0.15 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min,
            max,
            value,
            onChange: (e) => onChange(parseInt(e.target.value, 10)),
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false),
            onTouchStart: () => setHover(true),
            onTouchEnd: () => setHover(false),
            "aria-label": "Tingkat Pancaran dan Kekuatan Aroma",
            className: "absolute inset-0 h-full w-full min-h-[48px] cursor-pointer opacity-0"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-[11px] font-semibold tracking-wider text-muted-foreground uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          labels[0],
          " (Intim)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: labels[1] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          labels[2],
          " (Semerbak)"
        ] })
      ] })
    ] })
  ] });
}
function isCompleted(step, answer) {
  if (step.type === "slider") {
    return typeof answer === "number" && answer >= step.min && answer <= step.max;
  }
  if (step.type === "image-single") return typeof answer === "string" && answer.trim().length > 0;
  if (step.type === "image-multi") return Array.isArray(answer) && answer.length > 0;
  if (step.type === "text-single") {
    return typeof answer === "string" && answer.trim().length > 0;
  }
  return false;
}
function QuizScreen({
  step,
  index,
  total,
  answer,
  onAnswer,
  onBack,
  onNext,
  isLast
}) {
  const [customOccupation, setCustomOccupation] = reactExports.useState("");
  const isCustomOccupationSelected = step.id === "occupation" && (answer === "other" || typeof answer === "string" && "options" in step && !step.options.some((o) => o.id === answer && o.id !== "other"));
  reactExports.useEffect(() => {
    if (step.id === "occupation" && "options" in step) {
      if (typeof answer === "string" && !step.options.some((o) => o.id === answer)) {
        setCustomOccupation(answer);
      } else if (answer === "other") {
        setCustomOccupation("");
      }
    }
  }, [step, answer]);
  const canNext = isCompleted(step, answer);
  const STEP_CATEGORIES = {
    mood: "Karakter Aroma",
    scent_family: "Jenis Aroma Favorit",
    atmosphere: "Suasana Aroma",
    occasion: "Momen Pemakaian",
    intensity: "Intensitas Aroma",
    gender: "Profil Pembeli",
    age_range: "Range Usia",
    occupation: "Aktivitas Utama",
    price_range: "Range Harga Nyaman"
  };
  const categoryName = STEP_CATEGORIES[step.id] || "Preferensi";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-1 flex-col px-4 pt-6 pb-36 sm:px-8 md:px-12 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] font-semibold tracking-wider text-muted-foreground uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-medium text-[var(--sand-deep)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[var(--sand-deep)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Pertanyaan ",
            index + 1,
            " dari ",
            total,
            " · ",
            categoryName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] font-bold text-foreground", children: [
          Math.round((index + 1) / total * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 w-full overflow-hidden rounded-none bg-border/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "h-full rounded-none bg-gradient-to-r from-[var(--sand-gold)] to-[var(--emerald-sig)]",
          initial: false,
          animate: { width: `${(index + 1) / total * 100}%` },
          transition: { duration: 0.4, ease: "easeOut" }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "mx-auto mt-6 max-w-3xl text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[var(--sand-deep)] uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step.kicker }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black tracking-[-0.035em] leading-[0.95] text-balance text-foreground", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-balance font-body text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal", children: step.subtitle })
        ]
      },
      step.id + "-title"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex-1 md:mt-10", children: [
      step.type === "slider" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-2xl py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnergySlider,
        {
          min: step.min,
          max: step.max,
          value: typeof answer === "number" ? answer : 3,
          onChange: (v) => onAnswer(v),
          labels: step.labels,
          valueLabels: step.valueLabels
        }
      ) }),
      step.type === "image-single" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `mx-auto grid grid-cols-2 gap-4 sm:gap-6 lg:gap-7 py-6 sm:py-8 ${step.options.length === 2 ? "max-w-2xl md:grid-cols-2 lg:grid-cols-2" : step.options.length === 3 ? "max-w-4xl md:grid-cols-3 lg:grid-cols-3" : step.options.length === 6 ? "max-w-5xl md:grid-cols-3 lg:grid-cols-3" : "max-w-6xl md:grid-cols-2 lg:grid-cols-4"}`,
          children: step.options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Polaroid,
            {
              index: i,
              label: opt.label,
              caption: opt.caption,
              image: opt.image || "",
              number: String(i + 1).padStart(2, "0"),
              selected: answer === opt.id,
              onClick: () => onAnswer(opt.id)
            },
            opt.id
          ))
        }
      ),
      step.type === "image-multi" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-6 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7", children: step.options.map((opt, i) => {
        const arr = answer ?? [];
        const selected = arr.includes(opt.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Polaroid,
          {
            index: i,
            label: opt.label,
            caption: opt.caption,
            image: opt.image || "",
            number: String(i + 1).padStart(2, "0"),
            selected,
            onClick: () => onAnswer(selected ? arr.filter((x) => x !== opt.id) : [...arr, opt.id])
          },
          opt.id
        );
      }) }),
      step.type === "text-single" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3", children: step.options.map((opt, i) => {
          const isSelected = step.id === "occupation" && opt.id === "other" ? isCustomOccupationSelected : answer === opt.id;
          const handleSelect = () => {
            if (step.id === "occupation" && opt.id === "other") {
              onAnswer(customOccupation.trim() || "other");
            } else {
              onAnswer(opt.id);
            }
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: handleSelect,
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.03, duration: 0.25 },
              whileHover: { y: -2 },
              whileTap: { scale: 0.99 },
              className: `group relative flex min-h-[52px] items-center justify-between rounded-none p-4 text-left transition-all duration-200 cursor-pointer ${isSelected ? "border-2 border-[var(--emerald-sig)] bg-[#fcfaf5] ring-1 ring-[var(--emerald-sig)] shadow-md" : "border border-border/90 bg-card shadow-xs hover:border-[var(--emerald-sig)]/60 hover:shadow-md hover:bg-[#fffcf5]"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-none font-mono text-[10px] font-semibold tracking-wider ${isSelected ? "bg-[var(--emerald-sig)] text-white" : "bg-muted/70 text-foreground"}`,
                      children: String(i + 1).padStart(2, "0")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-body text-xs sm:text-sm ${isSelected ? "font-semibold text-foreground" : "font-medium text-foreground"}`,
                      children: opt.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-none transition-all ${isSelected ? "bg-[var(--emerald-sig)] text-white shadow-xs" : "border border-border/80 group-hover:border-foreground/40 text-transparent"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 2.5 })
                  }
                )
              ]
            },
            opt.id
          );
        }) }),
        step.id === "occupation" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isCustomOccupationSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0, y: 8 },
            animate: { opacity: 1, height: "auto", y: 0 },
            exit: { opacity: 0, height: 0, y: -8 },
            transition: { duration: 0.3 },
            className: "overflow-hidden pt-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-none border border-[var(--sand-gold)]/50 bg-[#fffcf5] p-4 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "custom-occupation-input",
                  className: "block text-[11px] font-bold tracking-[0.16em] text-[var(--sand-deep)] uppercase",
                  children: "Masukkan Pekerjaan Kamu"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "custom-occupation-input",
                  type: "text",
                  value: customOccupation,
                  onChange: (e) => {
                    const val = e.target.value;
                    setCustomOccupation(val);
                    onAnswer(val.trim() ? val : "other");
                  },
                  placeholder: "Contoh: Arsitek, Dokter, Freelancer, Seniman...",
                  autoFocus: true,
                  className: "mt-2 w-full rounded-none border border-border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--emerald-sig)] focus:outline-none focus:ring-1 focus:ring-[var(--emerald-sig)]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[10px] text-muted-foreground", children: "Ketik nama pekerjaan/aktivitasmu untuk melanjutkan." })
            ] })
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.4 },
        className: "fixed bottom-0 left-0 right-0 z-30 border-t border-border/80 bg-background/95 px-4 py-3.5 backdrop-blur-md sm:px-8 md:px-12",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-none border border-border/80 px-4 py-2.5 text-xs font-semibold tracking-wider text-muted-foreground transition-all hover:bg-card hover:text-foreground cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", strokeWidth: 2 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "KEMBALI" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden font-body text-xs font-medium text-muted-foreground sm:block", children: step.type === "image-multi" ? "Pilih satu atau beberapa jenis aroma yang paling dekat dengan seleramu" : step.type === "slider" ? "Geser atau sentuh angka untuk memilih tingkat kekuatan aroma" : "Pilih opsi jawaban Anda untuk melanjutkan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: onNext,
              disabled: !canNext,
              whileHover: canNext ? { scale: 1.015 } : void 0,
              whileTap: canNext ? { scale: 0.985 } : void 0,
              className: `flex min-h-[48px] items-center justify-center gap-2.5 rounded-none px-7 py-3 text-xs font-semibold tracking-[0.14em] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 ${isLast ? "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-md shadow-[var(--emerald-sig)]/25 hover:bg-[var(--emerald-deep)] sm:text-xs" : "bg-[var(--emerald-sig)] text-[#fffcf5] shadow-sm shadow-[var(--emerald-sig)]/20 hover:bg-[var(--emerald-deep)] sm:text-xs"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLast ? "TEMUKAN PARFUMKU" : "SELANJUTNYA" }),
                isLast ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[var(--sand-gold)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", strokeWidth: 2.5 })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
const STAGES = [
  "Membaca selera wangimu...",
  "Mencocokkan dengan koleksi ABNA...",
  "Memilih rekomendasi terbaik...",
  "Hasilmu hampir siap..."
];
function LoadingScreen() {
  const [stage, setStage] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 750);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "aura-orb absolute inset-0 rounded-full",
          animate: { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute inset-6 rounded-full border border-foreground/15",
          animate: { rotate: 360 },
          transition: { duration: 18, repeat: Infinity, ease: "linear" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute inset-12 rounded-full border border-[var(--sand-gold)]/30",
          animate: { rotate: -360 },
          transition: { duration: 12, repeat: Infinity, ease: "linear" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl italic text-[var(--sand-gold)]", children: "✦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 font-display text-sm tracking-[0.25em] text-foreground uppercase", children: "ABNA" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mt-8 max-w-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold tracking-[0.25em] text-[var(--sand-deep)] uppercase", children: "SEBENTAR YA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-2 text-2xl tracking-tight text-foreground sm:text-3xl", children: "Kami Lagi Pilihkan Parfum Buat Kamu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs sm:text-sm text-muted-foreground", children: "Jawabanmu sedang dicocokkan dengan aroma yang paling pas dari koleksi ABNA." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 3 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
        className: "mt-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5 shadow-sm backdrop-blur-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sand-gold)] animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-foreground/80", children: STAGES[stage] })
        ]
      },
      stage
    )
  ] });
}
function AbnaProductCard({
  rec,
  isHero = false,
  onCobaTester,
  isSpeaking = false,
  imageUrl,
  variantName,
  size,
  priceFormatted,
  availabilityStatus
}) {
  const brandName = rec.house || "ABNA PARFUM";
  const displayTitle = variantName || rec.name;
  const subtitle = size ? `${rec.category} · ${size}` : rec.category;
  const hasTopNotes = Array.isArray(rec.top_notes) && rec.top_notes.length > 0;
  const hasMiddleNotes = Array.isArray(rec.middle_notes) && rec.middle_notes.length > 0;
  const hasBaseNotes = Array.isArray(rec.base_notes) && rec.base_notes.length > 0;
  const hasPyramid = hasTopNotes || hasMiddleNotes || hasBaseNotes;
  const hasProjection = Boolean(rec.projection);
  const hasLongevity = Boolean(rec.longevity);
  const hasMetrics = hasProjection || hasLongevity;
  const tags = [...rec.mood_tags || [], ...rec.occasions || []].filter(Boolean);
  const hasTags = tags.length > 0;
  if (isHero) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        className: "relative overflow-hidden rounded-2xl border border-[var(--sand-gold)]/30 bg-card p-0 shadow-[0_20px_48px_-12px_rgba(11,72,57,0.12)] transition-shadow duration-300 hover:shadow-[0_24px_56px_-12px_rgba(11,72,57,0.18)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between border-b border-[var(--sand-gold)]/25 bg-[#020806] px-6 py-4 text-[#fffcf5] sm:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sand-gold)] font-display text-[11px] font-bold text-[#020806]", children: "01" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[var(--sand-gold)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#fffcf5] uppercase", children: "01 — SIGNATURE MATCH" })
              ] })
            ] }),
            typeof rec.match_percent === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-black tracking-tight text-[var(--sand-gold)] sm:text-4xl", children: [
                rec.match_percent,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-[0.18em] text-[#fffcf5]/80 uppercase", children: "COCOK" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 md:col-span-7", children: [
              imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: displayTitle,
                  className: "h-full w-full object-cover",
                  loading: "lazy"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-gradient-to-br from-[#020806] via-[#07241c] to-[#020806] px-6 py-5 text-[#fffcf5] shadow-inner", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[var(--sand-gold)]/10 blur-2xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold tracking-[0.25em] text-[var(--sand-gold)] uppercase", children: "ABNA SIGNATURE FORMULATION" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-sm italic text-[#fffcf5]/90", children: [
                      rec.category,
                      " · Curated Selection"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/10 font-serif text-sm font-semibold tracking-wider text-[var(--sand-gold)]", children: "A" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-[0.24em] text-[var(--sand-deep)] uppercase", children: brandName }),
                  priceFormatted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-[var(--sand-gold)]/30 bg-[var(--sand-gold)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--emerald-sig)]", children: priceFormatted })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display mt-1.5 text-3xl font-black tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[40px] leading-[1.05]", children: displayTitle }),
                rec.category && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-serif text-base italic text-muted-foreground", children: subtitle })
              ] }),
              rec.aura && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/35 bg-[var(--sand-gold)]/10 px-3.5 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--sand-gold)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] text-[var(--emerald-sig)] uppercase", children: rec.aura })
              ] }),
              rec.story && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l-2 border-[var(--sand-gold)]/60 pl-4 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-base italic leading-relaxed text-foreground/85 sm:text-lg", children: [
                "“",
                rec.story,
                "”"
              ] }) }),
              rec.why_match && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl border border-[var(--sand-gold)]/35 bg-gradient-to-br from-[var(--sand-gold)]/10 via-[var(--sand-gold)]/5 to-transparent p-5 sm:p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--emerald-sig)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-[0.22em] text-[var(--emerald-sig)] uppercase", children: "KENAPA COCOK BUAT KAMU" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm leading-relaxed text-foreground/90 sm:text-[15px] font-normal", children: rec.why_match })
              ] }),
              hasPyramid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-xl border border-[var(--sand-gold)]/25 bg-[var(--ivory)]/60 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-[var(--sand-gold)]/20 pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "OLFACTIVE PYRAMID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-xs italic text-muted-foreground", children: "Detail Catatan Aroma" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-1", children: [
                  hasTopNotes && /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialPyramidTier, { tier: "TOP", notes: rec.top_notes }),
                  hasMiddleNotes && /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialPyramidTier, { tier: "HEART", notes: rec.middle_notes }),
                  hasBaseNotes && /* @__PURE__ */ jsxRuntimeExports.jsx(EditorialPyramidTier, { tier: "BASE", notes: rec.base_notes })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between space-y-6 md:col-span-5 md:border-l md:border-[var(--sand-gold)]/20 md:pl-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                hasMetrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "PERFORMANCE METRICS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    hasProjection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[var(--sand-gold)]/20 bg-background/80 p-3.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tracking-wider text-muted-foreground uppercase", children: "Semerbak" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display mt-1 text-sm font-bold text-foreground sm:text-base", children: rec.projection })
                    ] }),
                    hasLongevity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[var(--sand-gold)]/20 bg-background/80 p-3.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold tracking-wider text-muted-foreground uppercase", children: "Ketahanan" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display mt-1 text-sm font-bold text-foreground sm:text-base", children: rec.longevity })
                    ] })
                  ] })
                ] }),
                hasTags && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "KARAKTER & MOMEN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.slice(0, 6).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "rounded-lg border border-[var(--sand-gold)]/25 bg-background px-3 py-1 font-serif text-xs italic text-foreground shadow-xs",
                      children: t
                    },
                    t
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[var(--sand-gold)]/25 bg-[var(--ivory)]/40 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest text-[var(--sand-deep)] uppercase", children: "STORE TESTER STATUS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] font-semibold text-[var(--emerald-sig)]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)]" }),
                    "Tersedia di Store"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs leading-relaxed text-muted-foreground", children: "Tunjukkan nama parfum ini kepada Beauty Advisor ABNA untuk mencoba aroma langsung di gerai." }),
                onCobaTester && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    onClick: onCobaTester,
                    whileHover: { scale: 1.015 },
                    whileTap: { scale: 0.985 },
                    "aria-label": `Minta tester untuk ${displayTitle}`,
                    className: `mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-center transition-all cursor-pointer ${isSpeaking ? "bg-[var(--terracotta)] text-white shadow-md ring-2 ring-[var(--sand-gold)]/40" : "border border-[var(--sand-gold)]/40 bg-background text-foreground hover:bg-[var(--emerald-sig)] hover:text-white hover:border-[var(--emerald-sig)]"}`,
                    children: [
                      isSpeaking ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4 text-[var(--sand-gold)] animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-[var(--sand-deep)]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-wider uppercase", children: isSpeaking ? "Memanggil Staff..." : "Tes Aroma Varian Ini" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    );
  }
  const altRankLabel = rec.rank === 2 ? "02 — LEBIH FRESH" : rec.rank === 3 ? "03 — LEBIH MANIS" : `0${rec.rank} — ALTERNATIF`;
  const altSubtitle = rec.rank === 2 ? "Untuk kamu yang ingin karakter serupa, tapi dengan kesan yang lebih segar dan ringan." : rec.rank === 3 ? "Untuk kamu yang ingin aroma lebih lembut, manis, dan nyaman dipakai." : rec.why_match;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      whileHover: { y: -8, scale: 1.015 },
      whileTap: { scale: 0.985 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      className: "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--sand-gold)]/30 bg-card p-6 shadow-[0_12px_32px_-8px_rgba(11,72,57,0.08)] transition-all duration-300 hover:border-[var(--sand-gold)]/60 hover:shadow-[0_20px_44px_-10px_rgba(11,72,57,0.16)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--sand-gold)]/20 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: displayTitle,
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-[var(--sand-gold)]/20 pb-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-[var(--sand-gold)] font-display text-[10px] font-bold text-[#020806]", children: [
                "0",
                rec.rank
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase", children: altRankLabel })
            ] }) }),
            typeof rec.match_percent === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl font-black tracking-tight text-[var(--sand-gold)] sm:text-3xl", children: [
                rec.match_percent,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase", children: "COCOK" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase", children: brandName }),
              priceFormatted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-[var(--sand-gold)]/25 bg-[var(--sand-gold)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--emerald-sig)]", children: priceFormatted })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl", children: displayTitle }),
            rec.category && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-serif text-sm italic text-muted-foreground", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l-2 border-[var(--sand-gold)]/50 pl-3 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif text-xs italic leading-relaxed text-foreground/80 sm:text-[13px]", children: [
            "“",
            altSubtitle,
            "”"
          ] }) }),
          hasMetrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 rounded-xl border border-[var(--sand-gold)]/20 bg-[var(--ivory)]/40 p-2.5 text-xs", children: [
            hasProjection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold tracking-wider text-muted-foreground uppercase", children: "Semerbak:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-bold text-foreground sm:text-sm", children: rec.projection })
            ] }),
            hasLongevity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold tracking-wider text-muted-foreground uppercase", children: "Ketahanan:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-bold text-foreground sm:text-sm", children: rec.longevity })
            ] })
          ] }),
          hasTopNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 pt-1 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[9px] font-bold tracking-[0.2em] text-[var(--sand-deep)] uppercase", children: "TOP:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-xs italic text-foreground/85", children: rec.top_notes.slice(0, 3).join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 border-t border-[var(--sand-gold)]/20 pt-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-medium text-[var(--emerald-sig)] text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--emerald-sig)]" }),
            "Tersedia Tester di Store"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium tracking-wide text-muted-foreground uppercase", children: rec.category })
        ] }) })
      ]
    }
  );
}
function EditorialPyramidTier({
  tier,
  notes
}) {
  if (!Array.isArray(notes) || notes.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 shrink-0 font-sans text-[10px] font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase", children: tier }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-1.5 gap-y-0.5 font-serif text-sm italic text-foreground sm:text-[15px]", children: notes.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      n,
      i < notes.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--sand-deep)]/60 font-sans", children: " ·" })
    ] }, n)) })
  ] });
}
function ResultsScreen({ recommendations, onRestart }) {
  const [downloading, setDownloading] = reactExports.useState(false);
  const [isSpeaking, setIsSpeaking] = reactExports.useState(false);
  const [voiceStatus, setVoiceStatus] = reactExports.useState(null);
  const voiceTimeoutRef = reactExports.useRef(null);
  const hero = recommendations[0];
  const alternates = recommendations.slice(1);
  reactExports.useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
    };
  }, []);
  const handleCobaTester = reactExports.useCallback(() => {
    if (!hero) return;
    const fragranceName = hero.name;
    const speechText = `Aku ingin mencoba atau mencium aroma ${fragranceName}.`;
    setIsSpeaking(true);
    setVoiceStatus(`Meminta tester untuk: ${fragranceName}`);
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = "id-ID";
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(
          (v) => v.lang === "id-ID" || v.lang.startsWith("id") || v.name.toLowerCase().includes("indonesia")
        );
        if (idVoice) {
          utterance.voice = idVoice;
        }
        utterance.onend = () => {
          setIsSpeaking(false);
          voiceTimeoutRef.current = setTimeout(() => {
            setVoiceStatus(null);
          }, 2500);
        };
        utterance.onerror = (e) => {
          console.warn("[AURA AI Voice] Speech synthesis ended or cancelled:", e);
          setIsSpeaking(false);
          voiceTimeoutRef.current = setTimeout(() => {
            setVoiceStatus(null);
          }, 2e3);
        };
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("[AURA AI Voice] Speech synthesis unavailable or threw error:", err);
        setIsSpeaking(false);
        voiceTimeoutRef.current = setTimeout(() => {
          setVoiceStatus(null);
        }, 3e3);
      }
    } else {
      console.warn("[AURA AI Voice] Web Speech API is not supported in this browser.");
      voiceTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
        voiceTimeoutRef.current = setTimeout(() => {
          setVoiceStatus(null);
        }, 2e3);
      }, 1500);
    }
  }, [hero]);
  const handleWhatsAppShare = () => {
    if (!hero) return;
    const summary = `Halo ABNA Parfum, saya baru saja konsultasi di ABNA Picks.

*Hasil Rekomendasi Saya:*
01. *${hero.name}* (${hero.house}) — ${hero.match_percent}% Cocok
Karakter: ${hero.category}
Semerbak: ${hero.projection} | Ketahanan: ${hero.longevity}

Saya ingin mencoba tester varian ini di store.`;
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };
  const handleDownloadImage = async () => {
    if (!hero || downloading) return;
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1440;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, 0, 1440);
      grad.addColorStop(0, "#030d0a");
      grad.addColorStop(0.5, "#07241c");
      grad.addColorStop(1, "#020a07");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1440);
      ctx.strokeStyle = "rgba(217, 180, 110, 0.4)";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, 1020, 1380);
      ctx.fillStyle = "#fffcf5";
      ctx.font = "bold 38px serif";
      ctx.textAlign = "center";
      ctx.fillText("ABNA SIGNATURE", 540, 100);
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillText("ABNA PICKS · HASIL KONSULTASI", 540, 140);
      ctx.fillStyle = "rgba(6, 31, 24, 0.85)";
      ctx.strokeStyle = "rgba(217, 180, 110, 0.6)";
      ctx.lineWidth = 2;
      roundRect(ctx, 60, 180, 960, 800, 24);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("01 - PILIHAN UTAMA KAMU", 100, 240);
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 64px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${hero.match_percent}%`, 980, 260);
      ctx.fillStyle = "rgba(255, 252, 245, 0.7)";
      ctx.font = "14px sans-serif";
      ctx.fillText("Kecocokan", 980, 285);
      ctx.fillStyle = "#fffcf5";
      ctx.font = "bold 56px serif";
      ctx.textAlign = "left";
      ctx.fillText(hero.name, 100, 320);
      ctx.fillStyle = "#d9b46e";
      ctx.font = "italic 24px serif";
      ctx.fillText(`${hero.category} · ${hero.aura || "Signature Match"}`, 100, 365);
      ctx.fillStyle = "rgba(217, 180, 110, 0.15)";
      ctx.strokeStyle = "rgba(217, 180, 110, 0.3)";
      ctx.lineWidth = 1;
      roundRect(ctx, 100, 400, 880, 170, 16);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("KENAPA COCOK BUAT KAMU", 125, 435);
      ctx.fillStyle = "#fffcf5";
      ctx.font = "20px sans-serif";
      wrapText(ctx, hero.why_match, 125, 475, 830, 30);
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("DETAIL AROMA", 100, 620);
      ctx.fillStyle = "#fffcf5";
      ctx.font = "18px sans-serif";
      ctx.fillText(`• Awal: ${hero.top_notes.join(", ")}`, 100, 660);
      ctx.fillText(`• Tengah: ${hero.middle_notes.join(", ")}`, 100, 700);
      ctx.fillText(`• Akhir: ${hero.base_notes.join(", ")}`, 100, 740);
      ctx.fillStyle = "#d9b46e";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(`Semerbak: ${hero.projection}   |   Ketahanan: ${hero.longevity}`, 100, 800);
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "rgba(255, 252, 245, 0.8)";
      ctx.fillText(`Tags: ${(hero.mood_tags || []).join(", ")}`, 100, 840);
      if (alternates.length > 0) {
        ctx.fillStyle = "rgba(255, 252, 245, 0.05)";
        ctx.strokeStyle = "rgba(255, 252, 245, 0.15)";
        roundRect(ctx, 60, 1010, 960, 240, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#d9b46e";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("PILIHAN ALTERNATIF DI STORE", 100, 1055);
        alternates.forEach((alt, idx) => {
          const y = 1105 + idx * 60;
          ctx.fillStyle = "#fffcf5";
          ctx.font = "bold 22px serif";
          ctx.fillText(`0${alt.rank}. ${alt.name}`, 100, y);
          ctx.fillStyle = "rgba(255, 252, 245, 0.7)";
          ctx.font = "16px sans-serif";
          ctx.fillText(`(${alt.category} · ${alt.match_percent}% Cocok)`, 380, y);
        });
      }
      ctx.fillStyle = "#d9b46e";
      ctx.font = "italic 20px serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Tunjukkan kartu ini ke Beauty Advisor ABNA untuk mencoba tester langsung di store.",
        540,
        1330
      );
      const link = document.createElement("a");
      link.download = `ABNA-Picks-${hero.name.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Gagal mendownload hasil rekomendasi:", e);
    } finally {
      setDownloading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-1 flex-col px-4 pt-6 pb-36 sm:px-8 md:px-12 md:pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        className: "mx-auto max-w-3xl text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[var(--sand-deep)] uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-[var(--sand-gold)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "HASIL ABNA PICKS" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-3 text-3xl font-black tracking-[-0.035em] leading-[0.95] text-balance text-foreground sm:text-4xl md:text-5xl lg:text-[48px]", children: "Aroma Ini Dibuat untuk Seleramu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-balance font-body text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal", children: "Dari jawabanmu, kami pilihkan parfum yang paling dekat dengan karakter, selera, dan momen pemakaianmu. Coba hirup pelan, lalu rasakan kesan pertamanya." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-8 w-full max-w-5xl space-y-10 sm:space-y-12 md:mt-10", children: [
      hero && /* @__PURE__ */ jsxRuntimeExports.jsx(
        AbnaProductCard,
        {
          rec: hero,
          isHero: true,
          onCobaTester: handleCobaTester,
          isSpeaking
        }
      ),
      alternates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-[var(--sand-gold)]/20 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--sand-gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[var(--sand-deep)] uppercase", children: "Pilihan Alternatif Karakter Serupa" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2", children: alternates.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsx(AbnaProductCard, { rec, isHero: false }, rec.rank)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.5, duration: 0.5 },
        className: "mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:mt-16",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-live": "polite", className: "h-6 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: voiceStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -6 },
              className: "inline-flex items-center gap-2 rounded-full border border-[var(--sand-gold)]/40 bg-[var(--sand-gold)]/20 px-4 py-1 text-xs font-semibold text-[var(--sand-deep)] shadow-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[var(--terracotta)] animate-ping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: voiceStatus })
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: handleCobaTester,
              whileHover: { scale: 1.015, y: -2 },
              whileTap: { scale: 0.985 },
              "aria-label": `Coba tester di store untuk ${hero?.name || "parfum utama"}`,
              className: `group relative flex min-h-[54px] w-full flex-col items-center justify-center gap-1 rounded-2xl px-8 py-3.5 text-center transition-all duration-300 cursor-pointer shadow-md ${isSpeaking ? "bg-[var(--terracotta)] text-white shadow-xl shadow-[var(--terracotta)]/30 ring-2 ring-[var(--sand-gold)]" : "bg-[var(--emerald-sig)] text-white shadow-lg shadow-[var(--emerald-sig)]/25 hover:bg-[var(--emerald-deep)] hover:shadow-xl hover:shadow-[var(--emerald-sig)]/35"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase", children: [
                  isSpeaking ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4 text-[var(--sand-gold)] animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-[var(--sand-gold)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isSpeaking ? "MEMANGGIL BEAUTY ADVISOR..." : "Coba Tester di Store" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/85", children: isSpeaking ? `Menyuarakannya ke store: “${hero?.name}”` : "Tunjukkan hasil ini ke Beauty Advisor ABNA" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleDownloadImage,
                disabled: downloading,
                className: "flex min-h-[50px] w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--sand-gold)]/35 bg-card/80 px-4 py-2.5 text-center text-foreground shadow-xs transition-all hover:bg-[var(--ivory)] hover:border-[var(--sand-gold)]/60 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5 text-[var(--sand-deep)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: downloading ? "Menyiapkan Gambar..." : "Download Hasil" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Simpan hasil rekomendasi sebagai gambar" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleWhatsAppShare,
                className: "flex min-h-[50px] w-full flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--sand-gold)]/35 bg-card/80 px-4 py-2.5 text-center text-foreground shadow-xs transition-all hover:bg-[var(--ivory)] hover:border-[var(--sand-gold)]/60 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5 text-[var(--sand-deep)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kirim ke WhatsApp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Simpan ke WhatsApp agar mudah dibuka" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onRestart,
              className: "group flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground transition-all hover:text-foreground cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RotateCcw,
                  {
                    className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-90 text-[var(--sand-deep)]",
                    strokeWidth: 2
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: "MULAI KONSULTASI BARU" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
const AnswerSchema = objectType({
  sessionId: stringType().optional(),
  clientPlatform: stringType().optional(),
  mood: stringType().optional(),
  atmosphere: stringType().optional(),
  scent_family: arrayType(stringType()).optional(),
  intensity: unionType([numberType(), stringType()]).optional(),
  occasion: stringType().optional(),
  gender: stringType().optional(),
  age_range: stringType().optional(),
  occupation: stringType().optional(),
  price_range: stringType().optional()
});
const getRecommendations = createServerFn({
  method: "POST"
}).validator((data) => AnswerSchema.parse(data)).handler(createSsrRpc("cc8ece31eba14c95ac1289a8eae31f48cdbd31002a0acd4ff8de6c15a0aae461"));
const trackConsultationEvent = createServerFn({
  method: "POST"
}).validator((data) => ConsultationEventInputSchema.parse(data)).handler(createSsrRpc("30c190ef9ba4d73cb9412f4305354b2eef1c26118dc554d5704919a7a740c085"));
const clientSentEvents = /* @__PURE__ */ new Set();
function dispatchClientEvent(trackFn, event) {
  try {
    const dedupKey = `${event.sessionId}:${event.eventType}:${event.questionNumber ?? ""}`;
    if (clientSentEvents.has(dedupKey)) {
      return;
    }
    clientSentEvents.add(dedupKey);
    void trackFn({
      data: event
    }).catch((err) => {
      if (false) ;
    });
  } catch {
  }
}
function resetClientEventRegistry() {
  clientSentEvents.clear();
}
const INACTIVITY_TIMEOUT_MS = 6e4;
function AuraApp() {
  const [phase, setPhase] = reactExports.useState("welcome");
  const [stepIdx, setStepIdx] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [sessionId, setSessionId] = reactExports.useState("");
  const [recommendations, setRecommendations] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [showIdleWarning, setShowIdleWarning] = reactExports.useState(false);
  const fetchRecs = useServerFn(getRecommendations);
  const trackEventFn = useServerFn(trackConsultationEvent);
  const idleTimerRef = reactExports.useRef(null);
  const total = QUIZ.length;
  const currentStep = QUIZ[stepIdx];
  const headerStep = phase === "welcome" ? 0 : phase === "quiz" ? stepIdx + 1 : total;
  const handleRestart = reactExports.useCallback(() => {
    resetClientEventRegistry();
    setAnswers({});
    setSessionId("");
    setRecommendations(null);
    setStepIdx(0);
    setError(null);
    setShowIdleWarning(false);
    setPhase("welcome");
  }, []);
  const resetIdleTimer = reactExports.useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (phase !== "welcome") {
      idleTimerRef.current = setTimeout(() => {
        handleRestart();
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [phase, handleRestart]);
  reactExports.useEffect(() => {
    const handleUserTouch = () => resetIdleTimer();
    window.addEventListener("pointerdown", handleUserTouch);
    window.addEventListener("touchstart", handleUserTouch);
    window.addEventListener("click", handleUserTouch);
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("pointerdown", handleUserTouch);
      window.removeEventListener("touchstart", handleUserTouch);
      window.removeEventListener("click", handleUserTouch);
    };
  }, [resetIdleTimer]);
  const handleBegin = reactExports.useCallback(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    setPhase("quiz");
    setStepIdx(0);
    resetIdleTimer();
    dispatchClientEvent(trackEventFn, {
      sessionId: newSessionId,
      eventType: "consultation_started",
      clientPlatform: "kiosk_web"
    });
    dispatchClientEvent(trackEventFn, {
      sessionId: newSessionId,
      eventType: "question_viewed",
      questionNumber: 1,
      stepId: QUIZ[0]?.id || "mood",
      clientPlatform: "kiosk_web"
    });
  }, [trackEventFn, resetIdleTimer]);
  reactExports.useEffect(() => {
    if (phase === "quiz" && sessionId && currentStep) {
      dispatchClientEvent(trackEventFn, {
        sessionId,
        eventType: "question_viewed",
        questionNumber: stepIdx + 1,
        stepId: currentStep.id,
        clientPlatform: "kiosk_web"
      });
    }
  }, [phase, stepIdx, sessionId, currentStep, trackEventFn]);
  const handleAnswer = reactExports.useCallback((v) => {
    setAnswers((a) => ({
      ...a,
      [currentStep.id]: v
    }));
    resetIdleTimer();
    if (sessionId) {
      dispatchClientEvent(trackEventFn, {
        sessionId,
        eventType: "question_answered",
        questionNumber: stepIdx + 1,
        stepId: currentStep.id,
        clientPlatform: "kiosk_web"
      });
    }
  }, [currentStep.id, stepIdx, sessionId, trackEventFn, resetIdleTimer]);
  const submit = reactExports.useCallback(async () => {
    setPhase("loading");
    setError(null);
    try {
      const data = {
        sessionId: sessionId || void 0,
        clientPlatform: "kiosk_web",
        mood: answers.mood,
        atmosphere: answers.atmosphere,
        scent_family: answers.scent_family,
        intensity: answers.intensity,
        occasion: answers.occasion,
        gender: answers.gender,
        age_range: answers.age_range,
        occupation: answers.occupation,
        price_range: answers.price_range
      };
      const res = await fetchRecs({
        data
      });
      setRecommendations(res.recommendations);
      setPhase("results");
      if (sessionId) {
        dispatchClientEvent(trackEventFn, {
          sessionId,
          eventType: "results_viewed",
          clientPlatform: "kiosk_web"
        });
        dispatchClientEvent(trackEventFn, {
          sessionId,
          eventType: "consultation_completed",
          clientPlatform: "kiosk_web"
        });
      }
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Terjadi kendala dalam kurasi aroma.");
      setPhase("quiz");
    }
  }, [answers, sessionId, fetchRecs, trackEventFn]);
  const handleNext = reactExports.useCallback(() => {
    resetIdleTimer();
    if (stepIdx < total - 1) setStepIdx((s) => s + 1);
    else submit();
  }, [stepIdx, total, submit, resetIdleTimer]);
  const handleBack = reactExports.useCallback(() => {
    resetIdleTimer();
    if (stepIdx > 0) setStepIdx((s) => s - 1);
    else setPhase("welcome");
  }, [stepIdx, resetIdleTimer]);
  const handleClose = reactExports.useCallback(() => {
    handleRestart();
  }, [handleRestart]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grain relative flex min-h-svh flex-col select-none touch-manipulation ${phase === "welcome" ? "bg-[#020806]" : "ivory-bg"}`, children: [
    phase !== "welcome" && /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { step: headerStep, total, onClose: handleClose, showStep: phase === "quiz" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        phase === "welcome" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0,
          scale: 0.98
        }, transition: {
          duration: 0.5
        }, className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeScreen, { onBegin: handleBegin }) }, "welcome"),
        phase === "quiz" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -16
        }, transition: {
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }, className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuizScreen, { step: currentStep, index: stepIdx, total, answer: answers[currentStep.id], onAnswer: handleAnswer, onBack: handleBack, onNext: handleNext, isLast: stepIdx === total - 1 }) }, "quiz-" + stepIdx),
        phase === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0
        }, transition: {
          duration: 0.4
        }, className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {}) }, "loading"),
        phase === "results" && recommendations && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0
        }, transition: {
          duration: 0.6
        }, className: "flex flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsScreen, { recommendations, onRestart: handleRestart }) }, "results")
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-3 text-sm font-semibold text-destructive backdrop-blur-md", children: error })
    ] })
  ] });
}
export {
  AuraApp as component
};
