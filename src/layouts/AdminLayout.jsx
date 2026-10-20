import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  FileText,
} from "lucide-react";
import styles from "./AdminLayout.module.css";
import medivaSymbol from "../assets/branding/mediva-symbol.png";
import adminAvatarImg from "../assets/profiles/admin-rinaldy.jpg";
import LogoutButton from "../components/logoutButton";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Kelola Dokter",
    path: "/admin/doctors",
    icon: Stethoscope,
  },
  {
    label: "Kelola Pengguna",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Kelola Layanan",
    path: "/admin/services",
    icon: FileText,
  },
];

function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src={medivaSymbol} alt="MEDIVA" className={styles.brandSymbol} />
          <div>
            <h2>MEDIVA</h2>
            <span>Healthcare Admin</span>
          </div>
        </div>

        <div className={styles.menuLabel}>MENU UTAMA</div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
              >
                <span className={styles.navIcon}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminAvatar}>
            <img src={adminAvatarImg} alt="Rinaldy" className={styles.avatarImg} />
          </div>
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
            <div className={styles.topbarAvatar}>
              <img src={adminAvatarImg} alt="Rinaldy" className={styles.avatarImg} />
            </div>

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