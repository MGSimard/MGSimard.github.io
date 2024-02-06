const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const allImages = document.querySelectorAll("div.gallery img");
allImages.forEach(image => image.addEventListener("click", triggerLightbox))
const arrows = document.getElementById("lb-arrows-container");
const previous = document.getElementById("lb-previous");
const next = document.getElementById("lb-next");
const closeBtn = document.getElementById("lb-close");

let activeIndex = 0;
let imagesInSection = [];

function triggerLightbox(e) {
  imagesInSection = e.target.closest(".gallery").getElementsByTagName("img");
  const isMultiple = imagesInSection.length > 1 ? true : false;
  
  activeIndex = [...imagesInSection].indexOf(e.target);
    
  lightboxImage.src = e.target.attributes.src.value;
  
  if (isMultiple) {
    arrows.classList.remove("nodisplay");
    previous.addEventListener("click", lbArrows);
    next.addEventListener("click", lbArrows);
  } else {
    arrows.classList.add("nodisplay");
  }
  
  lightbox.classList.remove("nodisplay");
  
  document.addEventListener("keydown", lbNavigate);
  closeBtn.addEventListener("click", lightboxOff);
}

function lbNavigate(e) {
  switch (e.key) {
    case "ArrowLeft": previous.click();break;
    case "ArrowRight": next.click();break;
    case "Escape": lightboxOff();break;
  }
}

function lbArrows(e) {
  const target = e.target.id;
  if (target === "lb-previous") {
    goPrevious();
  } else if (target === "lb-next") {
    goNext();
  }
}

function goPrevious() {
  if (activeIndex === 0) {
    activeIndex = imagesInSection.length - 1;
  } else {
    activeIndex--;
  }
  lightboxImage.src = imagesInSection[activeIndex].attributes.src.value;
}

function goNext() {
  if (activeIndex === imagesInSection.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex++;
  }
  lightboxImage.src = imagesInSection[activeIndex].attributes.src.value;
}

lightbox.addEventListener("click", () => {
  if (event.target === lightbox) {
    lightboxOff();
  }
})

function lightboxOff() {
  lightbox.classList.add("nodisplay");
  arrows.classList.add("nodisplay");
  document.removeEventListener("keydown", lbNavigate);
  previous.removeEventListener("click", lbArrows);
  next.removeEventListener("click", lbArrows);
  activeIndex = 0;
};