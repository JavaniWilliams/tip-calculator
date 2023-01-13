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
