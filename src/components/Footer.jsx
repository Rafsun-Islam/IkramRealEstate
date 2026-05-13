import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { siteData } from "../data/siteData";
import logo from "../assets/images/logo.png";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <img src={logo} alt={`${siteData.name} logo`} />
            <span>{siteData.name}</span>
          </Link>

          <p>{siteData.description}</p>

          <div className="site-footer__social" aria-label="Social links">
            <a
              href={siteData.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href={siteData.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={siteData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="site-footer__column">
          <h2>Quick Links</h2>
          <ul>
            {siteData.navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h2>Contact Info</h2>

          <address className="site-footer__contact">
            <a href={siteData.contact.phoneHref}>
              <FaPhone />
              <span>{siteData.contact.phone}</span>
            </a>

            <a href={siteData.contact.emailHref}>
              <FaEnvelope />
              <span>{siteData.contact.email}</span>
            </a>

            <p>
              <FaMapMarkerAlt />
              <span>{siteData.contact.address}</span>
            </p>
          </address>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; {year} {siteData.name}. All rights reserved.</p>
        <p>Built for premium property experiences.</p>
      </div>
    </footer>
  );
};

export default Footer;