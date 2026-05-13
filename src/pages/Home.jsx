import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaAward,
  FaBuilding,
  FaCheckCircle,
  FaHandshake,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

import { heroSlides } from "../data/heroData";
import { siteData } from "../data/siteData";
import {
  featuredProjects as fallbackFeaturedProjects,
  homeServices,
} from "../data/projectsData";
import { getFeaturedProjects } from "../services/projectService";

import companyImage from "../assets/images/company.webp";
import "./Home.css";

const SLIDE_INTERVAL = 5500;

const getProjectImage = (project) => {
  return project.coverImage || project.image || project.images?.[0]?.url || "";
};

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState(
    fallbackFeaturedProjects,
  );

  const currentSlide = heroSlides[activeSlide] ?? heroSlides[0];

  const serviceIcons = useMemo(
    () => [FaShieldAlt, FaMapMarkerAlt, FaHandshake, FaCheckCircle],
    [],
  );

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const projectsFromFirestore = await getFeaturedProjects(3);

        if (projectsFromFirestore.length > 0) {
          setFeaturedProjects(projectsFromFirestore);
        }
      } catch (error) {
        setFeaturedProjects(fallbackFeaturedProjects);
      }
    };

    loadFeaturedProjects();
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return undefined;

    const sliderTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(sliderTimer);
  }, []);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const nextSlideIndex = (activeSlide + 1) % heroSlides.length;
    const nextSlide = heroSlides[nextSlideIndex];

    if (!nextSlide?.image) return;

    const nextImage = new Image();
    nextImage.src = nextSlide.image;
  }, [activeSlide]);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <>
      <section
        className="home-hero"
        aria-label="Ikram Real Estate hero section"
      >
        <div className="home-hero__media">
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.alt}
            fetchPriority={activeSlide === 0 ? "high" : "auto"}
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="home-hero__overlay" />

        <div className="container home-hero__container">
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">
              Trusted Real Estate Partner
            </span>

            <h1>Find Your Perfect Property With Confidence</h1>

            <p>
              Ikram Real Estate helps families, investors, and businesses
              discover reliable residential and commercial properties with clear
              guidance and trusted support.
            </p>

            <div className="home-hero__actions">
              <Link to="/projects" className="btn btn-primary">
                Explore Projects
                <FaArrowRight aria-hidden="true" />
              </Link>

              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>

            <div className="home-hero__stats" aria-label="Company statistics">
              {siteData.stats.map((stat) => (
                <div className="home-hero__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {heroSlides.length > 1 && (
          <div className="home-hero__slider" aria-label="Hero image slider">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={
                  activeSlide === index
                    ? "home-hero__slider-dot is-active"
                    : "home-hero__slider-dot"
                }
                onClick={() => handleSlideChange(index)}
                aria-label={`Show hero image ${index + 1}`}
                aria-pressed={activeSlide === index}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section home-about-preview">
        <div className="container home-about-preview__grid">
          <div className="home-about-preview__visual">
            <div className="home-about-preview__image">
              <img
                src={companyImage}
                alt="Ikram Real Estate corporate office"
                loading="lazy"
                decoding="async"
                width="1000"
                height="750"
              />
            </div>

            <div className="home-about-preview__experience">
              <strong>15+</strong>
              <span>Years of Trusted Service</span>
            </div>

            <div className="home-about-preview__badge">
              <FaBuilding aria-hidden="true" />
              <span>Registered Real Estate Company</span>
            </div>
          </div>

          <div className="home-about-preview__content">
            <span className="eyebrow">About Ikram Real Estate</span>

            <h2 className="section-title">
              Reliable property guidance for confident decisions.
            </h2>

            <p>
              Ikram Real Estate provides professional property support for
              families, investors, and businesses looking for quality
              residential and commercial spaces. We focus on clear
              communication, practical locations, and long-term client value.
            </p>

            <div className="home-about-preview__features">
              <article>
                <div className="home-about-preview__feature-icon">
                  <FaShieldAlt aria-hidden="true" />
                </div>

                <div>
                  <h3>Verified Property Guidance</h3>
                  <p>
                    We help clients review important project details clearly
                    before making an investment decision.
                  </p>
                </div>
              </article>

              <article>
                <div className="home-about-preview__feature-icon">
                  <FaHandshake aria-hidden="true" />
                </div>

                <div>
                  <h3>Transparent Communication</h3>
                  <p>
                    From first inquiry to handover, our team keeps the process
                    simple, honest, and professional.
                  </p>
                </div>
              </article>

              <article>
                <div className="home-about-preview__feature-icon">
                  <FaAward aria-hidden="true" />
                </div>

                <div>
                  <h3>Client-First Service</h3>
                  <p>
                    We prioritize trust, location value, construction quality,
                    and long-term customer satisfaction.
                  </p>
                </div>
              </article>
            </div>

            <Link to="/about" className="home-about-preview__link">
              Learn More About Us
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Featured Projects</span>

            <h2 className="section-title">Explore selected properties</h2>

            <p className="section-description">
              Discover residential and commercial projects designed for modern
              lifestyles, practical locations, and long-term value.
            </p>
          </div>

          <div className="home-projects__grid">
            {featuredProjects.map((project) => (
              <article className="home-project-card" key={project.id}>
                <div className="home-project-card__image">
                  <img
                    src={getProjectImage(project)}
                    alt={`${project.title} property project`}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                  />

                  <span className="home-project-card__status">
                    {project.statusText || project.status}
                  </span>
                </div>

                <div className="home-project-card__body">
                  <p className="home-project-card__location">
                    <FaMapMarkerAlt aria-hidden="true" />
                    <span>{project.location}</span>
                  </p>

                  <h3>{project.title}</h3>

                  <p className="home-project-card__description">
                    {project.description}
                  </p>

                  <div
                    className="home-project-card__meta"
                    aria-label={`${project.title} project details`}
                  >
                    <div>
                      <span>Type</span>
                      <strong>{project.type || "Property"}</strong>
                    </div>

                    <div>
                      <span>Size</span>
                      <strong>{project.size || "On request"}</strong>
                    </div>

                    <div>
                      <span>Price</span>
                      <strong>{project.price || "Contact"}</strong>
                    </div>
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="home-project-card__link"
                  >
                    View Details
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="home-projects__footer">
            <Link to="/projects" className="btn btn-primary">
              View All Projects
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-why">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why Choose Us</span>

            <h2 className="section-title">Built around trust and quality</h2>

            <p className="section-description">
              We focus on the details that matter most to real clients:
              reliability, location, transparent information, and professional
              support.
            </p>
          </div>

          <div className="home-why__grid">
            {homeServices.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];

              return (
                <article className="home-why-card" key={service.title}>
                  <div className="home-why-card__icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container home-cta__inner">
          <div className="home-cta__content">
            <span className="eyebrow">Ready to Talk?</span>

            <h2>Looking for your next property?</h2>

            <p>
              Contact our team today and get professional guidance for your
              property needs.
            </p>
          </div>

          <div className="home-cta__actions">
            <a href={siteData.contact.phoneHref} className="btn btn-primary">
              <FaPhoneAlt aria-hidden="true" />
              Call Now
            </a>

            <Link to="/contact" className="btn btn-secondary">
              Send Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
