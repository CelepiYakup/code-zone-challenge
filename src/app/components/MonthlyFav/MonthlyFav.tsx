"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import data from "@/data/data.json";
import styles from "./favorites.module.scss";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

type Raw = {
  _id: string;
  attributes: {
    title: string;
    img: string;
    slug?: string;
  };
};

const rank = (i: number) => (i % 10) + 1;

export default function MonthlyFavorites() {
  const items = (data as unknown as Raw[]).slice(0, 10).map((p, i) => ({
    id: p._id,
    slug: p.attributes.slug ?? "#",
    img: p.attributes.img,
    songTitle: p.attributes.title,
    songRank: rank(i),
  }));
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className={styles.section}>
      <div className={styles.leftCol}>
        <div className={styles.socialWrap}>
          <Image
            src="/Social-bg.svg"
            width={602}
            height={126}
            alt=""
            className={styles.socialBg}
            priority
          />
          <div className={styles.socialSection}>
            <Image
              src="/youtube.svg"
              alt="YouTube"
              width={162}
              height={36}
              className={styles.socialIcon}
            />
            <Image
              src="/spotify.svg"
              alt="Spotify"
              width={160}
              height={48}
              className={styles.socialIcon}
            />
          </div>
        </div>

        <h2 className={styles.heading}>
          <span>AYIN</span>
          <span>FAVORİLERİ</span>
        </h2>
      </div>

      <div className={styles.middleCol} />

      <div className={styles.sliderCol}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Scrollbar, Autoplay]}
          spaceBetween={32}
          slidesPerView={2.5}
          slidesPerGroup={1}
          watchOverflow={true}
          resistance={true}
          resistanceRatio={0.85}
          allowTouchMove={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          scrollbar={{
            draggable: false,
            snapOnRelease: false,
          }}
          onSlideChange={(swiper) => {
            if (window.innerWidth <= 768 && swiper.realIndex >= 8) {
              setTimeout(() => {
                swiper.slideTo(0, 1000);
              }, 100);
            }
          }}
          className={styles.swiper}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 32,
            },
            1200: {
              slidesPerView: 3.5,
              spaceBetween: 36,
            },
          }}
        >
          {items.map((it) => (
            <SwiperSlide key={it.id} className={styles.slide}>
              <Link href={`/blog/${it.slug}`} className={styles.card}>
                <Image
                  src="/Group.svg"
                  alt=""
                  fill
                  className={styles.groupBg}
                />
                <div className={styles.content}>
                  <div className={styles.thumbWrap}>
                    <Image
                      src={it.img}
                      alt={`${it.songTitle}`}
                      fill
                      className={styles.thumb}
                      sizes="150px"
                    />
                    <div className={styles.playButton}></div>
                  </div>
                  <div className={styles.info}>
                    <div className={styles.rank}>
                      Top 10 <span>({it.songRank}. Sıra)</span>
                    </div>
                    <div className={styles.meta}>
                      <div className={styles.artist}></div>
                      <div className={styles.title}>{it.songTitle}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
