import { useEffect, useState } from "react";
import "./App.css";
import Hedear from "./Hedear/Hedear";
import Watching from "./Watching";

const KEY = "f84fc31d";

export default function App() {
  // const [countMovies, setCountMovies] = useState();
  const [watchedApi, setWatchedApi] = useState([]);
  const [dataInput, setDataInput] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const [handelError, setHanderError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoding(true);
        setHanderError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${dataInput}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went worng with fetching movies");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error("yare in film mojod nii 😑");
        setWatchedApi(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setHanderError(err.message);
      } finally {
        setIsLoding(false);
      }
    }
    if (dataInput.length < 3) {
      setWatchedApi([]);
      setHanderError("");
      return;
    }

    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [dataInput]);

  return (
    <div className="w-full h-full container mx-auto">
      <Hedear
        setDataInput={setDataInput}
        dataInput={dataInput}
        numOfMovies={watchedApi}
      />
      <Watching
        dataVideo={watchedApi}
        isloding={isLoding}
        handelError={handelError}
      />
    </div>
  );
}
