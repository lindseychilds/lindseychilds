"use client";

import { useState } from "react";
import { useMountEffect } from "../hooks/useMountEffect";

const DURATION = 2000;

export default function Preloader({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useMountEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  if (removed) return null;

  return (
    <div
      className={`preloader${done ? " preloader--exit" : ""}`}
      onTransitionEnd={() => setRemoved(true)}
      aria-hidden="true"
    >
      <span className="preloader__name">{name}</span>
      <span className="preloader__count">
        {String(count).padStart(3, "0")}
      </span>
    </div>
  );
}
