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

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // sab se active class remove karo
    menuItems.forEach(i => i.classList.remove("active"));

    // jis par click hua usko active karo
    item.classList.add("active");
  });
});


const progressItems = document.querySelectorAll(".progress-item");
const slides = document.querySelectorAll(".slide-left");

progressItems.forEach(item => {
  item.addEventListener("click", () => {

    // left active
    progressItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // right content
    slides.forEach(s => s.classList.remove("active"));
    const target = item.dataset.target;
    document.getElementById(target).classList.add("active");

  });
});

const sliderImage = document.getElementById("sliderImage");

// Map of images for each slide
const images = {
  "resume-building": "Image/Dashboad_Hero_Section_1.webp",
  "resume-tailoring": "Image/Dashboad_Hero_Section_2.png",
  "resume-distribution": "Image/Dashboad_Hero_Section_3.png",
  "resume-cover-letter": "Image/Dashboad_Hero_Section_4.png"
};

// By default, show first slide + image
slides.forEach(s => s.classList.remove("active")); // remove all active
slides[0].classList.add("active");
sliderImage.src = images["resume-building"];

// Click event
progressItems.forEach(item => {
  item.addEventListener("click", () => {

    // Left tab active
    progressItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // Right slide content active
    slides.forEach(s => s.classList.remove("active"));
    const target = item.dataset.target;
    document.getElementById(target).classList.add("active");

    // Change image according to clicked item
    sliderImage.src = images[target];
  });
});


document.addEventListener("DOMContentLoaded", function () {

  const counter = document.querySelector(".percentage");
  const bar = document.querySelector(".progress-fill");

  const target = +counter.getAttribute("data-target");
  const barWidth = bar.getAttribute("data-width");

  let count = 0;

  const updateCounter = () => {

    if (count < target) {
      count++;
      counter.innerText = count + "%";
      setTimeout(updateCounter, 20); // speed
    } else {
      counter.innerText = target + "%";
    }

  };

  // Start from 0
  counter.innerText = "0%";
  bar.style.width = "0%";

  // Animate bar
  setTimeout(() => {
    bar.style.transition = "width 1.5s ease";
    bar.style.width = barWidth + "%";
  }, 100);

  // Animate number
  updateCounter();

});


