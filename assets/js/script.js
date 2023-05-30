var searchHistory = $('.search-history');
var submitButton = $('form');
var cityInput = $('#citySearch');
var myApiKey = 'f49ee689d4dabda3b9e19b6dac6d6729';

// Saves searched cities in the localstorage, clears the input field and calls the renderSearchHistory function
function saveCities(event) { 
    event.preventDefault();
    var cityValue = cityInput.val().trim();


    if(cityValue.trim() === "") {
        window.alert("Please provide a valid cityname!");
    } else {
     
        

        var storedCities = JSON.parse(localStorage.getItem('cities')) || [];
        storedCities.push(cityValue);
        localStorage.setItem('cities', JSON.stringify(storedCities));

        renderSearchHistory();
        fetchWeatherForecast(cityValue);
        cityInput.val('');
    };
};

    function fetchWeatherForecast(city){
    var geoCodeUrl ='https://api.openweathermap.org/geo/1.0/direct';
    var geoCodeApi = geoCodeUrl+'?q='+city+'&limit=1&appid='+myApiKey;
        fetch(geoCodeApi)
            .then(function (response) {
            return response.json();
            })
            .then(function (data){
            // get latitude and longtitude from the geocodingAPI response
            var latitude = data[0].lat;
            var longtitude = data[0].lon;

            var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
            var forecastApi = forecastUrl+'?lat='+latitude+'&lon='+longtitude+'&appid='+myApiKey;

            fetch(forecastApi)
                .then(function (response) {
                return response.json(); 
                })
                .then(function (data) {
                    var forecastList = data.list;
                    forecastList.forEach(function (forecast) {
                        var name = data.city.name; 
                        var date = forecast.dt_txt;
                        var temperature = forecast.main.temp;
                        var windspeed = forecast.wind.speed;
                        var humidity = forecast.main.humidity;
                        var weatherCondition = forecast.weather[0].description;

                        console.log("City Name:", name);
                        console.log("Date:", date);
                        console.log("Temperature:", temperature);
                        console.log("Windspeed:", windspeed);
                        console.log("Humidity:", humidity);
                        console.log("Weather Condition:", weatherCondition);
                    });


                    var storedCities = JSON.parse(localStorage.getItem('cities')) || [];
                    storedCities.push(cityValue);
                    localStorage.setItem('cities', JSON.stringify(storedCities));

                    renderSearchHistory();
                    cityInput.val('');
                })

                .catch(function(error){
                    console.log('Error:', error);
                });
          })
          .catch(function(error) {
            console.log('Error:', error);
          });
        };

       
    



// renders the Search-history in form of buttons under the form
function renderSearchHistory() {
    searchHistory.empty();
    var storedCities = JSON.parse(localStorage.getItem('cities')) || [];
    storedCities.forEach(function(city) {
        var savedCity = $('<li>');
        var savedCityButton = $('<button>');
    
        savedCityButton.text(city);
        savedCityButton.addClass('btn btn-secondary');
    
        savedCity.append(savedCityButton);
        searchHistory.append(savedCity);
    });
  
};


// function that displays current weather



// function that displays 5


submitButton.on("submit", saveCities);
$(document).ready(renderSearchHistory);