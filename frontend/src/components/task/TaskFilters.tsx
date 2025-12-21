import { useState, useEffect } from "react";
import { FaFilter, FaCheckSquare, FaSquare } from "react-icons/fa";
import { DatePreset, FilterState } from "../../hooks/useTaskParams";
import SearchBar from "../core/SearchBar";

interface TaskFiltersProps {
    appliedFilters: FilterState;
    onApply: (filters: FilterState) => void;
}

const TaskFilters = ({ appliedFilters, onApply }: TaskFiltersProps) => {
    const [filters, setFilters] = useState<FilterState>(appliedFilters);

    useEffect(() => {
        setFilters(appliedFilters);
    }, [appliedFilters]);

    const updateFilter = (key: keyof FilterState, value: unknown) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handlePresetChange = (preset: DatePreset) => {
        setFilters((prev) => ({
            ...prev,
            preset,
            dateFrom: preset !== "custom" ? "" : prev.dateFrom,
            dateTo: preset !== "custom" ? "" : prev.dateTo,
        }));
    };

    const hasUnappliedChanges = JSON.stringify(filters) !== JSON.stringify(appliedFilters);

    return (
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4">
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="w-full sm:max-w-xs">
                        <SearchBar
                            value={filters.query}
                            onSearch={(val) => updateFilter("query", val)}
                            placeholder="Search tasks..."
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {(["all", "overdue", "today", "week", "custom"] as DatePreset[]).map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handlePresetChange(preset)}
                                className={`px-3 py-2 text-sm rounded-lg transition-all cursor-pointer capitalize ${filters.preset === preset
                                        ? "bg-zinc-700 text-white border border-zinc-600"
                                        : "bg-zinc-800 text-zinc-400 hover:text-white border border-transparent"
                                    }`}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => updateFilter("showCompleted", !filters.showCompleted)}
                    className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white cursor-pointer"
                >
                    {filters.showCompleted ? <FaCheckSquare className="text-blue-500" /> : <FaSquare className="text-zinc-600" />}
                    Show Completed
                </button>
            </div>

            {filters.preset === "custom" && (
                <div className="flex gap-4 p-4 bg-zinc-950 rounded-lg border border-zinc-800/50">
                    <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => updateFilter("dateFrom", e.target.value)}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    />
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => updateFilter("dateTo", e.target.value)}
                        min={filters.dateFrom}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    />
                </div>
            )}

            <div className="flex justify-end pt-2 border-t border-zinc-800/50">
                <button
                    onClick={() => onApply(filters)}
                    disabled={!hasUnappliedChanges}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${hasUnappliedChanges
                            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 cursor-pointer"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    <FaFilter className="w-3 h-3" />
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default TaskFilters;