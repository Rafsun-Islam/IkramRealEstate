import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaExpandAlt, FaImages } from "react-icons/fa";

import { getGalleryImages } from "../services/galleryService";
import galleryHeroImage from "../assets/images/hero/hero-3.webp";
import fallbackGallery1 from "../assets/images/hero/hero-1.webp";
import fallbackGallery2 from "../assets/images/hero/hero-2.webp";
import fallbackGallery3 from "../assets/images/hero/hero-3.webp";
import fallbackGallery4 from "../assets/images/hero/hero-4.webp";
import fallbackGallery5 from "../assets/images/hero/hero-5.webp";
import { buildCloudinaryUrl } from "../utils/cloudinaryUrl";
import "./Gallery.css";
import SEO from "../components/SEO";

const buildSrcSet = (url, widths = [400, 800, 1200]) =>
  widths
    .map((width) => `${buildCloudinaryUrl(url, { width })} ${width}w`)
    .join(", ");

const fallbackGalleryItems = [
  {
    id: "fallback-1",
    title: "Modern Residential Interior",
    category: "Residential",
    url: fallbackGallery1,
    alt: "Modern residential interior by Ikram Real Estate",
  },
  {
    id: "fallback-2",
    title: "Premium Apartment Design",
    category: "Residential",
    url: fallbackGallery2,
    alt: "Premium apartment project design",
  },
  {
    id: "fallback-3",
    title: "Commercial Property Space",
    category: "Commercial",
    url: fallbackGallery3,
    alt: "Commercial property space by Ikram Real Estate",
  },
  {
    id: "fallback-4",
    title: "Family Apartment Layout",
    category: "Residential",
    url: fallbackGallery4,
    alt: "Family apartment layout and design",
  },
  {
    id: "fallback-5",
    title: "Elegant Property Development",
    category: "Ongoing",
    url: fallbackGallery5,
    alt: "Elegant ongoing property development",
  },
];

const getGalleryImageUrl = (item) => item?.url || item?.image || "";

const getCleanGalleryTitle = (item) => {
  if (item?.category) return `${item.category} Gallery`;
  return item?.title || "Gallery Image";
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGalleryImages({ pageSize: 50 }),
  });

  const galleryItems =
    data?.items?.length > 0 ? data.items : fallbackGalleryItems;

  const galleryFilters = useMemo(() => {
    const categories = galleryItems
      .map((item) => item.category)
      .filter(Boolean);
    return ["All", ...new Set(categories)];
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, galleryItems]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  const heroUrl = galleryHeroImage;

  return (
    <>
      <SEO
        title="Gallery"
        description="Browse Ikram Real Estate project gallery with residential, commercial, interior, exterior, and construction property images."
        path="/gallery"
      />
      <div className="gallery-page">
        <section className="gallery-hero">
          <div className="gallery-hero__media">
            <img
              src={buildCloudinaryUrl(heroUrl, { width: 1600 })}
              srcSet={buildSrcSet(heroUrl, [800, 1200, 1600, 2000])}
              sizes="(max-width: 768px) 100vw, 1600px"
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
              View selected residential and commercial project visuals from
              Ikram Real Estate, designed to highlight quality, space, and
              modern living.
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
                Browse our curated collection of property images. New photos
                added from the admin dashboard will appear here automatically.
              </p>
            </div>

            {isLoading && (
              <div className="gallery-state">
                <div>
                  <FaImages aria-hidden="true" />
                </div>

                <h2>Loading gallery...</h2>
                <p>Please wait while we load the latest project images.</p>
              </div>
            )}

            {!isLoading && isError && (
              <div className="gallery-state gallery-state--notice">
                <div>
                  <FaImages aria-hidden="true" />
                </div>

                <h2>Live gallery unavailable</h2>
                <p>Showing saved gallery images.</p>
              </div>
            )}

            {!isLoading && galleryItems.length > 0 && (
              <>
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

                {filteredItems.length > 0 ? (
                  <div className="gallery-grid">
                    {filteredItems.map((item) => {
                      const imageUrl = getGalleryImageUrl(item);

                      return (
                        <article
                          className="gallery-card"
                          key={item.id || item.publicId || item.url}
                        >
                          <button
                            type="button"
                            className="gallery-card__button"
                            onClick={() => setSelectedImage(item)}
                            aria-label={`View ${getCleanGalleryTitle(item)}`}
                          >
                            <img
                              src={buildCloudinaryUrl(imageUrl, { width: 800 })}
                              srcSet={buildSrcSet(imageUrl, [400, 800, 1200])}
                              sizes="(max-width: 600px) 90vw, (max-width: 1200px) 45vw, 600px"
                              alt={item.alt || getCleanGalleryTitle(item)}
                              loading="lazy"
                              decoding="async"
                              width="800"
                              height="600"
                            />

                            <span className="gallery-card__overlay">
                              <span>
                                <small>{item.category || "General"}</small>
                                <strong>{getCleanGalleryTitle(item)}</strong>
                              </span>

                              <FaExpandAlt aria-hidden="true" />
                            </span>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="gallery-state">
                    <div>
                      <FaImages aria-hidden="true" />
                    </div>

                    <h2>No images found</h2>
                    <p>Try choosing a different gallery category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {selectedImage && (
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={getCleanGalleryTitle(selectedImage)}
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

              <img
                src={buildCloudinaryUrl(getGalleryImageUrl(selectedImage), {
                  width: 1200,
                })}
                alt={selectedImage.alt || getCleanGalleryTitle(selectedImage)}
              />

              <div className="gallery-modal__info">
                <span>{selectedImage.category || "General"}</span>
                <h2>{getCleanGalleryTitle(selectedImage)}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
