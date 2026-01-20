
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

});
