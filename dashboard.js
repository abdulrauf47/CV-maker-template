
const profileImg = document.getElementById("profileImg");
    const profileDropdown = document.getElementById("profileDropdown");

    profileImg.addEventListener("click", () => {
      profileDropdown.classList.toggle("show");
    });