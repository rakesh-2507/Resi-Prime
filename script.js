// dashboard.js

import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// Sidebar toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const confirmLogout = confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {
      localStorage.removeItem("adminLoggedIn");

      await signOut(auth);

      window.location.href = "/index.html";
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  });
}