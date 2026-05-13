import { Link } from "react-router-dom";
import { FaArrowRight, FaHome, FaSearch, FaPhoneAlt } from "react-icons/fa";
import SEO from "../components/SEO";
import notFoundImage from "../assets/images/hero/hero-4.webp";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      return (
      <>
        <SEO
          title="Page Not Found"
          description="The page you are looking for could not be found on Ikram Real Estate."
          path="/404"
          noindex
        />

        <section className="not-found-page">...</section>
      </>
      );
      <section className="not-found-page">
        <div className="not-found-page__media">
          <img
            src={notFoundImage}
            alt="Ikram Real Estate property background"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="not-found-page__overlay" />

        <div className="container not-found-page__inner">
          <div className="not-found-page__card">
            <div className="not-found-page__icon">
              <FaSearch aria-hidden="true" />
            </div>

            <span className="not-found-page__eyebrow">404 Error</span>

            <h1>Page Not Found</h1>

            <p>
              The page you are looking for may have been moved, deleted, or the
              link may be incorrect. Let’s get you back to the right place.
            </p>

            <div className="not-found-page__actions">
              <Link to="/" className="btn btn-primary">
                <FaHome aria-hidden="true" />
                Back to Home
              </Link>

              <Link to="/projects" className="not-found-page__button">
                View Projects
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="not-found-page__help">
              <FaPhoneAlt aria-hidden="true" />
              <span>Need help finding a property?</span>
              <Link to="/contact">Contact our team</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
