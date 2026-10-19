import { useMemo, useState } from "react";
import styles from "./AdminServices.module.css";
import { Pencil, Power, Trash2 } from "lucide-react";

const initialServices = [
    {
        id: 1,
        name: "Konsultasi Dokter Umum",
        category: "Umum",
        description: "Pemeriksaan awal dan konsultasi keluhan kesehatan umum.",
        price: 100000,
        duration: 30,
        status: "Aktif",
    },
    {
        id: 2,
        name: "Konsultasi Dokter Gigi",
        category: "Gigi",
        description: "Konsultasi kesehatan gigi dan kebersihan mulut.",
        price: 150000,
        duration: 30,
        status: "Aktif",
    },
    {
        id: 3,
        name: "Konsultasi Dokter Anak",
        category: "Anak",
        description: "Konsultasi kesehatan dan tumbuh kembang anak.",
        price: 175000,
        duration: 30,
        status: "Aktif",
    },
    {
        id: 4,
        name: "Konsultasi Dokter Kulit",
        category: "Kulit",
        description: "Konsultasi masalah kulit dan perawatannya.",
        price: 200000,
        duration: 30,
        status: "Aktif",
    },
    {
        id: 5,
        name: "Konsultasi Dokter Mata",
        category: "Mata",
        description: "Konsultasi kesehatan mata dan penglihatan.",
        price: 175000,
        duration: 30,
        status: "Nonaktif",
    },
];

const emptyForm = {
    name: "",
    category: "Umum",
    description: "",
    price: "",
    duration: "30",
    status: "Aktif",
};

const categories = ["Umum", "Gigi", "Anak", "Kulit", "Mata"];

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

