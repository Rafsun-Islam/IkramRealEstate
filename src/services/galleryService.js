import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { uploadImageToCloudinary } from "../lib/cloudinary";

const galleryCollection = collection(db, "gallery");

export const getGalleryImages = async ({ pageSize = 12, lastDoc } = {}) => {
  let q = query(
    galleryCollection,
    orderBy("createdAt", "desc"),
    firestoreLimit(pageSize),
  );
  if (lastDoc)
    q = query(
      galleryCollection,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      firestoreLimit(pageSize),
    );

  const snapshot = await getDocs(q);

  return {
    items: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
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
