
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import LogoutButton from "../components/logoutButton";

const menuItems = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: "▦",
        end: true,
    },
    {
        label: "Kelola Dokter",
        path: "/admin/doctors",
        icon: "⚕",
    },
    {
        label: "Kelola Pengguna",
        path: "/admin/users",
        icon: "♙",
    },
    {
        label: "Kelola Layanan",
        path: "/admin/services",
        icon: "▤",
    },
];

function AdminLayout() {
    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <div className={styles.brandIcon}>M</div>
                    <div>
                        <h2>MEDIVA</h2>
                        <span>Healthcare Admin</span>
                    </div>
                </div>

                <div className={styles.menuLabel}>MENU UTAMA</div>

                <nav className={styles.navigation}>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.active : ""
                                }`
                            }
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.adminAvatar}>R</div>
                    <div className={styles.adminInfo}>
                        <strong>Rinaldy</strong>
                        <span>Administrator</span>

                    </div>
                </div>

            </aside>

            <main className={styles.mainArea}>
                <header className={styles.topbar}>
                    <div>
                        <span className={styles.breadcrumb}>
                            MEDIVA / Admin
                        </span>
                        <h1>Admin Panel</h1>
                    </div>

                    <div className={styles.topbarRight}>
                        <div className={styles.statusDot} />
                        <span>Administrator</span>
                        <div className={styles.topbarAvatar}>R</div>

                        <LogoutButton />
                    </div>
                </header>

                <section className={styles.pageContent}>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default AdminLayout;
