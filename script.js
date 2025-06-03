const customForm = document.querySelector(".custom-form");

// inputs
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

// elements
const dayEl = document.getElementById("days-el");
const monthEl = document.getElementById("months-el");
const yearEl = document.getElementById("years-el");

// error el
const dayErrorEl = document.querySelector('.day-error');
const monthErrorEl = document.querySelector('.month-error');
const yearErrorEl = document.querySelector('.year-error')

// inputs
const inputs = document.querySelectorAll(".input");

customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInputs()) {
    // run the age calculation
    if (dayInput.value > currentDay) {
      currentDay = currentDay + daysInMonth[currentMonth - 1];
      currentMonth -= 1
    }

    if (monthInput.value > currentMonth) {
      currentMonth += 12;
      currentYear -= 1
    }

    dayEl.innerHTML = currentDay - dayInput.value
    monthEl.innerHTML = currentMonth - monthInput.value
    yearEl.innerHTML = currentYear - yearInput.value
  }
});

function validateInputs() {
  let isValid = true;

  // run check on day input
  if (dayInput.value > 31 || dayInput.value <= 0) {
    dayInput.classList.add('error')

    dayInput.parentElement.querySelector('small').innerHTML = "Must be a valid day"

    dayInput.parentElement.querySelector('label').classList.add('error')

    isValid = false
  }


  // run check on month input
  if (monthInput.value > 12 || monthInput.value <= 0) {
    monthInput.classList.add('error')

    monthInput.parentElement.querySelector('small').innerHTML = "Must be valid month"

    monthInput.parentElement.querySelector('label').classList.add('error')

    isValid = false
  }

  if (!dayInput.value || !monthInput.value || !yearInput.value) {
    inputs.forEach((input) => {
      const parent = input.parentElement;
      if (!input.value) {
        input.classList.add("error");
        parent.querySelector('small').innerText = "This field is required"
        isValid = false
        parent.querySelector('label').classList.add('error')
      }
    })
  }
  
  return isValid;
}

// clear error and error message on input for good UX
inputs.forEach((input) => {
  const parent = input.parentElement;
  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      input.classList.remove("error");
      parent.querySelector('small').innerText = ''
      parent.querySelector('label').classList.remove('error')
    }
  });
});


// TODO animate the number display
// function OutputNumber(el, num) {
//   let step = 50;
//   num > 25 && (step = 35);
//   num > 50 && (step = 25);
//   num > 75 && (step = 20);
//   num > 100 && (step = 10);
//   num > 200 && (step = 1);

//   let n = 0;
//   if (num === 0) {
//     el.innerHTML = n;
//   } else {
//     let inteval = setInterval(() => {
//       n = n + 1;
//       if (n === num) {
//         clearInterval(inteval);
//       }
//       el.innerHTML = n;
//     }, step);
//   }

// }

// Date logic
const date = new Date();
let currentDay = date.getDate() // day in the month
let currentMonth = date.getMonth() + 1; // +1 cause months starts from 0 index
let currentYear = date.getFullYear(); 
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 