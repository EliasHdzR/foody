import React from "react";

const RatingStars = ({ rating }) => {
  return (
    <div className="flex items-center justify-center mt-5">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={`text-yellow-400 text-sm ${
            index < rating ? "opacity-100" : "opacity-25"
          }`}
        >
          ⭐
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
