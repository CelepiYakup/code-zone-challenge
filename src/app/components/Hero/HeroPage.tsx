"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./heropage.module.scss";

interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  layout: "left" | "right" | "center";
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "DÜNYA RAP",
    subtitle: "TRENDLERİNİ KONUŞUYORUZ.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    buttonText: "Devamını Oku",
    buttonLink: "/",
    layout: "right",
    backgroundImage: "/hero-rapper-1.png",
  },
  {
    id: 2,
    title: "TÜRKÇE RAP VE",
    subtitle: "DÜNYA MÜZİK HABERLERİNİ TAKİP ET",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    buttonText: "Devamını Oku",
    buttonLink: "/",
    layout: "right",
    backgroundImage: "/hero-rapper-2.png",
  },
];

const HeroPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.init();
      swiperRef.current.navigation?.update();
    }
  }, []);

  const handlePrevClick = () => swiperRef.current?.slidePrev();
  const handleNextClick = () => swiperRef.current?.slideNext();

  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        speed={650}
        spaceBetween={24}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          prevEl: (prevRef.current as unknown as HTMLElement) ?? undefined,
          nextEl: (nextRef.current as unknown as HTMLElement) ?? undefined,
        }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error swiper types
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error swiper types
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(s) => setActiveSlide(s.realIndex)}
        className={styles.heroSwiper}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`${styles.heroSlide} ${styles[`layout-${slide.layout}`]}`}
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className={styles.overlay} />

              <div className={styles.container}>
                <div className={styles.heroContent}>
                  <div className={styles.textContent}>
                    <div className={styles.titleWrapper}>
                      <h1 className={styles.heroTitle}>
                        <span className={styles.titleMain}>{slide.title}</span>
                        {slide.subtitle && (
                          <span className={styles.titleSub}>{slide.subtitle}</span>
                        )}
                      </h1>
                    </div>

                    <p className={styles.heroDescription}>{slide.description}</p>

                    <div className={styles.buttonWrapper}>
                      <Link href={slide.buttonLink} className={styles.ctaButton}>
                        <span className={styles.ctaInner}>
                          <span className={styles.ctaLabel}>{slide.buttonText}</span>
                          <span className={styles.ctaArrow} aria-hidden>
                            →
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.waveEffect}>
                <Image
                  src="/Vector.svg"
                  alt=""
                  aria-hidden="true"
                  width={1920}
                  height={240}
                  className={styles.waveSvg}
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          ref={prevRef}
          className={styles.swiperButtonPrev}
          onClick={handlePrevClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          ref={nextRef}
          className={styles.swiperButtonNext}
          onClick={handleNextClick}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Swiper>
    </section>
  );
};

export default HeroPage;
