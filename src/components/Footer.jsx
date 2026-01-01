import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          {/* Add logo to footer */}
          <div className="footer-logo">
            <img src={logo} alt="Ikram Real Estate" />
          </div>
          <h3>Ikram Real Estate</h3>
          <p>Your trusted partner in finding the perfect property in Barisal, Bangladesh. </p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-item">
            <FaPhone /> <span>+880 1712-449365</span>
          </div>
          <div className="contact-item">
            <FaEnvelope /> <span>info@ikramrealestate.com</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt /> <span>Barisal, Bangladesh</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Ikram Real Estate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;