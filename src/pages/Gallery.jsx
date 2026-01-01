import './Page.css';

const Gallery = () => {
  const galleryImages = Array(12).fill(null);

  return (
    <div className="page-container">
      <div className="page-hero">
        <span className="section-label">Gallery</span>
        <h1>Our Work Showcase</h1>
        <p>Explore our completed projects and ongoing developments</p>
      </div>

      <div className="page-content">
        <div className="gallery-grid">
          {galleryImages.map((_, index) => (
            <div key={index} className="gallery-item">
              <div className="gallery-placeholder">
                <span>Image {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;