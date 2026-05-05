import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export const MovieCard = ({ movie, showRating = false }) => {
  const { isFavorite, removeFromFavorites, addToFavorites } = useFavorites();
  const isInFavorites = isFavorite(movie.imdbID || movie.imdbid);
  const imdbID = movie.imdbID || movie.imdbid;

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavorites) {
      removeFromFavorites(imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Link to={`/movie/${imdbID}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-2xl transition transform hover:scale-105 h-full">
        {/* Poster */}
        <div
          className="relative overflow-hidden bg-gray-200 dark:bg-gray-700"
          style={{ paddingTop: "150%" }}
        >
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
              📽️ No Image
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition ${
              isInFavorites
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-800 hover:bg-white"
            }`}
            title={isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isInFavorites ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 dark:text-white truncate">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {movie.Year} • {movie.Type}
          </p>

          {showRating && movie.userRating && (
            <div className="mt-2 flex items-center">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {movie.userRating}/5
              </span>
            </div>
          )}

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            IMDB ID: {imdbID}
          </p>
        </div>
      </div>
    </Link>
  );
};
