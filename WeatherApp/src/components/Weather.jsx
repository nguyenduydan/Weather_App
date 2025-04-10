import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import Assest from '../assets/assest';
import Alert from './Alert';

const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const allIcons = {
        "01d": Assest.Images.clear_icon,
        "01n": Assest.Images.clear_icon,
        "02d": Assest.Images.cloud_icon,
        "02n": Assest.Images.cloud_icon,
        "03d": Assest.Images.cloud_icon,
        "03n": Assest.Images.cloud_icon,
        "04d": Assest.Images.drizzle_icon,
        "04n": Assest.Images.drizzle_icon,
        "09d": Assest.Images.rain_icon,
        "09n": Assest.Images.rain_icon,
        "10d": Assest.Images.rain_icon,
        "10n": Assest.Images.rain_icon,
        "13d": Assest.Images.snow_icon,
        "13n": Assest.Images.snow_icon,
    };

    const search = async (city) => {
        if (city === "") {
            setShowAlert(true);
            setAlertMessage("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                setShowAlert(true);
                setAlertMessage(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || Assest.Images.clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.log(error);
        }
    };

    useEffect(() => {
        search("hanoi");
    }, []);


    return (
        <div className='weather'>
            {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search...' />
                <img src={Assest.Images.search_icon} alt='' onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className='weather-data'>
                    <div className='col'>
                        <img src={Assest.Images.humidity_icon} alt="" />
                        <div className='humidity'>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={Assest.Images.wind_icon} alt="" />
                        <div className='wind'>
                            <p>{weatherData.windspeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    );
};

export default Weather;
