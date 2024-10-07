import { useEffect, useState } from "react";
import Nav from "./Nav.js";
import MoviesList from "./MoviesList.js";
import Search from "./Search.js";
import NumResult from "./NumResult.js";
import Loader from "./Loader.js";
import ErrorMessage from "./ErrorMessage.js";
import MovieDetails from "./MovieDetails.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatchedMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const KEY = "863bbc3d";

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => {
      if (selectedId === id) return null;
      return id;
    });
  }

  function handleCloseMovie() {
    setSelectedId((selected) => null);
  }

  function handleAddWatched(movie) {
    setWatchedMovies((watched) => [...watched, movie]);
  }

  function handleWatchedMovieDelete(id) {
    setWatchedMovies((watched) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  }

  // when we want to interact with outside world
  // we use useEffects
  useEffect(
    function () {
      const controller = new AbortController();
      setLoading(true);
      setError("");
      async function fetchMovies() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          // if the fetch request terminated due to network error
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();

          // if movies not found due to incorrect name of movie
          if (data.Response === "False") {
            throw new Error("Movies not found");
          }
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        setLoading(false);
        return;
      }
      handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        {/* This is for solving the propblem of prop Drilling */}
        {/* Coposition passing the below two components as children props */}
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Nav>
      <main className="main">
        {/* {isLoading ? (
          <Loader />
        ) : (
          <MoviesList movies={movies} isWatchedList={false} />
        )} */}
        {isLoading && !error && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <MoviesList
            movies={movies}
            isWatchedList={false}
            handleSelectedMovie={handleSelectedMovie}
          />
        )}
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            oncloseMovie={handleCloseMovie}
            watchedMovies={watched}
            onAddWatchedMovie={handleAddWatched}
            key={selectedId}
          />
        ) : (
          <MoviesList
            movies={watched}
            isWatchedList={true}
            onWatchedMovieDelete={handleWatchedMovieDelete}
          />
        )}
      </main>
    </>
  );
}
