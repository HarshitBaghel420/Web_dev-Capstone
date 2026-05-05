import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from "../components/UIComponents";
import { searchMovies } from "../services/api";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchTerm, filters) => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchMovies(searchTerm, filters);
      setMovies(results);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (searchTerm, filters) => {
    handleSearch(searchTerm, filters);
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            🎬 CineSearch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover and track your favorite movies and series
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          isLoading={isLoading}
        />

        {/* Results Section */}
        <div className="mt-12">
          {isLoading ? (
            <LoadingSpinner message="Searching for movies..." />
          ) : error ? (
            <ErrorMessage error={error} onRetry={handleRetry} />
          ) : hasSearched && movies.length === 0 ? (
            <EmptyState
              title="No movies found"
              description="Try searching with different keywords or filters"
              icon="🔍"
            />
          ) : hasSearched ? (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Found {movies.length} result{movies.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              title="Start searching"
              description="Enter a movie or series name above to get started"
              icon="🍿"
            />
          )}
        </div>
      </div>
    </div>
  );
};
