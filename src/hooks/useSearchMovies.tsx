import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
}

const useSearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.example.com/movies?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, searchMovies };
};

export default useSearchMovies;
