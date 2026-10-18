
import { useMemo, useState } from "react";
import {
    Users,
    UserCheck,
    UserX,
    UserPlus,
    Search,
    Eye,
    Pencil,
    Trash2,
    X,
    Mail,
    Phone,
    CalendarDays,
    ShieldCheck,
    AlertCircle,
    ClipboardList,
    Clock,
    Stethoscope,
} from "lucide-react";

import styles from "./AdminUsers.module.css";

const initialUsers = [
    {
        id: 1,
        patientId: "MED-0001",
        name: "Jayden Customer",
        email: "jayden@gmail.com",
        phone: "081234567801",
        birthDate: "2000-05-12",
        role: "Customer",
        status: "Aktif",
        joinedAt: "2026-10-12",
        appointments: [
            {
                id: 101,
                date: "2026-10-20",
                time: "09:00",
                doctor: "Dr. Sarah Wijaya",
                service: "Konsultasi Umum",
                status: "Dikonfirmasi",
            },
            {
                id: 102,
                date: "2026-10-05",
                time: "10:30",
                doctor: "Dr. Budi Santoso",
                service: "Pemeriksaan Umum",
                status: "Selesai",
            },
        ],
    },
    {
        id: 2,
        patientId: "MED-0002",
        name: "Edward Customer",
        email: "edward@gmail.com",
        phone: "081234567802",
        birthDate: "1998-08-20",
        role: "Customer",
        status: "Aktif",
        joinedAt: "2026-10-10",
        appointments: [
            {
                id: 201,
                date: "2026-10-18",
                time: "13:00",
                doctor: "Dr. Sarah Wijaya",
                service: "Konsultasi Umum",
                status: "Dikonfirmasi",
            },
        ],
    },
    {
        id: 3,
        patientId: "MED-0003",
        name: "Dewi Lestari",
        email: "dewi@gmail.com",
        phone: "081234567803",
        birthDate: "1995-03-15",
        role: "Customer",
        status: "Aktif",
        joinedAt: "2026-09-28",
        appointments: [],
    },
    {
        id: 4,
        patientId: "MED-0004",
        name: "Andi Saputra",
        email: "andi@gmail.com",
        phone: "081234567804",
        birthDate: "1992-11-02",
        role: "Customer",
        status: "Nonaktif",
        joinedAt: "2026-09-20",
        appointments: [
            {
                id: 401,
                date: "2026-09-25",
                time: "15:00",
                doctor: "Dr. Budi Santoso",
                service: "Pemeriksaan Umum",
                status: "Selesai",
            },
        ],
    },
];

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    birthDate: "",
};

function formatDate(dateString) {
    if (!dateString) return "-";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function calculateAge(birthDate) {
    if (!birthDate) return "-";

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const hasBirthdayPassed =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
            today.getDate() >= birth.getDate());

    if (!hasBirthdayPassed) age--;

    return age >= 0 ? `${age} tahun` : "-";
}

