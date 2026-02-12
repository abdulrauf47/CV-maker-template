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

  // ===== Menu Items =====
  const menuItems = document.querySelectorAll(".menu-item");
  if (menuItems) {
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        if (!item.classList.contains("has-submenu")) {
          menuItems.forEach(i => i.classList.remove("active"));
          item.classList.add("active");
        }
      });
    });
  }

  // ===== Progress Items =====
  const progressItems = document.querySelectorAll(".progress-item");
  const slides = document.querySelectorAll(".slide-left");

  if (progressItems.length && slides.length) {
    progressItems.forEach(item => {
      item.addEventListener("click", () => {
        progressItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        slides.forEach(s => s.classList.remove("active"));
        const target = item.dataset.target;
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add("active");

        // Update slider image if exists
        const sliderImage = document.getElementById("sliderImage");
        const images = {
          "resume-building": "Image/Dashboad_Hero_Section_1.webp",
          "resume-tailoring": "Image/Dashboad_Hero_Section_2.png",
          "resume-distribution": "Image/Dashboad_Hero_Section_3.png",
          "resume-cover-letter": "Image/Dashboad_Hero_Section_4.png"
        };
        if (sliderImage && images[target]) sliderImage.src = images[target];
      });
    });
  }

  // ===== Progress Counter =====
  const counter = document.querySelector(".percentage");
  const bar = document.querySelector(".progress-fill");
  if (counter && bar) {
    const target = +counter.getAttribute("data-target");
    const barWidth = bar.getAttribute("data-width");
    let count = 0;

    const updateCounter = () => {
      if (count < target) {
        count++;
        counter.innerText = count + "%";
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target + "%";
      }
    };

    counter.innerText = "0%";
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.transition = "width 1.5s ease";
      bar.style.width = barWidth + "%";
    }, 100);

    updateCounter();
  }

  // ===== Export DOCX =====
  const exportBtn = document.getElementById("exportDocx");
  const fileInput = document.getElementById("fileInput");
  if (exportBtn && fileInput) {
    exportBtn.addEventListener("click", () => fileInput.click());
  }

  // ===== Tabs: Resume / Cover Letter =====
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

});


const resumeTab = document.getElementById("resumeTab");
const coverTab = document.getElementById("coverTab");

const resumeContent = document.getElementById("resumeContent");
const coverContent = document.getElementById("coverContent");

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

document.addEventListener("DOMContentLoaded", () => {
  const resumeTab = document.getElementById("resumeTab");
  const coverTab = document.getElementById("coverTab");

  const resumeContent = document.getElementById("resumeContent");
  const coverContent = document.getElementById("coverContent");

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
});

