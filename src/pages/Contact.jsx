import { useState, useRef } from 'react';
//import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone_number: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user types
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Replace these with your EmailJS credentials
    emailjs.sendForm(
      'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID',       // Replace with your EmailJS Template ID
      form.current,
      'YOUR_PUBLIC_KEY'         // Replace with your EmailJS Public Key
    )
    .then((result) => {
      console.log(result.text);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you!  Your message has been sent successfully.  We will contact you soon.'
      });
      setFormData({
        from_name: '',
        from_email: '',
        phone_number:  '',
        message: ''
      });
      setIsSubmitting(false);
    }, (error) => {
      console.log(error.text);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or call us directly.'
      });
      setIsSubmitting(false);
    });
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: ['+880 1XXX-XXXXXX', '+880 2-XXXXXXXX'],
      link: 'tel:+8801XXXXXXXXX'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: ['info@ikramrealestate.com', 'sales@ikramrealestate.com'],
      link: 'mailto:info@ikramrealestate.com'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      details: ['House 123, Road 45', 'Gulshan-2, Dhaka-1212', 'Bangladesh'],
      link: null
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      details: ['Saturday - Thursday: 10 AM - 7 PM', 'Friday:  Closed'],
      link: null
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="section-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>We're here to help you find your dream home.  Reach out to us today. </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container-wide">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <p className="form-description">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form ref={form} onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="from_name">Full Name *</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="from_email">Email Address *</label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      required
                      placeholder="your. email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      placeholder="+880 1XXX-XXXXXX"
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
                    required
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                {submitStatus.message && (
                  <div className={`submit-message ${submitStatus.type}`}>
                    {submitStatus. message}
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
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p className="info-description">
                Reach out to us through any of the following channels
              </p>

              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        info.link && idx === 0 ? (
                          <a key={idx} href={info.link}>{detail}</a>
                        ) : (
                          <p key={idx}>{detail}</p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="map-container">
                <div className="map-placeholder">
                  <FaMapMarkerAlt />
                  <p>Map will be displayed here</p>
                  <span>You can integrate Google Maps here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;