const btnWrapper = document.getElementById("navBtnWrap");
const btnOpenNav = document.getElementById("nav-open");
const btnCloseNav = document.getElementById("nav-collapse");

const nav = document.getElementById("header");

const mediaQuery = 960;

document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth <= mediaQuery) {
    enable();
  }
});

addEventListener("resize", (e) => {
  if (window.innerWidth <= mediaQuery) {
    enable();
  }
  if (window.innerWidth > mediaQuery) {
    disable();
  }
})

function enable() {
  if (btnWrapper.classList.contains("no-display")) {
    btnWrapper.classList.remove("no-display");
    btnOpenNav.classList.remove("no-display");
    btnCloseNav.classList.remove("no-display");
    nav.classList.add("no-display");
  }  
}

function disable() {
  if (!btnWrapper.classList.contains("no-display")) {
    btnWrapper.classList.add("no-display");
    btnOpenNav.classList.add("no-display");
    btnCloseNav.classList.add("no-display");
    nav.classList.remove("no-display");
  }
}

btnOpenNav.addEventListener("click", () => {
  btnOpenNav.classList.add("no-display");
  nav.classList.remove("no-display");
});
btnCloseNav.addEventListener("click", () => {
  btnOpenNav.classList.remove("no-display");
  nav.classList.add("no-display");
});
