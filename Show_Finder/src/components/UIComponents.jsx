import React from "react";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 dark:border-gray-600 border-t-red-500 dark:border-t-red-400 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
    </div>
  );
};

export const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
      <div className="text-4xl mb-2">⚠️</div>
      <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export const EmptyState = ({
  title = "No results found",
  description,
  icon = "🎬",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
};
