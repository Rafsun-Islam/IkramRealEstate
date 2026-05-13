import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";

import { deleteProject, getProjects } from "../../services/projectService";
import "./AdminProjects.css";

const AdminProjects = () => {
  const [adminProjects, setAdminProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const projects = await getProjects();
      setAdminProjects(projects);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!isConfirmed) return;

    try {
      await deleteProject(projectId);
      await loadProjects();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete project.");
    }
  };

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
          <span>{adminProjects.length} projects</span>
        </div>

        {isLoading && <div className="admin-projects-message">Loading...</div>}

        {errorMessage && (
          <div className="admin-projects-message error">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && adminProjects.length === 0 && (
          <div className="admin-projects-message">
            No projects added yet. Click “Add Project” to create one.
          </div>
        )}

        {!isLoading && adminProjects.length > 0 && (
          <div className="admin-project-list">
            {adminProjects.map((project) => (
              <article className="admin-project-row" key={project.id}>
                <img
                  src={project.coverImage || project.image}
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
                  <strong>{project.price || "Price not added"}</strong>
                </div>

                <div className="admin-project-row__actions">
                  <Link to={`/projects/${project.slug}`} title="View project">
                    <FaEye />
                  </Link>

                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    title="Edit project"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    type="button"
                    title="Delete project"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
