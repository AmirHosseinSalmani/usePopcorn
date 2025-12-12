import { useEffect, useState } from "react";

const KEY = "f84fc31d";

export function useFetch(selectedID) {
  const [movies, setMovies] = useState({});
  const [islodinger, setIsLodinger] = useState(false);
  const [handelErrorer, setHandleErrorer] = useState();
  console.log(selectedID);
  useEffect(
    function () {
      const controller = new AbortController();
      async function getMoviedetails() {
        try {
          setIsLodinger(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`,
            { signal: controller.signal }
          );

          const data = await res.json();

          if (!res.ok)
            throw new Error("Something went worng with fetching movies");

          setMovies(data);
        } catch (error) {
          if (error.name !== "AbortError") setHandleErrorer(error.message);
        } finally {
          setIsLodinger(false);
        }
      }
      getMoviedetails();
      return function () {
        controller.abort();
      };
    },
    [selectedID]
  );
  return { movies, islodinger, handelErrorer };
}
