const apiKey = "6fbcab698b78704c60629f094a14ea26";
const units = 'metric';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const params = new URLSearchParams({
            q: city,
            units: units,
            appid: apiKey
        });

        const response = await fetch(apiUrl + '?' + params);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data);

        // Update DOM elements with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission

    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        console.error('Please enter a city name.');
    }
});
