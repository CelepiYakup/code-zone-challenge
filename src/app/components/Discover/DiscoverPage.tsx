"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./discover.module.scss";
import articlesData from "../../../data/data.json";
import { formatDate } from "../../../lib/utils";
import {
  filterArticlesByTag,
  sortArticlesByDate,
} from "../../../lib/data-filters";
import { BATCH_SIZES, INITIAL_TAGS } from "../../../lib/constants";
import { useNewsletter } from "../../../hooks/useNewsletter";
import { usePagination } from "../../../hooks/usePagination";
import { useFilters } from "../../../hooks/useFilters";

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
  const { email, setEmail, submitNewsletter } = useNewsletter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const { tags, filtered, handleTag } = useFilters<Article>(
    articles,
    filterArticlesByTag,
    [...INITIAL_TAGS.DISCOVER]
  );
  const { visible, hasMore, loadingMore, handleLoadMore } = usePagination(
    filtered,
    BATCH_SIZES.DISCOVER
  );

  useEffect(() => {
    try {
      const sorted = sortArticlesByDate(articlesData as Article[]);
      setArticles(sorted);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section id="kesfet" className={styles.discover}>
      <div className={styles.discover_grid}>
        <header className={styles.discover_topbar}>
          <div className={styles.discover_brand}>
            <span className={styles.discover_brand_text}>KEŞFET</span>
            <Image src="/compass.svg" alt="Compass" width={54} height={54} />
          </div>
          <div className={styles.discover_actions}>
            <button className={styles.discover_iconbtn}>
              <Image src="/search.svg" alt="Ara" width={20} height={20} />
            </button>
            <button className={styles.discover_iconbtn}>
              <Image src="/hamburger.svg" alt="Menü" width={20} height={20} />
            </button>
            <button className={styles.discover_iconbtn}>
              <Image src="/hamburger-2.svg" alt="Menü" width={20} height={20} />
            </button>
          </div>
        </header>

        <section className={styles.discover_filters}>
          <h2 className={styles.discover_card_title}>NE GÖRMEK İSTERSİN?</h2>
          <div className={styles.discover_tags}>
            {tags.map((t, i) => (
              <button
                key={t.name}
                className={`${styles.discover_tag} ${
                  t.active ? styles.is_active : ""
                }`}
                onClick={() => handleTag(i)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </section>

        <main className={styles.discover_list}>
          {loading && <p className={styles.discover_loading}>Yükleniyor...</p>}

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

                  <div className={styles.thumbCol}>
                    <Link
                      href={`/blog/${a.attributes.slug}`}
                      className={styles.thumbLink}
                    >
                      <img
                        src={a.attributes.img}
                        alt={a.attributes.title}
                        loading="lazy"
                      />
                    </Link>
                    <span className={styles.dateBelowDesktop}>
                      {formatDate(a.createdAt)}
                    </span>
                  </div>
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
              {loadingMore && (
                <div
                  className={styles.discover_spinner}
                  role="status"
                  aria-label="Yükleniyor"
                />
              )}

              {!loadingMore && hasMore && (
                <div className={styles.discover_load_more}>
                  <button
                    className={styles.discover_load_more_btn}
                    onClick={handleLoadMore}
                  >
                    Daha Fazla Yükle
                  </button>
                </div>
              )}

              {!loadingMore && !hasMore && filtered.length > 0 && (
                <div className={styles.discover_list_end}>Hepsi yüklendi</div>
              )}
            </>
          )}
        </main>

        <aside className={styles.discover_aside}>
          <section className={styles.discover_card}>
            <h2 className={styles.discover_card_title}>
              GELİŞMELERDEN İLK SEN HABERDAR OL!
            </h2>

            <form className={styles.discover_nl} onSubmit={submitNewsletter}>
              <div className={styles.discover_nl_head}>
                <label className={styles.discover_nl_label}>EMAIL</label>
                <button type="submit" className={styles.discover_nl_send}>
                  GÖNDER <span className={styles.discover_nl_arrow}>›</span>
                </button>
              </div>

              <input
                type="email"
                className={styles.discover_nl_input}
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>

            <div className={styles.discover_socials_icons}>
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={30}
                height={30}
              />
              <Image src="/twitter.svg" alt="Twitter" width={30} height={30} />
              <Image src="/discord.svg" alt="Discord" width={30} height={30} />
              <Image src="/spoty.svg" alt="Spotify" width={30} height={30} />
              <Image
                src="/youtube-icon.svg"
                alt="YouTube"
                width={30}
                height={30}
              />
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
