/* Input Elements */
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");

/* Card Elements */
const cardName = document.getElementById("cardName");
const cardNum = document.getElementById("cardNumber");
const cardMonth = document.getElementById("cardMonth");
const cardYear = document.getElementById("cardYear");
const cardCvc = document.getElementById("cardCvc");

/* Form */
const paymentForm = document.getElementById("paymentForm");

// format credit card number on input
function formatCreditCard(input) {
  // Remove non-digit characters
  let creditCardNumber = input.value.replace(/\D/g, "");

  // Add space after every 4 digits
  let formattedCreditCard = creditCardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

  // Update the input value
  input.value = formattedCreditCard;
}

// format cvc on input
function formatOnlyNum(input) {
  // Remove non-digit characters
  let cvc = input.value.replace(/\D/g, "");

  // Update the input value
  input.value = cvc;
}

/* Event Listeners */

paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let errorCount = 0;
  const creditCardPattern = /^\d{4} \d{4} \d{4} \d{4}$/;
  const monthPattern = /^(0[1-9]|1[0-2])$/;
  var yearPattern = /^\d{2}$/;

  /* Name validation */
  if (paymentForm["name"].value === "") {
    document.querySelector(".name-error").innerHTML = "Can't be blank";
    nameInput.classList.add("border-red");
    errorCount++;
  } else {
    document.querySelector(".name-error").innerHTML = "";
    nameInput.classList.remove("border-red");
  }

  /* Number validation */
  if (paymentForm["number"].value === "") {
    document.querySelector(".num-error").innerHTML = "Can't be blank";
    numberInput.classList.add("border-red");
    errorCount++;
  } else if (!creditCardPattern.test(paymentForm["number"].value)) {
    document.querySelector(".num-error").innerHTML = "Invalid Card Number";
    numberInput.classList.add("border-red");
    errorCount++;
  } else {
    document.querySelector(".num-error").innerHTML = "";
    numberInput.classList.remove("border-red");
  }

  /* Date validation */
  if (paymentForm["month"].value === "" || paymentForm["year"].value === "") {
    document.querySelector(".date-error").innerHTML = "Can't be blank";
    if (paymentForm["month"].value === "" && paymentForm["year"].value !== "") {
      monthInput.classList.add("border-red");
      yearInput.classList.remove("border-red");
      errorCount++;
    } else if (
      paymentForm["year"].value === "" &&
      paymentForm["month"].value !== ""
    ) {
      yearInput.classList.add("border-red");

      errorCount++;
      if (!monthPattern.test(paymentForm["month"].value)) {
        document.querySelector(".date-error").innerHTML = "Invalid Date";
        monthInput.classList.add("border-red");
        errorCount++;
      } else {
        monthInput.classList.remove("border-red");
      }
    } else {
      monthInput.classList.add("border-red");
      yearInput.classList.add("border-red");
      errorCount += 2;
    }
  } else {
    document.querySelector(".date-error").innerHTML = "";
    monthInput.classList.remove("border-red");
    yearInput.classList.remove("border-red");
    if (
      !monthPattern.test(paymentForm["month"].value) &&
      !yearPattern.test(paymentForm["year"].value)
    ) {
      document.querySelector(".date-error").innerHTML = "Invalid Date";
      monthInput.classList.add("border-red");
      yearInput.classList.add("border-red");
      errorCount += 2;
    } else if (!monthPattern.test(paymentForm["month"].value)) {
      document.querySelector(".date-error").innerHTML = "Invalid Date";
      monthInput.classList.add("border-red");
      yearInput.classList.remove("border-red");
      errorCount++;
    } else if (!yearPattern.test(paymentForm["year"].value)) {
      document.querySelector(".date-error").innerHTML = "Invalid Date";
      yearInput.classList.add("border-red");
      monthInput.classList.remove("border-red");
      errorCount++;
    }
  }

  /* CVC validation */
  if (paymentForm["cvc"].value === "") {
    document.querySelector(".cvc-error").innerHTML = "Can't be blank";
    cvcInput.classList.add("border-red");
    errorCount++;
  } else if (paymentForm["cvc"].value.length < 3) {
    document.querySelector(".cvc-error").innerHTML = "Invalid CVC";
    cvcInput.classList.add("border-red");
    errorCount++;
  } else {
    document.querySelector(".cvc-error").innerHTML = "";
    cvcInput.classList.remove("border-red");
  }

  console.log(errorCount);
  if (errorCount <= 0) {
    // move on to confirm submit 🎉
    const parent = document.querySelector(".main-content");
    parent.removeChild(paymentForm);

    const newDiv = document.createElement("div");
    newDiv.classList.add("complete");

    let icon = document.createElement("img");
    icon.src = "/images/icon-complete.svg";

    let heading = document.createElement("h2");
    heading.textContent = "Thank You!";

    let paragraph = document.createElement("p");
    paragraph.textContent = "We've added your card details";

    let button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = "Continue";
    button.addEventListener("click", () => location.reload());

    newDiv.appendChild(icon);
    newDiv.appendChild(heading);
    newDiv.appendChild(paragraph);
    newDiv.appendChild(button);

    parent.appendChild(newDiv);
  }
});

nameInput.addEventListener("input", (e) => {
  cardName.innerText = e.target.value;
});

numberInput.addEventListener("input", (e) => {
  cardNum.innerText = e.target.value;
});

monthInput.addEventListener("input", (e) => {
  cardMonth.innerText = e.target.value;
});

yearInput.addEventListener("input", (e) => {
  cardYear.innerText = e.target.value;
});

cvcInput.addEventListener("input", (e) => {
  cardCvc.innerText = e.target.value;
});

// clear all inputs if page is refreshed
document.addEventListener("DOMContentLoaded", function () {
  // Get all input elements
  var inputs = document.querySelectorAll("input");

  // Clear all input fields
  function clearInputs() {
    inputs.forEach(function (input) {
      input.value = "";
    });
  }

  // Call the clearInputs function on page refresh
  window.addEventListener("load", function () {
    clearInputs();
  });
});
