"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./discover.module.scss";
import articlesData from "../../../../data/data.json";
import { formatDate } from "../../../../lib/utils";
import {
  filterArticlesByTag,
  sortArticlesByDate,
} from "../../../../lib/data-filters";
import { BATCH_SIZES, INITIAL_TAGS } from "../../../../lib/constants";
import { useNewsletter } from "../../../../hooks/useNewsletter";
import { usePagination } from "../../../../hooks/usePagination";
import { useFilters } from "../../../../hooks/useFilters";

interface Article {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    authors: string[];
    category: string[];
    tags: string[];
    trends: boolean;
    slug: string;
  };
  createdAt: string;
}

export default function DiscoverSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { tags, filtered, handleTag } = useFilters<Article>(
    articles,
    filterArticlesByTag,
    [...INITIAL_TAGS.DISCOVER_PAGE]
  );

  const { visible, hasMore, loadingMore, handleLoadMore } = usePagination(
    filtered,
    BATCH_SIZES.DISCOVER_PAGE
  );

  const { email, setEmail, submitNewsletter } = useNewsletter();

  useEffect(() => {
    try {
      const sorted = sortArticlesByDate(articlesData as Article[]);
      setArticles(sorted);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className={styles.discover}>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandText}>KEŞFET</span>
          <Image src="/compass.svg" alt="Compass" width={40} height={40} />
        </div>
        <div className={styles.actions}>
          <button className={styles.iconbtn}>
            <Image src="/search.svg" alt="Ara" width={18} height={18} />
          </button>
          <button className={styles.iconbtn}>
            <Image src="/hamburger.svg" alt="Menü" width={18} height={18} />
          </button>
          <button className={styles.iconbtn}>
            <Image src="/hamburger-2.svg" alt="Menü" width={18} height={18} />
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.tags}>
          {tags.map((t, i) => (
            <button
              key={t.name}
              className={`${styles.tag} ${t.active ? styles.active : ""}`}
              onClick={() => handleTag(i)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gridWrap}>
        {loading && <p className={styles.loading}>Yükleniyor...</p>}

        {!loading && (
          <div className={styles.grid}>
            {visible.map((a) => (
              <article key={a._id} className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.author}>
                    <Image
                      src="/a1.svg"
                      alt=""
                      width={22}
                      height={22}
                      className={styles.avatar}
                    />
                    <span>{a.attributes.authors?.[0] || "—"}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${a.attributes.slug}`}
                  className={styles.thumbLink}
                >
                  <Image
                    src={a.attributes.img}
                    alt={a.attributes.title}
                    width={300}
                    height={170}
                    loading="lazy"
                  />
                </Link>
                <div className={styles.cardBody}>
                  <span className={styles.dateBelow}>
                    {formatDate(a.createdAt)}
                  </span>

                  <p className={styles.excerpt}>{a.attributes.desc}</p>

                  <div className={styles.cardSeparator} />

                  <Link
                    href={`/blog/${a.attributes.slug}`}
                    className={styles.readMore}
                  >
                    Daha Fazla Oku
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && (
          <>
            {loadingMore && <div className={styles.spinner} role="status" />}
            {!loadingMore && hasMore && (
              <div className={styles.loadMore}>
                <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                  Daha Fazla Gör
                </button>
              </div>
            )}
            {!loadingMore && !hasMore && filtered.length > 0 && (
              <div className={styles.listEnd}>Hepsi yüklendi</div>
            )}
          </>
        )}
      </div>

      <div className={styles.subscribeBand}>
        <div className={styles.subGrid}>
          <div className={styles.leftCol}>
            <Image
              src="/logo.svg"
              alt="RAPKology"
              width={249}
              height={63}
              priority
            />
            <p className={styles.subHeadline}>
              GELİŞMELERDEN İLK SEN HABERDAR OL!
            </p>

            <form onSubmit={submitNewsletter} className={styles.form}>
              <label htmlFor="nl-email" className={styles.subLabel}>
                EMAIL
              </label>
              <div className={styles.inputRow}>
                <input
                  id="nl-email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.subSend}>
                  GÖNDER <span className={styles.arrow}>›</span>
                </button>
              </div>
            </form>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.socials}>
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
              <Image src="/discord.svg" alt="Discord" width={24} height={24} />
              <Image src="/spoty.svg" alt="Spotify" width={24} height={24} />
              <Image
                src="/youtube-icon.svg"
                alt="YouTube"
                width={24}
                height={24}
              />
            </div>

            <ul className={styles.footerNav}>
              <li>
                <Link href="/haberler">HABERLER</Link>
              </li>
              <li>
                <Link href="/etkinlikler">ETKİNLİKLER</Link>
              </li>
              <li>
                <Link href="/muzikler">MÜZİKLER</Link>
              </li>
              <li>
                <Link href="/videolar">VİDEOLAR</Link>
              </li>
              <li>
                <Link href="/iletisim">İLETİŞİM</Link>
              </li>
            </ul>

            <div className={styles.copy}>
              © RAPKOLOGY All Rights Are Reserved 2025.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
