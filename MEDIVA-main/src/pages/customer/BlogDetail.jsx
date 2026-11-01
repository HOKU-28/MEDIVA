import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { getBlogBySlug, getRelatedBlogs } from "../../data/blogsData";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { slug } = useParams();
  const article = getBlogBySlug(slug);
  const relatedArticles = getRelatedBlogs(slug, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFoundCard} role="status">
            <div className={styles.notFoundIcon}>
              <BookOpen size={36} aria-hidden="true" />
            </div>
            <h1>Artikel Tidak Ditemukan</h1>
            <p>
              Maaf, artikel kesehatan yang Anda tuju tidak ditemukan atau tautan
              yang digunakan tidak valid.
            </p>
            <Link to="/blogs" className={styles.notFoundBtn}>
              <ArrowLeft size={16} aria-hidden="true" /> Kembali ke Pusat Edukasi
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight
            size={14}
            className={styles.breadcrumbSep}
            aria-hidden="true"
          />
          <Link to="/blogs" className={styles.breadcrumbLink}>
            Blogs
          </Link>
          <ChevronRight
            size={14}
            className={styles.breadcrumbSep}
            aria-hidden="true"
          />
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>

        <Link
          to="/blogs"
          className={styles.backLink}
          aria-label="Kembali ke Daftar Artikel"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Kembali ke Daftar Artikel
        </Link>

        <article className={styles.articleCard}>
          <header className={styles.articleHeader}>
            <span className={styles.categoryTag}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>

            <div className={styles.metaRow}>
              <span>{article.author}</span>
              <span className={styles.metaDot} aria-hidden="true">
                •
              </span>
              <time dateTime={article.date}>{article.date}</time>
              <span className={styles.metaDot} aria-hidden="true">
                •
              </span>
              <span className={styles.readTimeBadge}>
                <Clock size={14} aria-hidden="true" /> {article.readTime}
              </span>
            </div>
          </header>

          <p className={styles.leadSummary}>{article.summary}</p>

          {article.image?.src && (
            <figure className={styles.featuredFigure}>
              <img
                src={article.image.src}
                alt={article.image.alt || article.title}
                className={styles.featuredImage}
                loading="eager"
                fetchPriority="high"
              />
              {article.image.caption && (
                <figcaption className={styles.featuredCaption}>
                  {article.image.caption}
                </figcaption>
              )}
            </figure>
          )}

          {article.takeaways && article.takeaways.length > 0 && (
            <section
              className={styles.takeawaysCard}
              aria-label="Poin Penting Artikel"
            >
              <h3 className={styles.takeawaysTitle}>
                <CheckCircle2 size={18} aria-hidden="true" /> Poin Penting (Key
                Takeaways)
              </h3>
              <ul className={styles.takeawaysList}>
                {article.takeaways.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.bodyContent}>
            {article.sections.map((section, idx) => (
              <section key={idx} className={styles.sectionBlock}>
                <h2>{section.heading}</h2>
                {section.image?.src && (
                  <figure className={styles.inlineFigure}>
                    <img
                      src={section.image.src}
                      alt={section.image.alt || section.heading}
                      className={styles.inlineImage}
                      loading="lazy"
                    />
                    {section.image.caption && (
                      <figcaption className={styles.inlineCaption}>
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </section>
            ))}
          </div>

          <aside className={styles.disclaimerBox} role="alert">
            <AlertCircle
              size={22}
              className={styles.disclaimerIcon}
              aria-hidden="true"
            />
            <div className={styles.disclaimerText}>
              <h4>Catatan Edukasi Medis</h4>
              <p>
                Informasi dalam artikel ini disajikan untuk tujuan edukasi dan
                wawasan kesehatan umum, bukan sebagai pengganti nasihat medis
                profesional, diagnosis klinis, atau rencana terapi personal.
                Apabila Anda mengalami keluhan kesehatan yang mengganggu atau
                gejala memburuk, segera konsultasikan dengan dokter profesional
                di fasilitas kesehatan terdekat atau melalui layanan konsultasi
                MEDIVA.
              </p>
            </div>
          </aside>

          <section
            className={styles.ctaCard}
            aria-label="Ajakan Konsultasi Dokter"
          >
            <div className={styles.ctaLeft}>
              <div className={styles.ctaIcon}>
                <Stethoscope size={26} aria-hidden="true" />
              </div>
              <div className={styles.ctaContent}>
                <h3>Memiliki Keluhan Terkait Topik Ini?</h3>
                <p>
                  Konsultasikan gejala atau pertanyaan kesehatan Anda langsung
                  dengan dokter berlisensi di MEDIVA.
                </p>
              </div>
            </div>
            <Link
              to={article.doctorCta?.link || "/dokter"}
              className={styles.ctaBtn}
            >
              {article.doctorCta?.label || "Cari Dokter Terkait"}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
        </article>

        {relatedArticles.length > 0 && (
          <section
            className={styles.relatedSection}
            aria-label="Artikel Terkait"
          >
            <h2>Artikel Terkait</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blogs/${rel.slug}`}
                  className={styles.relatedCard}
                >
                  {rel.image?.src && (
                    <div className={styles.relatedThumbWrap}>
                      <img
                        src={rel.image.src}
                        alt={rel.image.alt || rel.title}
                        className={styles.relatedThumb}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className={styles.relatedCardBody}>
                    <span className={styles.relatedCategory}>
                      {rel.category}
                    </span>
                    <h3>{rel.title}</h3>
                    <div className={styles.relatedFooter}>
                      <span>{rel.readTime}</span>
                      <span className={styles.relatedLink}>
                        Baca <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}