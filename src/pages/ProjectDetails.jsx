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

import { projects } from "../data/projectsData";
import { siteData } from "../data/siteData";
import "./Projects.css";

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const specs = [
    {
      label: "Property Type",
      value: project.type,
      icon: FaBuilding,
    },
    {
      label: "Apartment Size",
      value: project.size,
      icon: FaRulerCombined,
    },
    {
      label: "Bedrooms",
      value: project.beds,
      icon: FaBed,
    },
    {
      label: "Bathrooms",
      value: project.baths,
      icon: FaBath,
    },
    {
      label: "Parking",
      value: project.parking,
      icon: FaCar,
    },
    {
      label: "Completion",
      value: project.completion,
      icon: FaCalendarAlt,
    },
  ];

  return (
    <>
      {/* ✅ Hero is now OUTSIDE .project-details-page wrapper
          so no parent constraint can limit its width */}
      <section className="pd-hero">
        <div className="pd-hero__media">
          <img
            src={project.image}
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
      {/* Rest of the page content */}
      <div className="project-details-page">
        <section className="section project-details-content">
          <div className="container project-details-grid">
            <div className="project-details-main">
              <div className="project-details-gallery">
                {project.gallery.map((image, index) => (
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

              <div className="project-details-panel">
                <span className="eyebrow">Project Overview</span>

                <h2>{project.title}</h2>

                <p>{project.overview}</p>
              </div>

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

              <div className="project-details-panel">
                <span className="eyebrow">Amenities</span>

                <h2>Facilities included with this project</h2>

                <div className="project-details-amenities">
                  {project.amenities.map((amenity) => (
                    <span key={amenity}>{amenity}</span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="project-details-sidebar">
              <div className="project-details-summary">
                <h2>Project Summary</h2>

                <strong>{project.price}</strong>

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