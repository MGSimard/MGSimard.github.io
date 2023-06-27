const stateOne = document.getElementById("nl-state-one");
const stateTwo = document.getElementById("nl-state-two");

const form = document.getElementById("nl-form");
const emailContainer = document.getElementById("email-container");
const emailField = document.getElementById("nl-form-email");
const warnElem = emailContainer.querySelector(".nlf-warning");

const submitBtn = document.getElementById("submit-form");
const dismissBtn = document.getElementById("dismiss");

emailField.addEventListener("input", clearWarns);
dismissBtn.addEventListener("click", resetState);

form.addEventListener("submit", () => {
  event.preventDefault();
  
  const emailInput = emailField.value;

  if (!emailInput) {
    warnElem.textContent = "Field cannot be empty";
    emailContainer.classList.add("invalid");
  } else {
    checkValid(emailInput);
  }
});

function checkValid(emailInput) {
  //Not familiar with allowed email formats so using this Regex
  //https://www.w3resource.com/javascript/form/email-validation.php
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if (emailInput.match(emailRegex)) {
    const reminderElem = stateTwo.querySelector("span");
    console.log("Email Valid");
    clearWarns();
    reminderElem.textContent = emailInput;
    stateOne.classList.add("no-display");
    stateTwo.classList.remove("no-display");
  } else {
    console.log("Email Invalid");
    warnElem.textContent = "Valid email required";
    emailContainer.classList.add("invalid");
  }
}

function clearWarns() {
  if (emailContainer.classList.contains("invalid")) {
    emailContainer.classList.remove("invalid");
    warnElem.textContent = "";
  }
}

function resetState() {
  clearWarns();
  emailField.value = "";
  stateTwo.classList.add("no-display");
  stateOne.classList.remove("no-display");
}

