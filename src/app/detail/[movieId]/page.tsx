"use client";
import { useParams } from "next/navigation";
import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import { MovieByList } from "@/main/MovieByList";
import React, { useState } from "react";
import { Play } from "lucide-react";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data, isLoading } = useFetchDataClient(
    `/movie/${movieId}?language=en-US`
  );

  const { data: actorsData, isLoading: isActorsLoading } = useFetchDataClient(
    `/movie/${movieId}/credits?language=en-US`
  );

  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const handleMovieClick = (movieId: number) => {
    window.location.href = `/detail/${movieId}`;
  };

  const fetchTrailer = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`
      );
      const data = await response.json();

      const trailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        alert("Trailer not available.");
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
      alert("Failed to fetch trailer. Please try again.");
    }
  };

  if (isLoading || isActorsLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !actorsData) {
    return <p>No movie details found.</p>;
  }

  const { title, overview, poster_path, release_date, vote_average } = data;
  const cast = actorsData.cast.slice(0, 5);
  const writers = actorsData.crew.filter((crew: any) => crew.job === "Writer");
  const stars = actorsData.cast.slice(0, 5);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500">Release Date: {release_date}</p>
          <div className=" flex gap-6 md:h-[428px] self-start ">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
              className=" w-[290px] hidden md:block rounded-lg shadow-md "
            />

            <img
              className=" w-[760px] md:w-full bg-cover shrink-0 rounded-lg shadow-md"
              src={`http://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt={title}
            />

            <button
              onClick={() => fetchTrailer(Number(movieId))}
              className=" absolute left-[400px] top-[500px] w-[145px] md:w-36 h-10 rounded-md bg-black text-white md:bg-white md:text-black flex"
            >
              <Play />
              Watch Trailer
            </button>
          </div>
          <p className="text-gray-500">Rating: {vote_average.toFixed(1)}/10</p>
          <div className="flex gap-4">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
              className=" w-10 md:hidden rounded-lg shadow-md"
            />
            <p className="mt-4">{overview}</p>
          </div>
        </div>
      </div>

      {trailerUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-[80%] h-[60%]">
            <iframe
              src={trailerUrl}
              title="Trailer"
              className="w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setTrailerUrl(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cast.map((actor: any) => (
            <div key={actor.id} className="text-center">
              <p className="mt-2 font-bold">{actor.name}</p>
              <p className="text-sm text-gray-500">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">More like this</h2>
        {/* <MovieByList movieType="popular" handleMovieClick={handleMovieClick} /> */}
      </div>
    </div>
  );
};

export default MovieDetailPage;
