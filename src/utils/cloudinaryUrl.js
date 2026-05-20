const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_BASE = CLOUDINARY_CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  : "";

export const isCloudinaryUrl = (url) =>
  typeof url === "string" &&
  url.includes("/upload/") &&
  url.includes("cloudinary");

export const buildCloudinaryUrl = (
  url,
  { width = 800, quality = "auto", format = "auto" } = {},
) => {
  if (!isCloudinaryUrl(url)) return url;
  return url.replace(
    "/upload/",
    `/upload/f_${format},q_${quality},w_${width}/`,
  );
};

export { CLOUDINARY_BASE };
