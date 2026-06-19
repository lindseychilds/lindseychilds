"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useMountEffect } from "../../hooks/useMountEffect";

interface StillImage {
  src: string;
  width: number;
  height: number;
}

export default function ProjectView({
  images,
  prevSlug,
  nextSlug,
}: {
  images: StillImage[];
  prevSlug: string;
  nextSlug: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const h = () => viewport.scrollHeight / 3;
    viewport.scrollTop = h();

    const onScroll = () => {
      if (window.matchMedia("(max-width: 48rem)").matches) return;
      const oneSet = h();
      if (viewport.scrollTop < oneSet) viewport.scrollTop += oneSet;
      else if (viewport.scrollTop >= oneSet * 2) viewport.scrollTop -= oneSet;
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", onScroll);
  });

  const triple = [...images, ...images, ...images];
  const n = images.length;

  return (
    <>
      <div className="scatter-viewport" ref={viewportRef}>
        <div className="scatter-track">
          {triple.map((image, i) => (
            <a
              key={i}
              href={`#photo-${i % n}`}
              className={`scatter__item${i < n || i >= n * 2 ? " scatter__item--clone" : ""}`}
              data-pos={(((i % n) % 4) + 1).toString()}
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(max-width: 48rem) 80vw, 25vw"
                style={{ width: "100%", height: "auto" }}
              />
            </a>
          ))}
        </div>
      </div>

      <span id="lightbox-close" />
      {images.map((image, i) => (
        <div key={i} id={`photo-${i}`} className="lightbox">
          <div className="lightbox__image">
            <Image
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              sizes="max(620px, 37vw)"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="lightbox__bar">
            <a href="#lightbox-close" className="lightbox__btn">Close</a>
            <span className="lightbox__counter">
              {String(i + 1).padStart(2, "0")}&thinsp;—&thinsp;{String(n).padStart(2, "0")}
            </span>
            <div className="lightbox__nav">
              <a href={`#photo-${(i - 1 + n) % n}`} className="lightbox__btn">Prev</a>
              <a href={`#photo-${(i + 1) % n}`} className="lightbox__btn">Next</a>
            </div>
          </div>
        </div>
      ))}

      <footer className="scatter__footer">
        <Link href="/stills" className="scatter__back">← Stills</Link>
        <div className="scatter__project-nav">
          <Link href={`/stills/${prevSlug}`}>Prev</Link>
          <Link href={`/stills/${nextSlug}`}>Next</Link>
        </div>
      </footer>
    </>
  );
}
