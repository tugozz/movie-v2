import { MovieImage } from "@/components/common/MovieImage";

export const FooterContainer = () => {
  return (
    <div className="flex flex-col items-start gap-3 ;">
      <h1 className="flex gap-2 text-white font-bold ">
        <MovieImage />
        Movie Z
      </h1>
      <h1 className="flex gap-2 text-white font-bold ">
        © 2024 Movie Z. All Rights Reserved.
      </h1>
    </div>
  );
};
