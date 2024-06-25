// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetchWeatherData(location);
    }
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        });
}

function displayWeatherInfo(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
}
