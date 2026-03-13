"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ServiceHeroCarouselProps = {
  images: string[];
  serviceName: string;
};

export function ServiceHeroCarousel({ images, serviceName }: ServiceHeroCarouselProps) {
  const validImages = images.length > 0 ? images : ["/images/project-placeholder.svg"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (validImages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [validImages.length]);

  const goTo = (index: number) => setActiveIndex(index);
  const prev = () =>
    setActiveIndex((index) => (index - 1 + validImages.length) % validImages.length);
  const next = () => setActiveIndex((index) => (index + 1) % validImages.length);

  return (
    <section className="service-hero-carousel" aria-label={`${serviceName} image gallery`}>
      <div className="service-hero-carousel-viewport">
        <div
          className="service-hero-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {validImages.map((src, index) => (
            <figure className="service-hero-carousel-slide" key={`${src}-${index}`}>
              <Image
                src={src}
                alt={`${serviceName} photo ${index + 1}`}
                fill
                className="service-hero-carousel-image"
                sizes="(max-width: 880px) 92vw, 1120px"
                priority={index === 0}
              />
            </figure>
          ))}
        </div>
      </div>

      {validImages.length > 1 ? (
        <div className="service-hero-carousel-controls">
          <button type="button" onClick={prev} aria-label="Previous service photo">
            Prev
          </button>
          <div className="service-hero-carousel-dots">
            {validImages.map((_, index) => (
              <button
                type="button"
                key={`dot-${index}`}
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => goTo(index)}
                aria-label={`View photo ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Next service photo">
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
