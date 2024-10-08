import React, { useState } from "react";
import WatchedMovie from "./WatchedMovie";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Movie from "./Movie";

export default function MoviesList({
  movies,
  isWatchedList,
  handleSelectedMovie,
  onWatchedMovieDelete,
}) {
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
          {isWatchedList && (
            <WatchedMoviesSummary
              watched={movies}
              onWatchedMovieDelete={onWatchedMovieDelete}
            />
          )}
          <ul className="list list-movies">
            {!isWatchedList &&
              movies.map((movie) => (
                <Movie
                  movie={movie}
                  handleSelectedMovie={handleSelectedMovie}
                  key={movie.imdbID}
                />
              ))}
            {isWatchedList &&
              movies.map((movie) => (
                <WatchedMovie
                  movie={movie}
                  key={movie.imdbID}
                  onWatchedMovieDelete={onWatchedMovieDelete}
                />
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
