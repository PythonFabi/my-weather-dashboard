var searchHitory = $('.search-history');
var submitButton = $('form');
var cityInput = $('#citySearch');

function saveItems(event) { 
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


// renders the Searchhistory in form of buttons under the form
function renderSearchHistory() {
    var storedCity = localStorage.getItem("city");
    var savedCity = $('<li>');
    var savedCityButton = $('<button>');

    savedCityButton.text(storedCity);

    savedCityButton.addClass('btn btn-secondary');

    savedCity.append(savedCityButton);

    searchHitory.append(savedCity);
};


submitButton.on("submit", saveItems);
$(document).ready(renderSearchHistory);