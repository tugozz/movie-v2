"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MovieListSkeleton } from "@/components/carausel/CarouselSkeleton";

type Nowplaying = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};

export const ImageNowplaying = () => {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const { data, isLoading } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );

  const nowPlaying: Nowplaying[] = data?.results ?? [];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  if (isLoading || nowPlaying.length === 0) {
    return <MovieListSkeleton />;
  }

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

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {nowPlaying.map((movie: Nowplaying) => (
            <CarouselItem
              key={movie.id}
              className="md:relative transition:transform 0.5s ease-in-out"
            >
              <img
                className="w-full md:h-[700px] md:w-full bg-cover shrink-0"
                src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="md:h-100 md:text-white md:absolute flex flex-col justify-between md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <h1 className="text: md:text-xl">Now Playing:</h1>
                <div className="flex md:block items-center justify-between">
                  <h1 className="text-3xl md:text-6xl">{movie.title}</h1>
                  <h1 className="flex gap-2 md:text-xl md:pt-4">
                    <Star className="text-amber-300" />
                    {movie.vote_average.toFixed(1)}/10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">{movie.overview}</h6>
                <Button
                  variant="outline"
                  onClick={() => fetchTrailer(movie.id)}
                  className="w-[145px] md:w-36 h-10 rounded-md bg-black text-white md:bg-white md:text-black"
                >
                  <Play />
                  Watch Trailer
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {trailerUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-[50%] h-[50%]">
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
    </div>
  );
};
