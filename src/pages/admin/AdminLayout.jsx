import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBuilding,
  FaHome,
  FaImages,
  FaInbox,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((current) => !current);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="admin-layout">
      <header className="admin-mobile-header">
        <button
          type="button"
          className="admin-mobile-header__toggle"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close admin menu" : "Open admin menu"}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="admin-mobile-header__brand">
          <span>Ikram</span>
          <strong>Admin Panel</strong>
        </div>
      </header>

      <button
        type="button"
        className={`admin-sidebar-backdrop ${isSidebarOpen ? "is-visible" : ""}`}
        onClick={closeSidebar}
        aria-label="Close admin menu"
      />

      <aside className={`admin-sidebar ${isSidebarOpen ? "is-open" : ""}`}>
        <div className="admin-sidebar__brand">
          <span>Ikram</span>
          <strong>Admin Panel</strong>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigation">
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
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
          <NavLink
            to="/"
            className="admin-sidebar__link"
            onClick={closeSidebar}
          >
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
