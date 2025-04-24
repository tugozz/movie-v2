"use client";

import { useFetchDataClient } from "@/hooks/useFetchDataInClient";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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

        <DropdownMenuSeparator />
        <div className="border w-fit"></div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
