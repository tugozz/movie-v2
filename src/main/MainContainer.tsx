import React from "react";
import { ImageNowplaying } from "../components/carausel/ImageNowplaying";
import { MovieByList } from "./MovieByList";
import { FooterContainer } from "@/components/footerDesign.tsx/FooterContainer";
import { FooterContact } from "@/components/footerDesign.tsx/FooterContact";
import { FooterSocial } from "@/components/footerDesign.tsx/FooterSocial";

export const MainContainer = () => {
  return (
    <div>
      <ImageNowplaying />
      <MovieByList movieType="upcoming" />
      <MovieByList movieType="popular" />
      <MovieByList movieType="top_rated" />
      <div className="bg-[#4338CA] w-full h-[280px] p-10">
        <div className="flex flex-col md:flex-row justify-between gap-y-6 md:gap-x-10 px-6 py-10">
          <FooterContainer />
          <FooterContact />
          <FooterSocial />
        </div>
      </div>
    </div>
  );
};
