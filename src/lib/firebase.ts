import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBR8mxMhyU_OE4xaour8DrLZ_iydrEAKI",
  authDomain: "insta-shadow-2-0.firebaseapp.com",
  projectId: "insta-shadow-2-0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
