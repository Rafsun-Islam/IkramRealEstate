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
  startAfter,
  limit as firestoreLimit,
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

export const getContactMessages = async ({ pageSize = 20, lastDoc } = {}) => {
  let q = query(
    messagesCollection,
    orderBy("createdAt", "desc"),
    firestoreLimit(pageSize),
  );
  if (lastDoc)
    q = query(
      messagesCollection,
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
