import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { SearchBarForOtherPage } from "./SearchBarForOtherPage";
import { useState } from "react";

type MovieType = {
  id: number;
  key: string;
  title: string; // Assuming the API returns a title
  poster_path: string; // Assuming the API returns a poster image path
};

export const SearchBarForPage = () => {
  const [searchValue, setSearchValue] = useState<string>(""); // State for search input
  const [page, setPage] = useState<number>(1); // State for pagination

  const { data, isLoading } = useFetchDataClient(
    `/search/movie?query=${searchValue}&language=en-US&page=${page}`
  );

  const movies: MovieType[] = data?.results ?? []; // Extract movies from API response

  console.log("SearchBarForPage rendered with searchValue:", searchValue);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} // Update search value
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.length > 0 ? (
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
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};
