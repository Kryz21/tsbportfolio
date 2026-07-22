"use client";

import { cn } from "@/lib/utils";
import {
  type AnimationOptions,
  motion,
  stagger,
  useAnimate,
} from "framer-motion";
import { useCallback, useState } from "react";

interface LetterCascadeProps {
  text: string;
  className?: string;
  letterClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  stiffness?: number;
  damping?: number;
  triggerOnClick?: boolean;
  onComplete?: () => void;
}

export function LetterCascade({
  text,
  className,
  letterClassName,
  staggerDuration = 0.032,
  staggerFrom = "first",
  stiffness = 310,
  damping = 24,
  triggerOnClick = false,
  onComplete,
}: LetterCascadeProps) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);

  const trigger = useCallback(() => {
    if (blocked) return;
    setBlocked(true);

    const merge = (base: AnimationOptions): AnimationOptions => ({
      ...base,
      delay: stagger(staggerDuration, { from: staggerFrom }),
    });

    const spring: AnimationOptions = {
      type: "spring",
      stiffness,
      damping,
      mass: 0.56,
    };

    animate(
      ".cascade-front",
      { rotateX: 88, opacity: 0, y: -5, filter: "blur(3px)" },
      merge(spring),
    ).then(() => {
      animate(
        ".cascade-front",
        { rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0 },
      ).then(() => {
        setBlocked(false);
        onComplete?.();
      });
    });

    animate(
      ".cascade-echo",
      { rotateX: 0, opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      merge(spring),
    ).then(() => {
      animate(
        ".cascade-echo",
        { rotateX: -88, opacity: 0, y: 5, scale: 0.92, filter: "blur(3px)" },
        { duration: 0 },
      );
    });
  }, [
    blocked,
    animate,
    staggerDuration,
    staggerFrom,
    stiffness,
    damping,
    onComplete,
  ]);

  return (
    <span
      ref={scope}
      className={cn(
        "inline-flex cursor-pointer select-none items-center justify-center",
        className,
      )}
      {...(triggerOnClick ? { onClick: trigger } : { onMouseEnter: trigger })}
      aria-label={text}
    >
      {text.split("").map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className="relative inline-flex whitespace-pre"
          style={{ perspective: "500px" }}
        >
          <motion.span
            className={cn("cascade-front inline-block", letterClassName)}
            style={{
              rotateX: 0,
              y: 0,
              transformOrigin: "bottom center",
              backfaceVisibility: "hidden",
            }}
          >
            {letter}
          </motion.span>
          <motion.span
            className={cn(
              "cascade-echo absolute inset-0 inline-block",
              letterClassName,
            )}
            style={{
              rotateX: -88,
              opacity: 0,
              y: 5,
              scale: 0.92,
              filter: "blur(3px)",
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
