import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { ImageNowplaying } from "../carausel/ImageNowplaying";

type MovieType = {
  id: number;
  title: string;
  poster_path: string;
};

export const SearchInputForOtherPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchValue.trim()) {
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
              language: "en-US",
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchValue]);

  return (
    <div className="relative w-[379px]">
      <Search className="absolute left-2 top-5 -translate-y-1/2" />

      <Input
        type="search"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full rounded-lg pl-10 pr-2
         py-2 shadow-sm"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {isLoading ? (
        <p className="mt-2">Loading...</p>
      ) : (
        <ul className="mt-4 absolute flex z-10 flex-col bg-white w-full ">
          {movies.slice(0, 5).length > 0
            ? movies.slice(0, 5).map((movie) => (
                <li key={movie.id} className="mb-4">
                  <h3 className="font-bold ">{movie.title}</h3>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg z-50  w-[67px] shadow-md"
                  />
                </li>
              ))
            : searchValue && <p className="mt-2">No movies found.</p>}
        </ul>
      )}
    </div>
  );
};
