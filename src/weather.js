const form = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input")


form.addEventListener("submit" , function(event)){
    event.preventDefault();

    const city = cityInput.value.trim();

    console.log(city);

}

const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(city) +
    "&count=1&language=en&format=json";