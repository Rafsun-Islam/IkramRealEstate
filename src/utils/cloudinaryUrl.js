const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_BASE = CLOUDINARY_CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  : "";

export const buildCloudinaryUrl = (
  url,
  { width = 800, quality = "auto", format = "auto" } = {},
) => {
  if (!url?.includes("/upload/")) return url;
  return url.replace(
    "/upload/",
    `/upload/f_${format},q_${quality},w_${width}/`,
  );
};

export { CLOUDINARY_BASE };
