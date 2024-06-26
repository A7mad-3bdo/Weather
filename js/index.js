/* Date For Today */
let date = new Date();
let dayNumber = date.getDate();
let dayName = date.toLocaleDateString("en-US", {weekday:"long"});
let monthName = date.toLocaleDateString("en-US", {month:"long"});


/* Date For Tommorrow */
let secondDate = new Date(date);
secondDate.setDate(date.getDate() + 1);
let secondDayName = secondDate.toLocaleDateString("en-US", {weekday: "long"});


/* Date For Day After Tommorrow */
let thirdDate = new Date(date);
thirdDate.setDate(date.getDate() + 2);
let thirdDayName = thirdDate.toLocaleDateString("en-US", {weekday: "long"});


/* Search */
let search = document.getElementById("searchInput");


/* Getting The Main Data */
async function getInformation(dynamicName) {
    let WeatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f8de03d845414ba682e111558242506&q=${dynamicName}&days=3`);
    let finalInfo = await WeatherData.json();
    return finalInfo;
};

/* Displaying The First Day */
async function displayFirstDay(data) {
    let countryName = data.location.name;
    let countryTemp = data.current.temp_c;
    let countryIcon = data.current.condition.icon;
    let countryText = data.current.condition.text;
    let countryHumidity = data.current.humidity;
    let countryWindSpeed = data.current.wind_kph;
    let countryWindDirection = data.current.wind_dir;

    document.getElementById("firstDay").innerHTML = `
    <div class="text-white">
        <div class="day-header p-3 d-flex justify-content-between">
            <p>${dayName}</p>
            <time>${dayNumber} ${monthName}</time> 
        </div>
        <div class="day-body p-3">
            <h3 class="h5 py-2" id="firstDayCountryName">${countryName}</h3>
            <div class="temperature display-1 fw-bolder py-2">${countryTemp}<sup>o</sup>C</div>
            <div class="day-photo py-2">
                <img src="${countryIcon}" class="w-100" alt="">
            </div>
            <div class="day-case text-info py-2">${countryText}</div>
            <ul class="d-flex justify-content-between py-2">
                <li class="text-secondary"><i class="fa-solid fa-umbrella"></i> ${countryHumidity}%</li>
                <li class="text-secondary"><i class="fa-solid fa-wind"></i> ${countryWindSpeed}km/h</li>
                <li class="text-secondary"><i class="fa-solid fa-compass"></i> ${countryWindDirection}</li>
            </ul>
        </div>
    </div>
    
    `
}





/* Displaying The Second Day */
async function displaySecondDay(data) {
    
    let countryIcon = data.forecast.forecastday[1].day.condition.icon;
    let countryMaxTemp = data.forecast.forecastday[1].day.maxtemp_c;
    let countryMinTemp = data.forecast.forecastday[1].day.mintemp_c;
    let countryText = data.forecast.forecastday[1].day.condition.text;
    

    document.getElementById("secondDay").innerHTML = `
    
    <div class="text-white text-center">
        <div class="day-header p-3">
            <p>${secondDayName}</p>
        </div>
        <div class="day-body p-3">
            <div class="day-photo py-2 text-center d-inline-block">
                <img src="${countryIcon}">
            </div>
            <div class="temperature fs-4 fw-bolder py-2">${countryMaxTemp}<sup>o</sup>C</div>
            <div class="temperature fs-5 fw-bolder py-2">${countryMinTemp}<sup>o</sup>C</div>
            <div class="day-case text-info py-2">${countryText}</div>
        </div>
    </div>

    `
}


/* Displaying The Third Day */
async function displayThirdDay(data) {
    
    let countryIcon = data.forecast.forecastday[2].day.condition.icon;
    let countryMaxTemp = data.forecast.forecastday[2].day.maxtemp_c;
    let countryMinTemp = data.forecast.forecastday[2].day.mintemp_c;
    let countryText = data.forecast.forecastday[2].day.condition.text;
    

    document.getElementById("thirdDay").innerHTML = `
    
    <div class="text-white text-center">
        <div class="day-header p-3">
            <p>${thirdDayName}</p>
        </div>
        <div class="day-body p-3">
            <div class="day-photo py-2 text-center d-inline-block">
                <img src="${countryIcon}">
            </div>
            <div class="temperature fs-4 fw-bolder py-2">${countryMaxTemp}<sup>o</sup>C</div>
            <div class="temperature fs-5 fw-bolder py-2">${countryMinTemp}<sup>o</sup>C</div>
            <div class="day-case text-info py-2">${countryText}</div>
        </div>
    </div>

    `
}



/* Starting the searching */

async function searchWeather(city) {
    let weatherInfo = await getInformation(city);
    
        displayFirstDay(weatherInfo);
        displaySecondDay(weatherInfo);
        displayThirdDay(weatherInfo);
}



search.addEventListener("input", function() {
    searchWeather(search.value);
})



