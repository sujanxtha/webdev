
let forecast = [];
let chart = null;

async function getForecast(city, apiKey) {
    const locations = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
            params: {
                q: city,
                limit: 1,
                appid: apiKey
            }
        }
    );

    const place = locations.data[0];

    if (!place) {
        return [];
    }

    const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
            params: {
                lat: place.lat,
                lon: place.lon,
                units: "metric",
                appid: apiKey
            }
        }
    );

    return response.data.list;
}

async function haeSaa() {
    const city = document.querySelector("#kaupunki").value.trim();
    const apiKey = document.querySelector("#apiKey").value.trim();
    const message = document.querySelector("#message");
    const button = document.querySelector("#haeSaaPainike");

    message.textContent = "";

    if (!city || !apiKey) {
        message.textContent = "Please enter a city and API key.";
        return;
    }

    $("#saaYllatys").show();
    button.disabled = true;

    try {
        const results = await getForecast(city, apiKey);

        if (results.length === 0) {
            throw new Error("City not found");
        }

        forecast = results;

        document.querySelector("#cityName").textContent =
            "Weather forecast for " + city;

        const temperatures = forecast.map(
            entry => entry.main.temp
        );

        const minTemp = Math.min(...temperatures);
        const maxTemp = Math.max(...temperatures);

        document.querySelector("#forecastSummary").textContent =
            `${city}: ${minTemp.toFixed(1)} to ${maxTemp.toFixed(1)} °C`;

        paivitaKaavio();

        message.textContent = "Forecast loaded successfully.";

    } catch (error) {
        if (error.message === "City not found") {
            message.textContent = "City not found.";
        } else if (error.response && error.response.status === 401) {
            message.textContent = "Invalid API key. Please check your key.";
        } else {
            message.textContent =
                "Unable to load forecast. Check your API key and internet connection.";
        }
    } finally {
        $("#saaYllatys").hide();
        button.disabled = false;
    }
}

function paivitaKaavio() {
    if (forecast.length === 0) {
        return;
    }

    if (chart) {
        chart.destroy();
    }

    const labels = forecast.map(
        entry => entry.dt_txt.slice(0, 16)
    );

    const temperatures = forecast.map(
        entry => entry.main.temp
    );

    const chartType = document.querySelector("#chartType").value;

    chart = new Chart(document.getElementById("tempChart"), {
        type: chartType,
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temperatures,
                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37, 99, 235, 0.4)",
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date and Time (UTC)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Temperature (°C)"
                    }
                }
            }
        }
    });
}

document.querySelector("#haeSaaPainike")
    .addEventListener("click", haeSaa);
