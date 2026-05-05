import React, { useState } from "react";

export const RatingStars = ({ initialRating = 0, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(initialRating);

  const handleRating = (star) => {
    const newRating = star === rating ? 0 : star; // Toggle off if clicking same
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="text-2xl transition transform hover:scale-110 focus:outline-none"
          title={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        >
          {star <= (hoverRating || rating) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
};
