// import { useState } from "react";

export default function Hedear({ setDataInput, numOfMovies }) {
  const countMovies = numOfMovies.length;
  return (
    <section className="flex justify-between bg-violet-700 mt-7 p-3 rounded-xl">
      <Icon />
      <SearchBox setDataInput={setDataInput} />
      <Resultes countMovies={countMovies} />
    </section>
  );
}

function Icon() {
  return (
    <div className="flex text-2xl font-bold text-white mt-1">
      <span>🍿</span>
      <h2>usePopcorn</h2>
    </div>
  );
}

function SearchBox({ setDataInput }) {
  return (
    <div>
      <input
        type="text"
        onChange={(item) => setDataInput(String(item.target.value))}
        placeholder="Search movies"
        className="bg-violet-500 backdrop-invert opacity-60 rounded-md  p-2  placeholder-gray-100 my-1 placeholder:font-bold  pl-4 pr-55 outline-none text-white  shadow-xl/20 "
      />
    </div>
  );
}

function Resultes({ countMovies }) {
  return (
    <div>
      <h1 className="text-[18px] text-white  mt-1 mr-2">
        Found <strong className="text-[21px]">{countMovies}</strong> resultes
      </h1>
    </div>
  );
}
