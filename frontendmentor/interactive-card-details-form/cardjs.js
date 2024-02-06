const stepOne = document.getElementById("step-one");
const stepTwo = document.getElementById("step-two");
const form = document.getElementById("form-card");
const fieldInputs = document.querySelectorAll(".form-entries");

//IMASK.JS
const numMask = IMask(fieldInputs[1], {mask: "0000 0000 0000 0000"});
const mmMask = IMask(fieldInputs[2], {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12,
    minLength: 2,
    maxLength: 2,
    autofix: "pad" 
});
const yyMask = IMask(fieldInputs[3], {
    mask: IMask.MaskedRange,
    from: 23,
    to: 99,
    minLength: 2,
    maxLength: 2
});
const cvcMask = IMask(fieldInputs[4], {mask: "000"});

//LISTEN INPUTS, WRITE TO MATCHING DISPLAY ELEMENT
fieldInputs.forEach(field => field.oninput = (event) => {
    const usedField = event.target;
    const pairedElement = document.getElementById(usedField.dataset.pairing);
    const enteredValue = usedField.value;
    pairedElement.innerHTML = enteredValue;
    clearWarns(usedField);
});

//Not super elegant but works I guess
function clearWarns(usedField) {
    const toClear = 
          usedField.parentElement.tagName == "FIELDSET" ?
          usedField.parentElement.parentElement.querySelector("span") :
          usedField.parentElement.querySelector("span");
    toClear.setAttribute("style","display: none");
    usedField.classList.remove("error");
}

fieldInputs.forEach(input => {
    input.addEventListener("invalid", event => {
        const fieldErrSpan = 
              input.parentElement.tagName == "FIELDSET" ?
              input.parentElement.parentElement.querySelector("span") :
              input.parentElement.querySelector("span");
        //GIVE ERROR STYLES TO FIELD INPUTS
        input.classList.add("error");
        //DISPLAY WARNING TYPE
        if (!input.value) {
            fieldErrSpan.innerHTML = "Must not be empty";
            fieldErrSpan.setAttribute("style","display: block")
        } else {
            fieldErrSpan.innerHTML = "Incorrect format";
            fieldErrSpan.setAttribute("style","display: block")
        }
    }, false );
});

function checkValid(event) {
    stepOne.setAttribute("style","display: none");
    stepTwo.setAttribute("style","display: block");
}

//https://baymard.com/blog/credit-card-field-auto-format-spaces
//We are assuming for the sake of this project that the card type is a 16 digit card, don't care about starting digit