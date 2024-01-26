
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};;
console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const storage = getStorage();
export const storageRef = ref(storage, 'some-child');



export const googleAuth = () => {
  return new Promise((resolve, reject) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
      auth.languageCode = 'it';
      signInWithPopup(auth, provider)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        });
    } catch (error) {
      reject(error)
    }
  })
};