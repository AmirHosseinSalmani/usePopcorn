import { useState } from "react";

export default function Watched({ children, watched }) {
  const [close, setclose] = useState(false);
  function handelClose() {
    setclose((item) => !item);
  }

  return (
    <div className="w-[50%] h-180">
      <div className="h-full mt-5 bg-gray-700/70 lg:mx-10 rounded-md overflow-y-auto scrollbar-hide relative">
        <button
          onClick={handelClose}
          className="text-orange-50 text-2xl w-6.5 h-6.5 flex items-center cursor-pointer bg-gray-900 rounded-2xl absolute right-2 top-2 "
        >
          {close ? (
            <span className="text-[22px] ml-1.5 mb-0.5">+</span>
          ) : (
            <span className="text-[32px] ml-1.5 mb-1.5">-</span>
          )}
        </button>
        <div className={` ${close ? "hidden" : ""}`}>
          <ScoreMovies watched={watched} />
          {children}
        </div>
      </div>
    </div>
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function ScoreMovies({ watched }) {
  const avgImdbRating = average(watched.map((mov) => mov.imdbRating));
  const avgUserRating = average(watched.map((mov) => mov.userRating));
  const avgRuntime = average(watched.map((mov) => mov.runtime));

  return (
    <div className="p-6 text-white bg-black/25 rounded-md shadow-xl">
      <h1 className="font-bold mb-2">MOVIES YOU WATCHED</h1>
      <div className="flex justify-evenly">
        <div>
          <span>#️⃣</span>
          <span>{watched.length} Movies </span>
        </div>
        <div>
          <span>⭐</span> <span>{avgImdbRating.toFixed(2)}</span>
        </div>
        <div>
          <span>🌟</span> <span>{avgUserRating.toFixed(2)} </span>
        </div>
        <div>
          <span>⌛</span> <span>{avgRuntime.toFixed(2)} min</span>
        </div>
      </div>
    </div>
  );
}
