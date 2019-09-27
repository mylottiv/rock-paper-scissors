function initFirestore() {    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBspkISHv0xYVmKEJTIDXmDLYJqzRqOEfY",
        authDomain: "rock-paper-scissors-arena.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-arena.firebaseio.com",
        projectId: "rock-paper-scissors-arena",
        storageBucket: "rock-paper-scissors-arena.appspot.com",
        messagingSenderId: "368831738715",
        appId: "1:368831738715:web:43de9f770e1bb5b3a1a07e",
        measurementId: "G-DE8W82ZP0X"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    return firebase.firestore();
}