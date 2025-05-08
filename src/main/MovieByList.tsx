"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { ArrowRight, Star } from "lucide-react";

type MovieByListProps = {
  movieType: "upcoming" | "popular" | "top_rated" | "now_playing";
  handleMovieClick: (movieId: number) => void;
};

export const MovieByList = ({
  movieType,
  handleMovieClick,
}: MovieByListProps) => {
  const { data } = useFetchDataClient(
    `/movie/${movieType}?language=en-US&page=1`
  );

  const movies = data?.results ?? [];

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-10 lg:px-20 py-20">
      <h2 className="text-2xl md:text-2xl  mb-8 capitalize flex-start flex justify-between">
        {movieType.replace("_", " ")}
        <p className="flex items-center gap-2">
          see more
          <ArrowRight />
        </p>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.slice(0, 10).map((movie: any) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie.id)}
              className="w-full h-[400px] object-cover cursor-pointer"
            />
            <div className="p-2 bg-white dark:bg-gray-600">
              <h3 className="text-md font-bold text-center mb-2 truncate text-black dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {movie.release_date}
              </p>
              <h1 className="flex gap-2 md:text-xl md:pt-4 justify-center">
                <Star className="text-amber-300" />
                {movie.vote_average.toFixed(1)}/10
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
