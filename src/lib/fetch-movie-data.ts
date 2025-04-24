import { axiosInstance } from "./axios-instance";

export const fetchMovieData = async (endPoint: string) => {
  const { data } = await axiosInstance(endPoint);
  return data;
};
