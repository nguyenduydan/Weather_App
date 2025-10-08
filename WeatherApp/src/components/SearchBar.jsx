import { Search } from "lucide-react";

const SearchBar = ({ inputRef, onSearch, onInput, onKeyDown, suggestions, onSelectSuggestion }) => (
    <div className="w-full max-w-md mx-auto relative">
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for a city..."
                onChange={onInput}
                onKeyDown={onKeyDown}
                className="w-full px-5 py-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button
                onClick={onSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
            >
                <Search className="w-5 h-5 text-white" />
            </button>
        </div>

        {suggestions.length > 0 && (
            <ul className="absolute w-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl z-10">
                {suggestions.map((suggestion, idx) => (
                    <li
                        key={idx}
                        onClick={() => onSelectSuggestion(suggestion)}
                        className="px-5 py-3 text-white hover:bg-white/20 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default SearchBar;
