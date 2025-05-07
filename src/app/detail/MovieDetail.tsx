"use client";
import { MovieByList } from "@/main/MovieByList";
import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data, isLoading, error } = useFetchDataClient(
    `/movie/${movieId}?language=en-US`
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching movie details. Please try again later.</p>;
  }

  if (!data) {
    return <p>No movie details found.</p>;
  }

  const { title, overview, poster_path, release_date, vote_average } = data;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <MovieByList movieType="popular" />
        <MovieByList movieType="upcoming" />
        <MovieByList movieType="top_rated" />
      </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500">Release Date: {release_date}</p>
          <p className="text-gray-500">Rating: {vote_average.toFixed(1)}/10</p>
          <p className="mt-4">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
