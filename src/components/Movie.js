import React from "react";

export default function Movie({ movie, handleSelectedMovie }) {
  return (
    <li onClick={() => handleSelectedMovie(movie.imdbID)}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "image-not-found.png"}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
