import React from "react";
import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { useState } from "react";

const SearchMovie = () => {
  const [searchValue, setSearchValue] = useState<string>(""); // State for search input
  const [page, setPage] = useState<number>(1); // State for pagination

  const { data, isLoading } = useFetchDataClient(
    `/search/movie?query=${searchValue}&language=en-US&page=${page}`
  );

  const movies = data?.results ?? []; // Extract movies from API response

  return (
    <div>
      <h1>Search for Movies</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} // Update search value
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovie;
