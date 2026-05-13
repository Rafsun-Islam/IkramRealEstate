import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import { uploadImageToCloudinary } from "../lib/cloudinary";

const galleryCollection = collection(db, "gallery");

export const getGalleryImages = async () => {
  const galleryQuery = query(galleryCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(galleryQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const createGalleryImage = async (imageData) => {
  const documentRef = await addDoc(galleryCollection, {
    ...imageData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return documentRef.id;
};

export const deleteGalleryImage = async (imageId) => {
  const imageRef = doc(db, "gallery", imageId);
  await deleteDoc(imageRef);
};

export const uploadGalleryImage = async (file, category = "General") => {
  const uploadedImage = await uploadImageToCloudinary(file, "gallery");

  const imagePayload = {
    title: file.name.replace(/\.[^/.]+$/, ""),
    category,
    url: uploadedImage.url,
    publicId: uploadedImage.publicId,
    width: uploadedImage.width,
    height: uploadedImage.height,
    format: uploadedImage.format,
    bytes: uploadedImage.bytes,
  };

  const id = await createGalleryImage(imagePayload);

  return {
    id,
    ...imagePayload,
  };
};
