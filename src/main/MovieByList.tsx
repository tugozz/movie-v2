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
    return <div>Loading...</div>;
  }

  return (
    <div
      className="display: flex;
padding: 0px 80px;
flex-direction: column;
align-items: flex-start;
gap: 32px;"
    >
      {movieType}

      {movies.map((movie: any) => (
        <div key={movie.id} className="flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-32 h-48 object-cover"
          />
          <h3 className="text-lg font-semibold text-center">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};
