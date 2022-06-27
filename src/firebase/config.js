// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOw3MKMKI4wPCyXZLPp25Eyjy9og4_YS4",
  authDomain: "sporting-f6290.firebaseapp.com",
  projectId: "sporting-f6290",
  storageBucket: "sporting-f6290.appspot.com",
  messagingSenderId: "221215220799",
  appId: "1:221215220799:web:8292bf93bfb29a3ef3048a",
  measurementId: "G-KYKE77MM81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const projectStorage = getStorage(app)

export { projectStorage }

