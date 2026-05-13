import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaHome,
  FaImages,
  FaInbox,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: <FaBuilding />,
  },
  {
    label: "Gallery",
    path: "/admin/gallery",
    icon: <FaImages />,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: <FaInbox />,
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>Ikram</span>
          <strong>Admin Panel</strong>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "admin-sidebar__link is-active"
                  : "admin-sidebar__link"
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__bottom">
          <NavLink to="/" className="admin-sidebar__link">
            <FaHome />
            <span>View Website</span>
          </NavLink>

          <button type="button" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>Signed in as</span>
            <strong>{currentUser?.email}</strong>
          </div>

          <button type="button" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </header>

        <Outlet />
      </section>
    </main>
  );
};

export default AdminLayout;
