import { useId, useState } from "react";
import { motion } from "framer-motion";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import type { Recommendation } from "@/lib/recommendation-contract";

export function AromaExplorer({ rec }: { rec: Recommendation }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const reduce = useMotionPreference();
  const layers = [
    { label: "Top", caption: "Kesan pertama", notes: rec.top_notes },
    { label: "Heart", caption: "Karakter utama", notes: rec.middle_notes },
    { label: "Base", caption: "Jejak yang tertinggal", notes: rec.base_notes },
  ];
  return (
    <section className="abna-aroma" aria-label={`Lapisan aroma ${rec.name}`}>
      <div className="abna-aroma__heading">
        <h4>JELAJAHI AROMANYA</h4>
        <span>3 lapisan, satu karakter</span>
      </div>
      <div className="abna-aroma__tabs" role="tablist" aria-label="Lapisan aroma">
        {layers.map((layer, index) => (
          <button
            key={layer.label}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % 3;
              else if (event.key === "ArrowLeft") next = (index + 2) % 3;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = 2;
              else return;
              event.preventDefault();
              setActive(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {layer.label}
          </button>
        ))}
      </div>
      <div className="abna-aroma__panels">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.label}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            tabIndex={0}
            hidden={active !== index}
            initial={false}
            animate={{ opacity: active === index ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
          >
            <span className="abna-aroma__caption">{layer.caption}</span>
            <p>{layer.notes.join(" · ") || "Catatan aroma belum tersedia"}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
