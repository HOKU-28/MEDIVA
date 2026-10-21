import { useState } from "react";
import styles from "./AdminDoctors.module.css";
import { Pencil, Trash2, Stethoscope } from "lucide-react";

const initialDoctors = [
    {
        id: 1,
        name: "Dr. Sarah Wijaya",
        email: "sarah@mediva.com",
        specialty: "Dokter Umum",
        strNumber: "STR-2024-001",
        education: "Universitas Indonesia",
        experience: "5 tahun",
        location: "Medan",
        phone: "081234567890",
        bio: "Dokter umum yang berpengalaman dalam pelayanan kesehatan dan pemeriksaan pasien.",
        initials: "SW",
        rating: 4.9,
        status: "Aktif",
    },
    {
        id: 2,
        name: "Dr. Andi Pratama",
        email: "andi@mediva.com",
        specialty: "Spesialis Jantung",
        strNumber: "STR-2024-002",
        education: "Universitas Sumatera Utara",
        experience: "8 tahun",
        location: "Medan",
        phone: "081234567891",
        bio: "Berfokus pada pemeriksaan dan penanganan penyakit jantung.",
        initials: "AP",
        rating: 4.8,
        status: "Aktif",
    },
    {
        id: 3,
        name: "Dr. Maya Putri",
        email: "maya@mediva.com",
        specialty: "Spesialis Anak",
        strNumber: "STR-2024-003",
        education: "Universitas Gadjah Mada",
        experience: "6 tahun",
        location: "Medan",
        phone: "081234567892",
        bio: "Melayani konsultasi kesehatan dan tumbuh kembang anak.",
        initials: "MP",
        rating: 4.7,
        status: "Nonaktif",
    },
];

const emptyForm = {
    name: "",
    email: "",
    password: "",
    specialty: "",
    strNumber: "",
    education: "",
    experience: "",
    location: "",
    phone: "",
    bio: "",
    rating: "5.0",
    status: "Aktif",
};

