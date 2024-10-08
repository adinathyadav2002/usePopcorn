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
  const indexOfWatchedMovie = watchedMovies
    .map((movie) => movie.imdbID)
    .indexOf(selectedId);

  const [userRating, setUserRating] = useState(
    indexOfWatchedMovie !== -1
      ? watchedMovies?.at(indexOfWatchedMovie).userRating
      : 0
  );

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

  const KEY = "863bbc3d";
  // hook to fetch movie detail by it's id
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
    },
    [selectedId]
  );

  // hook to change the title of page
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // cleanup function to reset the tile when we unmount the
      // MoiveDetails component and also when render component with
      // another movie name
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  // hook to add eventlistener to document
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          oncloseMovie();
        }
      }
      document.addEventListener("keydown", callback);

      // cleanup function so that we don't add more that event listeners
      // every time when we mount MovieDetails
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [oncloseMovie]
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
              {indexOfWatchedMovie === -1 ? (
                <button className="btn-add" onClick={handleWatchedMovie}>
                  + Add to list
                </button>
              ) : (
                <p>You already rated the movie!</p>
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
