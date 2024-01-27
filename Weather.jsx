import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css'; 


const api = {
    key: "9952761efa2ff5caab21c73a7de673f4",
    base: "https://api.openweathermap.org/data/2.5/weather"
}

const Weather = () => { 
    const [weatherData, setWeatherData] = useState([]); 
    const [search, setSearch] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");

    useEffect(() => {
        getLocation();
    }, []); 

    const getLocation = async () => {
        const location = await axios.get('https://ipapi.co/json');
        setCurrentLocation(location.data);
    }

    function handleSearch() {
        fetch(`${api.base}?q=${search}&APPID=${api.key}`)
            .then(res => res.json())
            .then(data => setWeatherData(data)); 
    }

    return (
        <div className='first-div'>
            <div className='second-div'>
                <section>
                    <input type="search" placeholder='Enter a city' onChange={(e) => { setSearch(e.target.value) }} />
                    <br />
                    <button onClick={handleSearch}>Search</button>
                </section>
                {(typeof weatherData.main !== "undefined") ? (
                    <div className='third-div'>
                        <p>{weatherData.name}</p>
                        <p>{weatherData.main.temp}</p>
                        <p>{weatherData.weather[0].main}</p>
                        <p>{weatherData.weather[0].description}</p>
                        <h1>Current Location</h1>
                        <p>Latitude: {currentLocation.latitude}</p>
                        <p>Longitude: {currentLocation.longitude}</p>
                        <p>City: {currentLocation.city}</p>
                    </div>
                ) : ("NOT FOUND")}
            </div>
        </div>
    )
}

export default Weather; 
