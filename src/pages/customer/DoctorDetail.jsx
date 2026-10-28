import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, TriangleAlert } from "lucide-react";
import { doctorsList, getSavedDoctorProfile } from "../../data/doctorData";
import styles from "./DoctorDetail.module.css";

function DoctorDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const doctor = getSavedDoctorProfile(
    doctorsList.find((doc) => doc.id === Number(id))
  );

  if (!doctor) {
    return (
      <main className={styles.page}>
        <h2>Dokter tidak ditemukan</h2>
        <Link to="/dokter">Kembali ke Cari Dokter</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link to="/dokter" className={styles.back}>
        ← Kembali ke Cari Dokter
      </Link>

      <section className={styles.profile}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name} className={styles.avatarImg} />
            ) : (
              doctor.initials
            )}
          </div>

          <div>
            <span className={styles.specialty}>
              {doctor.specialty}
            </span>

            <h1>{doctor.name}</h1>

            <div className={styles.rating}>
              <Star
                size={15}
                fill="currentColor"
                aria-hidden="true"
              />
              {doctor.rating}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div>
            <h2>Tentang Dokter</h2>

            <p>{doctor.description}</p>

            <div className={styles.info}>
              <div>
                <span>Pendidikan</span>
                <strong>{doctor.education}</strong>
              </div>

              <div>
                <span>Pengalaman</span>
                <strong>{doctor.experience}</strong>
              </div>

              <div>
                <span>Lokasi Praktik</span>
                <strong>{doctor.location}</strong>
              </div>
            </div>
          </div>

          <aside className={styles.bookingCard}>
            <h2>Jadwal Praktik</h2>

            <p>{doctor.schedule}</p>

            <div className={styles.buttonGroup}>
              <Link
                to={`/booking/${doctor.id}`}
                className={styles.bookingButton}
              >
                Buat Janji
              </Link>

              <Link
                to={`/konsultasi/${doctor.id}`}
                className={styles.chatButton}
                onClick={() => {
                  const stored = JSON.parse(localStorage.getItem("riwayat") || "[]");
                  const filtered = stored.filter((r) => r.doctorId !== doctor.id);
                  const newEntry = {
                    id: Date.now(),
                    doctorId: doctor.id,
                    doctorName: doctor.name,
                    initials: doctor.initials,
                    specialty: doctor.specialty,
                    status: "Berlangsung",
                    date: new Date().toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    chatId: doctor.id,
                  };
                  localStorage.setItem("riwayat", JSON.stringify([newEntry, ...filtered]));
                }}
              >
                Konsultasi
              </Link>
            </div>

            <div className={styles.emergencyNotice}>
              <TriangleAlert size={16} className={styles.emergencyIcon} aria-hidden="true" />
              <span>Layanan ini untuk keluhan non-darurat. Dalam kondisi kritis, segera hubungi 112/119 atau kunjungi IGD terdekat.</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default DoctorDetail;
