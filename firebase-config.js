import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMDtrngq3gBQ1GjE7FsZKr1VY-mdhR7Jw",
  authDomain: "pranava-01.firebaseapp.com",
  databaseURL:
    "https://pranava-01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pranava-01",
  storageBucket: "pranava-01.firebasestorage.app",
  messagingSenderId: "1003584593328",
  appId: "1:1003584593328:web:2dd5adf3f920048af0ca75"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const rtdb = getDatabase(app);

const storage = getStorage(app);

export { app, auth, db, rtdb, storage };