import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

export const FirebaseAplication = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBvP05zi6looD2dZWHPyoO-kuerMXYWvJg",
        authDomain: "instagram-clone-db476.firebaseapp.com",
        projectId: "instagram-clone-db476",
        storageBucket: "instagram-clone-db476.appspot.com",
        messagingSenderId: "96472126831",
        appId: "1:96472126831:web:0a2fef9a933bdf96ce449a",
        measurementId: "G-M9FS9JW54H"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const storage = getStorage(app)
    const analytics = getAnalytics(app);
}

