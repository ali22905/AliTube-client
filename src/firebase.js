import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC8AugYvqoQ8zytXnHNKn4mQkYSV8IMCDI",
  authDomain: "ali-tube-338f1.firebaseapp.com",
  projectId: "ali-tube-338f1",
  storageBucket: "ali-tube-338f1.appspot.com",
  messagingSenderId: "257456832728",
  appId: "1:257456832728:web:0966cf5ea56d26a4a2d7ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;