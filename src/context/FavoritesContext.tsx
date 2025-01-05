import React, { createContext, useState, useEffect } from "react";
import { Album } from "../utils/types";

interface FavoriteContextType {
  favorites: Album[];
  addFavorite: (album: Album) => void;
  removeFavorite: (album: Album) => void;
  isFavorite: (album: Album) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

type FavoriteProviderProps = {
  children: React.ReactNode;
};

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const [favorites, setFavorites] = useState<Album[]>(() => {
    const storedValue = localStorage.getItem("albums");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(() => {
    const storedAlbums = localStorage.getItem("albums");
    if (storedAlbums) {
      setFavorites(JSON.parse(storedAlbums));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (album: Album) => {
    setFavorites([...favorites, album]);
  };

  const removeFavorite = (album: Album) => {
    setFavorites(favorites.filter((fav) => fav !== album));
  };

  const isFavorite = (album: Album) => {
    return favorites.some((favorite) => favorite.id.label === album.id.label);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
