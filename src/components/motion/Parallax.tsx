import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxState {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxState | null>(null);

export function ParallaxProvider({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.7 });
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (reduceMotion) return;
    const move = (event: PointerEvent) => {
      rawX.set(event.clientX / Math.max(window.innerWidth, 1) - 0.5);
      rawY.set(event.clientY / Math.max(window.innerHeight, 1) - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [rawX, rawY, reduceMotion]);

  const value = useMemo(() => ({ x, y }), [x, y]);
  return <ParallaxContext.Provider value={value}>{children}</ParallaxContext.Provider>;
}

interface ParallaxLayerProps extends PropsWithChildren {
  className?: string;
  depth?: number;
}

export function ParallaxLayer({ children, className, depth = 20 }: ParallaxLayerProps) {
  const context = useContext(ParallaxContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const baseX = context?.x ?? fallbackX;
  const baseY = context?.y ?? fallbackY;
  const x = useTransform(baseX, (value) => value * depth);
  const y = useTransform(baseY, (value) => value * depth * 0.72);

  return (
    <motion.div className={cn("parallax-layer", className)} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
