import { useEffect, useMemo, useState } from "react";
import { FaImage, FaImages, FaPlus, FaTrash } from "react-icons/fa";

import {
  deleteGalleryImage,
  getGalleryImages,
  uploadGalleryImage,
} from "../../services/galleryService";
import { formatFileSize, optimizeImageToWebP } from "../../utils/imageUtils";
import "./AdminGallery.css";

const galleryCategories = [
  "General",
  "Exterior",
  "Interior",
  "Apartment",
  "Commercial",
  "Construction",
];

const getCleanGalleryTitle = (image) => {
  if (image?.category) return `${image.category} Gallery`;

  return image?.title || "Gallery Image";
};

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [activeFilter, setActiveFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadGalleryImages = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const images = await getGalleryImages();
      setGalleryImages(images);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load gallery images.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const filters = useMemo(() => {
    const categories = galleryImages
      .map((image) => image.category)
      .filter(Boolean);

    return ["All", ...new Set(categories)];
  }, [galleryImages]);

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return galleryImages;

    return galleryImages.filter((image) => image.category === activeFilter);
  }, [activeFilter, galleryImages]);

  const handleUploadImages = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    setIsUploading(true);
    setStatusMessage("Optimizing and uploading images...");
    setErrorMessage("");

    try {
      for (const file of selectedFiles) {
        const optimizedFile = await optimizeImageToWebP(file, {
          maxWidth: 1600,
          quality: 0.78,
          outputName: `${selectedCategory.toLowerCase()}-${Date.now()}`,
        });

        await uploadGalleryImage(optimizedFile, selectedCategory);
      }

      setStatusMessage(`${selectedFiles.length} image uploaded successfully.`);
      await loadGalleryImages();
    } catch (error) {
      setErrorMessage(error.message || "Failed to upload gallery images.");
      setStatusMessage("");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const openDeleteModal = (image) => {
    setDeleteTarget(image);
    setStatusMessage("");
    setErrorMessage("");
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      setErrorMessage("");

      await deleteGalleryImage(deleteTarget.id);
      await loadGalleryImages();

      setStatusMessage("Gallery image deleted successfully.");
      setDeleteTarget(null);
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete image.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header admin-page-header--row">
        <div>
          <span>Gallery</span>
          <h1>Manage Gallery Images</h1>
          <p>
            Upload, organize, and manage property gallery images shown on the
            public gallery page.
          </p>
        </div>

        <label className="admin-gallery-upload-button">
          <FaPlus aria-hidden="true" />
          {isUploading ? "Uploading..." : "Add Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={isUploading}
            onChange={handleUploadImages}
          />
        </label>
      </div>

      <div className="admin-gallery-controls">
        <div className="admin-gallery-category">
          <label htmlFor="gallery-category">Upload Category</label>

          <select
            id="gallery-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {galleryCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-gallery-filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={
                activeFilter === filter
                  ? "admin-gallery-filter is-active"
                  : "admin-gallery-filter"
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {statusMessage && (
        <div className="admin-gallery-message success">{statusMessage}</div>
      )}

      {errorMessage && (
        <div className="admin-gallery-message error">{errorMessage}</div>
      )}

      {isLoading && (
        <div className="admin-gallery-empty">
          <div>
            <FaImages aria-hidden="true" />
          </div>

          <h2>Loading gallery...</h2>
          <p>Please wait while we load uploaded gallery images.</p>
        </div>
      )}

      {!isLoading && filteredImages.length === 0 && (
        <div className="admin-gallery-empty">
          <div>
            <FaImages aria-hidden="true" />
          </div>

          <h2>No gallery images found</h2>
          <p>
            Upload images using the Add Images button. Images will be optimized
            and uploaded to Cloudinary automatically.
          </p>
        </div>
      )}

      {!isLoading && filteredImages.length > 0 && (
        <div className="admin-gallery-grid">
          {filteredImages.map((image) => (
            <article className="admin-gallery-card" key={image.id}>
              <div className="admin-gallery-card__image">
                <img
                  src={image.url}
                  alt={getCleanGalleryTitle(image)}
                  loading="lazy"
                  decoding="async"
                />

                <span>{image.category || "General"}</span>

                <button
                  type="button"
                  onClick={() => openDeleteModal(image)}
                  aria-label="Delete gallery image"
                >
                  <FaTrash aria-hidden="true" />
                </button>
              </div>

              <div className="admin-gallery-card__body">
                <h2>{getCleanGalleryTitle(image)}</h2>

                <p>
                  <FaImage aria-hidden="true" />
                  {image.bytes ? formatFileSize(image.bytes) : "Optimized"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="admin-delete-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="admin-delete-modal__backdrop"
            onClick={closeDeleteModal}
            aria-label="Close delete confirmation"
          />

          <div className="admin-delete-modal__card">
            <div className="admin-delete-modal__icon">
              <FaTrash aria-hidden="true" />
            </div>

            <span>Delete Image</span>

            <h2>Are you sure?</h2>

            <p>
              This gallery image will be removed from your website gallery. This
              action cannot be undone.
            </p>

            <div className="admin-delete-modal__preview">
              <img
                src={deleteTarget.url}
                alt={getCleanGalleryTitle(deleteTarget)}
              />

              <div>
                <strong>{getCleanGalleryTitle(deleteTarget)}</strong>
                <small>{deleteTarget.category || "General"}</small>
              </div>
            </div>

            <div className="admin-delete-modal__actions">
              <button
                type="button"
                className="admin-delete-modal__cancel"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-delete-modal__confirm"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
