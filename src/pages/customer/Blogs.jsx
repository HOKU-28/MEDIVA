import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, BookOpen, X, Sparkles } from "lucide-react";
import { blogsData, CATEGORIES, getFeaturedBlog } from "../../data/blogsData";
import styles from "./Blogs.module.css";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const featuredBlog = useMemo(() => getFeaturedBlog(), []);

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((article) => {
      const matchCategory =
        activeCategory === "Semua" || article.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchCategory && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  const showFeaturedHero =
    activeCategory === "Semua" && !searchQuery.trim() && featuredBlog;

  function handleReset() {
    setSearchQuery("");
    setActiveCategory("Semua");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.badge}>EDUKASI KESEHATAN</span>
        <h1>Pusat Edukasi Kesehatan MEDIVA</h1>
        <p>
          Wawasan medis terpercaya, panduan gaya hidup sehat, dan artikel
          edukatif yang disusun untuk mendukung keputusan kesehatan harian Anda
          dan keluarga.
        </p>
      </header>

      <section className={styles.controls} aria-label="Filter Artikel">
        <div className={styles.searchWrap}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik atau artikel kesehatan..."
            className={styles.searchInput}
            aria-label="Cari artikel kesehatan"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className={styles.clearBtn}
              aria-label="Hapus pencarian"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className={styles.categoryPills} role="group" aria-label="Filter Kategori">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`${styles.pill} ${isActive ? styles.activePill : ""}`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {showFeaturedHero && (
        <section className={styles.featuredCard} aria-label="Artikel Pilihan">
          {featuredBlog.image?.src && (
            <div className={styles.featuredImageWrap}>
              <img
                src={featuredBlog.image.src}
                alt={featuredBlog.image.alt || featuredBlog.title}
                className={styles.featuredImage}
                loading="eager"
              />
            </div>
          )}
          <div className={styles.featuredContent}>
            <div className={styles.featuredTop}>
              <span className={styles.featuredTag}>
                <Sparkles size={13} aria-hidden="true" /> Pilihan Redaksi
              </span>
              <span className={styles.featuredCategory}>
                {featuredBlog.category}
              </span>
              <span className={styles.featuredReadTime}>
                <Clock size={13} aria-hidden="true" /> {featuredBlog.readTime}
              </span>
            </div>

            <h2>{featuredBlog.title}</h2>
            <p>{featuredBlog.summary}</p>

            <div className={styles.featuredFooter}>
              <span className={styles.featuredMeta}>
                {featuredBlog.author} • {featuredBlog.date}
              </span>
              <Link
                to={`/blogs/${featuredBlog.slug}`}
                className={styles.featuredBtn}
              >
                Baca Artikel Lengkap <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className={styles.resultsHeader}>
        <h2>
          {activeCategory === "Semua" ? "Daftar Artikel" : `Kategori: ${activeCategory}`}
        </h2>
        <span className={styles.resultsCount}>
          {filteredBlogs.length} artikel ditemukan
        </span>
      </section>

      {filteredBlogs.length > 0 ? (
        <section className={styles.grid} aria-label="Daftar Artikel Kesehatan">
          {filteredBlogs.map((article) => (
            <article key={article.id}>
              <Link
                to={`/blogs/${article.slug}`}
                className={styles.card}
              >
                {article.image?.src && (
                  <div className={styles.cardImageWrap}>
                    <img
                      src={article.image.src}
                      alt={article.image.alt || article.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <span className={styles.categoryTag}>
                      {article.category}
                    </span>
                    <span className={styles.readTime}>
                      <Clock size={13} aria-hidden="true" /> {article.readTime}
                    </span>
                  </div>

                  <h3>{article.title}</h3>
                  <p className={styles.excerpt}>{article.summary}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.authorMeta}>{article.author}</span>
                  <span className={styles.readMore}>
                    Baca Selengkapnya <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.emptyState} aria-label="Hasil Tidak Ditemukan">
          <div className={styles.emptyIcon}>
            <BookOpen size={28} aria-hidden="true" />
          </div>
          <h3>Artikel Tidak Ditemukan</h3>
          <p>
            Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot;
            {activeCategory !== "Semua" && ` pada kategori ${activeCategory}`}.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetBtn}
          >
            Reset Pencarian & Filter
          </button>
        </section>
      )}
    </main>
  );
}