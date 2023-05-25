/*Creating product as an object*/
const productList = [{
  P1: {
    PRODUCTNAME: "Fall Limited Edition Sneakers",
    CURRENTPRICE: 125,
    BASEPRICE: 250,
    DESC: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    IMG1: "./images/image-product-1/",
    IMG2: "./images/image-product-2/",
    IMG3: "./images/image-product-3/",
    IMG4: "./images/image-product-4/",
    THUMB1: "./images/image-product-1-thumbnail/",
    THUMB2: "./images/image-product-2-thumbnail/",
    THUMB3: "./images/image-product-3-thumbnail/",
    THUMB4: "./images/image-product-4-thumbnail/"
  }
}];

const cartContents = [];
const currentProduct = "P1";
const productData = productList[0][currentProduct];
const itemSection = document.getElementById("cart-items-section");

let selectedQuantity = 1;
const btnInc = document.getElementById("increase");
const btnDec = document.getElementById("decrease");
const displayQuant = document.getElementById("select-quantity");
//Increment/decrement product quantity when buttons are clicked
btnDec.addEventListener("click", () => {
  if (selectedQuantity > 1) {
    selectedQuantity -= 1;
    displayQuant.value = selectedQuantity;
  }
})
btnInc.addEventListener("click", () => {
  if (selectedQuantity < 99) {
    selectedQuantity += 1;
    displayQuant.value = selectedQuantity;
  }
})

const btnAddToCart = document.getElementById("add-to-cart");
btnAddToCart.addEventListener("click", addToCart);
//Template cloning to create element added to cart
function addToCart() {
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

    getWrap.setAttribute("data-product", currentProduct);
    iElemThumb.setAttribute("src", productList[0][currentProduct].THUMB1);
    iElemTitle.textContent = productData.PRODUCTNAME;
    iElemPrice.textContent = "$" + productData.CURRENTPRICE.toFixed(2);
    iElemQuant.textContent = selectedQuantity;
    iElemTotal.textContent = "$" + (productData.CURRENTPRICE * selectedQuantity).toFixed(2);
  
    if (!cartContents.includes(currentProduct)) {
      cartContents.push(currentProduct);
      itemSection.appendChild(cartItem);
    } else {
      const existingItem = itemSection.querySelector("[data-product=" + currentProduct + "]");
      const quantCheck = existingItem.querySelector(".item-units");
      
      if (parseInt(quantCheck.textContent) + selectedQuantity <= 99) {
        quantCheck.textContent = parseInt(quantCheck.textContent) + selectedQuantity;
      } else {
        console.log("Total over 99, setting to 99 cap");
        quantCheck.textContent = 99;
      } 
    }
  }  
};

//Remove corresponding cart item when its child trash button is clicked
function delFromCart() {
  event.target.closest(".cart-item").remove();
  const itemLoc = cartContents.indexOf(currentProduct);
  
  if (itemLoc >= 0) {
    cartContents.splice(itemLoc, 1);
  }
  console.log(itemSection.childNodes)
}