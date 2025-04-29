import React from "react";
import { ImageNowplaying } from "../components/carausel/ImageNowplaying";
import { MovieByList } from "./MovieByList";
import { FooterContainer } from "@/components/footerDesign.tsx/FooterContainer";

export const MainContainer = () => {
  return (
    <div>
      <ImageNowplaying />
      <MovieByList movieType="upcoming" />
      <MovieByList movieType="popular" />
      <MovieByList movieType="top_rated" />
      <div className="bg-[#4338CA] w-full h-[280] p-10">
        <div>
          <FooterContainer />
        </div>
      </div>
    </div>
  );
};
