const firebaseConfig = {
  apiKey: "AIzaSyAtrB-e_EXU0ZgpZPiUfItn-0FgwhDHinE",
  authDomain: "cv-login-project.firebaseapp.com",
  projectId: "cv-login-project",
  storageBucket: "cv-login-project.firebasestorage.app",
  messagingSenderId: "54600693946",
  appId: "1:54600693946:web:949721e9cd4f82fc856a83",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownItems = document.querySelectorAll(".nav-menu > li");

  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-open");

    if (navMenu.classList.contains("mobile-open")) {
      document.body.classList.add("no-scroll"); // background stop
      menuIcon.textContent = "✖";
    } else {
      document.body.classList.remove("no-scroll"); // background resume
      menuIcon.textContent = "☰";
    }
  });

  // dropdown toggle (mobile only)
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && item.querySelector("div")) {
        e.stopPropagation();

        // close others
        dropdownItems.forEach((i) => {
          if (i !== item) i.classList.remove("open");
        });

        item.classList.toggle("open");
      }
    });
  });
});

const images = [
  "Image/1 CV.jpg",
  "Image/2 CV.jpg",
  "Image/3 CV.jpg",
  "Image/4 CV.jpg",
  "Image/5 CV.jpg",
  "Image/6 CV.jpg",
  "Image/7 CV.jpg",
  "Image/8 CV.jpg",
  "Image/9 CV.jpg",
  "Image/10 CV.jpg",
  "Image/11 CV.jpg",
  "Image/12 CV.jpg",
  "Image/13 CV.jpg",
  "Image/14 CV.jpg",
  "Image/15 CV.jpg",
  "Image/16 CV.jpg",
  "Image/17 CV.jpg",
  "Image/18 CV.jpg",
  "Image/19 CV.jpg",
  "Image/20 CV.jpg",
];

const sliderList = document.getElementById("sliderList");
let currentIndex = 0;

// Duplicate images for infinite scroll feel
const sliderImages = [...images, ...images];

function updateSliderPosition() {
  const itemWidth = sliderList.children[0].offsetWidth + 20; // including margin
  const offset =
    -(currentIndex + images.length) * itemWidth +
    (sliderList.parentElement.offsetWidth / 2 - itemWidth / 2);
  sliderList.style.transform = `translateX(${offset}px)`;

  // Center image
  [...sliderList.children].forEach((child, idx) => {
    child.classList.remove("center");
    if (idx === currentIndex + images.length) child.classList.add("center");
  });
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= images.length) currentIndex = 0;
  updateSliderPosition();
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = images.length - 1;
  updateSliderPosition();
}

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

renderSlider();

function renderSlider() {
  sliderList.innerHTML = "";
  sliderImages.forEach((src, index) => {
    const div = document.createElement("div");
    div.classList.add("slider-item");
    if (index === currentIndex + images.length) div.classList.add("center"); // center image
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);

    const btn = document.createElement("button");
    btn.textContent = "Use this template";
    div.appendChild(btn);

    btn.addEventListener("click", () => {
      window.location.href = "maker.html"; // simple redirect
    });

    // Click event: clicked image center me aaye
    img.addEventListener("click", () => {
      // clicked image index in main images array
      const clickedIndex = index % images.length;
      currentIndex = clickedIndex;
      updateSliderPosition();
    });

    sliderList.appendChild(div);
  });

  updateSliderPosition();
}

// ---- MOBILE / TABLET DRAG SUPPORT ----
function attachMobileDrag() {
  if (window.innerWidth > 768) return; // desktop pe drag disabled

  let isDragging = false;
  let startX = 0;

  sliderList.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  });

  sliderList.addEventListener("touchend", (e) => {
    isDragging = false;
  });

  sliderList.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const move = e.touches[0].pageX - startX;
    const itemWidth = sliderList.children[0].offsetWidth + 20;
    if (move > itemWidth / 2) {
      prevSlideDrag();
      startX = e.touches[0].pageX;
    }
    if (move < -itemWidth / 2) {
      nextSlideDrag();
      startX = e.touches[0].pageX;
    }
  });
}

function nextSlideDrag() {
  currentIndex++;
  if (currentIndex >= images.length) currentIndex = 0;
  updateSliderPosition();
}

function prevSlideDrag() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = images.length - 1;
  updateSliderPosition();
}

// Attach mobile drag initially
attachMobileDrag();

