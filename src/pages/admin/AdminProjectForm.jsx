import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaImage, FaSave, FaTimes } from "react-icons/fa";

import { createSlug } from "../../utils/slugUtils";
import { formatFileSize, optimizeImageToWebP } from "../../utils/imageUtils";
import {
  createProject,
  getProjectById,
  updateProject,
  uploadProjectImages,
} from "../../services/projectService";
import "./AdminProjectForm.css";
import SEO from "../../components/SEO";
const emptyProject = {
  title: "",
  slug: "",
  location: "",
  type: "",
  status: "ongoing",
  statusText: "Ongoing",
  price: "",
  size: "",
  beds: "",
  baths: "",
  parking: "",
  completion: "",
  description: "",
  overview: "",
  features: "",
  amenities: "",
};

const statusOptions = [
  { value: "ongoing", label: "Ongoing" },
  { value: "available", label: "Available" },
  { value: "upcoming", label: "Upcoming" },
];

const createTextList = (items = []) => {
  if (Array.isArray(items)) return items.join("\n");
  return "";
};

const createArrayFromText = (text) => {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(emptyProject);
  const [existingImages, setExistingImages] = useState([]);
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [optimizedImages, setOptimizedImages] = useState([]);
  const [isOptimizingImages, setIsOptimizingImages] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [imageStatus, setImageStatus] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const hasImages = useMemo(() => {
    return existingImages.length > 0 || optimizedImages.length > 0;
  }, [existingImages.length, optimizedImages.length]);

  useEffect(() => {
    const loadProject = async () => {
      if (!isEditMode) {
        setIsLoadingProject(false);
        return;
      }

      try {
        const project = await getProjectById(id);

        if (!project) {
          setProjectNotFound(true);
          return;
        }

        setFormData({
          title: project.title || "",
          slug: project.slug || createSlug(project.title || ""),
          location: project.location || "",
          type: project.type || "",
          status: project.status || "ongoing",
          statusText: project.statusText || "Ongoing",
          price: project.price || "",
          size: project.size || "",
          beds: project.beds || "",
          baths: project.baths || "",
          parking: project.parking || "",
          completion: project.completion || "",
          description: project.description || "",
          overview: project.overview || "",
          features: createTextList(project.features),
          amenities: createTextList(project.amenities),
        });

        setExistingCoverImage(project.coverImage || "");
        setExistingImages(project.images || []);
      } catch (error) {
        setSubmitMessage(error.message || "Failed to load project.");
      } finally {
        setIsLoadingProject(false);
      }
    };

    loadProject();
  }, [id, isEditMode]);

  if (projectNotFound) {
    return <Navigate to="/admin/projects" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => {
      const updatedData = {
        ...currentData,
        [name]: value,
      };

      if (name === "title") {
        updatedData.slug = createSlug(value);
      }

      return updatedData;
    });

    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const handleStatusChange = (status) => {
    setFormData((currentData) => ({
      ...currentData,
      status: status.value,
      statusText: status.label,
    }));

    setIsStatusOpen(false);

    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const handleImageChange = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    setImageError("");
    setImageStatus("Optimizing images...");
    setIsOptimizingImages(true);

    try {
      const optimizedResults = await Promise.all(
        selectedFiles.map(async (file, index) => {
          const outputName = `${
            formData.slug || createSlug(formData.title) || "project-image"
          }-${Date.now()}-${index + 1}`;

          const optimizedFile = await optimizeImageToWebP(file, {
            maxWidth: 1600,
            quality: 0.78,
            outputName,
          });

          return {
            id: `${outputName}-${Math.random().toString(36).slice(2)}`,
            originalName: file.name,
            originalSize: file.size,
            file: optimizedFile,
            previewUrl: URL.createObjectURL(optimizedFile),
            isCover:
              !existingCoverImage &&
              existingImages.length === 0 &&
              optimizedImages.length === 0 &&
              index === 0,
          };
        }),
      );

      setOptimizedImages((currentImages) => {
        const nextImages = [...currentImages, ...optimizedResults];

        const alreadyHasCover =
          existingCoverImage ||
          existingImages.some((image) => image.isCover) ||
          nextImages.some((image) => image.isCover);

        if (!alreadyHasCover && nextImages[0]) {
          nextImages[0] = {
            ...nextImages[0],
            isCover: true,
          };
        }

        return nextImages;
      });

      const originalTotal = selectedFiles.reduce(
        (total, file) => total + file.size,
        0,
      );

      const optimizedTotal = optimizedResults.reduce(
        (total, item) => total + item.file.size,
        0,
      );

      setImageStatus(
        `${optimizedResults.length} image optimized to WebP: ${formatFileSize(
          originalTotal,
        )} → ${formatFileSize(optimizedTotal)}`,
      );
    } catch (error) {
      setImageError(error.message || "Image optimization failed.");
      setImageStatus("");
    } finally {
      setIsOptimizingImages(false);
      event.target.value = "";
    }
  };

  const handleRemoveNewImage = (imageId) => {
    setOptimizedImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);

      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== imageId);
    });

    setImageStatus("");
    setImageError("");
  };

  const handleRemoveExistingImage = (publicId) => {
    setExistingImages((currentImages) => {
      const filteredImages = currentImages.filter(
        (image) => image.publicId !== publicId,
      );

      if (existingCoverImage) {
        const removedImage = currentImages.find(
          (image) => image.publicId === publicId,
        );

        if (removedImage?.url === existingCoverImage) {
          setExistingCoverImage(filteredImages[0]?.url || "");
        }
      }

      return filteredImages;
    });
  };

  const handleSetCoverImage = (type, imageIdentifier) => {
    if (type === "existing") {
      const selectedImage = existingImages.find(
        (image) => image.publicId === imageIdentifier,
      );

      setExistingCoverImage(selectedImage?.url || "");

      setExistingImages((currentImages) =>
        currentImages.map((image) => ({
          ...image,
          isCover: image.publicId === imageIdentifier,
        })),
      );

      setOptimizedImages((currentImages) =>
        currentImages.map((image) => ({
          ...image,
          isCover: false,
        })),
      );

      return;
    }

    setExistingImages((currentImages) =>
      currentImages.map((image) => ({
        ...image,
        isCover: false,
      })),
    );

    setOptimizedImages((currentImages) =>
      currentImages.map((image) => ({
        ...image,
        isCover: image.id === imageIdentifier,
      })),
    );

    const selectedImage = optimizedImages.find(
      (image) => image.id === imageIdentifier,
    );

    if (selectedImage?.previewUrl) {
      setExistingCoverImage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSubmitMessage("");

      let uploadedImagesPayload = {
        coverImage: "",
        images: [],
      };

      if (optimizedImages.length > 0) {
        uploadedImagesPayload = await uploadProjectImages(
          optimizedImages,
          formData.slug,
        );
      }

      const allImages = [...existingImages, ...uploadedImagesPayload.images];

      const selectedNewCover = optimizedImages.find((image) => image.isCover);
      const selectedExistingCover = existingImages.find(
        (image) => image.isCover,
      );

      const coverImage = selectedNewCover
        ? uploadedImagesPayload.images.find(
            (image) => image.alt === selectedNewCover.originalName,
          )?.url
        : selectedExistingCover?.url ||
          existingCoverImage ||
          uploadedImagesPayload.coverImage ||
          allImages[0]?.url ||
          "";

      const projectPayload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        location: formData.location.trim(),
        type: formData.type.trim(),
        status: formData.status,
        statusText: formData.statusText,
        price: formData.price.trim(),
        size: formData.size.trim(),
        beds: formData.beds.trim(),
        baths: formData.baths.trim(),
        parking: formData.parking.trim(),
        completion: formData.completion.trim(),
        description: formData.description.trim(),
        overview: formData.overview.trim(),
        features: createArrayFromText(formData.features),
        amenities: createArrayFromText(formData.amenities),
        coverImage,
        images: allImages.map((image) => ({
          ...image,
          isCover: image.url === coverImage,
        })),
      };

      if (isEditMode) {
        await updateProject(id, projectPayload);
        setSubmitMessage("Project updated successfully.");
      } else {
        await createProject(projectPayload);
        setSubmitMessage("Project created successfully.");
      }

      navigate("/admin/projects");
    } catch (error) {
      setSubmitMessage(error.message || "Failed to save project.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingProject) {
    return (
      <div className="admin-content">
        <div className="admin-form-message">Loading project...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={isEditMode ? "Edit Project" : "Add Project"}
        path={isEditMode ? `/admin/projects/${id}/edit` : "/admin/projects/new"}
        noindex
      />
      <div className="admin-content">
        <div className="admin-project-form-header">
          <div>
            <Link to="/admin/projects" className="admin-back-link">
              <FaArrowLeft aria-hidden="true" />
              Back to Projects
            </Link>

            <span>{isEditMode ? "Edit Project" : "Add Project"}</span>

            <h1>
              {isEditMode ? "Update Property Project" : "Create New Project"}
            </h1>

            <p>
              Add the project details that will appear on the public projects
              and project details pages.
            </p>
          </div>
        </div>

        <form className="admin-project-form" onSubmit={handleSubmit}>
          <section className="admin-form-panel">
            <div className="admin-form-panel__header">
              <span>Basic Information</span>
              <h2>Project identity</h2>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ikram Heights"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="slug">Auto Generated Slug</label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  placeholder="project-title-slug"
                  readOnly
                />
                <small>
                  This URL slug is automatically generated from the project
                  title.
                </small>
              </div>

              <div className="admin-form-group">
                <label htmlFor="location">Location *</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Barisal Sadar, Barisal"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="type">Property Type *</label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Residential Apartment"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="status">Status *</label>

                <div className="admin-status-select">
                  <button
                    id="status"
                    type="button"
                    className="admin-status-select__button"
                    onClick={() => setIsStatusOpen((current) => !current)}
                    aria-haspopup="listbox"
                    aria-expanded={isStatusOpen}
                  >
                    <span>{formData.statusText}</span>
                    <i aria-hidden="true" />
                  </button>

                  {isStatusOpen && (
                    <div className="admin-status-select__menu" role="listbox">
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          type="button"
                          className={
                            formData.status === status.value
                              ? "admin-status-select__option is-active"
                              : "admin-status-select__option"
                          }
                          onClick={() => handleStatusChange(status)}
                          role="option"
                          aria-selected={formData.status === status.value}
                        >
                          {status.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Starting from ৳68 Lac"
                />
              </div>
            </div>
          </section>

          <section className="admin-form-panel">
            <div className="admin-form-panel__header">
              <span>Project Details</span>
              <h2>Specifications</h2>
            </div>

            <div className="admin-form-grid admin-form-grid--four">
              <div className="admin-form-group">
                <label htmlFor="size">Size</label>
                <input
                  id="size"
                  name="size"
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="1,250 - 1,650 sq ft"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="beds">Bedrooms</label>
                <input
                  id="beds"
                  name="beds"
                  type="text"
                  value={formData.beds}
                  onChange={handleChange}
                  placeholder="3"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="baths">Bathrooms</label>
                <input
                  id="baths"
                  name="baths"
                  type="text"
                  value={formData.baths}
                  onChange={handleChange}
                  placeholder="3"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="parking">Parking</label>
                <input
                  id="parking"
                  name="parking"
                  type="text"
                  value={formData.parking}
                  onChange={handleChange}
                  placeholder="Available"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="completion">Completion</label>
                <input
                  id="completion"
                  name="completion"
                  type="text"
                  value={formData.completion}
                  onChange={handleChange}
                  placeholder="2026"
                />
              </div>
            </div>
          </section>

          <section className="admin-form-panel">
            <div className="admin-form-panel__header">
              <span>Content</span>
              <h2>Public description</h2>
            </div>

            <div className="admin-form-stack">
              <div className="admin-form-group">
                <label htmlFor="description">Short Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short project summary for cards..."
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="overview">Project Overview</label>
                <textarea
                  id="overview"
                  name="overview"
                  rows="5"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Detailed project overview..."
                />
              </div>
            </div>
          </section>

          <section className="admin-form-panel">
            <div className="admin-form-panel__header">
              <span>Features & Amenities</span>
              <h2>Project highlights</h2>
            </div>

            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="features">Features</label>
                <textarea
                  id="features"
                  name="features"
                  rows="8"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder={`Prime residential location\nModern apartment layouts\nSecure building access`}
                />
                <small>Write one feature per line.</small>
              </div>

              <div className="admin-form-group">
                <label htmlFor="amenities">Amenities</label>
                <textarea
                  id="amenities"
                  name="amenities"
                  rows="8"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder={`Lift\nGenerator backup\nParking\nModern lobby`}
                />
                <small>Write one amenity per line.</small>
              </div>
            </div>
          </section>

          <section className="admin-form-panel">
            <div className="admin-form-panel__header">
              <span>Images</span>
              <h2>Project images</h2>
            </div>

            <label className="admin-image-upload">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />

              <span>
                <FaImage aria-hidden="true" />
              </span>

              <strong>
                {isOptimizingImages
                  ? "Optimizing selected images..."
                  : "Choose project images"}
              </strong>

              <p>
                Upload multiple images. They will be automatically resized and
                converted to optimized WebP before upload.
              </p>

              {imageStatus && (
                <small className="admin-image-status">{imageStatus}</small>
              )}

              {imageError && (
                <small className="admin-image-error">{imageError}</small>
              )}
            </label>

            {hasImages && (
              <div className="admin-image-preview-section">
                <div className="admin-image-preview-section__header">
                  <strong>Selected Images</strong>
                  <span>
                    {existingImages.length + optimizedImages.length} image added
                  </span>
                </div>

                <div className="admin-image-preview-grid">
                  {existingImages.map((image) => (
                    <article
                      className="admin-image-preview-card"
                      key={image.publicId || image.url}
                    >
                      <div className="admin-image-preview-card__image">
                        <img
                          src={image.url}
                          alt={image.alt || formData.title}
                        />

                        {image.url === existingCoverImage && (
                          <span className="admin-cover-badge">Cover</span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveExistingImage(image.publicId)
                          }
                          aria-label="Remove existing image"
                        >
                          <FaTimes aria-hidden="true" />
                        </button>
                      </div>

                      <div className="admin-image-preview-card__body">
                        <strong>{image.alt || "Project image"}</strong>

                        <small>Already uploaded</small>

                        {image.url !== existingCoverImage && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSetCoverImage("existing", image.publicId)
                            }
                          >
                            Set as cover
                          </button>
                        )}
                      </div>
                    </article>
                  ))}

                  {optimizedImages.map((image) => (
                    <article
                      className="admin-image-preview-card"
                      key={image.id}
                    >
                      <div className="admin-image-preview-card__image">
                        <img src={image.previewUrl} alt={image.originalName} />

                        {image.isCover && (
                          <span className="admin-cover-badge">Cover</span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(image.id)}
                          aria-label={`Remove ${image.originalName}`}
                        >
                          <FaTimes aria-hidden="true" />
                        </button>
                      </div>

                      <div className="admin-image-preview-card__body">
                        <strong>{image.originalName}</strong>

                        <small>
                          {formatFileSize(image.originalSize)} →{" "}
                          {formatFileSize(image.file.size)}
                        </small>

                        {!image.isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage("new", image.id)}
                          >
                            Set as cover
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          {submitMessage && (
            <div className="admin-form-message">{submitMessage}</div>
          )}

          <div className="admin-form-actions">
            <Link to="/admin/projects" className="admin-secondary-action">
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-save-button"
              disabled={isSaving || isOptimizingImages}
            >
              <FaSave aria-hidden="true" />
              {isSaving
                ? "Saving..."
                : isEditMode
                  ? "Update Project"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProjectForm;
