const API_KEY = '0c76be07e26040bebd9141348242005' // public API of 1000 calls per day (don't abuse it)
const weatherContainer = document.querySelector('.weatherContainer')

// function that fetch infos from Weather API and return forecast hourly
async function retreiveForecast(city){
    const geo_API = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    const response = await fetch(geo_API)
    if(response.status === 200){
        const data = await response.json()
        const currentHour = parseInt(data.current.last_updated.split(' ')[1].split(':')[0])
        return [currentHour, data.forecast.forecastday[0].hour]
    }
    else{
        console.log(response.status)
    }
}

// Main Function that updates the weather

async function mainOne(city){
    weatherContainer.innerHTML = ''

    // Creating the main layout of the Weather widget

    const upperPart = document.createElement('div')
    upperPart.classList.add('upperPart')

    const topLeft = document.createElement('div')
    topLeft.classList.add('topLeft')

    const topRight = document.createElement('div')
    topRight.classList.add('topRight')

    const sliderPart = document.createElement('div')
    sliderPart.classList.add('sliderPart')

    const bottomPart = document.createElement('div')
    bottomPart.classList.add('bottomPart')

    // *************************************************

    const [currentHour, hourlyForecast] = await retreiveForecast(city)
    let currentStart = 0

    const cityContainer = document.createElement('div')
    cityContainer.classList.add('cityContainer')
    cityContainer.innerText = city

    const currentTemp = document.createElement('div')
    currentTemp.classList.add('currentTemp')
    currentTemp.innerText = Math.floor(hourlyForecast[currentHour].temp_c) + '°'

    
    topLeft.append(cityContainer, currentTemp)

    const currentWeatherIcon = document.createElement('div')
    currentWeatherIcon.classList.add('weatherIcon')
    currentWeatherIcon.style.backgroundImage = `url('${retreiveWeatherIcon(hourlyForecast[currentStart].condition.text)}')`

    const currentWeathertext = document.createElement('div')
    currentWeathertext.classList.add('weatherText')
    currentWeathertext.innerText = hourlyForecast[currentHour].condition.text

    topRight.append(currentWeatherIcon, currentWeathertext)

    upperPart.append(topLeft, topRight)

    for(let i = 1; i < 7 ; i++){  
        i + currentHour < 24 ? currentStart = i + currentHour : currentStart = i + currentHour - 24
        const hourlyTemp = document.createElement('div')
        hourlyTemp.classList.add('hourlyTemp')

        const nextHour = document.createElement('div')
        nextHour.classList.add('nextHour')
        let time = ''
        if(currentStart == 0){
            time = '12 AM'
        }
        else if(currentStart < 12){
            time = currentStart + ' AM'
        }
        else{
            if(currentStart - 12 === 0){
                time = '12 PM'
            }
            else{
                time = (currentStart - 12) + ' PM'
            }
        }
        nextHour.innerText = time

        const weatherText = hourlyForecast[currentStart].condition.text

        const nextIcon = document.createElement('div')
        nextIcon.classList.add('nextIcon')
        nextIcon.style.backgroundImage = `url('${retreiveWeatherIcon(weatherText)}')`

        const nextTemp = document.createElement('div')
        nextTemp.classList.add('nextTemp')
        nextTemp.innerText = Math.floor(hourlyForecast[currentStart].temp_c) + '°'

        hourlyTemp.append(nextHour, nextIcon, nextTemp)
        bottomPart.append(hourlyTemp)
    }
    weatherContainer.append(upperPart, sliderPart, bottomPart)
}

function retreiveWeatherIcon(str){
    str = str.toLowerCase()
    if(str.includes('drizzle')) return '../public/weather_icons/drizzle.png'
    if(str.includes('hail')) return '../public/weather_icons/hailstorm.png'
    if(str.includes('cloudy') && str.includes('Partly')) return '../public/weather_icons/partly-cloudy.png'
    if(str.includes('rain')) return '../public/weather_icons/raining.png'
    if(str.includes('sleet')) return '../public/weather_icons/sleet.png'
    if(str.includes('sunny') || str.includes('clear')) return '../public/weather_icons/sunny.png'
    if(str.includes('thunder')) return '../public/weather_icons/thunderstorm.png'
    if(str.includes('wind')) return '../public/weather_icons/windy.png'
    if(str.includes('cloud')) return '../public/weather_icons/cloudy.png'
    else{
        return '../public/weather_icons/cloudy.png'
    }
}

const getCity = document.querySelector('.getCity')
getCity.addEventListener('click', () => {
    const weatherCity = document.querySelector('.weatherCity').value
    if(weatherCity !== ''){
        mainOne(weatherCity)
    }
})

const inputForm = document.querySelector('.weatherCity')
inputForm.addEventListener('keyup', (e) => {
    console.log(e)
    if(e.key === 'Enter'){
        const weatherCity = document.querySelector('.weatherCity').value
        if(weatherCity !== ''){
            mainOne(weatherCity)
        }
    }
})
//mainOne('Phuket')

/*
    {
        "time_epoch": 1716274800,
        "time": "2024-05-21 16:00",
        "temp_c": 25,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
        },
        "wind_kph": 24.1,
        "precip_mm": 0.01,
        "will_it_rain": 1,
        "will_it_snow": 0
    }
*/
/*

    <div class="weatherContainer">
        <div class="upperPart">
            <div class="topLeft">
                <div class="cityContainer">Paris</div>
                <div class="currentTemp">26°</div>
            </div>
            <div class="topRight">
                <div class="weatherIcon"></div>
                <div class="weatherText">Partly Cloudy</div>
            </div>
        </div>
        <div class="bottomPart">
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
            <div class="hourlyTemp">
                <div class="nextHour">4PM</div>
                <div class="nextIcon"></div>
                <div class="nextTemp">25°</div>
            </div>
        </div>
    </div>

*/