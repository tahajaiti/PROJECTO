import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    value: string;
    onSearch: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onSearch, placeholder = "Search..." }: SearchBarProps) => {
    return (
        <div className="relative">
            <FaSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500 text-white text-sm"
            />
        </div>
    );
};

export default SearchBar;