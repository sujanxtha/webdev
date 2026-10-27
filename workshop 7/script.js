
var text = '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

var employees = JSON.parse(text).employees;

function showNames() {
  var result = "";

  employees.forEach(function(person) {
    result += person.firstName + " " + person.lastName + "<br>";
  });

  document.getElementById("jsondata").innerHTML = result;
}

function showDetails() {
  document.getElementById("jsondata").textContent =
    JSON.stringify(employees, null, 2);
}

var movieUrl = "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750";

function loadRaw() {
  fetch(movieUrl)
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      document.getElementById("rawdata").textContent = data;
    })
    .catch(function() {
      document.getElementById("rawdata").textContent = "Could not load movies.";
    });
}

function loadMovies() {
  fetch(movieUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var output = document.getElementById("rawdata");
      output.innerHTML = "";

      if (!data.Search) {
        output.textContent = "No movies found or API is unavailable.";
        return;
      }

      var table = document.createElement("table");
      table.innerHTML = "<tr><th>Title</th><th>Year</th><th>Poster</th></tr>";

      data.Search.forEach(function(movie) {
        var row = document.createElement("tr");
        var title = document.createElement("td");
        var year = document.createElement("td");
        var poster = document.createElement("td");

        title.textContent = movie.Title;
        year.textContent = movie.Year;

        if (movie.Poster && movie.Poster !== "N/A") {
          var img = document.createElement("img");
          img.src = movie.Poster;
          img.alt = movie.Title + " poster";
          img.width = 55;
          poster.appendChild(img);
        }

        row.appendChild(title);
        row.appendChild(year);
        row.appendChild(poster);
        table.appendChild(row);
      });

      output.appendChild(table);
    })
    .catch(function() {
      document.getElementById("rawdata").textContent = "Could not load movies.";
    });
}

var weatherApiKey = "956b1e789baa0b822f05364a329afe45";

function getWeather(cityName) {
  var city = typeof cityName === "string"
    ? cityName
    : document.getElementById("city").value;

  var output = document.getElementById("weatherdata");

  output.textContent = "Loading weather...";

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&units=metric&appid=" + weatherApiKey;

  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        return response.json().then(function(errorData) {
          throw new Error(errorData.message || "Weather request failed");
        });
      }

      return response.json();
    })
    .then(function(data) {
      output.textContent = "City: " + data.name +
        " | Temperature: " + data.main.temp + " °C" +
        " | Clouds: " + data.clouds.all + "%" +
        " | Humidity: " + data.main.humidity + "%";
    })
    .catch(function(error) {
      console.log(error);
      output.textContent = "Could not get weather: " + error.message;
    });
}

function searchWeather() {
  var city = document.getElementById("citysearch").value.trim();

  if (city === "") {
    city = document.getElementById("city").value;
  }

  getWeather(city);
}
