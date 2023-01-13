// TODO: Handle user input of initial bill value
// TODO: Handle user selection of the gratuity, both default and custom values
// TODO: Handle user input of number of people to split the bill between
// TODO: Handle calculation of tip per person and total bill per person
// TODO: Handle resetting the calculator
// TODO: Handle appropriate styling for gratuities
// -> If a pre-set gratuity is selected, it should appear active.
// -> If no a pre-set gratuity is selected, or the user is providing a custom tip,
//    the buttons should NOT have appear active
// TODO: Handle appropriate styling for reset btn
// -> If there has been no value calculated, the reset btn should not work
// -> If the tips have been calculated, the reset btn should work

// Note: The elements needed have been queried for you here
// ** Query elements
const bill = document.getElementById('bill');
const gratuityBtns = document.querySelectorAll('.gratuity');
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Your work goes below here

let billTotal = document.getElementById('bill');
let peopleTotal = document.getElementById('people');
let tipPerPerson = document.getElementById('tip-amount');
let totalPerPerson = document.getElementById('total-amount');
let tipButtons = document.getElementsByClassName('tip-buttons')[0].children;
let errorMessage1 = document.getElementById('error-message1');
let errorMessage2 = document.getElementById('error-message2');
let customTip = tipButtons[5];
let resetButton = document.getElementById('reset-button');
let totalPerPersonValue = 0;
let billTotalValue = 0;
let billTotalKeyValue = 0;
let peopleTotalValue = 0;
let tipPercentValue = 0;
let tipPerPersonValue = 0;
let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
let mq = window.matchMedia('(max-width: 375px)');

function resetColors() {
  let i = 0;
  for (i = 0; i < tipButtons.length - 1; i++) {
    if (tipButtons[i].style.backgroundColor === 'var(--strong-cyan)') {
      tipButtons[i].style.backgroundColor = '';
    }
  }
}

function changeBg() {
  resetColors();
  this.style.backgroundColor = 'var(--strong-cyan)';
}

if (/^\d*\.?\d*$/.test(this.value)) {
    console.log(this.value);
    billTotalValue = this.value;
    console.log(billTotalValue);
    console.log(e.data);
    if (e.data != null) {
      if (this.value != "" && !this.value.includes(".")) {
        billTotal.value = (parseInt(this.value)).toString();
      } else if (e.data.includes(".") && !this.value.includes(".") && this.value != "") {
        billTotal.value = (parseFloat(this.value)).toString();
      }
    }
    calculate();
  } else {
    this.value = billTotalValue.toString();
    this.classList.add("shake");
    this.classList.add("error-display")
    errorMessage2.classList.add("visible");
    errorMessage2.classList.remove("invisible");
    setTimeout(function() {
      billTotal.classList.remove("shake")
      billTotal.classList.remove("error-display");
      errorMessage2.classList.add("invisible");
      errorMessage2.classList.remove("visible");
    }, 500);
  }
})

billTotal.addEventListener("keydown", function(e) {
  let keyID = e.keyCode;
  if (keyID === 8) {
    if (this.value.length > 1) {
      this.value = this.value.substring(0, this.value.length);
    }
  }
})

peopleTotal.addEventListener("input", function(e) {
  if (/^\d*?\d*$/.test(this.value)) {
    peopleTotalValue = this.value;
    if (e.data != null) {
      if (this.value != "") {
        peopleTotal.value = (parseInt(this.value)).toString();
      }
    }
    calculate();
  } else {
    this.value = peopleTotalValue.toString();
    this.classList.add("error-display");
    this.classList.add("shake");
    errorMessage1.classList.add("visible");
    errorMessage1.classList.remove("invisible")
    setTimeout(
      function()  {
                    peopleTotal.classList.remove("shake");
                    peopleTotal.classList.remove("error-display");
                    errorMessage1.classList.remove("visible");
                    errorMessage1.classList.add("invisible");
                  }, 1000);
  }
})

peopleTotal.addEventListener("keydown", function(e) {
  let keyID = e.keyCode;
  if (keyID === 8) {
    if (this.value.length > 1) {
      this.value = this.value.substring(0, this.value.length);
    }
  }
})

resetButton.addEventListener("click", function() {
  billTotal.value = "";
  billTotalValue = 0;
  peopleTotal.value = "";
  peopleTotalValue = 0;
  tipPerPerson.textContent = "$0.00";
  tipPercentValue = 0;
  totalPerPerson.textContent = "$0.00";
  totalPerPersonValue = 0;
  customTip.value = "";
  resetColors();
})

function initializeTipButtons() {
  let i = 0;
  for (i = 0; i < tipButtons.length - 1; i++) {
    tipButtons[i].addEventListener("click", function() {
      tipPercentValue = parseInt(this.textContent.substring(0, this.textContent.length - 1)) * 0.01;
      calculate();
    })
    tipButtons[i].addEventListener("click", function() {
      customTip.value = "";
    })
    tipButtons[i].addEventListener("click", changeBg, false);
  }
  customTip.addEventListener("input", function() {
    if (/^\d*?\d*$/.test(this.value)) {
      tipPercentValue = parseInt(this.value) * 0.01;
      calculate();
    } else {
      if (tipPercentValue > 0) {
        this.value = parseInt(tipPercentValue * 100).toString();
      } else {
        this.value = "";
      }

      this.classList.add("shake");
      setTimeout(function() {
        customTip.classList.remove("shake");
      }, 1000);
      /*if (tipPercentValue > 0) {
        this.value = tipPercentValue.toString();
      }*/
    }
  })
  customTip.addEventListener("click", resetColors, false);
}

function calculate() {
  if (peopleTotalValue != 0 && tipPercentValue != 0) {
    let tipTotalValue = billTotalValue * tipPercentValue;
    tipPerPersonValue = Math.round(((tipTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    tipPerPerson.textContent = `${formatter.format(tipPerPersonValue)}`;
    totalPerPersonValue = Math.round(((billTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    totalPerPerson.textContent = `${formatter.format(totalPerPersonValue)}`;
  } else if (peopleTotalValue != 0) {
    totalPerPersonValue = Math.round(((billTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    totalPerPerson.textContent = `${formatter.format(totalPerPersonValue)}`;
  }
}

initializeTipButtons();

