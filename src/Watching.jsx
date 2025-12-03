import { useEffect, useState } from "react";
import Watched from "./Watched";
import StarRaiting from "./StarRaiting";
export default function Watching({ dataVideo, isloding, handelError }) {
  const [close, setclose] = useState(true);
  const [selectedID, setSlectedID] = useState(null);
  const [addToFavorites, setAddToFavorites] = useState([], "watched");

  function handelID(ID) {
    setSlectedID((item) => (item === ID ? null : ID));
  }
  function handlerBack() {
    setSlectedID(null);
  }
  // setCountMovies(dataVideo.length);
  function handelClose() {
    setclose((item) => !item);
  }
  function handelerAdd(movie) {
    setAddToFavorites((after) => [...after, movie]);
    setSlectedID(null);
  }
  function handelDeleteWached(id) {
    setAddToFavorites((watched) => watched.filter((mov) => mov.imdbID !== id));
  }
  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          handlerBack();
          console.log("hello");
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [selectedID]
  );
  return (
    <div className="flex mb-5 h-180 ">
      <div
        className={`w-[44%] h-full overflow-y-auto scrollbar-hide mt-5 ${
          isloding ? "bg-gray-400/70 animate-pulse" : "bg-gray-700/70"
        }  lg:mx-10 rounded-md relative mb-2`}
      >
        <button
          className="text-orange-50 text-2xl w-6.5 h-6.5 flex items-center cursor-pointer bg-gray-900 rounded-2xl sticky left-160 top-3 "
          onClick={handelClose}
        >
          {close ? (
            <span className="text-[32px] ml-1.5 mb-1.5">-</span>
          ) : (
            <span className="text-[22px] ml-1.5 mb-0.5">+</span>
          )}
        </button>
        {/* viow items */}
        {!handelError ? (
          isloding ? (
            <div className="w-full h-160 flex justify-center items-center text-white text-2xl font-bold ">
              Loding . . . .
            </div>
          ) : (
            <ViewItems
              dataVideo={dataVideo}
              handelID={handelID}
              close={close}
            />
          )
        ) : (
          <div className="w-full h-160 flex justify-center items-center text-white text-2xl font-bold">
            {handelError + "🚫"}
          </div>
        )}
      </div>
      {selectedID ? (
        <MoviesDitails
          selectedID={selectedID}
          BackID={handlerBack}
          handelAddr={handelerAdd}
          Watched={addToFavorites}
        />
      ) : (
        <Watched watched={addToFavorites}>
          <ContainerFavoriteList
            movie={addToFavorites}
            handelID={handelID}
            handelDeleteWached={handelDeleteWached}
          />
        </Watched>
      )}
    </div>
  );
}

function ContainerFavoriteList({ movie, handelID, handelDeleteWached }) {
  return (
    <ul>
      {movie.map((items) => (
        <AddFavoriteItem
          movie={items}
          key={items.imdbID}
          handelID={handelID}
          handelDeleteWached={handelDeleteWached}
        />
      ))}
    </ul>
  );
}

