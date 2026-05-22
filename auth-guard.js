// auth-guard.js

import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// ========================================
// PROTECT ADMIN PAGES
// ========================================

onAuthStateChanged(auth, async (user) => {
  // USER NOT LOGGED IN
  if (!user) {
    window.location.href = "/index.html";
    return;
  }

  try {
    // RELOAD FIRESTORE USER
    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    // USER DOC NOT FOUND
    if (!userSnap.exists()) {
      await signOut(auth);

      window.location.href = "/index.html";

      return;
    }

    const userData = userSnap.data();

    // EMAIL NOT VERIFIED
    if (!user.emailVerified) {
      window.location.href = "/verification.html";

      return;
    }

    // ROLE CHECK
    if (userData.role !== "Admin") {
      await signOut(auth);

      alert("Access denied");

      window.location.href = "/index.html";

      return;
    }

    // STATUS CHECK
    if (userData.status !== "approved") {
      window.location.href = "/verification.html";

      return;
    }

    // SESSION CHECK
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      await signOut(auth);

      window.location.href = "/index.html";

      return;
    }

    console.log("✅ Authorized Admin");

    document.body.style.display = "block";
  } catch (error) {
    console.log("Auth Guard Error:", error);

    await signOut(auth);

    window.location.href = "/index.html";
  }
});
