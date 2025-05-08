"use client";
import React from "react";
import { ImageNowplaying } from "../components/carausel/ImageNowplaying";
import { MovieByList } from "./MovieByList";
import { FooterContainer } from "@/components/footerDesign.tsx/FooterContainer";
import { FooterContact } from "@/components/footerDesign.tsx/FooterContact";
import { FooterSocial } from "@/components/footerDesign.tsx/FooterSocial";
import { useRouter } from "next/navigation";

export const MainContainer = () => {
  const { push } = useRouter();
  const handleMovieClick = (movieId: number) => {
    push(`/detail/${movieId}`);
  };

  return (
    <div>
      <ImageNowplaying />

      <MovieByList movieType="upcoming" handleMovieClick={handleMovieClick} />
      <MovieByList movieType="popular" handleMovieClick={handleMovieClick} />
      <MovieByList movieType="top_rated" handleMovieClick={handleMovieClick} />
      <div className="bg-[#4338CA] w-full h-[340px] p-10">
        <div className="flex flex-col md:flex-row justify-between gap-y-6 md:gap-x-10 px-6 py-10">
          <FooterContainer />
          <FooterContact />
          <FooterSocial />
        </div>
      </div>
    </div>
  );
};
