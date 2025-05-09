"use client";
import { useParams } from "next/navigation";
import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import React, { useState } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data, isLoading } = useFetchDataClient(
    `/movie/${movieId}?language=en-US`
  );

  const { data: similarData, isLoading: isSimilarLoading } = useFetchDataClient(
    `/movie/${movieId}/similar?language=en-US&page=1`
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

  if (isLoading || isActorsLoading || isSimilarLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !actorsData || !similarData) {
    return <p>No movie details found.</p>;
  }

  const { title, overview, poster_path, release_date, vote_average } = data;
  const cast = actorsData.cast.slice(0, 5);
  const writers = actorsData.crew.filter((crew: any) => crew.job === "Writer");
  const stars = actorsData.cast.slice(0, 5);
  const similarMovies = similarData.results.slice(0, 5);

  return (
    <div className="px-5 md:px-45">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500">Release Date: {release_date}</p>
          <div className="flex md:pr-3 content-between items-center self-stretch">
            <p className="text-gray-500">
              Rating: {vote_average.toFixed(1)}/10
            </p>
          </div>
          <div className="flex gap-6 md:h-[428px] self-start relative  w-full">
            {/* <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
              className="h-[148px] w-[100px] md:h-[428px] md:w-[290px] hidden md:block rounded-lg shadow-md "
            /> */}
            <div className=" md:h-full md:w-[22%] hidden md:block rounded-lg shadow-md bg-yellow-200">
              <Image
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                // fill
                alt={title}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                width={500}
                height={300}
              />
            </div>
            <div className=" w-full md:w-[78%] rounded-lg shadow-md">
              <Image
                src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                alt={title}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                width={500}
                height={300}
              />
            </div>

            {/* <img
              className=" w-full bg-cover shrink-0 rounded-lg shadow-md"
              src={`http://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              alt={title}
            /> */}

            <button
              onClick={() => fetchTrailer(Number(movieId))}
              className=" items-center absolute left-3 top-40 md:left-80 md:top-90 md:w-36 h-10 rounded-md bg-black text-white md:bg-white md:text-black flex border-none"
            >
              <Play />
              Watch Trailer
            </button>
          </div>

          <div className="flex gap-4 ">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
              className=" h-[148px] w-[100px]  md:hidden rounded-lg shadow-md "
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

      <div className=" gap-13 mt-5">
        <h2 className="text-2xl font-bold mb-4">Directors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cast.map((actor: any) => (
            <div key={actor.id}>
              <p className="mt-2 font-bold">{actor.name}</p>
              <p className="text-sm text-gray-500">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">Writers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {writers.map((actor: any) => (
            <div key={actor.id}>
              <p className="mt-2 font-bold">{writers.name}</p>
              <p className="text-sm text-gray-500">{writers.character}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">Stars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stars.map((actor: any) => (
            <div key={actor.id}>
              <p className="mt-2 font-bold">{stars.name}</p>
              <p className="text-sm text-gray-500">{stars.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-8">
        <h2 className="flex flex-start capitalize justify-between text-2xl font-bold mb-4">
          More like this
          <p className="flex items-center gap-2">
            see more
            <ArrowRight />
          </p>
        </h2>

        <div className="flex gap-8">
          {similarMovies.slice(0, 5).map((movie: any, index: number) => (
            <div
              key={movie.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden ${
                index > 1 ? "hidden md:block" : ""
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                onClick={() => handleMovieClick(movie.id)}
                className="w-full  md:h-[400px] object-cover cursor-pointer gap-8"
              />
              <div className="p-2 bg-white dark:bg-gray-600">
                <h1 className="flex gap-2 md:text-xl md:pt-4 justify-center">
                  <Star className="text-amber-300" />
                  {movie.vote_average.toFixed(1)}/10
                </h1>
                <h3 className="text-md font-bold text-center mb-2 truncate text-black dark:text-white">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
