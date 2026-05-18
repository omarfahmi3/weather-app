const APIKey = "0c1d84ab81e276ff6a17b22f1a8f7105";
const APILink = "https://api.openweathermap.org/data/2.5/weather?units=metric";
let temp = document.querySelector(".temp");
let cityName = document.querySelector(".city");
let humidityP = document.querySelector(".humidity-perc");
let windS = document.querySelector(".wind-s");
let wantedcity = document.querySelector(".wanted-city");
let searchIcon = document.querySelector(".icon-c");
let weatherIcon = document.querySelector(".weather-icon");
let cod;
async function checkWeather(city) {
  const response = await fetch(APILink + `&q=${city}&appid=${APIKey}`);
  let data = await response.json();
  console.log(data);
  cod = data.cod;
  if (cod === 200) {
    document.querySelector(".error").style.display = "none";
    cityName.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + `°C`;
    humidityP.innerHTML = data.main.humidity + `%`;
    windS.innerHTML = Math.round(data.wind.speed) + ` km/h`;
    let condition = data.weather[0].main.toLowerCase();
    if (condition === "clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (condition === "rain") {
      weatherIcon.src = "images/rain.png";
    } else if (condition === "clear") {
      weatherIcon.src = "images/clear.png";
    } else if (condition === "snow") {
      weatherIcon.src = "images/snow.png";
    } else if (condition === "mist") {
      weatherIcon.src = "images/mist.png";
    } else if (condition === "drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else {
      weatherIcon.src = "images/clear.png";
    }
    document.querySelector(".output").style.display = "block";
  } else {
    document.querySelector(".error").style.display = "block";
  }
}
function searchWeather() {
  checkWeather(wantedcity.value);
  wantedcity.value = "";
}

searchIcon.addEventListener("click", searchWeather);

wantedcity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});
