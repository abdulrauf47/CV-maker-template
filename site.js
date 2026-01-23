
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
  dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {

      if (window.innerWidth <= 768 && item.querySelector("div")) {
        e.stopPropagation();

        // close others
        dropdownItems.forEach(i => {
          if (i !== item) i.classList.remove("open");
        });

        item.classList.toggle("open");
      }

    });
  });
});

// --- Carousel for Tested Resume Templates ---
//   const viewport = document.querySelector('.slider-viewport');
//   const track = document.querySelector('.slider-cards');
//   const cards = Array.from(document.querySelectorAll('.slider-card'));

//   if (viewport && track && cards.length) {
//     let cardWidth = 0;
//     let gap = 20;
//     let viewportWidth = 0;
//     let current = 1;

//     function measure() {
//       const r = cards[0].getBoundingClientRect();
//       cardWidth = Math.round(r.width);
//       const style = getComputedStyle(track);
//       gap = parseInt(style.gap) || 20;
//       viewportWidth = Math.round(viewport.getBoundingClientRect().width);
//     }

//     function update() {
//       cards.forEach((c, i) => c.classList.toggle('center', i === current));
//       const offset = (viewportWidth / 2) - (cardWidth / 2) - current * (cardWidth + gap);
//       track.style.transform = `translateX(${offset}px)`;
//     }

//     // Initial layout
//     measure();
//     update();

//     window.addEventListener('resize', () => {
//       measure();
//       update();
//     });

//     const btnLeft = document.querySelector('.arrow.left');
//     const btnRight = document.querySelector('.arrow.right');

//     if (btnLeft) btnLeft.addEventListener('click', () => {
//       if (current > 0) { current--; update(); }
//     });

//     if (btnRight) btnRight.addEventListener('click', () => {
//       if (current < cards.length - 1) { current++; update(); }
//     });

//     // Click a card to bring to center, or if center - trigger use-template
//     track.addEventListener('click', (e) => {
//       const cardEl = e.target.closest('.slider-card');
//       if (!cardEl) return;
//       const idx = parseInt(cardEl.dataset.index, 10);
//       if (isNaN(idx)) return;
//       if (idx !== current) {
//         current = idx;
//         update();
//         return;
//       }

//       const useBtn = e.target.closest('.use-template');
//       if (useBtn) {
//         // Action when user clicks the center "Use this template" button
//         // For now show a simple feedback; integrate with your app flow as needed.
//         alert('Selected template #' + (current + 1));
//       }
//     });

//     // keyboard navigation
//     document.addEventListener('keydown', (e) => {
//       if (e.key === 'ArrowLeft') btnLeft && btnLeft.click();
//       if (e.key === 'ArrowRight') btnRight && btnRight.click();
//     });
//   }

// });


// const sliderCards = document.getElementById("sliderCards");

// // how many cards you want
// const totalCards = 20;

// for (let i = 1; i <= totalCards; i++) {
//     const card = document.createElement("div");
//     card.className = "slider-card";
//     card.setAttribute("data-index", i - 1);

//     card.innerHTML = `
//         <div class="card-inner">
//             <h4 class="card-caption">Template ${i}</h4>
//             <img src="Image/${i} CV.jpg" alt="CV ${i}">
//             <button class="use-template">Use this template</button>
//         </div>
//     `;

//     sliderCards.appendChild(card);
// }

// viewport.addEventListener('wheel', (e) => {
//   e.preventDefault();

//   if (e.deltaY > 0) {
//     // scroll down → right
//     if (current < cards.length - 1) {
//       current++;
//       update();
//     }
//   } else {
//     // scroll up → left
//     if (current > 0) {
//       current--;
//       update();
//     }
//   }
// });


const images = [
  "Image/1 CV.jpg", "Image/2 CV.jpg", "Image/3 CV.jpg", "Image/4 CV.jpg", "Image/5 CV.jpg",
  "Image/6 CV.jpg", "Image/7 CV.jpg", "Image/8 CV.jpg", "Image/9 CV.jpg", "Image/10 CV.jpg",
  "Image/11 CV.jpg", "Image/12 CV.jpg", "Image/13 CV.jpg", "Image/14 CV.jpg", "Image/15 CV.jpg",
  "Image/16 CV.jpg", "Image/17 CV.jpg", "Image/18 CV.jpg", "Image/19 CV.jpg", "Image/20 CV.jpg"
];

