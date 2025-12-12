import { useState, useEffect } from "react";

export function useStorage(key) {
  const [addToFavorites, setAddToFavorites] = useState(function () {
    const locStor = localStorage.getItem(key);
    return locStor ? JSON.parse(locStor) : [];
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(addToFavorites));
    },
    [addToFavorites, key]
  );
  return [addToFavorites, setAddToFavorites];
}
