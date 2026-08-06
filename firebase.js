import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDf5BDxRH5V5LQkOGt5wOP-6mrIGOPk2TU",
    authDomain: "minenova-simulator.firebaseapp.com",
    projectId: "minenova-simulator",
    storageBucket: "minenova-simulator.firebasestorage.app",
    messagingSenderId: "73831734825",
    appId: "1:73831734825:web:019674918d83ab98158638"
};

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

// export {
//     auth,
//     db,
//     provider,
//     signInWithPopup,
//     signOut,
//     doc,
//     getDoc,
//     setDoc,
//     updateDoc
// };