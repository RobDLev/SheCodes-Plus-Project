let apiKey = "59f62e89b6fe8b8e9e10ac59471b14c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San+Francisco&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(setDefaultTemp);

function setDefaultTemp(response) {
  weatherDescription = response.data.weather[0].description;
  let currentTemp = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  humidity = response.data.main.humidity;
  windSpeed = Math.round(response.data.wind.speed);

  let dateAndTime = document.querySelector("#dateAndTime");
  dateAndTime.innerHTML = formatDate();

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${weatherDescription}`;

  let temperatureDefault = document.querySelector("#current-temp");
  temperatureDefault.innerHTML = `${currentTemp}°C`;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed}km/h`;
}

function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day}, ${hour}:${minutes}<br />${month} ${date}, ${year}`;
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#city-search-bar");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateCityTwo);
}

function updateCityTwo(response) {
  let cityReturn = response.data.name;
  let countryReturn = response.data.sys.country;
  let tempReturn = Math.round(response.data.main.temp);
  weatherDescription = response.data.weather[0].description;
  humidity = response.data.main.humidity;
  celsiusTemp = response.data.main.temp;
  windSpeed = Math.round(response.data.wind.speed);

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityReturn}, ${countryReturn}`;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempReturn}°C`;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${weatherDescription}`;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed}km/h`;
}

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(getCurrentCityData);
}

function getCurrentCityData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(updateCurrentCity);
}

function updateCurrentCity(response) {
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentTemp = Math.round(response.data.main.temp);
  weatherDescription = response.data.weather[0].description;
  humidity = response.data.main.humidity;
  celsiusTemp = response.data.main.temp;
  windSpeed = Math.round(response.data.wind.speed);

  let locationMain = document.querySelector("#current-city");
  locationMain.innerHTML = `${currentCity}, ${currentCountry}`;

  let temperatureMain = document.querySelector("#current-temp");
  temperatureMain.innerHTML = `${currentTemp}°C`;

  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${weatherDescription}`;

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${humidity}%`;

  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed}km/h`;
}

function convertToFahrenheit(event) {
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureMain = document.querySelector("#current-temp");
  temperatureMain.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

function convertToCelsius(event) {
  let temperatureMain = document.querySelector("#current-temp");
  temperatureMain.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemp = null;
let humidity = null;
let weatherDescription = null;
let windSpeed = null;