function AdminServices() {
    const [services, setServices] = useState(initialServices);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });

    const totalServices = services.length;

    const activeServices = services.filter(
        (service) => service.status === "Aktif"
    ).length;

    const inactiveServices = services.filter(
        (service) => service.status === "Nonaktif"
    ).length;

    const filteredServices = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return services.filter((service) => {
            const matchesSearch =
                service.name.toLowerCase().includes(keyword) ||
                service.category.toLowerCase().includes(keyword) ||
                service.description.toLowerCase().includes(keyword);

            const matchesStatus =
                statusFilter === "Semua" ||
                service.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [services, search, statusFilter]);

    function openAddModal() {
        setEditingId(null);
        setForm({ ...emptyForm });
        setIsModalOpen(true);
    }

    function openEditModal(service) {
        setEditingId(service.id);
        setForm({
            name: service.name,
            category: service.category,
            description: service.description,
            price: String(service.price),
            duration: String(service.duration),
            status: service.status,
        });
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingId(null);
        setForm({ ...emptyForm });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const name = form.name.trim();
        const description = form.description.trim();
        const price = Number(form.price);
        const duration = Number(form.duration);

        if (!name || !description) {
            alert("Nama dan deskripsi layanan wajib diisi.");
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            alert("Harga harus lebih besar dari 0.");
            return;
        }

        if (
            !Number.isInteger(duration) ||
            duration <= 0
        ) {
            alert("Durasi harus berupa angka menit yang valid.");
            return;
        }

        const duplicateName = services.some(
            (service) =>
                service.name.toLowerCase() === name.toLowerCase() &&
                service.id !== editingId
        );

        if (duplicateName) {
            alert("Nama layanan tersebut sudah tersedia.");
            return;
        }

        const serviceData = {
            name,
            category: form.category,
            description,
            price,
            duration,
            status: form.status,
        };

        if (editingId !== null) {
            setServices((current) =>
                current.map((service) =>
                    service.id === editingId
                        ? { ...service, ...serviceData }
                        : service
                )
            );
        } else {
            setServices((current) => [
                ...current,
                {
                    id: Date.now(),
                    ...serviceData,
                },
            ]);
        }

        closeModal();
    }

    function toggleStatus(service) {
        setServices((current) =>
            current.map((item) =>
                item.id === service.id
                    ? {
                        ...item,
                        status:
                            item.status === "Aktif" ? "Nonaktif" : "Aktif",
                    }
                    : item
            )
        );
    }

    function handleDelete(service) {
        const confirmed = window.confirm(
            `Yakin ingin menghapus layanan "${service.name}"?`
        );

        if (!confirmed) return;

        setServices((current) =>
            current.filter((item) => item.id !== service.id)
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>MANAJEMEN LAYANAN</span>
                    <h1>Kelola Layanan</h1>
                    <p>
                        Atur layanan konsultasi kesehatan yang tersedia di MEDIVA.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={openAddModal}
                >
                    <span className={styles.plusIcon}>＋</span>
                    Tambah Layanan
                </button>
            </div>

            <div className={styles.infoBanner}>
                <span className={styles.infoIcon}>ⓘ</span>
                <div>
                    <strong>Pengelolaan layanan kesehatan</strong>
                    <p>
                        Pastikan nama, kategori, harga, dan durasi layanan sesuai
                        dengan informasi yang digunakan dalam proses booking.
                    </p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.blueIcon}`}>
                        <span>▤</span>
                    </div>
                    <div>
                        <p>Total Layanan</p>
                        <h2>{totalServices}</h2>
                        <span>Seluruh layanan</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.greenIcon}`}>
                        <span>✓</span>
                    </div>
                    <div>
                        <p>Layanan Aktif</p>
                        <h2>{activeServices}</h2>
                        <span>Tersedia untuk booking</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.orangeIcon}`}>
                        <span>Ⅱ</span>
                    </div>
                    <div>
                        <p>Layanan Nonaktif</p>
                        <h2>{inactiveServices}</h2>
                        <span>Tidak tersedia untuk booking</span>
                    </div>
                </div>
            </div>

            <section className={styles.tableCard}>
                <div className={styles.tableHeader}>
                    <div>
                        <h2>Daftar Layanan</h2>
                        <p>
                            Menampilkan {filteredServices.length} dari {totalServices} layanan
                        </p>
                    </div>
                </div>

                <div className={styles.filters}>
                    <div className={styles.searchBox}>
                        <span>⌕</span>
                        <input
                            type="text"
                            placeholder="Cari nama, kategori, atau deskripsi..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    <select
                        aria-label="Filter status layanan"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                    >
                        <option value="Semua">Semua Status</option>
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.serviceTable}>
                        <thead>
                            <tr>
                                <th>Layanan</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Durasi</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div className={styles.serviceInfo}>
                                            <div className={styles.serviceIcon}>✚</div>
                                            <div className={styles.serviceText}>
                                                <strong>{service.name}</strong>
                                                <span>{service.description}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={styles.categoryBadge}>
                                            {service.category}
                                        </span>
                                    </td>

                                    <td className={styles.price}>
                                        {formatRupiah(service.price)}
                                    </td>

                                    <td>{service.duration} menit</td>

                                    <td>
                                        <span
                                            className={`${styles.statusBadge} ${service.status === "Aktif"
                                                ? styles.activeStatus
                                                : styles.inactiveStatus
                                                }`}
                                        >
                                            <span className={styles.statusDot}></span>
                                            {service.status}
                                        </span>
                                    </td>

                                    <td>

                                        <div className={styles.actions}>
                                            <button
                                                type="button"
                                                className={styles.editButton}
                                                onClick={() => openEditModal(service)}
                                                title="Edit layanan"
                                                aria-label="Edit layanan"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                className={
                                                    service.status === "Aktif"
                                                        ? styles.disableButton
                                                        : styles.enableButton
                                                }
                                                onClick={() => toggleStatus(service)}
                                                title={service.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                                                aria-label={service.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                                            >
                                                <Power size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(service)}
                                                title="Hapus layanan"
                                                aria-label="Hapus layanan"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredServices.length === 0 && (
                                <tr>
                                    <td colSpan="6">
                                        <div className={styles.emptyState}>
                                            <span>⌕</span>
                                            <strong>Layanan tidak ditemukan</strong>
                                            <p>Coba ubah kata kunci atau filter status.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeModal();
                    }}
                >
                    <div
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="serviceModalTitle"
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <span className={styles.eyebrow}>DATA LAYANAN</span>
                                <h2 id="serviceModalTitle">
                                    {editingId !== null
                                        ? "Edit Layanan"
                                        : "Tambah Layanan"}
                                </h2>
                                <p>Lengkapi informasi layanan kesehatan berikut.</p>
                            </div>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={closeModal}
                                aria-label="Tutup modal"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="serviceName">Nama Layanan</label>
                                <input
                                    id="serviceName"
                                    type="text"
                                    placeholder="Contoh: Konsultasi Dokter Umum"
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm({ ...form, name: event.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="serviceDescription">Deskripsi</label>
                                <textarea
                                    id="serviceDescription"
                                    placeholder="Jelaskan layanan kesehatan ini..."
                                    value={form.description}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            description: event.target.value,
                                        })
                                    }
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="serviceCategory">Kategori</label>
                                    <select
                                        id="serviceCategory"
                                        value={form.category}
                                        onChange={(event) =>
                                            setForm({ ...form, category: event.target.value })
                                        }
                                        required
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="serviceStatus">Status</label>
                                    <select
                                        id="serviceStatus"
                                        value={form.status}
                                        onChange={(event) =>
                                            setForm({ ...form, status: event.target.value })
                                        }
                                        required
                                    >
                                        <option value="Aktif">Aktif</option>
                                        <option value="Nonaktif">Nonaktif</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="servicePrice">Harga (Rupiah)</label>
                                    <input
                                        id="servicePrice"
                                        type="number"
                                        min="1"
                                        step="1000"
                                        placeholder="100000"
                                        value={form.price}
                                        onChange={(event) =>
                                            setForm({ ...form, price: event.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="serviceDuration">Durasi (menit)</label>
                                    <input
                                        id="serviceDuration"
                                        type="number"
                                        min="1"
                                        step="1"
                                        placeholder="30"
                                        value={form.duration}
                                        onChange={(event) =>
                                            setForm({ ...form, duration: event.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>

                                <button type="submit" className={styles.primaryButton}>
                                    {editingId !== null
                                        ? "Simpan Perubahan"
                                        : "Tambah Layanan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminServices;
