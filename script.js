const zipcodeInput = document.querySelector('.zipInput');
const submitButton = document.querySelector('.submitButton');
const resultDisplay = document.querySelector('.resultDisplay');

zipcodeInput.addEventListener('change', (event) => {
    zipcodeInput.value = event.target.value;
})

let state = document.createElement('p')
let city = document.createElement('p');
let latitude = document.createElement('p');
let longitude = document.createElement('p');
let dataArr = [];



resultDisplay.style.visibility = 'hidden';
resultDisplay.appendChild(state)
resultDisplay.appendChild(city)
resultDisplay.appendChild(latitude)
resultDisplay.appendChild(longitude)

submitButton.addEventListener('click', (event) => {
    if (Number(zipcodeInput.value)) {
        fetch(`https://api.zippopotam.us/us/${zipcodeInput.value}`)
            .then(response => response.json())
            .then(response => {
                dataArr = response.places;
                if(!response.places){
                    resultDisplay.style.visibility = 'hidden';
                    alert('Incorrect ZIP code')
                }
            })
            .catch(err => {
                console.log(err);
            });

    }
})

const check = setInterval(() => {
    if (dataArr.length > 0) {
        state.textContent = `State: ${dataArr[0]['state']}`
        city.textContent = `City: ${dataArr[0]['place name']}`
        latitude.textContent = `Latitude: ${dataArr[0]['latitude']}`
        longitude.textContent = `Longitude: ${dataArr[0]['longitude']}`
        resultDisplay.style.visibility = 'visible';
    }
}, 500)

