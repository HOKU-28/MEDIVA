import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import styles from "./DoctorList.module.css";

const doctors = [
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
  {
    id: 4,
    name: "Dr. Rina Lestari",
    initials: "RL",
    specialty: "Dokter Kulit",
    rating: "4.8",
    experience: "7 tahun pengalaman",
  },
  {
    id: 5,
    name: "Dr. Budi Santoso",
    initials: "BS",
    specialty: "Dokter Mata",
    rating: "4.7",
    experience: "9 tahun pengalaman",
  },
  {
    id: 6,
    name: "Dr. Kevin Wijaya",
    initials: "KW",
    specialty: "Dokter Umum",
    rating: "4.8",
    experience: "5 tahun pengalaman",
  },
];

const specialties = [
  "Semua Spesialisasi",
  "Dokter Umum",
  "Dokter Gigi",
  "Dokter Anak",
  "Dokter Kulit",
  "Dokter Mata",
];

function DoctorList() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("Semua Spesialisasi");

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("doctorListScroll");

    if (savedScroll) {
      const scrollY = Number(savedScroll);

      const timer = setTimeout(() => {
        window.scrollTo(0, scrollY);
        sessionStorage.removeItem("doctorListScroll");
      }, 0);

      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const specialtyMatch =
      specialty === "Semua Spesialisasi" ||
      doctor.specialty === specialty;

    return nameMatch && specialtyMatch;
  });

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <span className={styles.label}>DOKTER</span>
        <h1>Cari Dokter</h1>
        <p>Temukan dokter yang sesuai dengan kebutuhan kesehatan Anda.</p>
      </section>

      <section className={styles.filters}>
        <input
          type="text"
          placeholder="Cari nama dokter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className={styles.select}
        >
          {specialties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      <section>
        <div className={styles.resultsHeader}>
          <h2>Daftar Dokter</h2>
          <span>{filteredDoctors.length} dokter ditemukan</span>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className={styles.doctorGrid}>
            {filteredDoctors.map((doctor) => (
              <article className={styles.card} key={doctor.id}>
                <div className={styles.doctorTop}>
                  <div className={styles.avatar}>
                    {doctor.initials}
                  </div>

                  <div>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                  </div>
                </div>

                <div className={styles.meta}>
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

                <Link
                  to={`/dokter/${doctor.id}`}
                  className={styles.button}
                  onClick={() =>
                    sessionStorage.setItem("doctorListScroll", window.scrollY)
                  }
                >
                  Lihat Profil
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>Dokter tidak ditemukan</h3>
            <p>Coba gunakan pencarian atau spesialisasi lain.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default DoctorList;