/*Creating product as an object*/
const productList = [{
  P1: {
    PRODUCTNAME: "Fall Limited Edition Sneakers",
    CURRENTPRICE: 125,
    BASEPRICE: 250,
    DESC: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    IMG1: "./images/image-product-1.jpg",
    IMG2: "./images/image-product-2.jpg",
    IMG3: "./images/image-product-3.jpg",
    IMG4: "./images/image-product-4.jpg",
    THUMB1: "./images/image-product-1-thumbnail.jpg",
    THUMB2: "./images/image-product-2-thumbnail.jpg",
    THUMB3: "./images/image-product-3-thumbnail.jpg",
    THUMB4: "./images/image-product-4-thumbnail.jpg"
  }
}];

const cartContents = [];
const currentProduct = "P1";
const productData = productList[0][currentProduct];
const mediaQuery = window.matchMedia("(min-width: 900px)");

const productImages = [productData.IMG1, productData.IMG2, productData.IMG3, productData.IMG4];
const productThumbs = [productData.THUMB1, productData.THUMB2, productData.THUMB3, productData.THUMB4];

const cartToggle = document.getElementById("nav-button-cart");
const cart = document.getElementById("cart-preview");
const cartFilledVer = document.getElementById("cart-filled");
const cartEmptyVer = document.getElementById("cart-empty");
const itemSection = document.getElementById("cart-items-section");

cartToggle.addEventListener("click", () => {
  if (cart.classList.contains("no-display")) {
    cart.classList.remove("no-display");
  } else {
    cart.classList.add("no-display");
  }
});

let selectedQuantity = 1;
let inCart = 0;

const displayQuant = document.getElementById("select-quantity");
displayQuant.value = selectedQuantity; //Forcing initial match
const btnInc = document.getElementById("increase");
const btnDec = document.getElementById("decrease");

btnDec.addEventListener("click", () => {
  if (selectedQuantity > 1) {
    selectedQuantity -= 1;
    displayQuant.value = selectedQuantity;
  }
});
btnInc.addEventListener("click", () => {
  if (selectedQuantity < 99) {
    selectedQuantity += 1;
    displayQuant.value = selectedQuantity;
  }
});

// CART CONTENTS
const btnAddToCart = document.getElementById("add-to-cart");

btnAddToCart.addEventListener("click", () => {
  if (selectedQuantity <= 0) {
    console.log("Incorrect Quantity")
  } else {
    const template = document.getElementById("cart-item-template");
    const cartItem = template.content.cloneNode(true);
    const getWrap = cartItem.querySelector(".item-details");
    const iElemThumb = cartItem.querySelector("img");
    const iElemTitle = cartItem.querySelector(".item-name");
    const iElemPrice = cartItem.querySelector(".item-price");
    const iElemQuant = cartItem.querySelector(".item-units");
    const iElemTotal = cartItem.querySelector(".item-total");
    
    // Write data to cloned template cart product card
    getWrap.setAttribute("data-product", currentProduct);
    iElemThumb.setAttribute("src", productThumbs[0]);
    iElemTitle.textContent = productData.PRODUCTNAME;
    iElemPrice.textContent = "$" + productData.CURRENTPRICE.toFixed(2);
    iElemQuant.textContent = selectedQuantity;
    iElemTotal.textContent = "$" + (productData.CURRENTPRICE * selectedQuantity).toFixed(2);
    
    // If specific product already in cart, add to its quantity, else add the new product
    if (!cartContents.includes(currentProduct)) {
      cartContents.push(currentProduct);
      itemSection.appendChild(cartItem);
      cartHasItems();
    } else {
      const existingItem = itemSection.querySelector("[data-product=" + currentProduct + "]");
      const quantCheck = existingItem.querySelector(".item-units");

      if (parseInt(quantCheck.textContent) + selectedQuantity <= 99) {
        quantCheck.textContent = parseInt(quantCheck.textContent) + selectedQuantity;
      } else {
        // Set to 99 if total quant goes above 99
        quantCheck.textContent = 99;
      }
      
      existingItem.querySelector(".item-total").textContent = "$" + (productData.CURRENTPRICE * quantCheck.textContent).toFixed(2);
    }
    cartItemCount();
  }
});

function delFromCart() {
  const itemLoc = cartContents.indexOf(currentProduct);
  event.target.closest(".cart-item").remove();
  if (itemLoc >= 0) {
    cartContents.splice(itemLoc, 1);
  }
  if (itemSection.childNodes.length === 0) {
    cartIsEmpty();
  }
  cartItemCount();
};

// TOGGLE EMPTY/FILLED CART STATES
function cartHasItems() {
  cartEmptyVer.classList.add("no-display");
  cartFilledVer.classList.remove("no-display");
};
function cartIsEmpty() {
  cartFilledVer.classList.add("no-display");
  cartEmptyVer.classList.remove("no-display");
};

// SUM ALL UNITS OF PRODUCTS IN CART
function cartItemCount() {
  const uniqueItems = itemSection.querySelectorAll(".cart-item");
  let addTracker = 0;
  for (let i = 0; i < uniqueItems.length; i++) {
    const iElemQuant = uniqueItems[i].querySelector(".item-units");
    addTracker += parseInt(iElemQuant.textContent);
  }
  inCart = addTracker;
  updateCartTag();
}

