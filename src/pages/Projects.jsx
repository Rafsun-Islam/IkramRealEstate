import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FaArrowRight,
  FaBath,
  FaBed,
  FaBuilding,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaSearch,
} from "react-icons/fa";

import SEO from "../components/SEO";
import { getProjects } from "../services/projectService";
import {
  projectFilters,
  projects as fallbackProjects,
} from "../data/projectsData";
import heroProjectImage from "../assets/images/hero/hero-3.webp";
import { buildCloudinaryUrl, isCloudinaryUrl } from "../utils/cloudinaryUrl";
import "./Projects.css";

const buildSrcSet = (url, widths = [400, 800, 1200]) =>
  widths
    .map((width) => `${buildCloudinaryUrl(url, { width })} ${width}w`)
    .join(", ");

const getProjectImage = (project) => {
  return project.coverImage || project.image || project.images?.[0]?.url || "";
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam }) =>
      getProjects({ pageSize: 12, lastDoc: pageParam }),
    getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
  });

  const liveItems = data?.pages?.flatMap((page) => page.items) || [];
  const hasLiveItems = liveItems.length > 0;

  const projects = hasLiveItems ? liveItems : fallbackProjects;

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "all" || project.status === activeFilter;

      const matchesSearch =
        !normalizedSearch ||
        project.title?.toLowerCase().includes(normalizedSearch) ||
        project.location?.toLowerCase().includes(normalizedSearch) ||
        project.type?.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, projects]);

  const heroIsCloudinary = isCloudinaryUrl(heroProjectImage);

  return (
    <>
      <SEO
        title="Projects"
        description="Explore residential and commercial property projects by Ikram Real Estate with project details, locations, pricing, sizes, and amenities."
        path="/projects"
      />
      <div className="projects-page">
        <section className="projects-hero">
          <div className="projects-hero__media">
            <img
              src={
                heroIsCloudinary
                  ? buildCloudinaryUrl(heroProjectImage, { width: 1600 })
                  : heroProjectImage
              }
              srcSet={
                heroIsCloudinary
                  ? buildSrcSet(heroProjectImage, [800, 1200, 1600, 2000])
                  : undefined
              }
              sizes={
                heroIsCloudinary
                  ? "(max-width: 768px) 100vw, 1600px"
                  : undefined
              }
              alt="Premium property projects by Ikram Real Estate"
              fetchPriority="high"
              decoding="async"
              width="1600"
              height="1000"
            />
          </div>

          <div className="projects-hero__overlay" />

          <div className="container projects-hero__inner">
            <span className="projects-hero__eyebrow">
              Our Property Portfolio
            </span>

            <h1>Discover Projects Built for Modern Living</h1>

            <p>
              Explore selected residential and commercial properties in
              practical locations with reliable guidance, clear project
              information, and long-term value.
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

            {isLoading && (
              <div className="projects-empty">
                <h2>Loading projects...</h2>
                <p>Please wait while we load the latest property projects.</p>
              </div>
            )}

            {!isLoading && isError && (
              <div className="projects-empty">
                <h2>Live data unavailable</h2>
                <p>
                  Unable to load live projects right now. Showing saved project
                  data.
                </p>
              </div>
            )}

            {!isLoading && filteredProjects.length > 0 ? (
              <>
                <div className="projects-grid">
                  {filteredProjects.map((project) => {
                    const imageUrl = getProjectImage(project);
                    const isCloud = isCloudinaryUrl(imageUrl);

                    return (
                      <article className="projects-card" key={project.id}>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="projects-card__image"
                          aria-label={`View ${project.title} details`}
                        >
                          <img
                            src={
                              isCloud
                                ? buildCloudinaryUrl(imageUrl, { width: 800 })
                                : imageUrl
                            }
                            srcSet={
                              isCloud
                                ? buildSrcSet(imageUrl, [400, 800, 1200])
                                : undefined
                            }
                            sizes={
                              isCloud
                                ? "(max-width: 600px) 90vw, (max-width: 1200px) 45vw, 600px"
                                : undefined
                            }
                            alt={`${project.title} property project`}
                            loading="lazy"
                            decoding="async"
                            width="800"
                            height="600"
                          />

                          <span
                            className={`projects-card__status ${project.status}`}
                          >
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
                            <strong>
                              {project.price || "Contact for price"}
                            </strong>
                          </div>

                          <p className="projects-card__description">
                            {project.description}
                          </p>

                          <div className="projects-card__features">
                            <div>
                              <FaBuilding aria-hidden="true" />
                              <span>{project.type || "Property"}</span>
                            </div>

                            <div>
                              <FaRulerCombined aria-hidden="true" />
                              <span>{project.size || "Size on request"}</span>
                            </div>

                            <div>
                              <FaBed aria-hidden="true" />
                              <span>{project.beds || "N/A"} Beds</span>
                            </div>

                            <div>
                              <FaBath aria-hidden="true" />
                              <span>{project.baths || "N/A"} Baths</span>
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
                    );
                  })}
                </div>

                {hasLiveItems && hasNextPage && (
                  <div className="projects-load-more">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </>
            ) : null}

            {!isLoading && filteredProjects.length === 0 && (
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
    </>
  );
};

export default Projects;
