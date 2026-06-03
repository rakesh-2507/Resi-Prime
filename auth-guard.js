import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/index.html";
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);

      window.location.href = "/index.html";

      return;
    }

    const userData = userSnap.data();

    if (!user.emailVerified) {
      window.location.href = "/verification.html";

      return;
    }

    if (userData.role !== "Admin") {
      await signOut(auth);

      alert("Access denied");

      window.location.href = "/index.html";

      return;
    }

    if (userData.status !== "approved") {
      window.location.href = "/verification.html";

      return;
    }

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
