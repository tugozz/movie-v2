import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchInputForOtherPage = () => {
  return (
    <div className="relative w-[379px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 " />
      <Input
        type="search"
        placeholder="Search.."
        className="w-full rounded-lg pl-10 pr-3 py-2 shadow-sm"
      />
    </div>
  );
};
