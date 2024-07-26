const billInput = document.querySelector("#bill");
const tipButtons = [...document.querySelectorAll(".tip-button")];
const customInput = document.querySelector("#custom-tip");
const peopleInput = document.querySelector("#people");
const tipPerPerson = document.querySelector(".tip-person");
const totalPerPerson = document.querySelector(".total-person");
const resetButton = document.querySelector(".reset-button");
const peopleError = document.querySelector(".people-error");

let bill = 0;
let people = 0;
let percent = 0;

billInput.addEventListener("input", (event) => {
  bill = event.target.value;
  activeateReset();
  checkPeople();
  calculate();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    removeSelectedButton();
    percent = parseInt(event.target.textContent);
    event.target.classList.add("selected-button");
    activeateReset();
    checkPeople();
    calculate();
  });
});

customInput.addEventListener("focus", () => {
  removeSelectedButton();
});

customInput.addEventListener("input", (event) => {
  activeateReset();
  percent = event.target.value;
  checkPeople();
  calculate();
});

peopleInput.addEventListener("input", (event) => {
  people = event.target.value;
  if (event.target.value === "") people = 0;
  activeateReset();
  checkPeople();
  calculate();
});

resetButton.addEventListener("click", () => {
  bill = 0;
  people = 0;
  percent = 0;
  peopleInput.value = "";
  billInput.value = "";
  customInput.value = "";
  tipPerPerson.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00";
  removeSelectedButton();
  checkPeople();

  if (resetButton.classList.contains("active-reset")) {
    resetButton.classList.remove("active-reset");
    resetButton.classList.add("inactive-reset");
  }
});

const calculate = () => {
  const tip = (bill * (percent / 100)) / people;
  const total = bill / people + tip;
  if (
    tip &&
    total &&
    tip > 0 &&
    total > 0 &&
    tip !== Infinity &&
    total !== Infinity
  ) {
    tipPerPerson.textContent = `$${tip.toFixed(2)}`;
    totalPerPerson.textContent = `$${total.toFixed(2)}`;
  }
};

const checkPeople = () => {
  if ((bill > 0 || percent > 0) && people == 0) {
    peopleError.classList.remove("hide");
  } else {
    peopleError.classList.add("hide");
  }
};

const removeSelectedButton = () => {
  tipButtons.forEach((button) => {
    if (button.classList.contains("selected-button")) {
      button.classList.remove("selected-button");
    }
  });
};

const activeateReset = () => {
  if (resetButton.classList.contains("inactive-reset")) {
    resetButton.classList.remove("inactive-reset");
    resetButton.classList.add("active-reset");
  }
};
