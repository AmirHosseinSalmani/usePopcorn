// import { useState } from "react";

import { useEffect, useRef } from "react";

export default function Hedear({setDataInput,dataInput, numOfMovies }) {
  const countMovies = numOfMovies.length;
  return (
    <section className="flex justify-between bg-violet-700 mt-7 p-3 rounded-xl">
      <Icon />
      <SearchBox setDataInput={setDataInput} dataInput={dataInput}/>
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

function SearchBox({ dataInput , setDataInput }) {
  const refElement = useRef(null);
  useEffect(function () {
    function calback(e) {
      if (document.activeElement === refElement.current) return;
      if (e.code === "Enter") {
        refElement.current.focus();
        setDataInput("");
      }
    }
    document.addEventListener("keydown", calback);

    refElement.current.focus();
  }, [setDataInput]);

  return (
    <div>
      <input
        type="text"
        value={dataInput}
        onChange={(item) => setDataInput(String(item.target.value))}
        placeholder="Search movies"
        className="search bg-violet-500 backdrop-invert opacity-60 rounded-md  p-2  placeholder-gray-100 my-1 placeholder:font-bold  pl-4 pr-55 outline-none text-white  shadow-xl/20 "
        ref={refElement}
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
