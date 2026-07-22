import { useRef } from "react";
import { useInView } from "framer-motion";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";

interface ViewRevealProps {
  text: string;
  className?: string;
  splitBy?: "words" | "characters" | "lines";
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  stagger?: number;
  staggerFrom?: "start" | "end" | "center" | "edges" | "random" | number;
  blur?: boolean;
}

export function ViewReveal({
  text,
  className,
  splitBy = "words",
  direction = "up",
  distance = 18,
  stagger = 0.045,
  staggerFrom = "start",
  blur = true,
}: ViewRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <span ref={ref} className="view-reveal-anchor">
      {inView ? (
        <KineticTextReveal
          text={text}
          splitBy={splitBy}
          direction={direction}
          distance={distance}
          stagger={stagger}
          staggerFrom={staggerFrom}
          blur={blur}
          className={className}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <span className={className} aria-hidden="true" style={{ visibility: "hidden" }}>
          {text}
        </span>
      )}
    </span>
  );
}
