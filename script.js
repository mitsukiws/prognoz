const cityEl = document.querySelector(".city");
const forecastEl = document.getElementById("forecast");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const autocompleteList = document.getElementById("autocomplete-list");

const WEATHER_API_KEY = "2349b9ad02a848a1bb4110728250806"; // твій ключ

function fetchWeather(city) {
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

  cityEl.textContent = "Завантаження...";
  forecastEl.innerHTML = "";
  fetch(API_URL)
    .then(res => { 
      if (!res.ok) throw new Error("Помилка мережі");
      return res.json();
      const body = document.body;

const conditionCode = data.current.condition.code; // или data.current.condition.text.toLowerCase()

if ([1000].includes(conditionCode)) {
  body.className = 'sunny';
} else if ([1003, 1006, 1009].includes(conditionCode)) {
  body.className = 'cloudy';
} else if ([1063, 1180, 1183, 1186, 1189, 1192].includes(conditionCode)) {
  body.className = 'rainy';
} else if ([1066, 1114, 1210, 1213, 1216].includes(conditionCode)) {
  body.className = 'snowy';
} else {
  body.className = ''; // По умолчанию
}

    })
    .then(data => {
      cityEl.textContent = `Прогноз для ${data.location.name}, ${data.location.country}`;
      forecastEl.innerHTML = "";

      data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date).toLocaleDateString("uk", {
          weekday: "short", day: "numeric", month: "short"
        });

        const condition = day.day.condition;
        const icon = `https:${condition.icon}`;
        const desc = condition.text;
       
        console.log(day)
        let avarageTemp = data.current.temp_c
        if (avarageTemp >= 30) {
           document.body.style.background = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISNVgKrJsl3LrHro9JbUZJgzrJ8UDLcDOtg&s')"
        }else if (avarageTemp <= 10) {
          document.body.style.background = "url('https://img.freepik.com/premium-photo/dramatic-black-white-sky-before-thunderstorm-heavenly-landscape-cold-weather-rainy-season_615860-1092.jpg')"
        }else if (avarageTemp > 10 && avarageTemp < 30) {
          document.body.style.background = "url('https://portal.azertag.az/uploads/news-files/2022/Oktyabr/5c46deb7e95ad.jpg')"
        }

        // document.body.style.background;


        const minTemp = day.day.mintemp_c;
        const maxTemp = day.day.maxtemp_c;
        const feelsLike = day.day.avgtemp_c;
        const humidity = day.day.avghumidity;
        const wind = day.day.maxwind_kph;
        const rainChance = day.day.daily_chance_of_rain;
        const uv = day.day.uv;

        const card = document.createElement("div");
        card.className = "day-card";
        card.innerHTML = `
          <h3>${date}</h3>
          <img src="${icon}" alt="${desc}" />
          <p class="temp">🌡️ ${Math.round(minTemp)}…${Math.round(maxTemp)}°C</p>
          <p class="info">${desc}</p>
          <p class="info">Відчувається як: ${Math.round(feelsLike)}°C</p>
          <p class="info">💧 Вологість: ${humidity}%</p>
          <p class="info">💨 Вітер: ${wind} км/год</p>
          <p class="info">🌧️ Ймовірність дощу: ${rainChance}%</p>
          <p class="info">☀️ УФ-індекс: ${uv}</p>
        `;
        forecastEl.appendChild(card);
      });
    })
    .catch(() => {
      cityEl.textContent = "Не вдалося завантажити прогноз.";
      forecastEl.innerHTML = "";
    });
}

function fetchCitySuggestions(query) {
  if (!query) {
    autocompleteList.innerHTML = "";
    return;
  }

  const SEARCH_API_URL = `http://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query}`;

  fetch(SEARCH_API_URL)
    .then(res => res.json())
    .then(cities => {
      autocompleteList.innerHTML = "";
      cities.forEach(city => {
        const item = document.createElement("div");
        item.textContent = `${city.name}, ${city.region ? city.region + ", " : ""}${city.country}`;
        item.addEventListener("click", () => {
          cityInput.value = city.name;
          autocompleteList.innerHTML = "";
          fetchWeather(city.name);
        });
        autocompleteList.appendChild(item);
      });
    })
    .catch(() => {
      autocompleteList.innerHTML = "";
    });
}

// Пошук за введенням
cityInput.addEventListener("input", () => {
  fetchCitySuggestions(cityInput.value.trim());
});

// При натисканні кнопки пошуку
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    autocompleteList.innerHTML = "";
    fetchWeather(city);
  }
});

// Пошук при Enter
cityInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Початковий виклик
fetchWeather("London");
