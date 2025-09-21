"use client";
import { useState, useEffect } from "react";
import styles from "./Navigation.module.scss";
import Image from "next/image";

const NAVIGATION_ITEMS = [
  { label: "Anasayfa", href: "/" },
  { label: "Haberler", href: "/haberler" },
  { label: "Müzikler", href: "/muzikler" },
  { label: "Videolar", href: "/videolar" },
  { label: "İletişim", href: "/iletisim" },
];

const MOBILE_MENU = [
  { label: "Haberler", href: "/haberler" },
  { label: "Müzikler", href: "/muzikler" },
  { label: "Videolar", href: "/videolar" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.navigation}>
          <div className={styles.container}>
            <a href="/" className={styles.logoLink}>
              <img src="/logo.svg" alt="Logo" width={140} height={36} />
            </a>

            <ul className={styles.navList}>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Image
                src="/search.svg"
                alt="Ara"
                width={20}
                height={20}
                className={styles.searchButton}
              />

              <a href="/giris" className={styles.premiumButton}>
                <span>GİRİŞ YAP</span>
              </a>
              <button
                className={`${styles.mobileToggle} ${
                  isMenuOpen ? styles.active : ""
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                aria-label="Menüyü Aç/Kapat"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <img
                  src="/mobile-hamburger.svg"
                  alt="Menü"
                  width={28}
                  height={28}
                />
              </button>
            </div>
          </div>
        </nav>
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          <div className={styles.mobileMenuContent}>
            <ul className={styles.mobileNavList}>
              {MOBILE_MENU.map((item) => (
                <li key={item.href} className={styles.mobileNavItem}>
                  <a
                    href={item.href}
                    className={`${styles.mobileNavLink} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.mobileActions}>
              <a
                href="/giris"
                className={styles.mobilePremiumButton}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Giriş Yap</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
