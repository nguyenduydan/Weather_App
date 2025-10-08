import { Droplets, Wind } from "lucide-react";

const WeatherStats = ({ humidity, windspeed }) => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-400/30 rounded-xl">
                    <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-medium">Humidity</span>
            </div>
            <p className="text-3xl font-bold text-white">{humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-cyan-400/30 rounded-xl">
                    <Wind className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm font-medium">Wind Speed</span>
            </div>
            <p className="text-3xl font-bold text-white">{windspeed} km/h</p>
        </div>
    </div>
);
export default WeatherStats;
