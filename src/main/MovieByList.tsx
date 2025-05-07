"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { ArrowRight, Star } from "lucide-react";

type Movie = {
  movieType: "upcoming" | "popular" | "top_rated";
};

export const MovieByList = ({ movieType }: Movie) => {
  const { data } = useFetchDataClient(
    `/movie/${movieType}?language=en-US&page=1`
  );

  const movies = data?.results ?? [];

  if (movies.length === 0) {
    return null;
  }

  const handleMovieClick = (movieId: number, movieTitle: string) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-20">
      <h2 className="flex text-2xl md:text-2xl  mb-8 capitalize justify-between items-start Inter  ">
        {movieType.replace("_", " ")}
        <h2 className="flex text-[14px] justify-center items-center gap-2">
          See more
          <ArrowRight />
        </h2>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
        {movies.slice(0, 10).map((movie: any) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie.id, movie.title)}
              className="w-full h-[400px] object-cover cursor-pointer"
            />
            <div className="p-2 bg-white dark:bg-[#f4f4f5]">
              <h1 className="flex gap-2 md:text-xl md:pt-4">
                <Star className="text-amber-300" />
                {movie.vote_average.toFixed(1)}/10
              </h1>
              <h3 className="text-md font-bold text-center mb-2 truncate text-black dark:[#09090B]">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
