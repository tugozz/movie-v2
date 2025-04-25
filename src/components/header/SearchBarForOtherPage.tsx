import { Genre } from "./Genre";
import { AnimatePresence, motion } from "framer-motion";
import { SearchInputForOtherPage } from "./SearchInputForOtherPage";
import { searchBarAnimationVariants } from "@/constants/search-bar-input-animation";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

export const SearchBarForOtherPage = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchButtonClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex items-center  flex-1 md:flex-0 gap-x-3">
      <div className="hidden lg:flex gap-x-3">
        <Genre />

        <SearchInputForOtherPage />
      </div>

      <Button
        className="flex md:hidden ml-auto"
        onClick={handleSearchButtonClick}
      >
        <Search />
      </Button>

      {showSearch && (
        <AnimatePresence>
          <motion.div
            variants={searchBarAnimationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 flex md:hidden px-5 py-[7.5px] bg-red-300"
          >
            <Genre />

            <SearchInputForOtherPage />

            <Button onClick={handleSearchButtonClick}>
              <X />
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
