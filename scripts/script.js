//MOBILE NAV MENU
const mobileNav = document.getElementById("mobile-nav");
const btn_openNav = document.getElementById("burger-button");
const navLinks = document.querySelectorAll(".mLink");

btn_openNav.addEventListener("click", () => {
  if (mobileNav.classList.contains("forceshow")) {
    resetNavBar();
  } else {
    navLinks.forEach(link => link.removeAttribute("hidden"));
    mobileNav.classList.add("forceshow");
  }
})

const resetNavBar = () => {
  mobileNav.classList.remove("forceshow");
  navLinks.forEach(link => link.setAttribute("hidden", true));
}