"use client";
import { cn } from "@/lib/utils";
import { MovieImage } from "../common/MovieImage";
import { SearchBarForOtherPage } from "./SearchBarForOtherPage";
import { SearchInputForOtherPage } from "./SearchInputForOtherPage";
import { ThemeSwitch } from "./ThemeSwitch";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export const HeaderContainer = () => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/");
  };
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "flex items-center md:justify-between py-[7.5px] md:py-[11.5px] px-5 clearmd:px-20 cursor-pointer"
      )}
      onClick={goToHomePage}
    >
      <h1 className="flex gap-2 text-[#4338CA] font-bold italic">
        <MovieImage />
        Movie Z
      </h1>

      {pathname === "/search" ? (
        <SearchInputForOtherPage />
      ) : (
        <SearchBarForOtherPage />
      )}

      <ThemeSwitch />
    </div>
  );
};
