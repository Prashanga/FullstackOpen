import React, {useEffect, useState} from 'react';
import Weather from './Weather';
import axios from 'axios';

const Display = ({country}) => {
    let oneCountry = country;

    const [weather,setWeather] = useState([]);

    const hookWeather= () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${oneCountry.capital}&APPID=${process.env.REACT_APP_API}` 
        )
        .then((response)=>{
         
          hookWeatherHandler(response);
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      useEffect(hookWeather, []);

      const hookWeatherHandler = (response) => {
        const temperatureK = response.data.main.temp;
        const humidity     = response.data.main.humidity;
        const windSpeedK   = response.data.wind.speed;
        const windDeg      = response.data.wind.deg;
        const cityName     = response.data.name;
        const temperatureC = temperatureK - 273.15;
        const windSpeedKPH = windSpeedK * 3.6;
    
        setWeather([
          {
            temp: temperatureC,
            windDeg: windDeg,
            humidity: humidity,
            windSpeed: windSpeedKPH,
            city: cityName
          }
        ])
      }
    
    

    return(
    <div>
        <h1>{oneCountry.name}</h1>
        <p>capital {oneCountry.capital}</p>
    <p>population {oneCountry.population}</p>
    <h2>languages</h2>
    <ul>
    {oneCountry.languages.map(language=><li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={oneCountry.flag} style={{height:'150px',width:'150px'}} alt="Flag" /> 
    {weather.length>0 && <Weather weather={weather} />}
    
    </div>
)
}
export default Display;