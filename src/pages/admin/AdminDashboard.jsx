import { Link } from "react-router-dom";
import { FaArrowRight, FaBuilding, FaImages, FaInbox } from "react-icons/fa";
import { usePageTitle } from "../../hooks/usePageTitle";
import "./AdminDashboard.css";
import SEO from "../../components/SEO";
const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  const cards = [
    {
      icon: <FaBuilding />,
      title: "Projects",
      description: "Add, edit, and manage property projects.",
      value: "Manage Projects",
      path: "/admin/projects",
    },
    {
      icon: <FaImages />,
      title: "Gallery",
      description: "Upload and organize gallery images.",
      value: "Manage Gallery",
      path: "/admin/gallery",
    },
    {
      icon: <FaInbox />,
      title: "Messages",
      description: "View client contact form inquiries.",
      value: "View Messages",
      path: "/admin/messages",
    },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" path="/admin/dashboard" noindex />
      <div className="admin-content">
        <div className="admin-page-header">
          <span>Admin Dashboard</span>
          <h1>Website Control Center</h1>
          <p>
            Manage projects, gallery images, and client inquiries from one
            secure dashboard.
          </p>
        </div>

        <div className="admin-dashboard-grid">
          {cards.map((card) => (
            <Link
              to={card.path}
              className="admin-dashboard-card"
              key={card.title}
            >
              <div className="admin-dashboard-card__icon">{card.icon}</div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <strong>
                {card.value}
                <FaArrowRight aria-hidden="true" />
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
