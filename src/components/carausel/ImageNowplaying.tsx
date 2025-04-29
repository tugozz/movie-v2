"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import CarouselSkeleton from "./CarouselSkeleton";

type Nowplaying = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const ImageNowplaying = () => {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [next, setNext] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const { data, isLoading } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );

  const movies: Nowplaying[] = data?.results ?? [];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      setNext(false);
      api.scrollNext();
      setNext(true);
    }, 3000);

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  if (isLoading || movies.length === 0) {
    return (
      <div>
        <CarouselSkeleton />
      </div>
    );
  }

  return (
    <div>
      <Carousel setApi={setApi}>
        {" "}
        <CarouselContent>
          {movies.map((movie: Nowplaying) => (
            <CarouselItem key={movie.id} className="md:relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full md:h-[700px] md:w-full bg-cover shrink-0"
              />
              <div className="md:h-100 md:text-white md:absolute flex flex-col justify-between md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <h1 className="md:text-xl">Now Playing:</h1>
                <div className="flex md:block items-center justify-between">
                  <h1 className="text-3xl md:text-6xl">{movie.title}</h1>
                  <h1 className="flex gap-2 md:text-xl md:pt-4">
                    <Star className="text-amber-300" />
                    {movie.vote_average.toFixed(1)}/10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">
                  {movie.overview}
                  <Button
                    variant="outline"
                    className="mt-4 h-10 bg-black text-white w-[145px] md:bg-white rounded-md md:text-black"
                  >
                    <Play />
                    Watch Trailer
                  </Button>
                </h6>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};
