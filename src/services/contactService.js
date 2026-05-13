import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

const messagesCollection = collection(db, "messages");

export const createContactMessage = async (messageData) => {
  const documentRef = await addDoc(messagesCollection, {
    ...messageData,
    status: "unread",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return documentRef.id;
};

export const getContactMessages = async () => {
  const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(messagesQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const updateMessageStatus = async (messageId, status) => {
  const messageRef = doc(db, "messages", messageId);

  await updateDoc(messageRef, {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const deleteContactMessage = async (messageId) => {
  const messageRef = doc(db, "messages", messageId);
  await deleteDoc(messageRef);
};
