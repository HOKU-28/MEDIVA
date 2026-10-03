import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Stethoscope, Smile, Baby, Star } from "lucide-react";

const services = [
  {
    title: "Dokter Umum",
    description: "Konsultasi kesehatan umum dengan dokter terpercaya.",
  },
  {
    title: "Dokter Gigi",
    description: "Perawatan dan konsultasi kesehatan gigi.",
  },
  {
    title: "Dokter Anak",
    description: "Konsultasi kesehatan dan tumbuh kembang anak.",
  },
];

const featuredDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya",
    initials: "SW",
    specialty: "Dokter Umum",
    rating: "4.9",
    experience: "8 tahun pengalaman",
  },
  {
    id: 2,
    name: "Dr. Andi Pratama",
    initials: "AP",
    specialty: "Dokter Gigi",
    rating: "4.8",
    experience: "6 tahun pengalaman",
  },
  {
    id: 3,
    name: "Dr. Maya Putri",
    initials: "MP",
    specialty: "Dokter Anak",
    rating: "4.9",
    experience: "10 tahun pengalaman",
  },
];

function Home() {
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

          <Link to="/dokter" className={styles.primaryButton}>
            Cari Dokter
          </Link>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <span className={styles.heroCardIcon}>
              <Stethoscope size={24} aria-hidden="true" />
            </span>

            <div>
              <strong>MEDIVA</strong>
              <p>Healthcare made simple.</p>
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

              <Link to="/dokter" className={styles.cardLink}>
                Lihat Dokter →
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
                {doctor.initials}
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
    </main>
  );
}

export default Home;