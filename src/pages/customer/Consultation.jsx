import { Link } from "react-router-dom";
import { MessageCircle, Clock, ChevronRight } from "lucide-react";
import styles from "./Consultation.module.css";

const ongoingConsultations = [
  {
    id: 1,
    doctorId: 1,
    doctorName: "Dr. Sarah Wijaya",
    initials: "SW",
    specialty: "Dokter Umum",
    lastMessage: "Baik, terima kasih atas informasinya. Saya akan...",
    lastTime: "10 menit lalu",
    status: "Berlangsung",
  },
  {
    id: 2,
    doctorId: 3,
    doctorName: "Dr. Maya Putri",
    initials: "MP",
    specialty: "Dokter Anak",
    lastMessage: "Apakah demamnya sudah turun hari ini?",
    lastTime: "1 jam lalu",
    status: "Menunggu",
  },
];

const recommendedDoctors = [
  {
    id: 2,
    name: "Dr. Andi Pratama",
    initials: "AP",
    specialty: "Dokter Gigi",
    rating: "4.8",
    available: true,
  },
  {
    id: 4,
    name: "Dr. Rina Lestari",
    initials: "RL",
    specialty: "Dokter Kulit",
    rating: "4.8",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Budi Santoso",
    initials: "BS",
    specialty: "Dokter Mata",
    rating: "4.7",
    available: false,
  },
];

function Consultation() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>KONSULTASI</span>
        <h1>Konsultasi Dokter</h1>
        <p>Mulai atau lanjutkan konsultasi dengan dokter pilihan Anda.</p>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Konsultasi Aktif</h2>
          <Link to="/riwayat" className={styles.viewAll}>
            Lihat Riwayat →
          </Link>
        </div>

        {ongoingConsultations.length === 0 ? (
          <div className={styles.empty}>
            <MessageCircle size={40} strokeWidth={1.5} />
            <p>Tidak ada konsultasi yang sedang berlangsung.</p>
          </div>
        ) : (
          <div className={styles.chatList}>
            {ongoingConsultations.map((chat) => (
              <Link
                key={chat.id}
                to={`/konsultasi/${chat.id}`}
                className={styles.chatCard}
              >
                <div className={styles.avatar}>{chat.initials}</div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatTop}>
                    <strong>{chat.doctorName}</strong>
                    <span className={styles.time}>{chat.lastTime}</span>
                  </div>
                  <span className={styles.specialty}>{chat.specialty}</span>
                  <p className={styles.preview}>{chat.lastMessage}</p>
                </div>
                <div className={styles.chatMeta}>
                  <span
                    className={`${styles.badge} ${
                      chat.status === "Berlangsung"
                        ? styles.badgeActive
                        : styles.badgeWait
                    }`}
                  >
                    {chat.status}
                  </span>
                  <ChevronRight size={18} className={styles.chevron} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Mulai Konsultasi Baru</h2>
          <Link to="/dokter" className={styles.viewAll}>
            Lihat Semua Dokter →
          </Link>
        </div>

        <div className={styles.doctorGrid}>
          {recommendedDoctors.map((doc) => (
            <div key={doc.id} className={styles.doctorCard}>
              <div className={styles.doctorAvatar}>{doc.initials}</div>
              <div className={styles.doctorInfo}>
                <strong>{doc.name}</strong>
                <span>{doc.specialty}</span>
                <div className={styles.doctorMeta}>
                  <span className={styles.rating}>★ {doc.rating}</span>
                  <span
                    className={`${styles.avail} ${
                      doc.available ? styles.availOn : styles.availOff
                    }`}
                  >
                    {doc.available ? "Tersedia" : "Tidak Tersedia"}
                  </span>
                </div>
              </div>
              {doc.available ? (
                <Link
                  to={`/konsultasi/new/${doc.id}`}
                  className={styles.startBtn}
                >
                  <MessageCircle size={15} />
                  Konsultasi
                </Link>
              ) : (
                <button className={styles.startBtnDisabled} disabled>
                  <Clock size={15} />
                  Offline
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Consultation;
