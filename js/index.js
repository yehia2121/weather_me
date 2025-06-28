let myRequest = new XMLHttpRequest
let myDOMparser = new DOMParser
const currentDate = new Date()
let tomorrow = new Date()
let afterTomorrow = new Date()
let weather = document.querySelector('#weather')
let weatherInp = document.querySelector('#weatherInp')
let sun = document.querySelector('.fa-sun')
let moon = document.querySelector('.fa-moon')
let body = document.querySelector('body')
let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeekNumber = currentDate.getDay()
const currentDayString = weekdays[dayOfWeekNumber]
const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
let data;

tomorrow.setDate(currentDate.getDate() + 1)
afterTomorrow.setDate(currentDate.getDate() + 2)

if (localStorage.getItem('darkmode') == 'light') {
    light()
} else if (localStorage.getItem('darkmode') == 'dark') {
    dark()
}

// const watchId = navigator.geolocation.getCurrentPosition(success, error);

// function success(success) {
//     latitude = success?.coords.latitude
//     longitude = success?.coords.longitude
// }

// function error(error) {
//     console.error(error);
// }

function search() {
    var search = weatherInp.value.trim()

    return search
}

function apiResponse() {
    myRequest.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=8fc55cbb66884765960135022252606&q=${search()}&days=7`)

    myRequest.send()

    myRequest.responseType = 'json'

}

myRequest.addEventListener('load', function () {
    data = myRequest.response

    if (!data.location?.name | weatherInp.value == '') {
        weather.innerHTML = ""
    } else if (data.location.name) {
        display(data)
    }

})

function display(value) {
    var code = `
                                <div class="col-sm-12 col-lg  position-relative">
                                <div>
                                    <p>${currentDayString}</p>
                                </div>
                                <h4>${value.location?.name}</h4>
                                <div class="text-center">
                                    <p class="fs-1">${value.current?.temp_c}<sup>o</sup>c</p>
                                    <div class="w-25 position-absolute">
                                        <img src="https:${value.current?.condition.icon}" alt="">
                                    </div>
                                    <p class="text-info">${value.current?.condition.text}</p>
                                </div>
                                <div>
                                    <p>${currentMonthName + ' ' + new Date().getDate()}</p>
                                </div>
                                <div class="row mt-5">
                                    <div class="col text-center">
                                        <i class="fa-solid fa-umbrella fa-xl"></i>
                                        <p class="pt-1">${value.current?.humidity}%</p>
                                    </div>
                                    <div class="col text-center">
                                        <i class="fa-solid fa-wind fa-xl"></i>
                                        <p class="pt-1">${value.current?.wind_kph} km/h</p>
                                    </div>
                                    <div class="col text-center">
                                        <i class="fa-solid fa-compass fa-xl"></i>
                                        <p class="pt-1">${value.current?.wind_dir}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg border-1 border text-center ">
                                <p>${weekdays[tomorrow.getDay()]}</p>
                                <div class="w-25 m-auto">
                                    <img src="https://${value.forecast.forecastday[1].day.condition.icon}" alt="">
                                </div>
                                    <p class="">${value.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</p>
                                    <p class=" text-secondary">${value.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>c</p>
                                <p class="text-info">${value.forecast.forecastday[1].day.condition.text}</p>
                            </div>
                            <div class="col-sm-12 col-lg text-center ">
                                <p>${weekdays[afterTomorrow.getDay()]}</p>
                                <div class="w-25 m-auto">
                                    <img src="https://${value.forecast.forecastday[2].day.condition.icon}" alt="">
                                </div>
                                    <p class="">${value.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</p>
                                    <p class=" text-secondary">${value.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>c</p>
                                <p class="text-info">${value.forecast.forecastday[2].day.condition.text}</p>
                            </div>
    `

    weather.innerHTML = code
}

function dark() {
    localStorage.setItem('darkmode', 'dark')
    body.classList.remove('light-mode')
    sun.classList.add('d-none')
    moon.classList.remove('d-none')
}

function light() {
    localStorage.setItem('darkmode', 'light')
    body.classList.add('light-mode')
    sun.classList.remove('d-none')
    moon.classList.add('d-none')
}

myRequest.addEventListener('error', function () {

    weather.innerHTML = ``
})

weatherInp.addEventListener('input', function () {
    if (weatherInp.value) {
        apiResponse()
    } else {
        weather.innerHTML = ''
    }

})

sun.addEventListener('click', function () {
    dark()
})

moon.addEventListener('click', function () {
    light()
})