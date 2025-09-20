"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./trends.module.scss";
import TrendCard from "./TrendCard";
import { TRENDS_LIMITS } from "@/lib/constants";
import { useMainTrendsData } from "@/hooks/useMainTrendsData";
import raw from "../../../data/data.json";

const TrendsSection: React.FC = () => {
  const { visible } = useMainTrendsData(raw, TRENDS_LIMITS.MAIN_TRENDS);

  return (
    <section className={styles.trendsSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Trendler
            <Image
              src="/trend-up.svg"
              width={26}
              height={26}
              alt="trend up"
              className={styles.titleIcon}
            />
          </h2>
        </header>

        <div className={styles.grid}>
          {visible.map((c) => (
            <TrendCard key={c.index} {...c} />
          ))}
        </div>

        <div className={styles.moreWrap}>
          <Link href="/blog" className={styles.moreButton}>
            <span>Tümünü Gör</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendsSection;
