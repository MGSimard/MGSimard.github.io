const mediaQuery = window.matchMedia("(min-width: 768px)");
mediaQuery.addListener(refreshShareState)

const footer = document.getElementById("ac-footer");
const footerBase = document.getElementById("ac-author");
const mblFooterSharing = document.getElementById("ac-mbl-share");

const btnShare = document.getElementById("ac-share");
btnShare.addEventListener("click", checkPlatform);

let shareTriggered = false;

function checkPlatform() {
  !mediaQuery.matches ? isMobile() : isDesktop();
}

function isMobile() {
  if (!shareTriggered) {
    btnShare.classList.add("share-active");
    footerBase.classList.add("no-display");
    footer.classList.add("active");
    mblFooterSharing.classList.remove("no-display");
    shareTriggered = true;
  } else {
    btnShare.classList.remove("share-active");
    footerBase.classList.remove("no-display");
    footer.classList.remove("active");
    mblFooterSharing.classList.add("no-display");
    shareTriggered = false;
  }
}

function isDesktop() {
  if (!shareTriggered) {
    btnShare.classList.add("share-active");
    mblFooterSharing.classList.remove("no-display");
    shareTriggered = true;
  } else {
    btnShare.classList.remove("share-active");
    mblFooterSharing.classList.add("no-display");
    shareTriggered = false;
  }
}

// Ensuring active/inactive state of share element persists between mobile and desktop switches
function refreshShareState() {
  // If window is resized from desktop to mobile size
  if (!mediaQuery.matches && shareTriggered == true) {
    footerBase.classList.add("no-display");
    footer.classList.add("active");
  // Else if window is resized from mobile to desktop size
  } else if (mediaQuery.matches && shareTriggered == true){
    footerBase.classList.remove("no-display");
    footer.classList.remove("active");
  }
}