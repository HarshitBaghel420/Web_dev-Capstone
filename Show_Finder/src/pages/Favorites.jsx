import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { MovieCard } from "../components/MovieCard";
import { EmptyState } from "../components/UIComponents";
import { RatingStars } from "../components/RatingStars";

export const Favorites = () => {
  const { getFavorites, updateRating } = useFavorites();
  const favorites = getFavorites();
  const [expandedMovie, setExpandedMovie] = useState(null);

  const sortedFavorites = [...favorites].sort((a, b) => {
    return new Date(b.addedAt) - new Date(a.addedAt);
  });

  const statsData = {
    total: favorites.length,
    rated: favorites.filter((m) => m.userRating).length,
    avgRating:
      favorites.filter((m) => m.userRating).length > 0
        ? (
            favorites.reduce((sum, m) => sum + (m.userRating || 0), 0) /
            favorites.filter((m) => m.userRating).length
          ).toFixed(1)
        : 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            ❤️ My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your favorite movies and series
          </p>
        </div>

        {/* Stats */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Total Favorites
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {statsData.total}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Rated Movies
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {statsData.rated}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Average Rating
              </p>
              <p className="text-3xl font-bold text-yellow-500">
                {statsData.avgRating}/5
              </p>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Start adding movies to your favorites to see them here"
            icon="😢"
          />
        ) : (
          <div>
            {/* List View with Ratings */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Collection
              </h2>
              <div className="space-y-4">
                {sortedFavorites.map((movie) => (
                  <div
                    key={movie.imdbID || movie.imdbid}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Poster */}
                      <div className="flex-shrink-0">
                        {movie.Poster && movie.Poster !== "N/A" ? (
                          <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-24 h-36 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-24 h-36 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            📽️
                          </div>
                        )}
                      </div>

                      {/* Movie Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {movie.Title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {movie.Year} • {movie.Type}
                        </p>

                        {/* Rating Section */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Rating:
                          </p>
                          <RatingStars
                            initialRating={movie.userRating || 0}
                            onRatingChange={(rating) =>
                              updateRating(movie.imdbID || movie.imdbid, rating)
                            }
                          />
                        </div>

                        {/* Info Chips */}
                        <div className="flex flex-wrap gap-2">
                          {movie.imdbRating && movie.imdbRating !== "N/A" && (
                            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-bold px-3 py-1 rounded-full">
                              ⭐ {movie.imdbRating}/10
                            </span>
                          )}
                          {movie.Genre && (
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-3 py-1 rounded-full">
                              {movie.Genre.split(",")[0]}
                            </span>
                          )}
                          <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                            Added {new Date(movie.addedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid View */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Grid View
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedFavorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID || movie.imdbid}
                  movie={movie}
                  showRating={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
