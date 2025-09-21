"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./twitchpage.module.scss";

const TwitchPage: React.FC = () => {
  const data = {
    titleTop: "HER HAFTA",
    titleHighlight: "CANLIDAYIZ",
    kicker: "Bizi Takip Edin!",
    leftImage: "/twitch-left.png",
    rightImage: "/twitch-right.png",
    background: "/twitch-background.png",
  };

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.bgLayer}
        style={{ backgroundImage: `url(${data.background})` }}
      />
      <div className={styles.gradientOverlay} />
      <Image
        src={data.leftImage}
        alt="Sol sanatçı"
        className={`${styles.sideArtist} ${styles.leftArtist}`}
        width={400}
        height={600}
        priority
      />
      <Image
        src={data.rightImage}
        alt="Sağ sanatçı"
        className={`${styles.sideArtist} ${styles.rightArtist}`}
        width={300}
        height={600}
        priority
      />

      <div className={styles.container}>
        <div className={styles.centerCard}>
          <div className={styles.titleRow}>
            <Image
              src="/twitch-icon.svg"
              width={168}
              height={128}
              alt="Twitch"
              className={styles.twitchLogo}
              priority
            />
            <span className={styles.titleDivider} />
            <h1 className={styles.heroTitle}>
              <span className={styles.titleTop}>{data.titleTop}</span>
              <span className={styles.titleHighlight}>
                {data.titleHighlight}
              </span>
            </h1>
          </div>
          <p className={styles.kicker}>{data.kicker}</p>
        </div>

        <div className={styles.actions}>
          <Link href="https://www.twitch.tv/" className={styles.btnWrap}>
            <Image
              src="/follow.svg"
              alt="Takip Et"
              width={106}
              height={37}
              className={styles.btnImage}
              priority
            />
          </Link>
          <div className={styles.split} />
          <Link href="/" className={styles.btnWrap}>
            <Image
              src="/subscribe.svg"
              alt="Abone Ol"
              width={135}
              height={37}
              className={styles.btnImage}
              priority
            />
          </Link>
        </div>
      </div>

      <Image
        src="/Vector.svg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={240}
        className={styles.bottomVector}
        priority
      />
    </section>
  );
};

export default TwitchPage;