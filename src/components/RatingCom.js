import React, { useState } from "react";

// giving default value for maxRating
export default function RatingComponent({
  maxRating = 5,
  color = "black",
  message = [],
  handleRat = () => {},
  size = "24px",
  def = 0,
}) {
  // const [rating, setRating] = useState("");
  const [rating, setRating] = useState(def);
  const [tempRating, setTempRating] = useState(0);
  const containerStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  };

  const ratingDivStyle = {
    display: "flex",
  };

  const textStyle = {
    margin: "0",
    lineHeight: "1",
  };

  function handleRating(newRating) {
    setRating(newRating);
    handleRat(newRating);
  }

  function handleTempRating(rating) {
    setTempRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={ratingDivStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            handleRating={handleRating}
            rating={rating}
            index={i}
            tempRatingHandle={handleTempRating}
            tempRating={tempRating}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message[(tempRating || rating) - 1] || tempRating || rating || " "}
      </p>
    </div>
  );
}

function Star({
  index,
  rating,
  handleRating,
  tempRatingHandle,
  tempRating,
  color,
  size,
}) {
  const starStyle = {
    height: size,
    width: size,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      style={starStyle}
      onClick={() => handleRating(index + 1)}
      onMouseEnter={() => tempRatingHandle(index + 1)}
      onMouseLeave={() => tempRatingHandle(0)}
    >
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={
          tempRating === 0
            ? index < rating
              ? color
              : "#fff"
            : index < tempRating
            ? color
            : "#fff"
        }
        stroke={color}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
