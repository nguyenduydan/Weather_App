import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import Assest from '../assets/assest';
import Alert from './Alert';
import cityList from '../data/city.list.json';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [countries, setCountries] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
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
        if (city.includes(",")) {
            city = city.split(",")[0].trim(); // chỉ lấy phần tên thành phố
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

            setSuggestions([]);
        } catch (error) {
            setWeatherData(false);
            setShowAlert(true);
            setAlertMessage("Error fetching data");
        }
    };

    useEffect(() => {
        search("hanoi");

        // Ctrl+K để focus input
        const handleShortcut = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current.focus();
            }
        };
        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, []);

    // Lấy danh sách quốc gia từ API
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => {
                const countryNames = data.map(c => c.name.common).sort();
                setCountries(countryNames);
            });
    }, []);

    const handleInput = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = cityList
            .filter(city => city.name.toLowerCase().startsWith(value))
            .slice(0, 5) // chỉ lấy 5 gợi ý
            .map(city => `${city.name}, ${city.country}`);
        setSuggestions(filtered);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search(inputRef.current.value);
        }
    };

    return (
        <div className='weather'>
            {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}

            <div className='flex flex-col items-center justify-between'>
                <div className='search-bar'>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Search...'
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                    <img
                        src={Assest.Images.search_icon}
                        alt='search'
                        onClick={() => search(inputRef.current.value)}
                    />
                </div>
                <div className='suggestions-container'>
                    {suggestions.length > 0 && (
                        <ul className='suggestions'>
                            {suggestions.map((country, idx) => (
                                <li key={idx} onClick={() => {
                                    inputRef.current.value = country;
                                    search(country);
                                }}>{country}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {weatherData && (
                <>
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
                </>
            )}
        </div>
    );
};

export default Weather;
