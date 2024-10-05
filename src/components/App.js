import { useEffect, useState } from "react";
import Nav from "./Nav.js";
import MoviesList from "./MoviesList.js";
import Search from "./Search.js";
import NumResult from "./NumResult.js";
import Loader from "./Loader.js";
import ErrorMessage from "./ErrorMessage.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "863bbc3d";
  // when we want to interact with outside world
  // we use useEffects
  useEffect(function () {
    setLoading(true);
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=ironman`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Nav>
        {/* This is for solving the propblem of prop Drilling */}
        {/* Coposition passing the below two components as children props */}
        <Search />
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
          <MoviesList movies={movies} isWatchedList={false} />
        )}
        <MoviesList movies={watched} isWatchedList={true} />
      </main>
    </>
  );
}
