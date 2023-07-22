let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day}`;

function showCurrentTime(city, timeZone) {
  let currentTime = new Date().toLocaleString("en-US", {
    timeZone: timeZone,
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  console.log(`${currentTime}`);

  let timeElement = document.querySelector("#current-time");
  timeElement.textContent = `${currentTime}`;
}

function searchCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    showWeather(response);
    showCurrentTime(cityInput.value);
  });
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("h4");
  showTemperature.innerHTML = `${temperature}°C`;
  let weatherStatus = response.data.weather[0].main;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${weatherStatus}`;
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `${humidity} %`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} m/s`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let showFeelsLike = document.querySelector("#feels-like");
  showFeelsLike.innerHTML = `${feelsLike}°C`;
}