// Optional: re-attach on window resize (if user rotates device)
window.addEventListener("resize", () => {
  attachMobileDrag();
});

const steps = [
  [
    {
      icon: "fa-regular fa-file-lines",
      iconColor: "",
      title: "Resume Builder",
      text: "Build the resume that gets you hired. We designed the builder with top employers Finish a draft 20 mins with “Recruiter-AI”.",
      img: "Image/resume-box-tool.png",
      bg: "#eaf6ff",
    },
    {
      icon: "fa-solid fa-microchip",
      iconColor: "#2E7D32",
      title: "Recruiter Match",
      text: "Recruiters come to us with roles they can’t fill. We close-match your resume and then send it to 50 recruiters a week.",
      img: "Image/recruiter-box-tool.png",
      bg: "#e7f4ed",
    },
  ],
  [
    {
      icon: "fa-solid fa-magnifying-glass",
      iconColor: "#a6acff",
      title: "Job Board",
      text: "See every online job board in one place. We search the entire internet every day. If a role goes live, you won’t miss it.",
      img: "Image/job_board.png",
      bg: "#f1f2ff",
    },
    {
      icon: "fa-solid fa-paper-plane",
      iconColor: "",
      title: "Auto Apply",
      text: "Our team of experts apply for you. All they need is your resume and your target salary. interviews come by email.",
      img: "Image/auto_apply.png",
      bg: "#EAF6FF",
    },
  ],
  [
    {
      icon: "fa-solid fa-comments",
      iconColor: "#2E7D32",
      title: "Interview Prep",
      text: "Practice the questions that get you hired. Choose from the world’s best employers and see instant feedback.",
      img: "Image/interview_prep.png",
      bg: "#e7f4ed",
    },
    {
      icon: "fa-solid fa-gauge-high",
      iconColor: "#a6acff",
      title: "Salary Analyzer",
      text: "Get paid 7% more. Our salary analyzer shows you if your job offer is at the market rate. Always negotiate!",
      img: "Image/salary_analyzer.png",
      bg: "#f1f2ff",
    },
  ],
  [
    {
      icon: "fa-solid fa-user",
      iconColor: "#2E7D32",
      title: "Career Coaching",
      text: "Work 1-1 with an expert to expand your network, give better interviews and negotiate a higher salary.",
      img: "Image/career_coaching.png",
      bg: "#e7f4ed",
    },
    {
      icon: "fa-solid fa-bolt",
      iconColor: "#a6acff",
      title: "Future Learn",
      text: "Future proof yourself. Get the courses you need to grow. Accredited, certified and respected by employers.",
      img: "Image/future_learn.png",
      bg: "#f1f2ff",
    },
  ],
];

const stepsList = document.getElementById("stepsList").children;

function updateContent(index) {
  [...stepsList].forEach((li) => li.classList.remove("active"));
  stepsList[index].classList.add("active");

  // BOX 1
  const box1 = document.getElementById("toolBox1");
  const data1 = steps[index][0];

  const icon1 = box1.querySelector("i");
  icon1.className = data1.icon;
  icon1.style.color = data1.iconColor;

  box1.querySelector("h2").textContent = data1.title;
  box1.querySelector("p").textContent = data1.text;
  box1.querySelector("img").src = data1.img;
  box1.style.backgroundColor = data1.bg;

  // BOX 2
  const box2 = document.getElementById("toolBox2");
  const data2 = steps[index][1];

  const icon2 = box2.querySelector("i");
  icon2.className = data2.icon;
  icon2.style.color = data2.iconColor;

  box2.querySelector("h2").textContent = data2.title;
  box2.querySelector("p").textContent = data2.text;
  box2.querySelector("img").src = data2.img;
  box2.style.backgroundColor = data2.bg;
}

updateContent(0);

[...stepsList].forEach((li, idx) => {
  li.addEventListener("click", () => {
    updateContent(idx);
  });
});

const uploadBtn = document.querySelector(".button-2");
const fileInput = document.getElementById("resumeInput");

uploadBtn.addEventListener("click", () => {
  fileInput.click(); // open file picker
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    showPopup("You selected: Successfully");
  }
});

window.addEventListener("load", () => {
  if (!isUserLoggedIn()) {
    accountDropdown.classList.add("hidden");
  }
});

function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

