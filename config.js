import firebase from "firebase";

export const firebaseConfig = {
    apiKey: "AIzaSyBRqfIZyGMlFSq-N1bDi_Mpgpn1DmL9GJc",
    authDomain: "spectagram-app-c5874.firebaseapp.com",
    projectId: "spectagram-app-c5874",
    storageBucket: "spectagram-app-c5874.appspot.com",
    messagingSenderId: "395288914046",
    appId: "1:395288914046:web:1d38c286a3de86d8d3d02f"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// export default firebase.firestore()