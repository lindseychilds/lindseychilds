"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMountEffect } from "../hooks/useMountEffect";

interface Project {
  title: string;
  description: string;
  image: string;
  href: string;
  width: number;
  height: number;
}

const MOBILE = "(max-width: 48rem)";

export default function CardStrip({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const cloned = n ? [projects[n - 1], ...projects, projects[0]] : [];

  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const transitioning = useRef(false);
  const navRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const next = e.clientX < window.innerWidth / 2 ? "w-resize" : "e-resize";
      if (el.style.cursor !== next) el.style.cursor = next;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  });

  const handleClick = (e: React.MouseEvent) => {
    if (window.matchMedia(MOBILE).matches) return;
    if ((e.target as Element).closest("a")) return;
    if (transitioning.current) return;
    transitioning.current = true;
    setAnimated(true);
    setIndex((i) => (e.clientX < window.innerWidth / 2 ? i - 1 : i + 1));
  };

  const handleTransitionEnd = () => {
    transitioning.current = false;
    setIndex((i) => {
      if (i === 0) { setAnimated(false); return n; }
      if (i === n + 1) { setAnimated(false); return 1; }
      return i;
    });
  };

  return (
    <div ref={navRef} className="card-nav" onClick={handleClick}>
      <div
        className="cards-strip"
        style={{
          transform: `translateX(calc(${-index} * 100vw))`,
          transition: animated ? "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          width: `calc(${cloned.length} * 100vw)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {cloned.map((project, i) => (
          <article className="card" key={i}>
            <div className="card__content">

              <div className="card__title-container">
                <Link href={project.href} className="card__title-wrapper">
                  <h2 className="card__title-typed">{project.title}</h2>
                  <span className="card__title-handwritten">{project.title}</span>
                </Link>
              </div>

              <div className="card__images-container">
                <Link href={project.href} className="card__image-link">
                  <div className="card__images-wrapper">
                    <Image
                      src={project.image}
                      alt=""
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 48rem) 80vw, 55vw"
                      style={{ width: "100%", height: "auto", maxHeight: "76dvh" }}
                    />
                  </div>
                </Link>
              </div>

              <div className="card__description-container">
                <Link href={project.href} className="card__description-link">
                  {project.description}
                </Link>
              </div>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
