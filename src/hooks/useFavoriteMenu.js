import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteMenuList";

export default function useFavoriteMenu() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setFavorites(saved);
  }, []);

  const saveFavorites = (newFavs) => {
    setFavorites(newFavs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
  };

  return [favorites, saveFavorites];
}
