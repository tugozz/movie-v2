import React from "react";
import { ImageNowplaying } from "../components/carausel/ImageNowplaying";
import { MovieByList } from "./MovieByList";

export const MainContainer = () => {
  return (
    <div>
      <ImageNowplaying />
      <MovieByList movieType="upcoming" />
      <MovieByList movieType="popular" />
      <MovieByList movieType="top_rated" />
    </div>
  );
};
