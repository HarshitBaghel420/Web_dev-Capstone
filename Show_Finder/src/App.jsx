import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { Navbar } from "./components/Navbar";
import { LoadingSpinner } from "./components/UIComponents";
import { Home } from "./pages/Home";

// Lazy load pages for performance optimization
const MovieDetails = lazy(() =>
  import("./pages/MovieDetails").then((m) => ({ default: m.MovieDetails })),
);
const Favorites = lazy(() =>
  import("./pages/Favorites").then((m) => ({ default: m.Favorites })),
);

// Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <LoadingSpinner message="Loading page..." />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie/:imdbID" element={<MovieDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  {/* Catch-all for 404 */}
                  <Route
                    path="*"
                    element={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            404 - Page Not Found
                          </h1>
                          <a
                            href="/"
                            className="text-red-600 dark:text-red-500 hover:underline"
                          >
                            Go back to home
                          </a>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
