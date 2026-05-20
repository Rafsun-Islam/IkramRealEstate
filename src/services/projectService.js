import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as firestoreLimit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "../lib/firebase";

import { uploadImageToCloudinary } from "../lib/cloudinary";

const projectsCollection = collection(db, "projects");

export const getProjects = async ({ pageSize = 12, lastDoc } = {}) => {
  let q = query(
    projectsCollection,
    orderBy("createdAt", "desc"),
    firestoreLimit(pageSize),
  );
  if (lastDoc)
    q = query(
      projectsCollection,
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

export const getProjectById = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  const snapshot = await getDoc(projectRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const createProject = async (projectData) => {
  const documentRef = await addDoc(projectsCollection, {
    ...projectData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return documentRef.id;
};

export const updateProject = async (projectId, projectData) => {
  const projectRef = doc(db, "projects", projectId);

  await updateDoc(projectRef, {
    ...projectData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProject = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  await deleteDoc(projectRef);
};

export const uploadProjectImages = async (optimizedImages, slug) => {
  if (!optimizedImages.length) {
    return {
      coverImage: "",
      images: [],
    };
  }

  const uploadedImages = await Promise.all(
    optimizedImages.map(async (image, index) => {
      const uploadedImage = await uploadImageToCloudinary(
        image.file,
        `projects/${slug || "project"}`,
      );

      return {
        ...uploadedImage,
        alt: image.originalName,
        isCover: image.isCover || index === 0,
      };
    }),
  );

  const coverImage =
    uploadedImages.find((image) => image.isCover)?.url ||
    uploadedImages[0]?.url ||
    "";

  return {
    coverImage,
    images: uploadedImages,
  };
};

export const getProjectBySlug = async (slug) => {
  const projectsQuery = query(
    projectsCollection,
    where("slug", "==", slug),
    firestoreLimit(1),
  );

  const snapshot = await getDocs(projectsQuery);

  if (snapshot.empty) {
    return null;
  }

  const projectDoc = snapshot.docs[0];

  return {
    id: projectDoc.id,
    ...projectDoc.data(),
  };
};

export const getFeaturedProjects = async (limitCount = 3) => {
  const projectsQuery = query(
    projectsCollection,
    orderBy("createdAt", "desc"),
    firestoreLimit(limitCount),
  );

  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};
