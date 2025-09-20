"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "../../../data/data.json";
import RelatedContent from "../../components/RelatedContent/RelatedContent";
import styles from "./blog.module.scss";
import TrendsSection from "../_components/Trends/BlogTrendPage";
import { formatNumber, truncateTitle } from "../../../lib/utils";
import { useNewsletter } from "../../../hooks/useNewsletter";
import { useLike } from "../../../hooks/useLike";
import { use } from "react";

interface BlogPost {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    authors: string[];
    category: string[];
    tags: string[];
    content: string;
    slug: string;
  };
  createdAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: PageProps) {
  const { slug } = use(params);
  
  const { email, setEmail, submitNewsletter } = useNewsletter();
  const { isLiked, currentLikes, handleLike } = useLike(14);

  const post = (data as BlogPost[]).find(
    (p) => p.attributes.slug === slug
  );

  if (!post) {
    notFound();
  }

  const stats = {
    views: 2847,
    likes: 14,
    comments: 3,
  };

  return (
    <div className={styles.blogContainer}>
      <div className={styles.blogGrid}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Anasayfa
          </Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <Link href="/blog" className={styles.breadcrumbLink}>
            Blog
          </Link>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={styles.breadcrumbCurrent}
            title={post.attributes.title}
          >
            {truncateTitle(post.attributes.title)}
          </span>
        </nav>

        <main className={styles.mainContent}>
          <article className={styles.blogPost}>
            <header className={styles.header}>
              <div className={styles.viewCount}>
                <Image
                  src="/view.svg"
                  alt="Görüntülenme"
                  width={16}
                  height={16}
                  className={styles.viewIcon}
                />
                <span>{formatNumber(stats.views)}</span>
              </div>

              <h1 className={styles.title}>{post.attributes.title}</h1>
            </header>

            <div className={styles.featuredImage}>
              <Image
                src={post.attributes.img}
                alt={post.attributes.title}
                width={800}
                height={400}
                className={styles.image}
                priority
              />
            </div>

            <div className={styles.content}>
              <div className={styles.description}>{post.attributes.desc}</div>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.attributes.content }}
              />
            </div>

            <div className={styles.socialStats}>
              <button
                className={`${styles.statButton} ${
                  isLiked ? styles.liked : ""
                }`}
                onClick={handleLike}
              >
                <Image
                  src="/like.svg"
                  alt="Beğeni"
                  width={20}
                  height={20}
                  className={styles.statIcon}
                />
                <span>{currentLikes}</span>
              </button>

              <div className={styles.statItem}>
                <Image
                  src="/comment.svg"
                  alt="Yorum"
                  width={20}
                  height={20}
                  className={styles.statIcon}
                />
                <span>{stats.comments}</span>
              </div>
            </div>

            <RelatedContent currentPost={post} allPosts={data as BlogPost[]} />
          </article>
        </main>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>
              GELİŞMELERDEN İLK SEN HABERDAR OL!
            </h2>

            <form className={styles.newsletter} onSubmit={submitNewsletter}>
              <div className={styles.newsletterHead}>
                <label className={styles.newsletterLabel}>EMAIL</label>
                <button type="submit" className={styles.newsletterSend}>
                  GÖNDER <span className={styles.newsletterArrow}>›</span>
                </button>
              </div>

              <input
                type="email"
                className={styles.newsletterInput}
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>

            <div className={styles.socialIcons}>
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
        <TrendsSection />
      </div>
    </div>
  );
}