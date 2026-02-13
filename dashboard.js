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

  // ===== Profile Dropdown =====
  const profileImg = document.getElementById("profileImg");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  if (profileImg && profileDropdown) {
    profileImg.addEventListener("click", e => {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      profileDropdown.classList.remove("show");
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("isLoggedIn");
          window.location.href = "index.html";
        })
        .catch(error => alert(error.message));
    });
  }

  // ===== Menu Active =====
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      if (!item.classList.contains("has-submenu")) {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });

  // ===== Export DOCX =====
  const exportBtn = document.getElementById("exportDocx");
  const fileInput = document.getElementById("fileInput");
  if (exportBtn && fileInput) {
    exportBtn.addEventListener("click", () => fileInput.click());
  }

  // ===== Tabs Resume / Cover =====
  const resumeTab = document.getElementById("resumeTab");
  const coverTab = document.getElementById("coverTab");
  const resumeContent = document.getElementById("resumeContent");
  const coverContent = document.getElementById("coverContent");

  if (resumeTab && coverTab && resumeContent && coverContent) {
    resumeTab.addEventListener("click", () => {
      resumeTab.classList.add("active-tab");
      coverTab.classList.remove("active-tab");
      resumeContent.style.display = "block";
      coverContent.style.display = "none";
    });

    coverTab.addEventListener("click", () => {
      coverTab.classList.add("active-tab");
      resumeTab.classList.remove("active-tab");
      coverContent.style.display = "block";
      resumeContent.style.display = "none";
    });
  }

  // ===== Loader for Right Content =====
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", function () {
      sessionStorage.setItem("showLoader", "yes");
    });
  });

  const loader = document.getElementById("contentLoader");
  const content = document.getElementById("realContent");

  if (sessionStorage.getItem("showLoader") === "yes" && loader && content) {
    loader.style.display = "flex";
    content.style.display = "none";

    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
      sessionStorage.removeItem("showLoader");
    }, 1200);
  }

});


document.querySelectorAll(".add-job").forEach(btn => {
  btn.addEventListener("click", function () {
    const column = this.closest(".board-column");
    const dropdown = column.querySelector(".dropdown-box");
    dropdown.classList.toggle("show");
  });
});

document.querySelectorAll(".cancel").forEach(btn => {
  btn.addEventListener("click", function () {
    const dropdown = this.closest(".dropdown-box");
    dropdown.classList.remove("show");
  });
});
