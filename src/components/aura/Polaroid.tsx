import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  index: number;
  label: string;
  caption?: string;
  image: string;
  number?: string;
  selected: boolean;
  onClick: () => void;
};

export function Polaroid({ index, label, caption, image, selected, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.03 + index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-full flex-col overflow-hidden rounded-3xl p-3 sm:p-4 text-left transition-all duration-300 cursor-pointer ${
        selected
          ? "bg-[#f2eee9] ring-2 ring-[#3a5b7d] shadow-xl shadow-[#3a5b7d]/15"
          : "bg-[#f2eee9]/80 hover:bg-[#f2eee9] hover:shadow-lg shadow-sm border border-[#dfd7cc]/60"
      }`}
    >
      {/* 1. PHOTOGRAPH CONTAINER (Rounded with natural padding) */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#e3ded7]">
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Selected Check Pill */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#3a5b7d] text-[#fffcf6] shadow-md"
          >
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </motion.div>
        )}
      </div>

      {/* 2. TEXT SECTION (Title & Caption from PDF) */}
      <div className="flex flex-1 flex-col justify-start pt-3.5 pb-1 px-1">
        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#3a5b7d]">
          {label}
        </h3>

        {caption && (
          <p className="mt-1 font-body text-xs sm:text-[13px] leading-relaxed text-[#3a5b7d]/85 line-clamp-3">
            {caption}
          </p>
        )}
      </div>
    </motion.button>
  );
}
