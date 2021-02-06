let apiKey = "59f62e89b6fe8b8e9e10ac59471b14c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San+Francisco&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(setDefaultTemp);

function setDefaultTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;

  let temperatureDefault = document.querySelector("#current-temp");
  temperatureDefault.innerHTML = `${currentTemp}°C`;
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#city-search-bar");
  let apiKey = "59f62e89b6fe8b8e9e10ac59471b14c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateCityTwo);
}

function updateCityTwo(response) {
  let cityReturn = response.data.name;
  let countryReturn = response.data.sys.country;
  let tempReturn = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityReturn}, ${countryReturn}`;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempReturn}°C`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showPosition);

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(getCurrentCityData);
}

function getCurrentCityData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "59f62e89b6fe8b8e9e10ac59471b14c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateCurrentCity);
}

function updateCurrentCity(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentTemp = Math.round(response.data.main.temp);
  let locationMain = document.querySelector("#current-city");
  let temperatureMain = document.querySelector("#current-temp");
  celsiusTemp = response.data.main.temp;

  locationMain.innerHTML = `${currentCity}, ${currentCountry}`;
  temperatureMain.innerHTML = `${currentTemp}°C`;
}

let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${hour}:${minutes}<br />${month} ${date}, ${year}`;

function convertToFahrenheit(event) {
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureMain = document.querySelector("#current-temp");
  temperatureMain.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  let temperatureMain = document.querySelector("#current-temp");
  temperatureMain.innerHTML = `${Math.round(celsiusTemp)}°F`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemp = null;
