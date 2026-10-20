import { Link } from "react-router-dom";
import { Stethoscope, Smile, Baby, Star, Clock, ShieldCheck } from "lucide-react";
import { doctorsList } from "../../data/doctorData";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Home.module.css";

const services = [
  {
    title: "Dokter Umum",
    description: "Konsultasi kesehatan umum dengan dokter terpercaya.",
    link: "/dokter?spesialisasi=Dokter%20Umum",
  },
  {
    title: "Dokter Gigi",
    description: "Perawatan dan konsultasi kesehatan gigi.",
    link: "/dokter?spesialisasi=Dokter%20Gigi",
  },
  {
    title: "Dokter Anak",
    description: "Konsultasi kesehatan dan tumbuh kembang anak.",
    link: "/dokter?spesialisasi=Dokter%20Anak",
  },
];

function Home() {
  const { user } = useAuth();
  const featuredDoctors = doctorsList.slice(0, 3);

  const historyLink =
    user?.role === "doctor"
      ? "/doctor/appointment"
      : user?.role === "admin"
      ? "/admin"
      : "/riwayat";

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>
            Layanan Kesehatan Digital
          </span>

          <h1>
            Temukan Dokter yang
            <span> Tepat untuk Anda</span>
          </h1>

          <p>
            Cari dokter, lihat jadwal praktik, dan buat janji
            konsultasi dengan mudah melalui MEDIVA.
          </p>

          <div className={styles.heroActions}>
            <Link to="/dokter" className={styles.primaryButton}>
              Cari Dokter
            </Link>
            <Link to={historyLink} className={styles.secondaryButton}>
              Lihat Riwayat
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.clinicCard}>
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              <span>Praktik Klinik Aktif Hari Ini</span>
            </div>

            <div className={styles.clinicHeader}>
              <div className={styles.clinicIcon}>
                <Stethoscope size={24} aria-hidden="true" />
              </div>
              <div>
                <strong>Klinik Utama MEDIVA</strong>
                <p>Jakarta Selatan</p>
              </div>
            </div>

            <div className={styles.clinicMeta}>
              <div className={styles.metaRow}>
                <Clock size={16} aria-hidden="true" />
                <span>Senin - Jumat, 09.00 - 15.00 WIB</span>
              </div>
              <div className={styles.metaRow}>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>{doctorsList.length} Dokter Spesialis Terdaftar</span>
              </div>
            </div>

            <div className={styles.clinicFooter}>
              <div className={styles.ratingInfo}>
                <Star size={16} fill="currentColor" aria-hidden="true" />
                <strong>4.9</strong>
                <span>Kepuasan Pasien</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>LAYANAN</span>
            <h2>Layanan Kesehatan</h2>
          </div>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div className={styles.serviceCard} key={service.title}>
              <div className={styles.serviceIcon}>
                {service.title === "Dokter Umum" && (
                  <Stethoscope size={24} aria-hidden="true" />
                )}

                {service.title === "Dokter Gigi" && (
                  <Smile size={24} aria-hidden="true" />
                )}

                {service.title === "Dokter Anak" && (
                  <Baby size={24} aria-hidden="true" />
                )}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <Link to={service.link} className={styles.cardLink}>
                Lihat Dokter {service.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.doctorSection}`}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>DOKTER</span>
            <h2>Dokter Pilihan</h2>
          </div>

          <Link to="/dokter" className={styles.viewAll}>
            Lihat Semua →
          </Link>
        </div>

        <div className={styles.doctorGrid}>
          {featuredDoctors.map((doctor) => (
            <article
              className={styles.doctorCard}
              key={doctor.id}
            >
              <div className={styles.doctorAvatar}>
                {doctor.image ? (
                  <img src={doctor.image} alt={doctor.name} className={styles.avatarImg} />
                ) : (
                  doctor.initials
                )}
              </div>

              <div className={styles.doctorInfo}>
                <h3>{doctor.name}</h3>

                <span className={styles.specialty}>
                  {doctor.specialty}
                </span>

                <div className={styles.doctorMeta}>
                  <span>
                    <Star
                      size={15}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                    {doctor.rating}
                  </span>

                  <span>{doctor.experience}</span>
                </div>
              </div>

              <Link
                to={`/dokter/${doctor.id}`}
                className={styles.profileButton}
              >
                Lihat Profil
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.doctorEntry}>
        <span>Anda tenaga medis di MEDIVA?</span>
        <Link to="/doctor">Masuk sebagai Dokter →</Link>
      </footer>
    </main>
  );
}

export default Home;
