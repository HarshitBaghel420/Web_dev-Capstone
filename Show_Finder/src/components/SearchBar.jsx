import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export const SearchBar = ({ onSearch, onFilterChange, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ year: "", type: "movie" });
  const debouncedSearch = useDebounce(searchTerm, 500); // 500ms debounce

  // Trigger search when debounced value changes
  React.useEffect(() => {
    if (debouncedSearch) {
      onSearch(debouncedSearch, filters);
    }
  }, [debouncedSearch, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (e) => {
    const newFilters = { ...filters, year: e.target.value };
    setFilters(newFilters);
    if (searchTerm) {
      onFilterChange(searchTerm, newFilters);
    }
  };

  const handleTypeChange = (e) => {
    const newFilters = { ...filters, type: e.target.value };
    setFilters(newFilters);
    if (searchTerm) {
      onFilterChange(searchTerm, newFilters);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({ year: "", type: "movie" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="🔍 Search for movies, series, or episodes..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white transition"
          disabled={isLoading}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Year
          </label>
          <input
            type="number"
            value={filters.year}
            onChange={handleYearChange}
            placeholder="e.g., 2023"
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white transition"
            disabled={isLoading}
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white transition"
            disabled={isLoading}
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ⏳ Searching (debounced)...
        </div>
      )}
    </div>
  );
};
