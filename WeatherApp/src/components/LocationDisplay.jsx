import { MapPin } from "lucide-react";

const LocationDisplay = ({ location }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        <MapPin className="w-6 h-6 text-white/80" />
        <p className="text-3xl text-white/90 font-medium">{location}</p>
    </div>
);

export default LocationDisplay;
