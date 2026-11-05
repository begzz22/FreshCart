"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!images.length) return null;

  const goTo = (index: number) => {
    if (index < 0 || index > images.length - 1) return;
    setActive(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(active + (diff > 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      {/* Slides */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-transform duration-450 ease-out"
            style={{ transform: `translate3d(${(i - active) * 100}%, 0, 0)` }}
            aria-hidden={i !== active}
          >
            <Image
              src={src}
              alt={`${title} - image ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <nav
          aria-label="Thumbnail Navigation"
          className="mt-3 grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to Slide ${i + 1}`}
              aria-pressed={i === active}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition ${
                i === active
                  ? "border-primary-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
