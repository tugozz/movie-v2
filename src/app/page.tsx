import { axiosInstance } from "@/lib/axios-instance";
const getPopularMovies = async () => {
  const { data } = await axiosInstance("/movie/popular?language=en-US&page=1");
  return data;
};

const Home = async () => {
  return <div></div>;
};
export default Home;
