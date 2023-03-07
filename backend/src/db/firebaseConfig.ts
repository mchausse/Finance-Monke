// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6i4qtzIu9DCoP4fnhuEh-Hkjs4TiWiZE",
    authDomain: "quickpay-f5a8e.firebaseapp.com",
    databaseURL: "https://quickpay-f5a8e-default-rtdb.firebaseio.com",
    projectId: "quickpay-f5a8e",
    storageBucket: "quickpay-f5a8e.appspot.com",
    messagingSenderId: "273938821257",
    appId: "1:273938821257:web:83d6f9e71e73c0b7bd5658",
    measurementId: "G-PRFH6EZZQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db