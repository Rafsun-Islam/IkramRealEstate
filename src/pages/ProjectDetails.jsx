import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBath,
  FaBed,
  FaBuilding,
  FaCalendarAlt,
  FaCar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRulerCombined,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { createProjectSchema } from "../utils/seoSchemas";
import { getProjectBySlug } from "../services/projectService";
import { projects as fallbackProjects } from "../data/projectsData";
import { siteData } from "../data/siteData";
import "./Projects.css";

const getProjectImage = (project) => {
  return (
    project?.coverImage || project?.image || project?.images?.[0]?.url || ""
  );
};

const getProjectGallery = (project) => {
  if (project?.images?.length) {
    return project.images.map((image) => image.url);
  }

  return project?.gallery || [];
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const [firestoreProject, setFirestoreProject] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [hasCheckedFirestore, setHasCheckedFirestore] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoadingProject(true);

        const projectFromFirestore = await getProjectBySlug(slug);
        setFirestoreProject(projectFromFirestore);
      } catch (error) {
        setFirestoreProject(null);
      } finally {
        setIsLoadingProject(false);
        setHasCheckedFirestore(true);
      }
    };

    loadProject();
  }, [slug]);

  const fallbackProject = fallbackProjects.find((item) => item.slug === slug);
  const project = firestoreProject || fallbackProject;

  const galleryImages = useMemo(() => getProjectGallery(project), [project]);

  if (isLoadingProject) {
    return (
      <div className="project-details-page">
        <section className="section project-details-content">
          <div className="container">
            <div className="projects-empty">
              <h2>Loading project...</h2>
              <p>Please wait while we load project details.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (hasCheckedFirestore && !project) {
    return <Navigate to="/projects" replace />;
  }

  const specs = [
    {
      label: "Property Type",
      value: project.type || "Property",
      icon: FaBuilding,
    },
    {
      label: "Apartment Size",
      value: project.size || "On request",
      icon: FaRulerCombined,
    },
    {
      label: "Bedrooms",
      value: project.beds || "N/A",
      icon: FaBed,
    },
    {
      label: "Bathrooms",
      value: project.baths || "N/A",
      icon: FaBath,
    },
    {
      label: "Parking",
      value: project.parking || "On request",
      icon: FaCar,
    },
    {
      label: "Completion",
      value: project.completion || "On request",
      icon: FaCalendarAlt,
    },
  ];

  return (
    <>
      <SEO
        title={project.title}
        description={
          project.description ||
          `View details, location, price, size, features, and amenities for ${project.title} by Ikram Real Estate.`
        }
        path={`/projects/${project.slug}`}
        image={project.coverImage || project.image || project.images?.[0]?.url}
        structuredData={createProjectSchema(project)}
      />
      <section className="pd-hero">
        <div className="pd-hero__media">
          <img
            src={getProjectImage(project)}
            alt={`${project.title} project`}
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="pd-hero__overlay" />

        <div className="pd-hero__container">
          <div className="pd-hero__panel">
            <div className="pd-hero__top">
              <Link to="/projects" className="pd-hero__back">
                <FaArrowLeft aria-hidden="true" />
                Back to Projects
              </Link>

              <span className={`pd-hero__status ${project.status}`}>
                {project.statusText}
              </span>
            </div>

            <h1>{project.title}</h1>

            <p>
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{project.location}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="project-details-page">
        <section className="section project-details-content">
          <div className="container project-details-grid">
            <div className="project-details-main">
              {galleryImages.length > 0 && (
                <div className="project-details-gallery">
                  {galleryImages.map((image, index) => (
                    <img
                      key={`${project.slug}-${index}`}
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      width="800"
                      height="600"
                    />
                  ))}
                </div>
              )}

              <div className="project-details-panel">
                <span className="eyebrow">Project Overview</span>

                <h2>{project.title}</h2>

                <p>{project.overview || project.description}</p>
              </div>

              {project.features?.length > 0 && (
                <div className="project-details-panel">
                  <span className="eyebrow">Key Features</span>

                  <h2>Designed for comfort and long-term value</h2>

                  <div className="project-details-list">
                    {project.features.map((feature) => (
                      <p key={feature}>
                        <FaCheckCircle aria-hidden="true" />
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {project.amenities?.length > 0 && (
                <div className="project-details-panel">
                  <span className="eyebrow">Amenities</span>

                  <h2>Facilities included with this project</h2>

                  <div className="project-details-amenities">
                    {project.amenities.map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="project-details-sidebar">
              <div className="project-details-summary">
                <h2>Project Summary</h2>

                <strong>{project.price || "Contact for price"}</strong>

                <div className="project-details-specs">
                  {specs.map((spec) => {
                    const Icon = spec.icon;

                    return (
                      <div key={spec.label}>
                        <Icon aria-hidden="true" />
                        <span>{spec.label}</span>
                        <strong>{spec.value}</strong>
                      </div>
                    );
                  })}
                </div>

                <a
                  href={siteData.contact.phoneHref}
                  className="btn btn-primary"
                >
                  <FaPhoneAlt aria-hidden="true" />
                  Call for Details
                </a>

                <Link to="/contact" className="project-details-contact">
                  Request Project Information
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetails;
