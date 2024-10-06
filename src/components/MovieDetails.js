import React, { useEffect, useState } from "react";
import RatingComponent from "./RatingCom";
import Loader from "./Loader";

export default function MovieDetails({
  selectedId,
  oncloseMovie,
  watchedMovies,
  onAddWatchedMovie,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  function handleWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatchedMovie(newWatchedMovie);
    oncloseMovie();
  }

  function isAdded() {
    return watchedMovies.some((movie) => {
      return movie.imdbID === selectedId;
    });
  }

  const KEY = "863bbc3d";
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovieDetails(data);
        setIsLoading(false);
      }
      getMovieDetails();
      let index = -1;
      watchedMovies.some((movie, idx) => {
        if (movie.imdbID === selectedId) index = idx;
        return movie.imdbID === selectedId;
      });
      if (index !== -1) setUserRating(watchedMovies.at(index).userRating);
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={oncloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <RatingComponent
                maxRating={10}
                color="yellow"
                handleRat={setUserRating}
                def={userRating}
              />
              {!isAdded() && userRating > 0 && (
                <button className="btn-add" onClick={handleWatchedMovie}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directd by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
