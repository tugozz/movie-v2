"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
};

const SearchMovies = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchValue.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "107e41d2d63214211d351668fdc8c52c",
              query: searchValue,
              language: "en-US",
            },
          }
        );
        setMovies(response.data.results);
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchValue]);

  return (
    <div>
      <h1>Search for Movies</h1>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.length > 0
            ? movies.map((movie) => (
                <li key={movie.id}>
                  <h3>{movie.title}</h3>
                </li>
              ))
            : searchValue && <p>No movies found.</p>}
        </ul>
      )}
    </div>
  );
};

export default SearchMovies;
