import React, { useState } from "react";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Movie from "./Movie";

export default function WatchedMovieList({ watched, isWatchedList }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedMoviesSummary watched={watched} />

          <ul className="list">
            {watched.map((movie) => (
              <Movie movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
