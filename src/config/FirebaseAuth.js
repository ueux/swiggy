import { getAuth ,GoogleAuthProvider} from 'firebase/auth'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "apiKey":import.meta.enc.VITE_AOIKEY ,
  "authDomain":import.meta.enc.VITE_AUTHDOMAIN ,
  "projectId":import.meta.enc.VITE_PROJECTID ,
  "storageBucket": import.meta.enc.VITE_STORAGEBUCKET,
  "messagingSenderId": import.meta.enc.VITE_MESSAGINGSENDERID,
  "appId": import.meta.enc.VITE_APPID

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider=new GoogleAuthProvider()