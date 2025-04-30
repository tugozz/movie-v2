"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";

type Movie = {
  movieType: "upcoming" | "popular" | "top_rated";
};

export const MovieByList = ({ movieType }: Movie) => {
  const { data } = useFetchDataClient(
    `/movie/${movieType}?language=en-US&page=1`
  );

  const movies = data?.results ?? [];

  if (movies.length === 0) {
    return;
  }

  return (
    <div className="px-4 md:px-10 lg:px-20 py-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 capitalize text-center">
        {movieType.replace("_", " ")}
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
              className="w-full h-[400px] object-cover"
            />
            <div className="p-2 bg-white dark:bg-gray-800">
              <h3 className="text-md font-bold text-center mb-2 truncate text-black dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {movie.release_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