const closeBtn = document.getElementById("closeBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const dropdowns = document.querySelectorAll(".dropdown");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const resetForm = document.getElementById("resetForm");
const backToLogin = document.getElementById("backToLogin");
const otpForm = document.getElementById("otpForm");
const newPasswordForm = document.getElementById("newPasswordForm");
const myAccountBtn = document.getElementById("myAccountBtn");
const accountDropdown = document.getElementById("accountDropdown");
const signOutBtn = document.getElementById("signOutBtn");
const loginOverlay = document.getElementById("loginOverlay");

// Firebase login
document.getElementById("loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      isLoggedIn = true;
      loginOverlay.style.display = "none";
      showPopup("Login successful ✅");
    })
    .catch((err) => showPopup(err.message, "error"));
});

// Firebase signup
document.getElementById("signupBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const rePass = document.getElementById("signupRePassword").value;

  if (password !== rePass) {
    showPopup("Passwords do not match", "error");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    user.user.updateProfile({ displayName: name });
    isLoggedIn = true;
    loginOverlay.style.display = "none";
    showPopup("Account created successfully 🎉");
  });
});

// Open login modal
myAccountBtn.addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    accountDropdown.classList.toggle("hidden");
  } else {
    loginOverlay.style.display = "flex";
  }
});

signOutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    localStorage.removeItem("isLoggedIn");
    accountDropdown.classList.add("hidden");
    showPopup("Logged out successfully 👋");
  });
});

// Close login modal
closeBtn.addEventListener("click", () => (loginOverlay.style.display = "none"));

// Switch forms
showSignup.addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});
showLogin.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

// Login with Firebase
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!isValidEmail(email)) {
    showPopup("Please enter a valid email address", "error");
    return;
  }

  if (!password) {
    showPopup("Password is required", "error");
    return;
  }

  auth.signInWithEmailAndPassword(email, password).then(() => {
    loginOverlay.style.display = "none";
    showPopup("Login successful ✅");
  });
});

// Signup with Firebase
document.getElementById("signupBtn").addEventListener("click", () => {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const rePass = document.getElementById("signupRePassword").value;

  if (!name) {
    showPopup("Name is required", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showPopup("Enter a valid email address", "error");
    return;
  }

  if (!isValidPassword(password)) {
    showPopup(
      "Password must be at least 8 characters & contain a number",
      "error",
    );
    return;
  }

  if (password !== rePass) {
    showPopup("Passwords do not match");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    user.user.updateProfile({ displayName: name });
    loginOverlay.style.display = "none";
    showPopup("Account created successfully 🎉");
  });
  showPopup("Does not exist!");
});

// Google Login
document.getElementById("googleLogin").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(() => (loginOverlay.style.display = "none"));
  showPopup("Firebase Domain Cannot Work!");
});

// Show Reset Password Form
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  resetForm.style.display = "block";
});

// Back to Login
backToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  resetForm.style.display = "none";
  loginForm.style.display = "block";
});

// Send OTP
document.getElementById("resetBtn").addEventListener("click", () => {
  userEmail = document.getElementById("resetEmail").value;
  if (!userEmail) {
    showPopup("Please enter your email!");
    return;
  }

  auth
    .sendPasswordResetEmail(userEmail)
    .then(() => {
      showPopup("Password reset email sent! Check your inbox.");
      resetForm.style.display = "none";
      loginForm.style.display = "block";
    })
    .catch((error) => {
      showPopup("Check Email", "error");
    });
});

function showPopup(message, type = "success") {
  const toast = document.getElementById("popupToast");
  toast.textContent = message;

  // Change color based on type
  toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545"; // green/red

  toast.classList.add("show");
  toast.classList.remove("hidden");

  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}

function togglePassword(inputId, span) {
  const input = document.getElementById(inputId);
  const icon = span.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

const slider = document.querySelector(".resume-slider");
const nextBtn = document.querySelector(".nav.next");
const prevBtn = document.querySelector(".nav.prev");

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 320, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -320, behavior: "smooth" });
});

// Category filter (optional, for example)
const categories = document.querySelectorAll(".categories button");
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    categories.forEach((b) => b.classList.remove("active"));
    cat.classList.add("active");
    // Implement filtering if you want (advanced)
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem("isLoggedIn", "true");

    document.getElementById("accountName").textContent =
      user.displayName || "User";

    document.getElementById("accountEmail").textContent = user.email;

    // ⚠️ dropdown yahan show NAHI hoga
    accountDropdown.classList.add("hidden");
  } else {
    localStorage.removeItem("isLoggedIn");
    accountDropdown.classList.add("hidden");
  }
});
