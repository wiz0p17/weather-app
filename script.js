document.addEventListener("DOMContentLoaded",() => {

    const cityInput = document.getElementById('city-input')
    const getWeatherBtn =  document.getElementById('get-weather-btn')
    const weatherInfo =  document.getElementById('weather-info')
    const cityName =  document.getElementById('city-name')
    const temprature =  document.getElementById('temprature')
    const description =  document.getElementById('description')
    const errorMessage =  document.getElementById('error-message')

    const API_KEY = '51415661821dbe289a47e04f7682a98a'


    getWeatherBtn.addEventListener('click',async () => {
        const city = cityInput.value.trim()

        if(!city) return;

        try {
            const data = await fetchWeatherData(city);
            displayWeatherData(data);

        } catch (error) {

            showError()
        }


        cityInput.value = "";//clear input
    })


    async function fetchWeatherData(city){

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)

        console.log("Response=",response)

        if(!response.ok){
            throw new Error("City not found")
        }
        
        const data = await response.json()
        return data;
    }

    function displayWeatherData(data) {
        console.log(data)

        const {name,main,weather} = data

        //weather emoji
        const weatherDesc = weather[0].description;
        const emoji = getWeatherEmoji(weatherDesc);

        //temprature emoji
        const tempEmoji = getTemperatureEmoji(main.temp);

        //remove decimal from temp

        let num = Math.trunc(main.temp)

        cityName.textContent = name
        temprature.textContent = `Temprature : ${num}°C ${tempEmoji}`
        description.textContent = `Weather : ${weather[0].description} ${emoji}`

        weatherInfo.classList.remove("hidden");
        weatherInfo.classList.add("show");
        errorMessage.classList.add("hidden");
    }

    function getTemperatureEmoji(temp) {
        if (temp <= 0) return "🧊";
        if (temp <= 10) return "❄️";
        if (temp <= 20) return "🌤️";
        if (temp <= 30) return "☀️";
        if (temp <= 40) return "🌡️";
        return "🔥";
    }
    

    function getWeatherEmoji(description) {
        description = description.toLowerCase();
    
        if (description.includes("clear")) return "☀️";
        if (description.includes("few clouds")) return "🌤️";
        if (description.includes("scattered clouds")) return "🌥️";
        if (description.includes("broken clouds")) return "☁️";
        if (description.includes("overcast")) return "☁️";
        if (description.includes("rain")) return "🌧️";
        if (description.includes("thunderstorm")) return "⛈️";
        if (description.includes("snow")) return "❄️";
        if (description.includes("mist") || description.includes("fog")) return "🌫️";
        if (description.includes("drizzle")) return "🌦️";
    
        return "🌈";
    }
    

    function showError() {
        weatherInfo.classList.add('hidden');
        weatherInfo.classList.remove('show');
        errorMessage.classList.remove('hidden');
    }
})