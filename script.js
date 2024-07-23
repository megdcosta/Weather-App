document.getElementById('search-btn').addEventListener('click', getWeather);
document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        displayError('Please enter a city name');
        return;
    }

    const apiKey = 'dbe4676d8c24456a8bd174817240306'; // Replace with your actual API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    console.log(`Fetching weather data for: ${city}`);
    console.log(`API URL: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => {
            console.log(`Response status: ${response.status}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data received:', data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError(error.message);
        });
}

function displayWeather(data) {
    document.getElementById('weather-info').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c} °C`;
    document.getElementById('description').textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById('weather-icon').src = data.current.condition.icon;
}

function displayError(message) {
    document.getElementById('weather-info').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
}