function AdminUsers() {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua Status");

    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const customers = useMemo(
        () => users.filter((user) => user.role === "Customer"),
        [users]
    );

    const totalCustomers = customers.length;

    const totalActive = customers.filter(
        (user) => user.status === "Aktif"
    ).length;

    const totalInactive = customers.filter(
        (user) => user.status === "Nonaktif"
    ).length;

    const newCustomers = customers.filter((user) => {
        if (!user.joinedAt) return false;

        const joined = new Date(`${user.joinedAt}T00:00:00`);
        const today = new Date();
        const sevenDaysAgo = new Date();

        today.setHours(23, 59, 59, 999);
        sevenDaysAgo.setDate(today.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        return joined >= sevenDaysAgo && joined <= today;
    }).length;

    const filteredUsers = customers.filter((user) => {
        const keyword = searchTerm.trim().toLowerCase();

        const matchesSearch = [
            user.patientId,
            user.name,
            user.email,
        ].some((value) => value.toLowerCase().includes(keyword));

        const matchesStatus =
            statusFilter === "Semua Status" ||
            user.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function openEditModal(user) {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            birthDate: user.birthDate || "",
        });
        setErrorMessage("");
        setIsEditModalOpen(true);
    }

    function closeEditModal() {
        setIsEditModalOpen(false);
        setEditingUser(null);
        setFormData(emptyForm);
        setErrorMessage("");
    }

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim().toLowerCase();
        const phone = formData.phone.trim();

        if (!name || !email) {
            setErrorMessage("Nama dan email wajib diisi.");
            return;
        }

        const emailExists = customers.some(
            (user) =>
                user.email.toLowerCase() === email &&
                user.id !== editingUser?.id
        );

        if (emailExists) {
            setErrorMessage("Email tersebut sudah digunakan akun lain.");
            return;
        }

        const updatedData = {
            name,
            email,
            phone,
            birthDate: formData.birthDate,
        };

        setUsers((previous) =>
            previous.map((user) =>
                user.id === editingUser.id
                    ? { ...user, ...updatedData }
                    : user
            )
        );

        setSelectedUser((previous) =>
            previous?.id === editingUser.id
                ? { ...previous, ...updatedData }
                : previous
        );

        closeEditModal();
    }

    function toggleStatus(user) {
        const nextStatus =
            user.status === "Aktif" ? "Nonaktif" : "Aktif";

        const confirmed = window.confirm(
            `Ubah status akun ${user.name} menjadi ${nextStatus}?`
        );

        if (!confirmed) return;

        setUsers((previous) =>
            previous.map((item) =>
                item.id === user.id
                    ? { ...item, status: nextStatus }
                    : item
            )
        );

        setSelectedUser((previous) =>
            previous?.id === user.id
                ? { ...previous, status: nextStatus }
                : previous
        );
    }

    function handleDelete(user) {
        const confirmed = window.confirm(
            `Yakin ingin menghapus akun ${user.name}? Tindakan ini tidak dapat dibatalkan.`
        );

        if (!confirmed) return;

        setUsers((previous) =>
            previous.filter((item) => item.id !== user.id)
        );

        if (selectedUser?.id === user.id) {
            setSelectedUser(null);
        }
    }

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        MANAJEMEN PENGGUNA
                    </span>
                    <h1>Kelola Pasien</h1>
                    <p>
                        Pantau akun pasien yang terdaftar di MEDIVA.
                    </p>
                </div>
            </header>

            <section className={styles.statsGrid}>
                <StatCard
                    icon={<Users size={21} />}
                    label="Total Pasien"
                    value={totalCustomers}
                    color="blue"
                />
                <StatCard
                    icon={<UserCheck size={21} />}
                    label="Akun Aktif"
                    value={totalActive}
                    color="green"
                />
                <StatCard
                    icon={<UserX size={21} />}
                    label="Akun Nonaktif"
                    value={totalInactive}
                    color="orange"
                />
                <StatCard
                    icon={<UserPlus size={21} />}
                    label="Pasien Baru (7 Hari)"
                    value={newCustomers}
                    color="purple"
                />
            </section>

            <section className={styles.contentCard}>
                <div className={styles.tableHeader}>
                    <div>
                        <h2>Daftar Pasien</h2>
                        <p>
                            Informasi akun pasien yang telah mendaftar.
                        </p>
                    </div>

                    <span className={styles.totalBadge}>
                        {filteredUsers.length} pasien
                    </span>
                </div>

                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <Search size={18} />
                        <input
                            type="search"
                            placeholder="Cari nama, ID, atau email..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className={styles.clearSearch}
                                onClick={() => setSearchTerm("")}
                                aria-label="Hapus pencarian"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <select
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        aria-label="Filter status pasien"
                    >
                        <option>Semua Status</option>
                        <option>Aktif</option>
                        <option>Nonaktif</option>
                    </select>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.userTable}>
                        <thead>
                            <tr>
                                <th>Informasi Pasien</th>
                                <th>Bergabung</th>
                                <th>Janji Temu</th>
                                <th>Status Akun</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className={styles.userInfo}>
                                                <div className={styles.avatar}>
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div className={styles.userText}>
                                                    <strong>{user.name}</strong>
                                                    <span className={styles.patientId}>
                                                        {user.patientId}
                                                    </span>
                                                    <span className={styles.emailText}>
                                                        <Mail size={13} />
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={styles.dateCell}>
                                                <CalendarDays size={15} />
                                                {formatDate(user.joinedAt)}
                                            </div>
                                        </td>

                                        <td>
                                            <span className={styles.appointmentCount}>
                                                <ClipboardList size={15} />
                                                {user.appointments?.length || 0} kunjungan
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={`${styles.statusBadge} ${user.status === "Aktif"
                                                    ? styles.activeStatus
                                                    : styles.inactiveStatus
                                                    }`}
                                                onClick={() => toggleStatus(user)}
                                                title="Klik untuk mengubah status akun"
                                            >
                                                <span className={styles.statusDot} />
                                                {user.status}
                                            </button>
                                        </td>

                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    type="button"
                                                    className={styles.viewButton}
                                                    onClick={() =>
                                                        setSelectedUser(user)
                                                    }
                                                    title="Lihat detail pasien"
                                                    aria-label={`Lihat detail ${user.name}`}
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className={styles.editButton}
                                                    onClick={() =>
                                                        openEditModal(user)
                                                    }
                                                    title="Edit informasi pasien"
                                                    aria-label={`Edit ${user.name}`}
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className={styles.deleteButton}
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                    title="Hapus akun pasien"
                                                    aria-label={`Hapus ${user.name}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <div className={styles.emptyState}>
                                            <Users size={34} />
                                            <h3>Pasien tidak ditemukan</h3>
                                            <p>
                                                Coba kata kunci atau filter status lain.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.tableFooter}>
                    Menampilkan <strong>{filteredUsers.length}</strong> dari{" "}
                    <strong>{totalCustomers}</strong> pasien
                </div>
            </section>

            {/* Modal detail pasien */}
            {selectedUser && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedUser(null);
                        }
                    }}
                >
                    <section
                        className={`${styles.modal} ${styles.detailModal}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="patient-detail-title"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <span className={styles.eyebrow}>
                                    PROFIL PASIEN
                                </span>
                                <h2 id="patient-detail-title">
                                    Detail Pasien
                                </h2>
                            </div>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() => setSelectedUser(null)}
                                aria-label="Tutup detail"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <div className={styles.profileBanner}>
                                <div className={styles.profileAvatar}>
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={styles.profileIdentity}>
                                    <h3>{selectedUser.name}</h3>
                                    <p>{selectedUser.patientId}</p>
                                    <span
                                        className={`${styles.statusBadge} ${selectedUser.status === "Aktif"
                                            ? styles.activeStatus
                                            : styles.inactiveStatus
                                            }`}
                                    >
                                        <span className={styles.statusDot} />
                                        {selectedUser.status}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={styles.profileEditButton}
                                    onClick={() => openEditModal(selectedUser)}
                                >
                                    <Pencil size={15} />
                                    Edit
                                </button>
                            </div>

                            <div className={styles.detailSection}>
                                <h3>
                                    <UserCheck size={17} />
                                    Informasi Akun
                                </h3>
                                <div className={styles.detailGrid}>
                                    <DetailItem
                                        icon={<Mail size={16} />}
                                        label="Email"
                                        value={selectedUser.email}
                                    />
                                    <DetailItem
                                        icon={<Phone size={16} />}
                                        label="Nomor Telepon"
                                        value={selectedUser.phone || "Belum diisi"}
                                    />
                                    <DetailItem
                                        icon={<CalendarDays size={16} />}
                                        label="Tanggal Lahir"
                                        value={formatDate(selectedUser.birthDate)}
                                    />
                                    <DetailItem
                                        icon={<Users size={16} />}
                                        label="Usia"
                                        value={calculateAge(selectedUser.birthDate)}
                                    />
                                    <DetailItem
                                        icon={<CalendarDays size={16} />}
                                        label="Tanggal Bergabung"
                                        value={formatDate(selectedUser.joinedAt)}
                                    />
                                    <DetailItem
                                        icon={<ShieldCheck size={16} />}
                                        label="Peran Akun"
                                        value="Customer / Pasien"
                                    />
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <div className={styles.historyHeading}>
                                    <div>
                                        <h3>
                                            <ClipboardList size={17} />
                                            Riwayat Janji Temu
                                        </h3>
                                        <p>
                                            {selectedUser.appointments?.length || 0} janji temu tercatat
                                        </p>
                                    </div>
                                </div>

                                {selectedUser.appointments?.length ? (
                                    <div className={styles.appointmentList}>
                                        {selectedUser.appointments
                                            .slice()
                                            .sort((a, b) =>
                                                b.date.localeCompare(a.date)
                                            )
                                            .map((appointment) => (
                                                <div
                                                    className={styles.appointmentItem}
                                                    key={appointment.id}
                                                >
                                                    <div className={styles.appointmentIcon}>
                                                        <Stethoscope size={18} />
                                                    </div>
                                                    <div className={styles.appointmentInfo}>
                                                        <strong>{appointment.service}</strong>
                                                        <span>{appointment.doctor}</span>
                                                        <small>
                                                            <CalendarDays size={13} />
                                                            {formatDate(appointment.date)}
                                                            <Clock size={13} />
                                                            {appointment.time}
                                                        </small>
                                                    </div>
                                                    <span
                                                        className={`${styles.appointmentStatus} ${appointment.status === "Selesai"
                                                            ? styles.completedStatus
                                                            : styles.upcomingStatus
                                                            }`}
                                                    >
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className={styles.noAppointments}>
                                        <CalendarDays size={25} />
                                        <strong>Belum ada janji temu</strong>
                                        <p>
                                            Pasien ini belum memiliki riwayat janji temu.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => toggleStatus(selectedUser)}
                            >
                                {selectedUser.status === "Aktif"
                                    ? "Nonaktifkan Akun"
                                    : "Aktifkan Akun"}
                            </button>
                            <button
                                type="button"
                                className={styles.primaryButton}
                                onClick={() => setSelectedUser(null)}
                            >
                                Selesai
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* Modal edit pasien */}
            {isEditModalOpen && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeEditModal();
                        }
                    }}
                >
                    <section
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="edit-patient-title"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <span className={styles.eyebrow}>
                                    DATA PASIEN
                                </span>
                                <h2 id="edit-patient-title">
                                    Edit Informasi Pasien
                                </h2>
                                <p>
                                    Perbarui informasi profil yang diperlukan.
                                </p>
                            </div>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={closeEditModal}
                                aria-label="Tutup modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.modalBody}>
                                {errorMessage && (
                                    <div className={styles.errorMessage}>
                                        <AlertCircle size={17} />
                                        {errorMessage}
                                    </div>
                                )}

                                <div className={styles.formGroup}>
                                    <label htmlFor="patient-name">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="patient-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="patient-email">Email</label>
                                    <input
                                        id="patient-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="patient-phone">
                                        Nomor Telepon
                                    </label>
                                    <input
                                        id="patient-phone"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        autoComplete="tel"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="patient-birth-date">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        id="patient-birth-date"
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div className={styles.infoNotice}>
                                    <ShieldCheck size={17} />
                                    <span>
                                        Perubahan ini hanya mengubah data tampilan
                                        lokal. Pastikan API dan hak akses diterapkan
                                        sebelum digunakan dengan data pasien asli.
                                    </span>
                                </div> */}
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={closeEditModal}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    const iconClass = {
        blue: styles.blueIcon,
        green: styles.greenIcon,
        orange: styles.orangeIcon,
        purple: styles.purpleIcon,
    }[color];

    return (
        <article className={styles.statCard}>
            <div className={`${styles.statIcon} ${iconClass}`}>
                {icon}
            </div>
            <div className={styles.statContent}>
                <p>{label}</p>
                <h3>{value}</h3>
            </div>
        </article>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className={styles.detailItem}>
            <div className={styles.detailItemIcon}>{icon}</div>
            <div>
                <span>{label}</span>
                <strong>{value || "-"}</strong>
            </div>
        </div>
    );
}

export default AdminUsers;
