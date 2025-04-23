"use client";

import { MovieImage } from "../common/MovieImage";
import { SearchBarForOtherPage } from "./SearchBarForOtherPage";
import { ThemeSwitch } from "./ThemeSwitch";
import { usePathname } from "next/navigation";

export const HeaderContainer = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center md:justify-between py-[7.5px] md:py-[11.5px] px-5 clearmd:px-20">
      <MovieImage />

      {pathname === "/search" ? (
        <SearchBarForPage />
      ) : (
        <SearchBarForOtherPage />
      )}

      <ThemeSwitch />
    </div>
  );
};
