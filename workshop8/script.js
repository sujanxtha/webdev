
/*
Workshop 8: Parsing XML with JavaScript
Exercise 1: OpenWeatherMap API
*/

// STEP 1: Enter your OpenWeatherMap API key
const API_KEY = "956b1e789baa0b822f05364a329afe45";

// Get HTML elements
const weatherData = document.getElementById("weatherdata");
const cityDropdown = document.getElementById("city");
const citySearch = document.getElementById("citysearch");
const searchButton = document.getElementById("search");
const fetchButton = document.getElementById("fetchWeather");


// STEP 2: Function to fetch weather data
async function getWeather(city) {

    // Check whether a city name was entered
    city = city.trim();

    if (city === "") {
        weatherData.textContent = "Please enter a city name.";
        return;
    }

    // Create the API URL
    const url =
        "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + encodeURIComponent(city) +
        "&units=metric" +
        "&mode=xml" +
        "&appid=" + API_KEY;

    weatherData.textContent = "Loading weather data...";

    try {

        // STEP 3: Fetch data using AJAX
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key. Check your key.");
            }

            if (response.status === 404) {
                throw new Error("City not found. Try another city.");
            }

            throw new Error("HTTP error: " + response.status);
        }

        // Convert response into raw XML text
        const xmlText = await response.text();

        // Display raw XML in browser console
        console.log("Raw XML Weather Data:");
        console.log(xmlText);


        // STEP 4: Parse XML using DOMParser
        const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(
            xmlText,
            "application/xml"
        );

        // Check whether XML parsing succeeded
        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("Could not parse XML data.");
        }


        // STEP 5: Extract information from XML
        const cityElement = xmlDoc.querySelector("city");
        const temperatureElement = xmlDoc.querySelector("temperature");
        const humidityElement = xmlDoc.querySelector("humidity");
        const cloudsElement = xmlDoc.querySelector("clouds");

        if (
            !cityElement ||
            !temperatureElement ||
            !humidityElement ||
            !cloudsElement
        ) {
            throw new Error("Required weather information is missing.");
        }

        const cityName = cityElement.getAttribute("name");

        const temperature =
            temperatureElement.getAttribute("value");

        const humidity =
            humidityElement.getAttribute("value");

        const cloudiness =
            cloudsElement.getAttribute("value");


        // STEP 6: Display parsed data in HTML
        weatherData.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Weather in " + cityName;

        const tempParagraph = document.createElement("p");
        tempParagraph.textContent =
            "Temperature: " + temperature + " °C";

        const humidityParagraph = document.createElement("p");
        humidityParagraph.textContent =
            "Humidity: " + humidity + "%";

        const cloudsParagraph = document.createElement("p");
        cloudsParagraph.textContent =
            "Cloudiness: " + cloudiness + "%";

        weatherData.appendChild(heading);
        weatherData.appendChild(tempParagraph);
        weatherData.appendChild(humidityParagraph);
        weatherData.appendChild(cloudsParagraph);

    } catch (error) {

        console.error("Weather API Error:", error);

        weatherData.textContent =
            "Error: " + error.message;
    }
}


// EXERCISE 1: Fetch weather using the button
fetchButton.addEventListener("click", function () {

    const selectedCity = cityDropdown.value;

    getWeather(selectedCity);

});


// EXERCISE 3: Fetch weather when dropdown changes
cityDropdown.addEventListener("change", function () {

    const selectedCity = cityDropdown.value;

    getWeather(selectedCity);

});


// EXERCISE 4: Search weather by city name
searchButton.addEventListener("click", function () {

    const searchedCity = citySearch.value;

    getWeather(searchedCity);

});


// Allow searching by pressing Enter
citySearch.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const searchedCity = citySearch.value;

        getWeather(searchedCity);

    }

});
