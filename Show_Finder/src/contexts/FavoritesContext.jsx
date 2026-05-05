import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // CREATE - Add a movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.imdbID === movie.imdbID);
      if (exists) return prev;
      return [
        ...prev,
        { ...movie, userRating: null, addedAt: new Date().toISOString() },
      ];
    });
  };

  // READ - Get all favorites
  const getFavorites = () => favorites;

  // UPDATE - Update user rating for a favorite
  const updateRating = (imdbID, rating) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        fav.imdbID === imdbID ? { ...fav, userRating: rating } : fav,
      ),
    );
  };

  // DELETE - Remove a movie from favorites
  const removeFromFavorites = (imdbID) => {
    setFavorites((prev) => prev.filter((fav) => fav.imdbID !== imdbID));
  };

  // Check if a movie is in favorites
  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        getFavorites,
        updateRating,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
