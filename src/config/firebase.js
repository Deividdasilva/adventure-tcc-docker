// import firebase from 'firebase';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBQSUm2h8LApB5ZYWrTuwLakhFzUj9A_Aw",
  authDomain: "pds-eventos.firebaseapp.com",
  projectId: "pds-eventos",
  storageBucket: "pds-eventos.appspot.com",
  messagingSenderId: "206947428727",
  appId: "1:206947428727:web:ceadecf5ac3859c7355972"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;

// forma do curso
export default firebase.initializeApp(firebaseConfig);