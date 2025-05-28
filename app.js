const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (currCode in exchangeRates) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;
    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }
    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Flag update
function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Exchange calculation
function updateExchangeRate() {
  let amount = document.querySelector(".amount input").value;
  if (!amount || amount <= 0) {
    amount = 1;
  }
  const fromRate = exchangeRates[fromCurr.value];
  const toRate = exchangeRates[toCurr.value];
  const converted = ((amount / fromRate) * toRate).toFixed(2);
  msg.textContent = `${amount} ${fromCurr.value} = ${converted} ${toCurr.value}`;
}

// Events
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
