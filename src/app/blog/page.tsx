"use client";
import Link from "next/link";
import Image from "next/image";
import data from "../../data/data.json";
import styles from "./blog-list.module.scss";
import DiscoverSection from "./_components/Discover/Discover";
import { Article } from "../../types";
import { truncate } from "../../lib/utils";
import { SLIDER_SETTINGS } from "../../lib/constants";
import { useSlider } from "../../hooks/useSlider";
import { useAutoPlay } from "../../hooks/useAutoPlay";
import { useArticleData } from "../../hooks/useArticleData";

export default function BlogListPage() {
  const { sideArticles, slides } = useArticleData(
    data as Article[]
  );

  const {
    currentSlide,
    nextSlide,
    goToSlide,
    activeItem: active,
    hasMultipleItems,
  } = useSlider(slides);

  useAutoPlay(
    nextSlide,
    slides.length,
    SLIDER_SETTINGS.AUTO_PLAY_INTERVAL,
    hasMultipleItems
  );

  return (
    <div className={styles.blogListContainer}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>BLOG</h1>

        <div className={styles.contentGrid}>
          <div className={styles.leftCol}>
            <div className={styles.swiperSection}>
              <div className={styles.swiperContainer}>
                <div
                  className={styles.swiperWrapper}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((article) => (
                    <div key={article._id} className={styles.swiperSlide}>
                      <Link
                        href={`/blog/${article.attributes.slug}`}
                        className={styles.swiperSlideLink}
                      >
                        <div className={styles.swiperSlideContent}>
                          <div className={styles.swiperSlideImage}>
                            <Image
                              src={article.attributes.img}
                              alt={article.attributes.title}
                              fill
                              className={styles.swiperSlideImageTag}
                              sizes="(max-width: 1024px) 100vw, 740px"
                              priority
                            />
                            <div className={styles.swiperSlideOverlay} />
                          </div>
                          <div className={styles.swiperSlideTextContent}></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {hasMultipleItems && (
                  <div className={styles.swiperDots}>
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`${styles.swiperDot} ${
                          idx === currentSlide ? styles.active : ""
                        }`}
                        onClick={() => goToSlide(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {active && (
              <div className={styles.featuredDesc}>
                <p className={styles.featuredDescText}>
                  {truncate(
                    active.attributes.desc || "",
                    SLIDER_SETTINGS.MAX_DESC_LENGTH.FEATURED
                  )}
                </p>
              </div>
            )}
          </div>

          <div className={styles.rightSection}>
            <div className={styles.articlesSection}>
              {sideArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.attributes.slug}`}
                  className={styles.articleItem}
                >
                  <div className={styles.articleImage}>
                    <Image
                      src={article.attributes.img}
                      alt={article.attributes.title}
                      width={175}
                      height={105}
                      className={styles.thumbnail}
                    />
                  </div>
                  <div className={styles.articleContent}>
                    <p className={styles.articleDesc}>
                      {truncate(
                        article.attributes.desc || "",
                        SLIDER_SETTINGS.MAX_DESC_LENGTH.SIDE_ARTICLE
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomImageWrap}>
        <Image
          src="/Vector.svg"
          alt=""
          aria-hidden="true"
          width={1920}
          height={240}
          priority
          className={styles.bottomImage}
        />
      </div>

      <DiscoverSection />
    </div>
  );
}
