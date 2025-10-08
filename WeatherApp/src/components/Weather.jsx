import { useEffect, useRef, useState } from "react";
import cityList from "../data/city.list.json";
import { Loader2 } from 'lucide-react';
import SearchBar from "./SearchBar";
import Alert from "./Alert";
import WeatherIcon from "./WeatherIcon";
import LocationDisplay from "./LocationDisplay";
import WeatherStats from "./WeatherStats";
import Assest from "../assets/assest.js";


const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

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
            city = city.split(",")[0].trim();
        }

        setLoading(true);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                setShowAlert(true);
                setAlertMessage(data.message || "City not found");
                setLoading(false);
                return;
            }

            const icon = allIcons[data.weather[0].icon];
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

            setSuggestions([]);
            setLoading(false);
        } catch (error) {
            setWeatherData(null);
            setShowAlert(true);
            setAlertMessage("Error fetching weather data: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        search("Hanoi");

        const handleShortcut = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, []);

    const handleInput = (e) => {
        const value = e.target.value.toLowerCase();
        if (value === "") {
            setSuggestions([]);
            return;
        }

        const filtered = cityList
            .filter(city => city.name.toLowerCase().startsWith(value))
            .slice(0, 5)
            .map(city => `${city.name}, ${city.country}`);
        setSuggestions(filtered);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search(inputRef.current.value);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        inputRef.current.value = suggestion;
        search(suggestion);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}

            <div className="w-full max-w-2xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                    <h1 className="text-4xl font-bold text-white text-center mb-8">Weather App</h1>

                    <SearchBar
                        inputRef={inputRef}
                        onSearch={() => search(inputRef.current.value)}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        suggestions={suggestions}
                        onSelectSuggestion={handleSelectSuggestion}
                    />

                    <div className="text-center text-white/60 text-sm mt-2 mb-6">
                        Press <kbd className="px-2 py-1 bg-white/20 rounded">Ctrl + K</kbd> to search
                    </div>

                    {loading && !weatherData ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        </div>
                    ) : weatherData ? (
                        <>
                            <WeatherIcon icon={weatherData.icon} temp={weatherData.temperature} />
                            <LocationDisplay location={weatherData.location} />
                            <WeatherStats humidity={weatherData.humidity} windspeed={weatherData.windspeed} />
                        </>
                    ) : null}
                </div>

                <p className="text-center text-white/80 text-sm mt-6">
                    Powered by OpenWeatherMap API
                </p>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default Weather;
