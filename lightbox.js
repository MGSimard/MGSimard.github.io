// This lightbox stuff is probably not best practices I'm just going off of guesses, no tutorials/libraries/plugins
const detailImgs = document.querySelectorAll(".article-content img");

const lightbox = document.getElementById("lightbox");
const title = document.getElementById("lightbox-title").querySelector("h2");
const mainImg = document.getElementById("lightbox-main-display");
const thumbContainer = document.getElementById("lightbox-thumb-container");
const arrowControls = document.getElementById("lightbox-arrow-container").querySelectorAll("button");
const exitBtn = document.getElementById("lb-exit-btn");

exitBtn.addEventListener("click", lightboxOff);
arrowControls.forEach(arrowBtn => arrowBtn.addEventListener("click", changeSlide));

let activator = 0;

for (let i = 0; i < detailImgs.length; i++) {
  detailImgs[i].addEventListener("click", triggerLightbox);
};

function lightboxOn() {
  lightbox.classList.remove("no-display");
};
function lightboxOff() {
  lightbox.classList.add("no-display"); 
  thumbContainer.innerHTML = "";
};

function triggerLightbox() {
  const targetContainer = event.target.closest(".project-sub");
  const albumTitle = targetContainer.querySelector(".article-title").textContent;
  const clickedImgPath = event.target.attributes.src.value;
  const relatedImgs = targetContainer.querySelectorAll("img");
  
  activator = [...relatedImgs].indexOf(event.target);
  // CLEAR EXISTING THUMBNAILS
  if (thumbContainer.innerHTML) {
    thumbContainer.innerHTML = ""
  }
  
  // SET ALBUM TITLE
  title.textContent = albumTitle;
  
  // SET MAIN DISPLAY
  mainImg.src = clickedImgPath;
  
  // SET ALL THUMBNAILS
  for (let i = 0; i < relatedImgs.length; i++) {
    const thumb = document.createElement("img");
    thumb.src = relatedImgs[i].attributes.src.value;
    thumb.classList.add("lightbox-thumb");
    thumb.setAttribute("data-slide", i);
    thumb.addEventListener("click", setActive);
    thumbContainer.appendChild(thumb);
  }
  
  // SET ACTIVE STATE TO LIGHTBOX THUMBNAIL RELATED TO IMAGE CLICKED WHICH TRIGGERED THE LIGHTBOX
  thumbContainer.querySelectorAll("img").forEach(thing => thing.classList.remove("active-thumb"));
  thumbContainer.querySelectorAll("img")[activator].classList.add("active-thumb");
  
  scrollThumbs();
  lightboxOn();
}

function changeSlide() {
  const lbThumbnails = thumbContainer.querySelectorAll("img");
  
  if (event.target.id === "lb-slide-previous") {
    if (activator == 0) {
      activator = lbThumbnails.length - 1;
    } else {
      activator--;
    }
  } else if (event.target.id === "lb-slide-next") {
    if (activator == lbThumbnails.length - 1) {
      activator = 0;
    } else {
      activator++;
    }
  }
  
  lbThumbnails.forEach(thing => thing.classList.remove("active-thumb"));
  lbThumbnails[activator].classList.add("active-thumb");
  mainImg.src = lbThumbnails[activator].attributes.src.value;
  scrollThumbs();
}

function setActive() { // Only for in-lightbox thumbnail clicks
  const lbThumbnails = thumbContainer.querySelectorAll("img");
  lbThumbnails.forEach(thing => thing.classList.remove("active-thumb"));
  event.target.classList.add("active-thumb");
  mainImg.src = event.target.attributes.src.value;
  activator = event.target.getAttribute("data-slide");
  scrollThumbs();
}

function scrollThumbs() {
  const stepSettings = "7.7";
  const triggerStep = 7;
  const totalImgs = thumbContainer.querySelectorAll("img");
  
  if (activator < triggerStep || totalImgs.length <= 9) {
    thumbContainer.style.left = "0";
    thumbContainer.style.right = "";
  } else if (activator >= triggerStep && activator >= totalImgs.length - 3 && totalImgs.length > 9) {
    thumbContainer.style.left = "";
    thumbContainer.style.right = "0";
  } else {    
    thumbContainer.style.left = "-" + ((activator - (triggerStep - 1)) * stepSettings) + "vw";
    thumbContainer.style.right = "";
  }
}

lightbox.addEventListener("click", () => {
  if (event.target === lightbox || event.target === document.getElementById("lightbox-title") || event.target === document.getElementById("lightbox-content")) { 
    lightboxOff();}
});