function getInitials(name = "") {
    return (
        name
            .replace(/^dr\.?\s*/i, "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("") || "DR"
    );
}

function AdminDoctors() {
    const [doctors, setDoctors] = useState(initialDoctors);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");

    const filteredDoctors = doctors.filter((doctor) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
            doctor.name.toLowerCase().includes(keyword) ||
            doctor.email.toLowerCase().includes(keyword) ||
            doctor.specialty.toLowerCase().includes(keyword);

        const matchesStatus =
            statusFilter === "Semua" || doctor.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function openAddModal() {
        setEditingId(null);
        setForm({ ...emptyForm });
        setShowPassword(false);
        setFormError("");
        setModalOpen(true);
    }

    function openEditModal(doctor) {
        setEditingId(doctor.id);

        setForm({
            name: doctor.name ?? "",
            email: doctor.email ?? "",
            password: "",
            specialty: doctor.specialty ?? "",
            strNumber: doctor.strNumber ?? "",
            education: doctor.education ?? "",
            experience: doctor.experience ?? "",
            location: doctor.location ?? "",
            phone: doctor.phone ?? "",
            bio: doctor.bio ?? "",
            rating: String(doctor.rating ?? "5.0"),
            status: doctor.status ?? "Aktif",
        });

        setShowPassword(false);
        setFormError("");
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingId(null);
        setForm({ ...emptyForm });
        setShowPassword(false);
        setFormError("");
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        const normalizedEmail = form.email.trim().toLowerCase();

        const duplicateEmail = doctors.some(
            (doctor) =>
                doctor.email.toLowerCase() === normalizedEmail &&
                doctor.id !== editingId
        );

        if (duplicateEmail) {
            setFormError("Email ini sudah digunakan oleh dokter lain.");
            return;
        }

        if (editingId === null && form.password.length < 8) {
            setFormError("Password harus memiliki minimal 8 karakter.");
            return;
        }

        const doctorData = {
            name: form.name.trim(),
            email: normalizedEmail,
            specialty: form.specialty.trim(),
            strNumber: form.strNumber.trim(),
            education: form.education.trim(),
            experience: form.experience.trim(),
            location: form.location.trim(),
            phone: form.phone.trim(),
            bio: form.bio.trim(),
            initials: getInitials(form.name),
            rating: Number(form.rating) || 0,
            status: form.status,
        };

        if (editingId !== null) {
            setDoctors((previous) =>
                previous.map((doctor) =>
                    doctor.id === editingId
                        ? { ...doctor, ...doctorData }
                        : doctor
                )
            );

            if (form.password.trim()) {
                alert(
                    "Data dokter diperbarui. Perubahan password belum tersimpan karena backend autentikasi belum dihubungkan."
                );
            } else {
                alert("Data dokter berhasil diperbarui.");
            }
        } else {
            const newDoctor = {
                id:
                    doctors.length > 0
                        ? Math.max(...doctors.map((doctor) => doctor.id)) + 1
                        : 1,
                ...doctorData,
            };

            setDoctors((previous) => [...previous, newDoctor]);

            alert(
                "Data dokter berhasil ditambahkan ke tampilan demo. Akun login belum dibuat karena backend autentikasi belum dihubungkan."
            );
        }

        closeModal();
    }

    function handleDelete(doctor) {
        const confirmed = window.confirm(
            `Yakin ingin menghapus data ${doctor.name}?`
        );

        if (!confirmed) return;

        setDoctors((previous) =>
            previous.filter((item) => item.id !== doctor.id)
        );
    }

    function toggleStatus(doctor) {
        const newStatus =
            doctor.status === "Aktif" ? "Nonaktif" : "Aktif";

        setDoctors((previous) =>
            previous.map((item) =>
                item.id === doctor.id
                    ? { ...item, status: newStatus }
                    : item
            )
        );
    }

    return (
        <main className={styles.page}>
            <section className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>MANAJEMEN</span>
                    <h1>Data Dokter</h1>
                    <p>
                        Kelola informasi, spesialisasi, dan status dokter MEDIVA.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={openAddModal}
                >
                    <span className={styles.plusIcon}>+</span>
                    Tambah Dokter
                </button>
            </section>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.blue}`}>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <p className={styles.statLabel}>Total Dokter</p>
                        <h2 className={styles.statValue}>3</h2>
                        <p className={styles.statDescription}>Seluruh data dokter</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.green}`}>
                        <span>✓</span>
                    </div>
                    <div>
                        <p className={styles.statLabel}>Dokter Aktif</p>
                        <h2 className={styles.statValue}>2</h2>
                        <p className={styles.statDescription}>Status aktif</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.orange}`}>
                        <span>⏸</span>
                    </div>
                    <div>
                        <p className={styles.statLabel}>Dokter Nonaktif</p>
                        <h2 className={styles.statValue}>1</h2>
                        <p className={styles.statDescription}>Status nonaktif</p>
                    </div>
                </div>
            </div>
            <section className={styles.tableCard}>
                <div className={styles.tableHeader}>
                    <div>
                        <h2>Daftar Dokter</h2>
                        <p>Informasi dokter yang terdaftar di MEDIVA.</p>
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.searchBox}>
                            <span className={styles.searchIcon} aria-hidden="true">
                                ⌕
                            </span>
                            <input
                                type="search"
                                placeholder="Cari nama, email, spesialisasi..."
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                aria-label="Cari dokter"
                            />
                        </div>

                        <select
                            className={styles.filterSelect}
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            aria-label="Filter status dokter"
                        >
                            <option value="Semua">Semua Status</option>
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Dokter</th>
                                <th>Spesialisasi</th>
                                <th>Pengalaman</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>
                                        <div className={styles.doctorCell}>
                                            <div className={styles.avatar}>
                                                {doctor.initials || getInitials(doctor.name)}
                                            </div>

                                            <div className={styles.doctorIdentity}>
                                                <strong>{doctor.name}</strong>
                                                <span>{doctor.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={styles.specialty}>
                                            {doctor.specialty}
                                        </span>
                                    </td>

                                    <td>{doctor.experience}</td>

                                    <td>
                                        <span className={styles.rating}>
                                            <span aria-hidden="true">★</span>
                                            {Number(doctor.rating).toFixed(1)}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className={`${styles.statusBadge} ${doctor.status === "Aktif"
                                                ? styles.activeStatus
                                                : styles.inactiveStatus
                                                }`}
                                            onClick={() => toggleStatus(doctor)}
                                            title="Klik untuk mengubah status"
                                        >
                                            <span className={styles.statusDot} />
                                            {doctor.status}
                                        </button>
                                    </td>

                                    <td>

                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={`${styles.actionButton} ${styles.editButton}`}
                                                onClick={() => openEditModal(doctor)}
                                                aria-label={`Edit ${doctor.name}`}
                                                title="Edit dokter"
                                            >
                                                <Pencil size={17} strokeWidth={2} />
                                            </button>

                                            <button
                                                type="button"
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                onClick={() => handleDelete(doctor)}
                                                aria-label={`Hapus ${doctor.name}`}
                                                title="Hapus dokter"
                                            >
                                                <Trash2 size={17} strokeWidth={2} />
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))}

                            {filteredDoctors.length === 0 && (
                                <tr>
                                    <td colSpan="6" className={styles.emptyState}>
                                        <span className={styles.emptyIcon}>⌕</span>
                                        <strong>Dokter tidak ditemukan</strong>
                                        <p>
                                            Coba gunakan kata kunci atau filter status lain.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.tableFooter}>
                    Menampilkan {filteredDoctors.length} dari {doctors.length} dokter
                </div>
            </section>

            {modalOpen && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeModal();
                    }}
                >
                    <section
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="doctorModalTitle"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <span className={styles.eyebrow}>
                                    {editingId !== null ? "PERBARUI DATA" : "DATA BARU"}
                                </span>
                                <h2 id="doctorModalTitle">
                                    {editingId !== null ? "Edit Dokter" : "Tambah Dokter"}
                                </h2>
                                <p>
                                    Lengkapi informasi dokter di bawah ini.
                                </p>
                            </div>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={closeModal}
                                aria-label="Tutup formulir"
                            >
                                ×
                            </button>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <label className={styles.field}>
                                    <span>Nama Lengkap *</span>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Contoh: Dr. Sarah Wijaya"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Email *</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="dokter@mediva.com"
                                        autoComplete="email"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>
                                        {editingId !== null
                                            ? "Password Baru (Opsional)"
                                            : "Password Akun *"}
                                    </span>

                                    <div className={styles.passwordWrapper}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder={
                                                editingId !== null
                                                    ? "Kosongkan jika tidak diganti"
                                                    : "Minimal 8 karakter"
                                            }
                                            autoComplete="new-password"
                                            required={editingId === null}
                                            minLength={8}
                                        />

                                        <button
                                            type="button"
                                            className={styles.passwordToggle}
                                            onClick={() =>
                                                setShowPassword((previous) => !previous)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? "Sembunyikan password"
                                                    : "Tampilkan password"
                                            }
                                            title={
                                                showPassword
                                                    ? "Sembunyikan password"
                                                    : "Tampilkan password"
                                            }
                                        >
                                            <span
                                                className={`${styles.eyeIcon} ${showPassword ? styles.eyeClosed : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <small className={styles.helperText}>
                                        {editingId !== null
                                            ? "Kosongkan jika tidak ingin mengganti password."
                                            : "Password minimal 8 karakter."}
                                    </small>
                                </label>

                                <label className={styles.field}>
                                    <span>Spesialisasi *</span>
                                    <input
                                        name="specialty"
                                        value={form.specialty}
                                        onChange={handleChange}
                                        placeholder="Contoh: Dokter Umum"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Nomor STR *</span>
                                    <input
                                        name="strNumber"
                                        value={form.strNumber}
                                        onChange={handleChange}
                                        placeholder="Nomor registrasi dokter"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Pendidikan *</span>
                                    <input
                                        name="education"
                                        value={form.education}
                                        onChange={handleChange}
                                        placeholder="Nama universitas"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Pengalaman *</span>
                                    <input
                                        name="experience"
                                        value={form.experience}
                                        onChange={handleChange}
                                        placeholder="Contoh: 5 tahun"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Lokasi Praktik *</span>
                                    <input
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="Kota atau lokasi praktik"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>No. Telepon *</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Contoh: 081234567890"
                                        autoComplete="tel"
                                        required
                                    />
                                </label>

                                <label className={styles.field}>
                                    <span>Rating</span>
                                    <select
                                        name="rating"
                                        value={form.rating}
                                        onChange={handleChange}
                                    >
                                        <option value="5">5.0</option>
                                        <option value="4.9">4.9</option>
                                        <option value="4.8">4.8</option>
                                        <option value="4.7">4.7</option>
                                        <option value="4.6">4.6</option>
                                        <option value="4.5">4.5</option>
                                        <option value="4">4.0</option>
                                    </select>
                                </label>

                                <label className={styles.field}>
                                    <span>Status</span>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Nonaktif</option>
                                    </select>
                                </label>

                                <label className={`${styles.field} ${styles.fullWidth}`}>
                                    <span>Tentang Dokter</span>
                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        placeholder="Tuliskan deskripsi singkat dokter..."
                                        rows={4}
                                    />
                                </label>
                            </div>

                            {formError && (
                                <div className={styles.formError} role="alert">
                                    {formError}
                                </div>
                            )}

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>

                                <button type="submit" className={styles.primaryButton}>
                                    {editingId !== null ? "Simpan Perubahan" : "Tambah Dokter"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default AdminDoctors;
