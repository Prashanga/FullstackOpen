import React from 'react';

const Weather = ({weather}) => {
    let thisWeather = weather[0];

    return(
        <div>
            <h1>Weather in {thisWeather.city}</h1> 
            <p>Temperature: {thisWeather.temp.toFixed(2)} C</p> 
            <p>Humidity: {thisWeather.humidity}%</p>
            <p>Wind Speed: {thisWeather.windSpeed.toFixed(2)} kph</p>
        </div>
    )
}

export default Weather;