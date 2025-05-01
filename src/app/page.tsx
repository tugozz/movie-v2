import { MainContainer } from "@/main/MainContainer";
import { ImageNowplaying } from "@/components/carausel/ImageNowplaying";
import SearchMovies from "@/components/header/SearchMovie";

export const Home = async () => {
  return (
    <div>
      <div className="absolute top-10 left-1/2 transform ">
        {/* <SearchMovies /> */}
      </div>
      <MainContainer />
    </div>
  );
};
export default Home;
