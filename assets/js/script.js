var searchHitory = $('.search-history');
var submitButton = $('form');
var cityInput = $('#citySearch');

// Saves searched cities in the localstorage, clears the input field and calls the renderSearchHistory function
function saveCities(event) { 
    event.preventDefault();
    var cityValue = cityInput.val().trim();

    if(cityValue.trim() === "") {
        console.log("Please provide a valid cityname!");
    } else {
        localStorage.setItem("city", cityValue);
        renderSearchHistory();
        cityInput.val('');
    };  
};


// renders the Search-history in form of buttons under the form
function renderSearchHistory() {
    var storedCity = localStorage.getItem("city");
    var savedCity = $('<li>');
    var savedCityButton = $('<button>');

    savedCityButton.text(storedCity);
    savedCityButton.addClass('btn btn-secondary');

    savedCity.append(savedCityButton);
    searchHitory.append(savedCity);
};


// function that displays current weather



// function that displays 5


submitButton.on("submit", saveCities);
$(document).ready(renderSearchHistory);