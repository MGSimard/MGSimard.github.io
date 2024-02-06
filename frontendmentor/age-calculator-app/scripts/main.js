// FORM ELEMENTS
const form = document.getElementById("form-birthday");
form.addEventListener("submit", submitForm);

const allInputs = document.querySelectorAll("input[type='number']");

const inputDayElem = document.getElementById("input-day");
const dayWarning = inputDayElem.nextElementSibling;

const inputMonthElem = document.getElementById("input-month");
const monthWarning = inputMonthElem.nextElementSibling;

const inputYearElem = document.getElementById("input-year");
const yearWarning = inputYearElem.nextElementSibling;

// WRITE-TO ELEMENTS
const yearsNumElem = document.getElementById("result-years").querySelector(".result-num");
const yearsTxtElem = document.getElementById("result-years").querySelector(".result-txt");

const monthsNumElem = document.getElementById("result-months").querySelector(".result-num");
const monthsTxtElem = document.getElementById("result-months").querySelector(".result-txt");

const daysNumElem = document.getElementById("result-days").querySelector(".result-num");
const daysTxtElem = document.getElementById("result-days").querySelector(".result-txt");
/**************************************************************************************/

function submitForm() {
  event.preventDefault();
  
  // START FROM DEFAULT ON SUBMIT
  clearErrors();
  let writeYears = "- -";
  let writeMonths = "- -";
  let writeDays = "- -";
  
  //https://moment.github.io/luxon/demo/global.html, https://moment.github.io/luxon/#/math?id=diffs
  const DateTime = luxon.DateTime;
  
  const inputDate = {
    year: parseInt(inputYearElem.value),
    month: parseInt(inputMonthElem.value),
    day: parseInt(inputDayElem.value)
  };
  
  const currentDate = DateTime.now();
  const compareDate = DateTime.local(inputDate.year, inputDate.month, inputDate.day);

  const dateDiff = currentDate.diff(compareDate, ["years", "months", "days"]).toObject();
  console.log(dateDiff);
  
  if (dateDiff.years, dateDiff.months, dateDiff.days >= 0) {
    //IF VALID DATE INPUT
    console.log("Valid Input");
    writeYears = dateDiff.years;
    writeMonths = dateDiff.months;
    writeDays = Math.floor(dateDiff.days);
  } else {
    //IF INVALID DATE INPUT
    console.log("Invalid Input");
    whichInvalid(currentDate, inputDate, dateDiff);
  }
   
  //WRITE TO DOCUMENT
  yearsNumElem.textContent = writeYears;
  monthsNumElem.textContent = writeMonths;
  daysNumElem.textContent = writeDays;
  
  //PLURAL IF ZERO OR MORE THAN ONE
  writeYears == 1 ? yearsTxtElem.textContent = "year" : yearsTxtElem.textContent = "years";
  writeMonths == 1 ? monthsTxtElem.textContent = "month" : monthsTxtElem.textContent = "months";
  writeDays == 1 ? daysTxtElem.textContent = "day" : daysTxtElem.textContent = "days";
};

function whichInvalid(currentDate, inputDate, dateDiff) {
  let conformIgnore;
  //CHECK FOR EMPTY
  for (let i = 0; i < allInputs.length; i++) {
    if (!allInputs[i].value) {
      allInputs[i].nextElementSibling.textContent = "This field is required";
      allInputs[i].closest("label").classList.add("invalid-field");
      conformIgnore = true;
    }
  }
  //CHECK YEAR INVALIDITY
  if (inputDate.year > currentDate.year) {
    console.log("PROBLEM IS: FUTURE YEAR");
    yearWarning.textContent = "Must be in the past";
    yearWarning.closest("label").classList.add("invalid-field");
    conformIgnore = true;
  }
  //CHECK MONTH INVALIDITY
  if (inputDate.month < 1 || inputDate.month > 12) {
    console.log("PROBLEM IS: MONTH");
    monthWarning.textContent = "Must be a valid month";
    monthWarning.closest("label").classList.add("invalid-field");
    conformIgnore = true;
  }  
  //CHECK DAY INVALIDITY
  if (inputDate.day < 1 || inputDate.day > 31) {
    console.log("PROBLEM IS: DAY");
    dayWarning.textContent = "Must be a valid day";
    dayWarning.closest("label").classList.add("invalid-field");
    conformIgnore = true;
  }
  //IF ALL PASS BUT STILL CONSIDERED VALID
  //IF DATE ENTERED IS IN CORRECT FORMAT, BUT IS IN THE FUTURE FROM TODAY IN SAME YEAR
  if (!conformIgnore && Object.keys(dateDiff).length > 0) {
    console.log("PROBLEM IS: FUTURE DATE WITHIN SAME YEAR");
    dayWarning.textContent = "Must be in the past";
    addAllErrors();
  //IF DATE ENTERED IS IN INCORRECT FORMAT (30-31 DAY MONTHS, LEAP YEAR ETC)
  } else if (!conformIgnore && !Object.keys(dateDiff).length) {
    console.log("PROBLEM IS: CONFORMITY");
    dayWarning.textContent = "Must be a valid date";
    addAllErrors();
  }
};

function clearErrors() {
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].nextElementSibling.textContent = "";
    allInputs[i].closest("label").classList.remove("invalid-field");
  }
}

function addAllErrors() {
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].closest("label").classList.add("invalid-field");
  }
}