import { useMemo, useState } from "react";
import { FaExpandAlt } from "react-icons/fa";

import gallery1 from "../assets/images/hero/hero-1.webp";
import gallery2 from "../assets/images/hero/hero-2.webp";
import gallery3 from "../assets/images/hero/hero-3.webp";
import gallery4 from "../assets/images/hero/hero-4.webp";
import gallery5 from "../assets/images/hero/hero-5.webp";
import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "Modern Residential Interior",
    category: "Residential",
    image: gallery1,
    alt: "Modern residential interior by Ikram Real Estate",
  },
  {
    id: 2,
    title: "Premium Apartment Design",
    category: "Residential",
    image: gallery2,
    alt: "Premium apartment project design",
  },
  {
    id: 3,
    title: "Commercial Property Space",
    category: "Commercial",
    image: gallery3,
    alt: "Commercial property space by Ikram Real Estate",
  },
  {
    id: 4,
    title: "Family Apartment Layout",
    category: "Residential",
    image: gallery4,
    alt: "Family apartment layout and design",
  },
  {
    id: 5,
    title: "Elegant Property Development",
    category: "Ongoing",
    image: gallery5,
    alt: "Elegant ongoing property development",
  },
  {
    id: 6,
    title: "Premium Building View",
    category: "Ongoing",
    image: gallery1,
    alt: "Premium building view",
  },
  {
    id: 7,
    title: "Luxury Living Space",
    category: "Residential",
    image: gallery2,
    alt: "Luxury living space",
  },
  {
    id: 8,
    title: "Business Property Area",
    category: "Commercial",
    image: gallery3,
    alt: "Business property area",
  },
  {
    id: 9,
    title: "Project Exterior View",
    category: "Ongoing",
    image: gallery4,
    alt: "Project exterior view",
  },
];

const galleryFilters = ["All", "Residential", "Commercial", "Ongoing"];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;

    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero__media">
          <img
            src={gallery3}
            alt="Ikram Real Estate gallery showcase"
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
          />
        </div>

        <div className="gallery-hero__overlay" />

        <div className="container gallery-hero__content">
          <span className="gallery-hero__eyebrow">Project Gallery</span>

          <h1>Explore Our Property Showcase</h1>

          <p>
            View selected residential and commercial project visuals from Ikram
            Real Estate, designed to highlight quality, space, and modern
            living.
          </p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-header">
            <div>
              <span className="eyebrow">Our Work</span>
              <h2 className="section-title">Featured project visuals</h2>
            </div>

            <p>
              Browse our curated collection of property images. More real
              project photos can be added later from the admin dashboard.
            </p>
          </div>

          <div className="gallery-filters" aria-label="Gallery filters">
            {galleryFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={
                  activeFilter === filter
                    ? "gallery-filter is-active"
                    : "gallery-filter"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <article
                className={
                  index === 0 || index === 5
                    ? "gallery-card gallery-card--large"
                    : "gallery-card"
                }
                key={item.id}
              >
                <button
                  type="button"
                  className="gallery-card__button"
                  onClick={() => setSelectedImage(item)}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="800"
                  />

                  <span className="gallery-card__overlay">
                    <span>
                      <small>{item.category}</small>
                      <strong>{item.title}</strong>
                    </span>

                    <FaExpandAlt aria-hidden="true" />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
        >
          <button
            type="button"
            className="gallery-modal__backdrop"
            onClick={closeModal}
            aria-label="Close gallery preview"
          />

          <div className="gallery-modal__content">
            <button
              type="button"
              className="gallery-modal__close"
              onClick={closeModal}
              aria-label="Close gallery preview"
            >
              ×
            </button>

            <img src={selectedImage.image} alt={selectedImage.alt} />

            <div className="gallery-modal__info">
              <span>{selectedImage.category}</span>
              <h2>{selectedImage.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
