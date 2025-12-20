import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";


interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search projects..." }: SearchBarProps) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, onSearch]);

    return (
        <div className="relative">
            <FaSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500 text-white"
            />
        </div>
    );
};

export default SearchBar;