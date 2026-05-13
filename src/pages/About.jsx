import {
  FaAward,
  FaBuilding,
  FaCheckCircle,
  FaHandshake,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

import companyImage from "../assets/images/company.webp";
import aboutHeroImage from "../assets/images/hero/hero-2.webp";
import "./About.css";
import SEO from "../components/SEO";
const aboutStats = [
  {
    value: "50+",
    label: "Completed Projects",
  },
  {
    value: "1,200+",
    label: "Happy Families",
  },
  {
    value: "15+",
    label: "Years Experience",
  },
];

const values = [
  {
    icon: <FaShieldAlt />,
    title: "Verified Property Guidance",
    description:
      "We help clients understand project details clearly before making important property decisions.",
  },
  {
    icon: <FaHandshake />,
    title: "Transparent Communication",
    description:
      "Our team keeps every step simple, honest, and professional from inquiry to handover.",
  },
  {
    icon: <FaAward />,
    title: "Quality-Focused Work",
    description:
      "We focus on reliable construction, practical planning, and long-term client satisfaction.",
  },
];

const trustPoints = [
  "BDA Approved Projects",
  "Prime Locations in Barisal",
  "Quality Construction Standards",
  "Transparent Business Practices",
  "On-Time Project Delivery",
  "After-Sales Support",
];

const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Ikram Real Estate, our trusted property guidance, client-first service, and reliable residential and commercial real estate support."
        path="/about"
      />
      <div className="about-page">
        <section className="about-hero">
          <div className="about-hero__media">
            <img
              src={aboutHeroImage}
              alt="Ikram Real Estate property development"
              fetchPriority="high"
              decoding="async"
              width="1600"
              height="1000"
            />
          </div>

          <div className="about-hero__overlay" />

          <div className="container about-hero__content">
            <span className="about-hero__eyebrow">About Ikram Real Estate</span>

            <h1>Building Trust, Delivering Excellence</h1>

            <p>
              A trusted real estate company helping families, investors, and
              businesses make confident property decisions in Bangladesh.
            </p>
          </div>
        </section>

        <section className="section about-intro">
          <div className="container about-intro__grid">
            <div className="about-intro__visual">
              <div className="about-intro__image">
                <img
                  src={companyImage}
                  alt="Ikram Real Estate company office"
                  loading="lazy"
                  decoding="async"
                  width="1000"
                  height="750"
                />
              </div>

              <div className="about-intro__badge">
                <FaBuilding aria-hidden="true" />
                <span>Trusted Real Estate Company</span>
              </div>

              <div className="about-intro__experience">
                <strong>15+</strong>
                <span>Years of Experience</span>
              </div>
            </div>

            <div className="about-intro__content">
              <span className="eyebrow">Our Story</span>

              <h2 className="section-title">
                Creating reliable property solutions with care and commitment.
              </h2>

              <p>
                Founded in 2010, Ikram Real Estate has grown to become one of
                Barisal&apos;s trusted names in real estate development. Our
                journey began with a simple vision: to create quality properties
                that families and businesses can depend on.
              </p>

              <p>
                Today, with completed projects and happy clients, we continue to
                focus on architectural quality, practical locations, transparent
                communication, and long-term customer satisfaction.
              </p>

              <div className="about-intro__highlights">
                <article>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <div>
                    <h3>Location Value</h3>
                    <p>We focus on practical and high-demand areas.</p>
                  </div>
                </article>

                <article>
                  <FaUsers aria-hidden="true" />
                  <div>
                    <h3>Client First</h3>
                    <p>
                      We guide every client with clarity and professionalism.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-values">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Our Mission</span>

              <h2 className="section-title">Driven by quality and trust</h2>

              <p className="section-description">
                We aim to deliver residential and commercial properties that
                provide practical value, dependable quality, and a smooth client
                experience.
              </p>
            </div>

            <div className="about-values__grid">
              {values.map((value) => (
                <article className="about-value-card" key={value.title}>
                  <div className="about-value-card__icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-trust">
          <div className="container about-trust__grid">
            <div className="about-trust__content">
              <span className="eyebrow">Why Choose Us</span>

              <h2 className="section-title">
                The details that make clients confident.
              </h2>

              <p>
                Buying or investing in property is a big decision. We help
                clients with clear information, professional support, and
                reliable project guidance from the first conversation to final
                handover.
              </p>
            </div>

            <div className="about-trust__list">
              {trustPoints.map((point) => (
                <div className="about-trust__item" key={point}>
                  <FaCheckCircle aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-stats">
          <div className="container about-stats__grid">
            {aboutStats.map((stat) => (
              <div className="about-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
