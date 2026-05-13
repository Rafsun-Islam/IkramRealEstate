import { useState } from "react";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { siteData } from "../data/siteData";
import { createContactMessage } from "../services/contactService";
import contactHeroImage from "../assets/images/hero/hero-5.webp";
import "./Contact.css";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EXACT_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d230.04947992627862!2d90.3541297!3d22.6987977!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375535003869a627%3A0x9687cc538147fa67!2sIkram%20Real%20Estate%20Office!5e0!3m2!1sen!2sbd!4v1778663206377!5m2!1sen!2sbd";

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const contactCards = [
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      details: [siteData.contact.phone],
      link: siteData.contact.phoneHref,
      linkText: "Call now",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: [siteData.contact.email],
      link: `mailto:${siteData.contact.email}`,
      linkText: "Send email",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      details: ["Chat with our property team"],
      link: siteData.contact.phoneHref,
      linkText: "Start chat",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Office",
      details: [siteData.contact.address],
      link: null,
      linkText: "",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (submitStatus.message) {
      setSubmitStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      await createContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || "Project Inquiry",
        message: formData.message.trim(),
        source: "website-contact-form",
      });

      setSubmitStatus({
        type: "success",
        message:
          "Thank you! Your message has been received. Our team will contact you soon.",
      });

      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, your message could not be sent right now. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__media">
          <img
            src={contactHeroImage}
            alt="Contact Ikram Real Estate"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="contact-hero__overlay" />

        <div className="container contact-hero__content">
          <span className="contact-hero__eyebrow">Get In Touch</span>

          <h1>Let’s Talk About Your Property Needs</h1>

          <p>
            Contact Ikram Real Estate for project information, property
            guidance, pricing details, or a scheduled visit with our team.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-form-card">
            <span className="eyebrow">Send Message</span>

            <h2>Request property information</h2>

            <p>
              Fill out the form and our team will get back to you with the right
              property information as soon as possible.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your property requirements..."
                  required
                />
              </div>

              {submitStatus.message && (
                <div className={`submit-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <aside className="contact-sidebar">
            <div className="contact-info-panel">
              <span className="eyebrow">Contact Information</span>

              <h2>Reach our team directly</h2>

              <p>
                We are available to answer your questions, schedule visits, and
                guide you through available property options.
              </p>

              <div className="contact-info-list">
                {contactCards.map((card) => (
                  <article className="contact-info-card" key={card.title}>
                    <div className="contact-info-card__icon">{card.icon}</div>

                    <div>
                      <h3>{card.title}</h3>

                      {card.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}

                      {card.link && <a href={card.link}>{card.linkText}</a>}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="contact-hours-card">
              <div>
                <FaClock aria-hidden="true" />
              </div>

              <h3>Office Hours</h3>

              <p>Saturday - Thursday</p>
              <strong>10:00 AM - 7:00 PM</strong>

              <span>Friday: Closed</span>
            </div>

            <div className="contact-map-card contact-map-card--embed">
              <div className="contact-map-card__header">
                <FaMapMarkerAlt aria-hidden="true" />

                <div>
                  <h3>Office Location</h3>
                  <p>{siteData.contact.address}</p>
                </div>
              </div>

              <iframe
                title="Ikram Real Estate office location"
                src={EXACT_MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
