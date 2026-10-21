import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, Search, X } from "lucide-react";
import { doctorsList, doctorSpecialties } from "../../data/doctorData";
import styles from "./DoctorList.module.css";

function DoctorList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySpecialty = searchParams.get("spesialisasi");

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState(
    querySpecialty || "Semua Spesialisasi"
  );

  useEffect(() => {
    if (querySpecialty) {
      setSpecialty(querySpecialty);
    } else {
      setSpecialty("Semua Spesialisasi");
    }
  }, [querySpecialty]);

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

  function handleSpecialtyChange(e) {
    const val = e.target.value;
    setSpecialty(val);
    if (val === "Semua Spesialisasi") {
      searchParams.delete("spesialisasi");
    } else {
      searchParams.set("spesialisasi", val);
    }
    setSearchParams(searchParams, { replace: true });
  }

  const filteredDoctors = doctorsList.filter((doctor) => {
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
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder="Cari nama dokter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
            aria-label="Cari nama dokter"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className={styles.clearButton}
              aria-label="Hapus pencarian"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        <select
          value={specialty}
          onChange={handleSpecialtyChange}
          className={styles.select}
          aria-label="Pilih spesialisasi dokter"
        >
          {doctorSpecialties.map((item) => (
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
                    {doctor.image ? (
                      <img src={doctor.image} alt={doctor.name} className={styles.avatarImg} />
                    ) : (
                      doctor.initials
                    )}
                  </div>

                  <div>
                    <h3>{doctor.name}</h3>
                    <p className={styles.specialty}>{doctor.specialty}</p>
                    {doctor.education && (
                      <p className={styles.education}>{doctor.education}</p>
                    )}
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
