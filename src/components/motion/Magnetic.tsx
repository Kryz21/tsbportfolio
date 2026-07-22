import type { PropsWithChildren } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps extends PropsWithChildren {
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.42 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.42 });

  return (
    <motion.span
      className={cn("magnetic-wrap", className)}
      style={{ x: smoothX, y: smoothY }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
