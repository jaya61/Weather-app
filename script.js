const apiKey = "087489f969689cc72bae68e85ab7639c"; 

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if(city === "") {
    resultDiv.innerHTML = "<p class='error'>⚠️ Please enter a city name!</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading text
  resultDiv.innerHTML = "<p>⏳ Loading weather data...</p>";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("❌ City not found. Please check spelling!");
        } else if (response.status === 401) {
          throw new Error("⚠️ Invalid API key. Please update your key.");
        } else if (response.status === 429) {
          throw new Error("⏱ Too many requests. Please try again later.");
        } else {
          throw new Error("⚠️ Unable to fetch data. Try again later.");
        }
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const main = data.weather[0].main.toLowerCase();

      // Assign custom images
      let weatherImg = '';
      if (main.includes('sun') || main.includes('clear')) weatherImg = 'images/sunny.jpg';
      else if (main.includes('rain')) weatherImg = 'images/rainy.jpg';
      else if (main.includes('snow')) weatherImg = 'images/snow.jpg';
      else if (main.includes('wind')) weatherImg = 'images/windy.jpg';
      else weatherImg = 'images/cloudy.jpg';

      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${temp} °C</p>
        <p>🌥 Condition: ${desc}</p>
        <img src="${weatherImg}" alt="${desc}">
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    });
});
