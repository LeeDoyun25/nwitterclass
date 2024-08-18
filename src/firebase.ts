import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBzaQZsVd3F7vcs6RA4uiEmcvHbJb1z9mg",
  authDomain: "nwitterclass.firebaseapp.com",
  projectId: "nwitterclass",
  storageBucket: "nwitterclass.appspot.com",
  messagingSenderId: "373363265339",
  appId: "1:373363265339:web:b76fc9885028006f84311e"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);