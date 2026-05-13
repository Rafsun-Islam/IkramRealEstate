import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";

import { projects } from "../../data/projectsData";
import "./AdminProjects.css";

const AdminProjects = () => {
  return (
    <div className="admin-content">
      <div className="admin-page-header admin-page-header--row">
        <div>
          <span>Projects</span>
          <h1>Manage Property Projects</h1>
          <p>
            View, edit, and organize property projects shown on the public
            website.
          </p>
        </div>

        <Link to="/admin/projects/new" className="admin-primary-action">
          <FaPlus aria-hidden="true" />
          Add Project
        </Link>
      </div>

      <div className="admin-projects-card">
        <div className="admin-projects-card__header">
          <strong>Project List</strong>
          <span>{projects.length} projects</span>
        </div>

        <div className="admin-project-list">
          {projects.map((project) => (
            <article className="admin-project-row" key={project.id}>
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
              />

              <div className="admin-project-row__info">
                <span className={`admin-status ${project.status}`}>
                  {project.statusText}
                </span>

                <h2>{project.title}</h2>

                <p>{project.location}</p>
              </div>

              <div className="admin-project-row__meta">
                <span>{project.type}</span>
                <strong>{project.price}</strong>
              </div>

              <div className="admin-project-row__actions">
                <Link to={`/projects/${project.slug}`} title="View project">
                  <FaEye />
                </Link>

                <button type="button" title="Edit project">
                  <FaEdit />
                </button>

                <button type="button" title="Delete project">
                  <FaTrash />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
