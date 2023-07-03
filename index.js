const apikey = "592652706359d4bf42a16be745d4aaf7";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //submit'den sonra yenilememesini sağlar
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels Lİke: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `wind speed: ${data.wind.speed}`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"/>`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = `${description}`;

        for (let index = 0; index < details.length; index++) {
            weatherDataEl.querySelector(".details").innerHTML = 
            details.map((detail) => `<div>${detail}</div>`).join("");
        }

        // (alternatif kod)
        // weatherDataEl.innerHTML = `
        //     <div class="icon">
        //         <img
        //             src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"
        //             alt="Weather Icon"
        //         />
        //     </div>
        //     <div class="temperature">${Math.round(data.main.temp)}°C</div>
        //     <div class="description">${data.weather[0].description} </div>
        //     <div class="details">
        //         <div>Feels Like(hissedilen):  ${data.main.feels_like} °C</div>
        //         <div>Humidity(nem): ${data.main.humidity} %</div>
        //         <div>Wind Speed(rüzgar hızı): ${data.wind.speed} m/s</div>
        //     </div> 
        // `;
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temperature").textContent = "";

        weatherDataEl.querySelector(".description").textContent = 
        "An error happened, please try again later";

        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}