// WRITE SUM OF UNITS ON CART TAG NOTIFICATION THING
function updateCartTag() {
  const cartTag = document.getElementById("cart-tag");
  if (inCart && inCart <= 99) {
    cartTag.textContent = inCart;
  } else if (inCart > 99) {
    cartTag.textContent = "99+";
  } else {
    cartTag.textContent = "";
  }
}

// IMAGE CAROUSEL/VITRINE/LIGHTBOX
// Rewrote this once I realized I want the vitrine state to persist between small, large and lightbox layout
let vitrineIndex = 0;

const vitrine = document.getElementById("main-vitrine");
const lightboxVitrine = document.getElementById("lb-main-vitrine");
const arrowControls = document.querySelectorAll("button.arrow");

const thumbSelectors = document.querySelectorAll(".v-thumb");
const baseThumbSelectors = document.getElementById("vitrine-thumbs").querySelectorAll(".v-thumb");
const lbThumbSelectors = document.getElementById("lb-vitrine-thumbs").querySelectorAll(".v-thumb");

arrowControls.forEach(arrow => arrow.addEventListener("click", vitrineSlide));
thumbSelectors.forEach(thumbnail => thumbnail.addEventListener("click", setVitrineState));

// Function for arrows to set vitrine index (main selected product image)
function vitrineSlide() {
  if (event.target.id === "arrow-previous" || event.target.id === "lb-arrow-previous") {
    if (vitrineIndex === 0) {
      vitrineIndex = productImages.length - 1;
    } else {
      vitrineIndex--;
    }
  } else if (event.target.id === "arrow-next" || event.target.id === "lb-arrow-next") {
    if (vitrineIndex === productImages.length - 1) {
      vitrineIndex = 0;
    } else {
      vitrineIndex++;
    }
  }
  setVitrineState();
};

function setVitrineState() {
  // Clear active styling from all thumbnails  
  thumbSelectors.forEach(thumb => thumb.parentElement.classList.remove("active-box"));
  thumbSelectors.forEach(thumb => thumb.classList.remove("active-img"));
  
  // If vitrine interaction is a thumbnail click on desktop
  if (event.target.className === "v-thumb") {
    const targetType = event.target.closest(".thumbs-container").id;

    // Style the clicked Thumbnail as active
    event.target.parentElement.classList.add("active-box");
    event.target.classList.add("active-img");

    // Set vitrine index according to clicked thumbnail
    if (targetType === "vitrine-thumbs") {
      const arrayFromType = [...baseThumbSelectors];
      vitrineIndex = arrayFromType.indexOf(event.target);
    } else if (targetType === "lb-vitrine-thumbs") {
      const arrayFromType = [...lbThumbSelectors];
      vitrineIndex = arrayFromType.indexOf(event.target);
    }
  }
  
  // Set main vitrine image to vitrine index setting
  vitrine.style.backgroundImage = "url(" + productImages[vitrineIndex] + ")";
  lightboxVitrine.style.backgroundImage = "url(" + productImages[vitrineIndex] + ")";
  
  // Set active thumbnail styling in both main and lightbox vitrine
  baseThumbSelectors[vitrineIndex].parentElement.classList.add("active-box");
  baseThumbSelectors[vitrineIndex].classList.add("active-img");
  lbThumbSelectors[vitrineIndex].parentElement.classList.add("active-box");
  lbThumbSelectors[vitrineIndex].classList.add("active-img");
}

// LIGHTBOX TOGGLES
const lightbox = document.getElementById("product-lightbox");
const closeBtn = document.getElementById("lightbox-close");

mediaQuery.addListener(testFunc);
// Exit lightbox if window is resized below comfortable desktop threshold (go to mobile)
// This is to prevent lightbox resuming when returning to desktop layout if you did stuff on mobile layout
function testFunc() {
  if (!mediaQuery.matches) {
    lightbox.classList.add("no-display");
  }
}
vitrine.addEventListener("click", () => {
  if (mediaQuery.matches) {
    lightbox.classList.remove("no-display");
  }
})
closeBtn.addEventListener("click", () => {
  lightbox.classList.add("no-display");
});
// Trying something to close lightbox if user clicks outside images
lightbox.addEventListener("click", () => {
  if (event.target === lightbox) {
    lightbox.classList.add("no-display");
  }
});

// MOBILE BURGER NAV
const burgerNav = document.getElementById("burger-expand");
const openBurgerNav = document.getElementById("nav-button-burger");
const closeBurgerNav = document.getElementById("close-burger");

openBurgerNav.addEventListener("click", () => {
  burgerNav.classList.remove("no-display");
})

closeBurgerNav.addEventListener("click", () => {
  burgerNav.classList.add("no-display");
})
// Same thing for mobile nav overlay?
burgerNav.addEventListener("click", () => {
  if (event.target === burgerNav) {
    burgerNav.classList.add("no-display");
  }
})