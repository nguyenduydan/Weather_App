const WeatherIcon = ({ icon, temp }) => (
    <div className="flex flex-col items-center my-8">
        <div className="w-32 h-32 mb-4 animate-float">
            {icon ? (
                <img src={icon} alt="weather" className="w-full h-full object-contain drop-shadow-2xl" />
            ) : (
                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                    <Loader2 className="w-16 h-16 text-white animate-spin" />
                </div>
            )}
        </div>
        <p className="text-7xl font-bold text-white mb-2">{temp}°C</p>
    </div>
);

export default WeatherIcon;
