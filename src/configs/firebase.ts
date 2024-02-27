// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCja_UEyClpbbLb1scSms2kogbH3dH_ZrQ",
  authDomain: "airbnb-1-36adf.firebaseapp.com",
  projectId: "airbnb-1-36adf",
  storageBucket: "airbnb-1-36adf.appspot.com",
  messagingSenderId: "943151884260",
  appId: "1:943151884260:web:c780fe247657aba563c9f1"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export default fire;