import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./trends.module.scss";

export interface TrendCardProps {
  index: number;
  authorAvatar?: string | null;
  authorName?: string | null;
  title: string;
  href: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  index,
  authorAvatar,
  authorName,
  title,
  href,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.index} aria-hidden>
        {String(index).padStart(2, "0")}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <Image
            src={authorAvatar || "/a1.svg"}
            alt={authorName || "Yazar"}
            width={24}
            height={24}
            className={styles.avatar}
          />
          <span className={styles.author}>{authorName || "Yazar"}</span>
        </div>

        <Link href={href} className={styles.cardTitle}>
          {title}
        </Link>

        <div className={styles.hr} />

        <Link href={href} className={styles.readMore}>
          Daha Fazla Oku
        </Link>
      </div>
    </article>
  );
};

export default TrendCard;
