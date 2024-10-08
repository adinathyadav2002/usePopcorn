import React, { useEffect, useRef, useState } from "react";

export default function Search({ query, setQuery }) {
  const searchRef = useRef(null);
  useEffect(function () {
    const sea = document.querySelector(".search");
    // here there is no need to remove focus
    // because this will render the coponent only on mount of component
    sea.focus();
  }, []);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === searchRef.current) return;
        if (e.code === "Enter") {
          searchRef.current.focus();
          console.log(e);
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
    },
    [query, setQuery]
  );

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchRef}
      />
    </>
  );
}
