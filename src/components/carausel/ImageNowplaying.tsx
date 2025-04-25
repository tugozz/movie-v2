"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="p-4">
      <Carousel>
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="relative w-full md:basis-1/2 lg:basis-1/1"
            >
              <div className="relative w-full aspect-[2.4/1]">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-md object-contain w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
