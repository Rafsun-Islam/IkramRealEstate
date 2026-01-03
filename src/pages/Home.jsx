import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import {
  FaBuilding,
  FaKey,
  FaHandshake,
  FaAward,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCheckCircle,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import "./Home.css";

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/hero4.jpg";
import hero5 from "../assets/images/hero5.jpg";

const Home = () => {
  const heroImages = [hero1, hero2, hero3, hero4, hero5];

  const featuredProjects = [
    {
      id: 1,
      title: "Azure Heights",
      location: "Gulshan 2, Dhaka",
      status: "ongoing",
      statusText: "Under Construction",
      beds: 3,
      baths: 3,
      area: "1,850",
      price: "1.85",
      completion: "2026",
    },
    {
      id: 2,
      title: "Pearl Residency",
      location: "Banani, Dhaka",
      status: "completed",
      statusText: "Ready to Move",
      beds: 4,
      baths: 4,
      area: "2,450",
      price: "2.75",
      completion: "Ready",
    },
    {
      id: 3,
      title: "Crown Towers",
      location: "Dhanmondi, Dhaka",
      status: "upcoming",
      statusText: "Launching Soon",
      beds: 4,
      baths: 4,
      area: "3,200",
      price: "4.20",
      completion: "2027",
    },
  ];

  const features = [
    {
      icon: <FaBuilding />,
      title: "Premium Quality",
      description: "International standard construction with finest materials",
    },
    {
      icon: <FaKey />,
      title: "Instant Possession",
      description: "Ready flats available for immediate handover",
    },
    {
      icon: <FaHandshake />,
      title: "Trusted Brand",
      description: "Decade of excellence with 50+ delivered projects",
    },
    {
      icon: <FaAward />,
      title: "Award Winning",
      description: "Recognized nationally for architectural excellence",
    },
  ];

  const amenities = [
    "Swimming Pool",
    "Gymnasium",
    "Children's Play Area",
    "Community Hall",
    "Rooftop Garden",
    "Prayer Room",
    "Basement Parking",
    "24/7 Security",
    "Power Backup",
    "Elevator Service",
    "CCTV Surveillance",
    "Fire Safety System",
  ];

  return (
    <div className="home">
      {/* Hero Section with Background Slideshow */}
      <section className="hero-background-slider">
        {/* Background Slideshow */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={2000}
          className="hero-background-swiper"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="hero-background-slide">
                <img src={image} alt={`Ikram Real Estate ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark Overlay */}
        <div className="hero-overlay-dark"></div>

        {/* Content Overlay */}
        <div className="hero-content-overlay">
          <div className="hero-content-container">
            <div className="hero-badge">Welcome to Excellence</div>
            <h1>
              Discover Luxury Living
              <br />
              In Barisal's Prime Locations
            </h1>
            <p className="hero-description">
              Experience unparalleled elegance with our premium residential
              projects
              <br />
              crafted for those who appreciate the finer things in life
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn-primary">
                <span>Explore Properties</span>
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span>Schedule Visit</span>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>50+</h3>
                <p>Completed Projects</p>
              </div>
              <div className="hero-stat">
                <h3>1,200+</h3>
                <p>Happy Families</p>
              </div>
              <div className="hero-stat">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="container">
        <div className="about-container">
          <div className="about-content-grid">
            <div className="about-image">
              <div className="image-wrapper">
                <div className="placeholder-about">
                  <span>Company Image</span>
                </div>
                <div className="about-overlay-badge">
                  <div className="badge-content">
                    <h3>15+</h3>
                    <p>
                      Years of
                      <br />
                      Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-text">
              <span className="section-label">About Ikram Real Estate</span>
              <h2>
                Building Dreams,
                <br />
                Delivering Excellence
              </h2>
              <p className="lead-text">
                For over 15 years, Ikram Real Estate has been synonymous with
                quality, trust, and innovation in Bangladesh's real estate
                sector.
              </p>
              <p>
                We specialize in developing premium residential and commercial
                properties in Barisal's most coveted locations. Our commitment to
                architectural excellence, combined with world-class amenities
                and transparent business practices, has made us the preferred
                choice for discerning homebuyers.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <FaCheckCircle />
                  <span>BDA Approved Projects</span>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle />
                  <span>On-Time Delivery</span>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle />
                  <span>Premium Location Portfolio</span>
                </div>
                <div className="highlight-item">
                  <FaCheckCircle />
                  <span>After-Sales Support</span>
                </div>
              </div>
              <Link to="/about" className="btn-outline">
                <span>Discover Our Story</span>
              </Link>
            </div>
          </div>
          </div> 
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Featured Properties</span>
            <h2>Exclusive Projects</h2>
            <p>Handpicked selection of our most prestigious developments</p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">
                    <span>Property Image</span>
                  </div>
                  <span className={`status-badge ${project.status}`}>
                    {project.statusText}
                  </span>
                  <div className="project-overlay">
                    <Link to="/projects" className="overlay-btn">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="price-tag">৳{project.price} Cr</div>
                  </div>
                  <p className="location">
                    <FaMapMarkerAlt /> {project.location}
                  </p>
                  <div className="project-features">
                    <div className="feature-item">
                      <FaBed />
                      <span>{project.beds} Beds</span>
                    </div>
                    <div className="feature-item">
                      <FaBath />
                      <span>{project.baths} Baths</span>
                    </div>
                    <div className="feature-item">
                      <FaRulerCombined />
                      <span>{project.area} sqft</span>
                    </div>
                  </div>
                  <div className="project-footer">
                    <div className="completion">
                      <FaClock />
                      <span>Completion: {project.completion}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/projects" className="btn-view-all">
              <span>View All Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">World-Class Facilities</span>
            <h2>Premium Amenities</h2>
            <p>Experience luxury living with state-of-the-art facilities</p>
          </div>
          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <FaCheckCircle />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Own Your Dream Home?</h2>
            <p>
              Visit our show apartments and experience luxury living firsthand
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-cta-primary">
                <span>Schedule a Visit</span>
              </Link>
              <a href="tel:+8801712449365" className="btn-cta-secondary">
                <FaPhoneAlt />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Ikram Real Estate</span>
            <h2>Your Trusted Partner</h2>
          </div>
          <div className="why-choose-grid">
            <div className="why-item">
              <div className="why-number">01</div>
              <h3>Prime Locations</h3>
              <p>
                All properties strategically located in Barisal's most prestigious
                neighborhoods with excellent connectivity and infrastructure.
              </p>
            </div>
            <div className="why-item">
              <div className="why-number">02</div>
              <h3>Legal Transparency</h3>
              <p>
                Complete documentation, BDA approved plans, and clear title
                deeds ensuring absolute peace of mind for our clients.
              </p>
            </div>
            <div className="why-item">
              <div className="why-number">03</div>
              <h3>Quality Assurance</h3>
              <p>
                International standard construction using premium materials and
                world-class finishing under expert supervision.
              </p>
            </div>
            <div className="why-item">
              <div className="why-number">04</div>
              <h3>Timely Delivery</h3>
              <p>
                Proven track record of completing projects on schedule with our
                commitment to deadline adherence.
              </p>
            </div>
            <div className="why-item">
              <div className="why-number">05</div>
              <h3>Customer Support</h3>
              <p>
                Dedicated after-sales service team to assist you throughout your
                homeownership journey.
              </p>
            </div>
            <div className="why-item">
              <div className="why-number">06</div>
              <h3>Flexible Payment</h3>
              <p>
                Easy installment plans and bank loan facilities to make your
                dream home affordable and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
