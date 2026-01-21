
document.addEventListener("DOMContentLoaded", () => {

  const menuIcon = document.querySelector(".menu-icon");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownItems = document.querySelectorAll(".nav-menu > li");

  // ☰ menu toggle
  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-open");

    menuIcon.textContent = navMenu.classList.contains("mobile-open")
      ? "✖"
      : "☰";
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

  // --- Carousel for Tested Resume Templates ---
  const viewport = document.querySelector('.slider-viewport');
  const track = document.querySelector('.slider-cards');
  const cards = Array.from(document.querySelectorAll('.slider-card'));

  if (viewport && track && cards.length) {
    let cardWidth = 0;
    let gap = 20;
    let viewportWidth = 0;
    let current = Math.floor(cards.length / 2);

    function measure() {
      const r = cards[0].getBoundingClientRect();
      cardWidth = Math.round(r.width);
      const style = getComputedStyle(track);
      gap = parseInt(style.gap) || 20;
      viewportWidth = Math.round(viewport.getBoundingClientRect().width);
    }

    function update() {
      cards.forEach((c, i) => c.classList.toggle('center', i === current));
      const offset = (viewportWidth / 2) - (cardWidth / 2) - current * (cardWidth + gap);
      track.style.transform = `translateX(${offset}px)`;
    }

    // Initial layout
    measure();
    update();

    window.addEventListener('resize', () => {
      measure();
      update();
    });

    const btnLeft = document.querySelector('.arrow.left');
    const btnRight = document.querySelector('.arrow.right');

    if (btnLeft) btnLeft.addEventListener('click', () => {
      if (current > 0) { current--; update(); }
    });

    if (btnRight) btnRight.addEventListener('click', () => {
      if (current < cards.length - 1) { current++; update(); }
    });

    // Click a card to bring to center, or if center - trigger use-template
    track.addEventListener('click', (e) => {
      const cardEl = e.target.closest('.slider-card');
      if (!cardEl) return;
      const idx = parseInt(cardEl.dataset.index, 10);
      if (isNaN(idx)) return;
      if (idx !== current) {
        current = idx;
        update();
        return;
      }

      const useBtn = e.target.closest('.use-template');
      if (useBtn) {
        // Action when user clicks the center "Use this template" button
        // For now show a simple feedback; integrate with your app flow as needed.
        alert('Selected template #' + (current + 1));
      }
    });

    // keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') btnLeft && btnLeft.click();
      if (e.key === 'ArrowRight') btnRight && btnRight.click();
    });
  }

});


const sliderCards = document.getElementById("sliderCards");

// how many cards you want
const totalCards = 20;

for (let i = 1; i <= totalCards; i++) {
    const card = document.createElement("div");
    card.className = "slider-card";
    card.setAttribute("data-index", i - 1);

    card.innerHTML = `
        <div class="card-inner">
            <h4 class="card-caption">Template ${i}</h4>
            <img src="Image/${i} CV.jpg" alt="CV ${i}">
            <button class="use-template">Use this template</button>
        </div>
    `;

    sliderCards.appendChild(card);
}

