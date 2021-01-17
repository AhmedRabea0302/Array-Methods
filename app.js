const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaiers');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
// Fetch Random User And Add Money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];


    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    console.log(data);
    console.log(newUser);
    addData(newUser);
}

// Add New Person
function addData(obj) {
    data.push(obj);

    udpateDOM();
}

function udpateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `
            <strong>${person.name}</strong>
            ${formatMoney(person.money)}
        `;
        main.appendChild(element)
    });
}

// Format Money
function formatMoney(num){
    return '$' + num.toFixed(2);
}

// Double Money
function dobleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });
    udpateDOM();
}

// Sort Persons
function sortPersons() {
    data.sort((a, b) => b.money - a.money);

    udpateDOM();
}

// Get Only Millionaires
function Millionaires() {
    data = data.filter(person => person.money >= 1000000);
    udpateDOM();
}

// Calculate Wealth
function calculateWealtha() {
    wealth = data.reduce((acc, user) => acc += user.money, 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3><Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement);
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', dobleMoney);
sortBtn.addEventListener('click', sortPersons);
showMillionaires.addEventListener('click', Millionaires);
calcWealthBtn.addEventListener('click', calculateWealtha);