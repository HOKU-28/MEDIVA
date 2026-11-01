import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.code}>404</span>
        <h1>Halaman tidak ditemukan</h1>
        <p>Maaf, halaman yang Anda cari tidak tersedia atau alamatnya salah.</p>
        <Link to="/" className={styles.homeLink}>
          Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}
