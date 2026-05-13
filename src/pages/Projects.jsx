import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBuilding,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaSearch,
} from "react-icons/fa";

import { projectFilters, projects } from "../data/projectsData";
import heroProjectImage from "../assets/images/hero/hero-3.webp";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "all" || project.status === activeFilter;

      const matchesSearch =
        !normalizedSearch ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        project.location.toLowerCase().includes(normalizedSearch) ||
        project.type.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="projects-hero__media">
          <img
            src={heroProjectImage}
            alt="Premium property projects by Ikram Real Estate"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="projects-hero__overlay" />

        <div className="container projects-hero__inner">
          <span className="projects-hero__eyebrow">Our Property Portfolio</span>

          <h1>Discover Projects Built for Modern Living</h1>

          <p>
            Explore selected residential and commercial properties in practical
            locations with reliable guidance, clear project information, and
            long-term value.
          </p>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="projects-toolbar">
            <div className="projects-search">
              <FaSearch aria-hidden="true" />

              <input
                type="search"
                placeholder="Search by project, location, or type"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search projects"
              />
            </div>

            <div className="projects-filters" aria-label="Project filters">
              {projectFilters.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  className={
                    activeFilter === filter.value
                      ? "projects-filter is-active"
                      : "projects-filter"
                  }
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article className="projects-card" key={project.id}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="projects-card__image"
                    aria-label={`View ${project.title} details`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} property project`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="600"
                    />

                    <span className={`projects-card__status ${project.status}`}>
                      {project.statusText}
                    </span>
                  </Link>

                  <div className="projects-card__body">
                    <p className="projects-card__location">
                      <FaMapMarkerAlt aria-hidden="true" />
                      <span>{project.location}</span>
                    </p>

                    <div className="projects-card__header">
                      <h2>{project.title}</h2>
                      <strong>{project.price}</strong>
                    </div>

                    <p className="projects-card__description">
                      {project.description}
                    </p>

                    <div className="projects-card__features">
                      <div>
                        <FaBuilding aria-hidden="true" />
                        <span>{project.type}</span>
                      </div>

                      <div>
                        <FaRulerCombined aria-hidden="true" />
                        <span>{project.size}</span>
                      </div>

                      <div>
                        <FaBed aria-hidden="true" />
                        <span>{project.beds} Beds</span>
                      </div>

                      <div>
                        <FaBath aria-hidden="true" />
                        <span>{project.baths} Baths</span>
                      </div>
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      className="projects-card__link"
                    >
                      View Details
                      <FaArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <h2>No projects found</h2>
              <p>
                Try changing the filter or searching with a different project
                name, location, or property type.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
