"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
type GenreType = {
  id: number;
  name: string;
};

export const Genre = () => {
  const { data, isLoading } = useFetchDataClient(
    "/genre/movie/list?language=en"
  );

  const genres: GenreType[] = data?.genres ?? [];

  const [showGenre, setShowGenre] = useState(false);

  const handleClick = () => {
    setShowGenre(!showGenre);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-8 md:flex gap-2 py-2 px-3 border rounded-[8px] md:h-[36px] md:w-[97px] border-[#e4e4e7] items-center"
        onClick={handleClick}
      >
        <ChevronDown />
        <span className="hidden md:flex">Genre</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-[335px] md:w-[557px] border-[#e4e4e7] bg-white mx-5 p-5">
        <DropdownMenuLabel className="text-2xl">Genre</DropdownMenuLabel>
        <DropdownMenuLabel className="text-[rgba(9,9,11,1)] font-normal text-base">
          Select a genre to filter movies
        </DropdownMenuLabel>
        <hr className="border-t border-gray-300 my-4" />

        {isLoading ? (
          <p>Loading genres...</p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {genres.map(({ name, id }) => (
              <DropdownMenuItem key={id} className="flex gap-[16px]">
                <Badge
                  fontVariant="outline"
                  className="bg-white text-[rgba(0,0,0,1)] text-[12px] font-semibold rounded-full border-[#e4e4e7] items-center flex-wrap flex"
                >
                  {name}
                  <ChevronRight />
                </Badge>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
