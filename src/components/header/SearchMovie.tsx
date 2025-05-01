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
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchValue) {
        setMovies([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "107e41d2d63214211d351668fdc8c52c",
              query: searchValue,
              page,
              language: "en-US",
            },
          }
        );
        console.log("API Response:", response.data);
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchValue, page]);

  return (
    <div className="absolute">
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
      ) : movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w57${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      ) : (
        searchValue && <p>No movies found.</p>
      )}
    </div>
  );
};

export default SearchMovies;
