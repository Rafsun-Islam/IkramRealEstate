import { FaCheckCircle } from 'react-icons/fa';
import './Page.css';

const About = () => {
  return (
    <div className="page-container">
      <div className="page-hero">
        <span className="section-label">About Us</span>
        <h1>Building Trust,<br />Delivering Excellence</h1>
        <p>15+ Years of Real Estate Excellence in Bangladesh</p>
      </div>

      <div className="page-content">
        <section className="content-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Ikram Real Estate has grown to become one of Bangladesh's 
            most trusted names in real estate development. Our journey began with a simple 
            vision: to create quality homes that families would be proud to call their own. 
          </p>
          <p>
            Today, with over 50 completed projects and 1,200+ happy families, we continue 
            to set new standards in architectural excellence, quality construction, and 
            customer satisfaction. 
          </p>
        </section>

        <section className="content-section">
          <h2>Our Mission</h2>
          <p>
            To deliver world-class residential and commercial properties that exceed 
            customer expectations through innovation, quality, and integrity. 
          </p>
        </section>

        <section className="content-section">
          <h2>Why Choose Us</h2>
          <div className="feature-list">
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>RAJUK Approved Projects</span>
            </div>
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>Prime Locations in Dhaka</span>
            </div>
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>International Quality Standards</span>
            </div>
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>Transparent Business Practices</span>
            </div>
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>On-Time Project Delivery</span>
            </div>
            <div className="feature-list-item">
              <FaCheckCircle />
              <span>Comprehensive After-Sales Support</span>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-box">
            <h3>50+</h3>
            <p>Completed Projects</p>
          </div>
          <div className="stat-box">
            <h3>1,200+</h3>
            <p>Happy Families</p>
          </div>
          <div className="stat-box">
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-box">
            <h3>20+</h3>
            <p>Awards Won</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;