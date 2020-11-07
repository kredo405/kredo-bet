let btnTotal = document.querySelector('.btnTotal');

function calcProbabilityTotal() {
let total40Matches = document.querySelector('.Total40Matches');
let total10Matches = document.querySelector('.Total10Matches');
let total5Matches = document.querySelector('.Total5Matches');
let totalOdd = document.querySelector('.TotalOdd');
let totalProbability = document.querySelector('.TotalProbabilityResponse');
let totalValue = document.querySelector('.TotalValueResponse');

let probability = ((total40Matches.value * 100 / 40) + (total10Matches.value * 100 / 10) + (total5Matches.value * 100 / 5))/3;
let valueBet = (probability / (1 / totalOdd.value * 100)) -1;
totalProbability.innerHTML = `${Math.round(probability)}%`;
totalValue.innerHTML = `${valueBet.toFixed(2) * 100}%`

}

btnTotal.addEventListener('click', calcProbabilityTotal);

let btnIndividualTotal = document.querySelector('.btnIndividualTotal');

function calcProbabilityIndividualTotal() {
let Itotal20Matches = document.querySelector('.ITotal20Matches');
let Itotal10Matches = document.querySelector('.ITotal10Matches');
let Itotal5Matches = document.querySelector('.ITotal5Matches');
let ItotalOdd = document.querySelector('.ITotalOdd');
let ItotalProbability = document.querySelector('.ITotalProbabilityResponse');
let ItotalValue = document.querySelector('.ITotalValueResponse');


let Iprobability = ((Itotal20Matches.value * 100 / 20) + (Itotal10Matches.value * 100 / 10) + (Itotal5Matches.value * 100 / 5))/3;
let IvalueBet = (Iprobability / (1 / ItotalOdd.value * 100)) -1;
ItotalProbability.innerHTML = `${Math.round(Iprobability)}%`;
ItotalValue.innerHTML = `${IvalueBet.toFixed(1) * 100}%`

}
btnIndividualTotal.addEventListener('click', calcProbabilityIndividualTotal);