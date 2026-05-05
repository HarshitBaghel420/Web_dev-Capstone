import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useFavorites } from "../contexts/FavoritesContext";
import { RatingStars } from "../components/RatingStars";
import { LoadingSpinner, ErrorMessage } from "../components/UIComponents";

export const MovieDetails = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites, updateRating } =
    useFavorites();

  const isInFavorites = isFavorite(imdbID);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(imdbID);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  const handleToggleFavorite = () => {
    if (!movie) return;

    if (isInFavorites) {
      removeFromFavorites(imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const handleRatingChange = (rating) => {
    updateRating(imdbID, rating);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading movie details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorMessage error={error} onRetry={() => navigate("/")} />
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition font-medium"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Back
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg h-96 flex items-center justify-center text-gray-500">
                📽️ No Image
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className={`w-full mt-4 py-3 rounded-lg font-bold transition ${
                isInFavorites
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              {isInFavorites
                ? "❤️ Remove from Favorites"
                : "🤍 Add to Favorites"}
            </button>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {movie.Title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {movie.Year} • {movie.Type} • {movie.Runtime}
            </p>

            {/* Rating Section */}
            {isInFavorites && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                  Your Rating
                </h3>
                <RatingStars
                  initialRating={0}
                  onRatingChange={handleRatingChange}
                />
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {movie.imdbRating !== "N/A" && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    IMDB Rating
                  </p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {movie.imdbRating}/10
                  </p>
                </div>
              )}
              {movie.imdbVotes !== "N/A" && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Votes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {movie.imdbVotes}
                  </p>
                </div>
              )}
              {movie.Genre && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg col-span-2">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Genre
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {movie.Genre}
                  </p>
                </div>
              )}
            </div>

            {/* Director, Writer, Actors */}
            {(movie.Director || movie.Writer || movie.Actors) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
                {movie.Director && movie.Director !== "N/A" && (
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      DIRECTOR
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {movie.Director}
                    </p>
                  </div>
                )}
                {movie.Writer && movie.Writer !== "N/A" && (
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      WRITER
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {movie.Writer}
                    </p>
                  </div>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      ACTORS
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {movie.Actors}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Plot
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.Plot}
                </p>
              </div>
            )}

            {/* Additional Info */}
            {(movie.Language || movie.Country || movie.BoxOffice) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {movie.Language && movie.Language !== "N/A" && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Language
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {movie.Language}
                    </p>
                  </div>
                )}
                {movie.Country && movie.Country !== "N/A" && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Country
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {movie.Country}
                    </p>
                  </div>
                )}
                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Box Office
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {movie.BoxOffice}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
