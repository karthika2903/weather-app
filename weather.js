let Images = document.createElement("img");
let full = document.getElementById("imgContainer").appendChild(Images);

const check = () => {
    let input = document.getElementById("inputBox");
    checkWeather(input.value);
    input.value = "";
};

async function checkWeather(city) {
    const errorMessage = "City Not Found";
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db584e78d1428232a72039bb866f71ee&units=metric`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data === "404") {
            throw new Error(errorMessage);
        }

        console.log(data);

        document.getElementById("city").innerHTML = "City: " + data.name;
        document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + "°C";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            Images.src = "cloud.png"
        }
        else if (data.weather[0].main == "Rain") {
            Images.src = "rain.png"
        }
        else if (data.weather[0].main == "Mist") {
            Images.src = "misty.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            Images.src = "drizzle.png"
        }
        else if (data.weather[0].main == "Clear") {
            Images.src = "clear.png"
        }

    } catch (error) {
        console.log(error);

        document.getElementById("city").innerHTML = "Enter valid city name";
        document.getElementById("temp").innerHTML = "Temperature: 0°C";
        document.getElementById("humidity").innerHTML = "Humidity: 0%";
        document.getElementById("wind").innerHTML = "Wind Speed: 0 km/h";
        Images.src = "";
    }
}
