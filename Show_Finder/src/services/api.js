import axios from "axios";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "c4c07c34"; // Uses env var or falls back to demo key
const OMDB_BASE_URL = "https://www.omdbapi.com/";

const apiClient = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

/**
 * Search for movies/series
 * @param {string} searchTerm - The title to search for
 * @param {object} filters - Filter options (year, type)
 * @returns {Promise} Array of movies or error
 */
export const searchMovies = async (searchTerm, filters = {}) => {
  try {
    if (!searchTerm.trim()) {
      return [];
    }

    const response = await apiClient.get("/", {
      params: {
        s: searchTerm,
        type: filters.type || "movie",
        y: filters.year || undefined,
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "No movies found");
    }

    return response.data.Search || [];
  } catch (error) {
    console.error("Search error:", error.message);
    throw new Error(
      error.response?.data?.Error || error.message || "Failed to search movies",
    );
  }
};

/**
 * Get detailed information about a specific movie
 * @param {string} imdbID - The IMDB ID of the movie
 * @returns {Promise} Movie details or error
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await apiClient.get("/", {
      params: {
        i: imdbID,
        plot: "full",
      },
    });

    if (response.data.Response === "False") {
      throw new Error(response.data.Error || "Movie not found");
    }

    return response.data;
  } catch (error) {
    console.error("Details error:", error.message);
    throw new Error(
      error.response?.data?.Error ||
        error.message ||
        "Failed to fetch movie details",
    );
  }
};

export default {
  searchMovies,
  getMovieDetails,
};