function AddFavoriteItem({ movie, handelID, handelDeleteWached }) {
  return (
    <li>
      <div className="w-full h-full flex gap-8 p-4 text-white border-gray-300/15 cursor-pointer border-b-[0.3px] relative">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="w-17 h-21 bg-cover bg-center"
          onClick={() => handelID(movie.imdbID)}
        />
        <div>
          <h3>{movie.title}</h3>
          <div className="flex gap-9 mt-7">
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
  <span>{movie.runtime} min</span>
            </p>

            <button
              className="absolute right-1.5 top-2 text-[25px] cursor-pointer px-1.5"
              onClick={() => handelDeleteWached(movie.imdbID)}
            >
              <i class="ri-close-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
function ViewItems({ dataVideo, handelID, close }) {
  return (
    <div>
      {close &&
        dataVideo?.map((items) => (
          <ItemVideo dataItem={items} key={items.imdbID} handelID={handelID} />
        ))}
    </div>
  );
}
function ItemVideo({ dataItem, handelID }) {
  return (
    <div
      className="w-full h-full flex gap-8 p-4 text-white cursor-pointer border-gray-300/15 border-b-[0.3px]"
      onClick={() => handelID(dataItem.imdbID)}
    >
      <img
        src={dataItem.Poster}
        alt={dataItem.Title}
        className="w-17 h-21 bg-cover bg-center"
      />
      <div className="my-auto">
        <h1 className="mb-2 font-bold">{dataItem.Title}</h1>
        <div>
          📆
          <span className="ml-1 text-gray-200">{dataItem.Year}</span>
        </div>
      </div>
    </div>
  );
}
const KEY = "f84fc31d";
function MoviesDitails({ selectedID, BackID, handelAddr, Watched }) {
  const [movies, setMovies] = useState({});
  const [islodinger, setIsLodinger] = useState(false);
  const [handelErrorer, setHandleErrorer] = useState();

  const controller = new AbortController();
  useEffect(
    function () {
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
  return (
    <div className="w-[45%] h-full mt-5 text-white  bg-gray-700/70 lg:mx-10 rounded-md overflow-y-auto scrollbar-hide relative ">
      {handelErrorer ? (
        <div className="w-full h-160 flex justify-center items-center text-white text-2xl font-bold ">
          {handelErrorer} : (check your internet) 🚫
        </div>
      ) : islodinger ? (
        <div className="w-full h-160 flex justify-center items-center text-white text-2xl font-bold ">
          Loding . . . .
        </div>
      ) : (
        <SelectedMovie
          movies={movies}
          BackID={BackID}
          handelAdds={handelAddr}
          selectedID={selectedID}
          Watched={Watched}
        />
      )}
    </div>
  );
}

function SelectedMovie({ movies, BackID, handelAdds, selectedID, Watched }) {
  // const [onHandelFavorite, setHandelFavorite] = useState(true);
  const [usersRating, setUsersRating] = useState(0);
  const isWatched = Watched.map((mov) => mov.imdbID).includes(selectedID);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Year: year,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: gener,
  } = movies;
  function favoriteMovieFun() {
    const favoriteMovierObj = {
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      imdbID: selectedID,
      runtime: Number(runtime.split(" ").at(0)),
      userRating: usersRating,
    };
    handelAdds(favoriteMovierObj);
  }

  useEffect(
    function () {
      if (title) document.title = `Movie | ${title}`;
    },
    [title]
  );
  return (
    <div>
      <header className="mb-15">
        <button
          className="bg-gray-900/55 w-9.5 h-9.5 cursor-pointer rounded-3xl mb-5 absolute right-14.5 top-3"
          onClick={BackID}
        >
          <i className="ri-corner-up-left-line text-lg"></i>
        </button>
        {isWatched ? (
          <button className="bg-gray-900/55 w-9.5 h-9.5 cursor-pointer rounded-3xl mb-5 absolute right-3 top-3">
            <i className="ri-heart-fill text-rose-500 text-[16.5px]"></i>
          </button>
        ) : (
          <button
            className="bg-gray-900/55 w-9.5 h-9.5 cursor-pointer rounded-3xl mb-5 absolute right-3 top-3"
            onClick={favoriteMovieFun}
          >
            <i class="ri-heart-add-line text-[16px]"></i>
          </button>
        )}
        <div className="flex gap-10 bg-gray-800/66 shadow-md/20 ">
          <img className="w-50 h-68" src={poster} alt={`poster of ${title}`} />
          <div className="mt-8 flex flex-col gap-5">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p></p>
            <p>{gener}</p>
            <p className="font-bold">
              <span>⭐</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </div>
      </header>
      <section className="flex flex-col gap-8 items-center p-5 px-15">
        <div className="bg-gray-800/50 w-88 p-6 rounded-xl shadow-md/22">
          <StarRaiting size={29} maxRating={10} onSetRating={setUsersRating} />
        </div>
        <p className="mt-8">
          <em>{plot}</em>
        </p>
        <p>Starring : {actors}</p>
        <p>Directed by : {director}</p>
      </section>
    </div>
  );
}
