import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const profileImg = document.getElementById("profileImg");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn"); // ✅ Already defined

  // profile image click
  profileImg.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("show");
  });

  // outside click
  document.addEventListener("click", () => {
    profileDropdown.classList.remove("show");
  });

  // LOGOUT
  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isLoggedIn"); // optional
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});

