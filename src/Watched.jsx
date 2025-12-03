import { Children, useState } from "react";

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
  console.log(watched);
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

// import { useEffect, useRef, useState } from "react";
// import StarRating from "./StarRating";
// import { useKey } from "./useKey";
// import { useLocalStorageState } from "./useLocalStorageState";
// import { useMovies } from "./useMovies";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const KEY = "f84fc31d";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [selectedId, setSelectedId] = useState(null);
//   const { movies, isLoading, error } = useMovies(query);

//   const [watched, setWatched] = useLocalStorageState([], "watched");

//   function handleSelectMovie(id) {
//     setSelectedId((selectedId) => (id === selectedId ? null : id));
//   }

//   function handleCloseMovie() {
//     setSelectedId(null);
//   }

//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//   }

//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   return (
//     <>
//       <NavBar>
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </NavBar>

//       <Main>
//         <Box>
//           {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>

//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onCloseMovie={handleCloseMovie}
//               onAddWatched={handleAddWatched}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMoviesList
//                 watched={watched}
//                 onDeleteWatched={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }

// function Loader() {
//   return <p className="loader">Loading...</p>;
// }

// function ErrorMessage({ message }) {
// }

// function NavBar({ children }) {
// }

// function Logo() {
// }

// function Search({ query, setQuery }) {
// }

// function NumResults({ movies }) {
// }

// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// function Box({ children }) {
// }

// /*
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>

//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
// */

// function MovieList({ movies, onSelectMovie }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie) => (
//         <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
//       ))}
//     </ul>
//   );
// }

// function Movie({ movie, onSelectMovie }) {
//   return (
//     <li onClick={() => onSelectMovie(movie.imdbID)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }

// function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const countRef = useRef(0);

//   useEffect(
//     function () {
//       if (userRating) countRef.current++;
//     },
//     [userRating]
//   );

//   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId
//   )?.userRating;

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   // if (imdbRating > 8) return <p>Greatest ever!</p>;
//   // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

//   // const [isTop, setIsTop] = useState(imdbRating > 8);
//   // console.log(isTop);
//   // useEffect(
//   //   function () {
//   //     setIsTop(imdbRating > 8);
//   //   },
//   //   [imdbRating]
//   // );

//   const isTop = imdbRating > 8;
//   console.log(isTop);

//   // const [avgRating, setAvgRating] = useState(0);

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(" ").at(0)),
//       userRating,
//       countRatingDecisions: countRef.current,
//     };

//     onAddWatched(newWatchedMovie);
//     onCloseMovie();

//     // setAvgRating(Number(imdbRating));
//     // setAvgRating((avgRating) => (avgRating + userRating) / 2);
//   }

//   useKey("Escape", onCloseMovie);

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsLoading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = "usePopcorn";
//         // console.log(`Clean up effect for movie ${title}`);
//       };
//     },
//     [title]
//   );

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
// <header>
//   <button className="btn-back" onClick={onCloseMovie}>
//     &larr;
//   </button>
//   <img src={poster} alt={`Poster of ${movie} movie`} />
//   <div className="details-overview">
//     <h2>{title}</h2>
//     <p>
//       {released} &bull; {runtime}
//     </p>
//     <p>{genre}</p>
//     <p>
//       <span>⭐️</span>
//       {imdbRating} IMDb rating
//     </p>
//   </div>
// </header>

//           {/* <p>{avgRating}</p> */}

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You rated with movie {watchedUserRating} <span>⭐️</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));

//   return (
//     <div className="summary">
// <h2>Movies you watched</h2>
// <div>
//   <p>
//     <span>#️⃣</span>
//     <span>{watched.length} movies</span>
//   </p>
//   <p>
//     <span>⭐️</span>
//     <span>{avgImdbRating.toFixed(2)}</span>
//   </p>
//   <p>
//     <span>🌟</span>
//     <span>{avgUserRating.toFixed(2)}</span>
//   </p>
//   <p>
//     <span>⏳</span>
//     <span>{avgRuntime} min</span>
//   </p>
//       </div>
//     </div>
//   );
// }

// function WatchedMoviesList({ watched, onDeleteWatched }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <WatchedMovie
//           movie={movie}
//           key={movie.imdbID}
//           onDeleteWatched={onDeleteWatched}
//         />
//       ))}
//     </ul>
//   );
// }

// function WatchedMovie({ movie, onDeleteWatched }) {
//   return (
//     <li>
//       <img src={movie.poster} alt={`${movie.title} poster`} />
//       <h3>{movie.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>

//         <button
//           className="btn-delete"
//           onClick={() => onDeleteWatched(movie.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>
//   );
// }
