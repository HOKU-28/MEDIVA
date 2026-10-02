import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import styles from "./DoctorDetail.module.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wijaya",
    initials: "SW",
    specialty: "Dokter Umum",
    rating: "4.9",
    experience: "8 tahun pengalaman",
    education: "Universitas Indonesia",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter umum yang berpengalaman dalam menangani berbagai keluhan kesehatan umum dan memberikan konsultasi kesehatan.",
    schedule: "Senin - Jumat, 09.00 - 15.00",
  },
  {
    id: 2,
    name: "Dr. Andi Pratama",
    initials: "AP",
    specialty: "Dokter Gigi",
    rating: "4.8",
    experience: "6 tahun pengalaman",
    education: "Universitas Gadjah Mada",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter gigi yang fokus pada perawatan dan konsultasi kesehatan gigi untuk pasien dewasa maupun anak.",
    schedule: "Senin - Sabtu, 10.00 - 16.00",
  },
  {
    id: 3,
    name: "Dr. Maya Putri",
    initials: "MP",
    specialty: "Dokter Anak",
    rating: "4.9",
    experience: "10 tahun pengalaman",
    education: "Universitas Airlangga",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter anak yang membantu memantau kesehatan, pertumbuhan, dan perkembangan anak.",
    schedule: "Senin - Jumat, 08.00 - 14.00",
  },
  {
    id: 4,
    name: "Dr. Rina Lestari",
    initials: "RL",
    specialty: "Dokter Kulit",
    rating: "4.8",
    experience: "7 tahun pengalaman",
    education: "Universitas Padjadjaran",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter spesialis kulit yang memberikan konsultasi dan perawatan berbagai masalah kulit.",
    schedule: "Selasa - Sabtu, 10.00 - 16.00",
  },
  {
    id: 5,
    name: "Dr. Budi Santoso",
    initials: "BS",
    specialty: "Dokter Mata",
    rating: "4.7",
    experience: "9 tahun pengalaman",
    education: "Universitas Diponegoro",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter mata yang memberikan pemeriksaan dan konsultasi mengenai kesehatan mata.",
    schedule: "Senin - Jumat, 09.00 - 15.00",
  },
  {
    id: 6,
    name: "Dr. Kevin Wijaya",
    initials: "KW",
    specialty: "Dokter Umum",
    rating: "4.8",
    experience: "5 tahun pengalaman",
    education: "Universitas Brawijaya",
    location: "MEDIVA Clinic Jakarta",
    description:
      "Dokter umum yang melayani konsultasi kesehatan dan pemeriksaan kondisi kesehatan umum.",
    schedule: "Senin - Sabtu, 09.00 - 15.00",
  },
];

function DoctorDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const doctor = doctors.find((doctor) => doctor.id === Number(id));

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
            {doctor.initials}
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

            <Link
              to={`/booking/${doctor.id}`}
              className={styles.bookingButton}
            >
              Buat Janji
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default DoctorDetail;