const sliderList = document.getElementById("sliderList");
let currentIndex = 0;

// Duplicate images for infinite scroll feel
const sliderImages = [...images, ...images];

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

    sliderList.appendChild(div);
  });

  updateSliderPosition();
}

function updateSliderPosition() {
  const itemWidth = sliderList.children[0].offsetWidth + 20; // including margin
  const offset = -(currentIndex + images.length) * itemWidth + (sliderList.parentElement.offsetWidth / 2 - itemWidth / 2);
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
  if(window.innerWidth > 768) return; // desktop pe drag disabled

  let isDragging = false;
  let startX = 0;

  sliderList.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].pageX;
  });

  sliderList.addEventListener("touchend", e => {
    isDragging = false;
  });

  sliderList.addEventListener("touchmove", e => {
    if(!isDragging) return;
    const move = e.touches[0].pageX - startX;
    const itemWidth = sliderList.children[0].offsetWidth + 20;
    if(move > itemWidth / 2) {
      prevSlideDrag();
      startX = e.touches[0].pageX;
    }
    if(move < -itemWidth / 2) {
      nextSlideDrag();
      startX = e.touches[0].pageX;
    }
  });
}

function nextSlideDrag() {
  currentIndex++;
  if(currentIndex >= images.length) currentIndex = 0;
  updateSliderPosition();
}

function prevSlideDrag() {
  currentIndex--;
  if(currentIndex < 0) currentIndex = images.length - 1;
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
    { icon: "fa-regular fa-file-lines", iconColor: "", title: "Resume Builder", text: "Build the resume that gets you hired. We designed the builder with top employers Finish a draft 20 mins with “Recruiter-AI”.", img: "Image/resume-box-tool.png", bg: "#eaf6ff" },
    { icon: "fa-solid fa-microchip", iconColor: "#2E7D32", title: "Recruiter Match", text: "Recruiters come to us with roles they can’t fill. We close-match your resume and then send it to 50 recruiters a week.", img: "Image/recruiter-box-tool.png", bg: "#e7f4ed" }
  ],
  [
    { icon: "fa-solid fa-magnifying-glass", iconColor: "#a6acff", title: "Job Board", text: "See every online job board in one place. We search the entire internet every day. If a role goes live, you won’t miss it.", img: "Image/job_board.png", bg: "#f1f2ff" },
    { icon: "fa-solid fa-paper-plane", iconColor: "", title: "Auto Apply", text: "Our team of experts apply for you. All they need is your resume and your target salary. interviews come by email.", img: "Image/auto_apply.png", bg: "#EAF6FF" }
  ],
  [
    { icon: "fa-solid fa-comments", iconColor: "#2E7D32", title: "Interview Prep", text: "Practice the questions that get you hired. Choose from the world’s best employers and see instant feedback.", img: "Image/interview_prep.png", bg: "#e7f4ed" },
    { icon: "fa-solid fa-gauge-high", iconColor: "#a6acff", title: "Salary Analyzer", text: "Get paid 7% more. Our salary analyzer shows you if your job offer is at the market rate. Always negotiate!", img: "Image/salary_analyzer.png", bg: "#f1f2ff" }
  ],
  [
    { icon: "fa-solid fa-user", iconColor: "#2E7D32", title: "Career Coaching", text: "Work 1-1 with an expert to expand your network, give better interviews and negotiate a higher salary.", img: "Image/career_coaching.png", bg: "#e7f4ed" },
    { icon: "fa-solid fa-bolt", iconColor: "#a6acff", title: "Future Learn", text: "Future proof yourself. Get the courses you need to grow. Accredited, certified and respected by employers.", img: "Image/future_learn.png", bg: "#f1f2ff" }
  ]
];

const stepsList = document.getElementById("stepsList").children;

function updateContent(index) {
  [...stepsList].forEach(li => li.classList.remove("active"));
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
