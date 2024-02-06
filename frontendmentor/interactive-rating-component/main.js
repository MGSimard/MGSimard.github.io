const stepOne = document.getElementById("step-one");
const stepTwo = document.getElementById("step-two");
const error = document.getElementById("error");
const ratingButtons = document.querySelectorAll(".ratings button");
let selectedScore;

//CLICKING BUTTONS SETS SELECTED SCORE AND HIGHLIGHTS BUTTON
ratingButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    const score = event.target;
    //IF SAME BUTTON DO NOTHING
    if (score.innerHTML !== selectedScore) {
      error.classList.add("disabled");
      clearStyle();
      event.target.classList.add("selected");
      selectedScore = score.innerHTML;
      console.log(selectedScore);
    }
  })
})

//CLEARS HIGHLIGHTING BUTTONS
function clearStyle() {
  ratingButtons.forEach(button => {
    button.classList.remove("selected");
  })
}

//IF NO SELECTED SCORE SHOW WARNING ELSE SUBMIT AND SCORE TO HTML
function submitScore() {
  if (!selectedScore) {
    //SHOW ERROR IF NO SCORE SELECTED
    error.classList.remove("disabled");    
  } else {
    document.getElementById("selected-rating").innerHTML = selectedScore;
    stepOne.classList.add("disabled");
    stepTwo.classList.remove("disabled");
  }
}