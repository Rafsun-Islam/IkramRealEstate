const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const imageUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Failed to load image."));
    };

    image.src = imageUrl;
  });
};

export const optimizeImageToWebP = async (
  file,
  { maxWidth = 1600, quality = 0.78, outputName = "optimized-image" } = {},
) => {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  const image = await loadImage(file);

  const scale = Math.min(1, maxWidth / image.width);
  const targetWidth = Math.round(image.width * scale);
  const targetHeight = Math.round(image.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Image optimization failed."));
        }
      },
      "image/webp",
      quality,
    );
  });

  return new File([blob], `${outputName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
};

export const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const kilobytes = bytes / 1024;

  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(2)} MB`;
};
