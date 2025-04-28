"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";

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
  const { data } = useFetchDataClient(
    "/movie/now_playing?language=en-US&page=1"
  );
  const movies: Nowplaying[] = data?.results ?? [];

  return (
    <div>
      <Carousel>
        <CarouselContent>
          {movies.map((movie: Nowplaying) => (
            <CarouselItem key={movie.id} className="md:relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full md:h-[700px] md:w-full bg-cover shrink-0 "
              />
              <div className="md:h-100 md:text-white md:absolute flex flex-col justify-between md:top-[160px] md:left-35 px-5 py-1 gap-4">
                <h1 className="text: md:text-xl">Now Playing:</h1>
                <div className="flex md:block items-center justify-between">
                  <h1 className="flex-3xl md:text-6xl">{movie.title}</h1>
                  <h1 className="flex gap-2 md:text-xl md:pt-4">
                    <Star className="text-amber-300" />
                    {movie.vote_average.toFixed(1)}/10
                  </h1>
                </div>
                <h6 className="md:w-[500px]">
                  {movie.overview}
                  <Button
                    variant="outline"
                    className="md:36 h-10 bg-black text-white
                    w-[145px] md:bg-white rounded-md md:text-black"
                  >
                    <Play />
                    watch trailer
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
