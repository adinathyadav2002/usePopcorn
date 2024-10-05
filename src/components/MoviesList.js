import React, { useState } from "react";
import WatchedMovie from "./WatchedMovie";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Movie from "./Movie";

export default function MoviesList({ movies, isWatchedList }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>
      {isOpen1 && (
        <>
          {isWatchedList && <WatchedMoviesSummary watched={movies} />}
          <ul className="list">
            {!isWatchedList &&
              movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
              ))}
            {isWatchedList &&
              movies?.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
