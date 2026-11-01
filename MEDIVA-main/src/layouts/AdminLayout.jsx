import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  FileText,
  UserRound,
} from "lucide-react";
import styles from "./AdminLayout.module.css";
import medivaSymbol from "../assets/branding/mediva-symbol.png";
import adminAvatarImg from "../assets/profiles/admin-default.jpg";
import LogoutButton from "../components/logoutButton";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";

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
  {
    label: "Profil Admin",
    path: "/admin/profil",
    icon: UserRound,
  },
];

function AdminLayout() {
  const { user, updateProfileImage } = useAuth();
  const adminName = user?.name || "Rinaldy";
  const adminInitials = adminName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

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
          <ProfilePhotoUpload
            src={user?.avatar || adminAvatarImg}
            name={adminName}
            initials={adminInitials}
            size={38}
            compact
            onChange={updateProfileImage}
          />
          <div className={styles.adminInfo}>
            <strong>{adminName}</strong>
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
              {user?.avatar ? (
                <img src={user.avatar} alt={`Foto profil ${adminName}`} className={styles.avatarImg} />
              ) : (
                <img src={adminAvatarImg} alt={`Foto profil ${adminName}`} className={styles.avatarImg} />
              )}
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