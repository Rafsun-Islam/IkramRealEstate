import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";

import { deleteProject, getProjects } from "../../services/projectService";

import "./AdminProjects.css";
import SEO from "../../components/SEO";
const getProjectImage = (project) => {
  return project.coverImage || project.image || project.images?.[0]?.url || "";
};

const AdminProjects = () => {
 
  const [adminProjects, setAdminProjects] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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

  const openDeleteModal = (project) => {
    setDeleteTarget(project);
    setStatusMessage("");
    setErrorMessage("");
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setErrorMessage("");

      await deleteProject(deleteTarget.id);
      await loadProjects();

      setStatusMessage("Project deleted successfully.");
      setDeleteTarget(null);
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Projects" path="/admin/projects" noindex />
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

        {statusMessage && (
          <div className="admin-projects-message success">{statusMessage}</div>
        )}

        <div className="admin-projects-card">
          <div className="admin-projects-card__header">
            <strong>Project List</strong>
            <span>{adminProjects.length} projects</span>
          </div>

          {isLoading && (
            <div className="admin-projects-message">Loading...</div>
          )}

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
                    src={getProjectImage(project)}
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
                      onClick={() => openDeleteModal(project)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {deleteTarget && (
          <div
            className="admin-project-delete-modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="admin-project-delete-modal__backdrop"
              onClick={closeDeleteModal}
              aria-label="Close delete confirmation"
            />

            <div className="admin-project-delete-modal__card">
              <div className="admin-project-delete-modal__icon">
                <FaTrash aria-hidden="true" />
              </div>

              <span>Delete Project</span>

              <h2>Are you sure?</h2>

              <p>
                This project will be removed from the admin dashboard and public
                website. This action cannot be undone.
              </p>

              <div className="admin-project-delete-modal__preview">
                <img
                  src={getProjectImage(deleteTarget)}
                  alt={deleteTarget.title}
                />

                <div>
                  <strong>{deleteTarget.title}</strong>
                  <small>{deleteTarget.location || "Project location"}</small>
                </div>
              </div>

              <div className="admin-project-delete-modal__actions">
                <button
                  type="button"
                  className="admin-project-delete-modal__cancel"
                  onClick={closeDeleteModal}
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="admin-project-delete-modal__confirm"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProjects;
