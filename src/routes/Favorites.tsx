import TitleDivider from "../components/TitleDivider";
import Nav from "../components/Nav";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import styles from "./Favorites.module.scss";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoriteContext);
  const navigate = useNavigate();

  const handleClick = (val: string) => {
    navigate(`/album/${val}`);
  };

  const favoritesBtnStyles = `max-md:mt-6 text-white border border-amber-400 font-semibold hover:text-amber-700 pl-4 pr-6 pt-4 pb-4 rounded-full button flex items-center gap-2 ${styles.favoritesBtn}`;

  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="container mx-auto py-20">
            <TitleDivider text="Favorite Albums" />
            {favorites.length < 1 && (
              <div className="text-base flex gap-1 items-center justify-center">
                <p>No favorites added. Click on the favorites icon</p>
                <MdFavoriteBorder />
                <p> to save your album to your favorites list.</p>
              </div>
            )}
            {favorites.map((album) => (
              <div
                key={album.id.label}
                className="md:flex gap-5 items-center text-base mb-10 border-b-2 pb-10"
              >
                <img
                  src={album["im:image"][2].label}
                  alt="album cover"
                  className="rounded-md w-auto max-md:mb-5 cursor-pointer"
                  onClick={() => handleClick(album["im:name"].label)}
                />
                <div className="max-md:mb-4">
                  <p className="text-lg">{album["im:name"].label}</p>
                  <p className="mb-2">{album["im:artist"].label}</p>
                  <p className="text-sm  text-slate-500">
                    {album["im:releaseDate"].attributes.label}
                  </p>
                </div>
                <div className="md:flex gap-10 items-center md:ml-auto">
                  <Link
                    to={`/album/${album?.["im:name"].label}`}
                    className="border-b text-orange-500 border-b-orange-400 hover:text-orange-600 "
                  >
                    View album
                  </Link>
                  <button
                    onClick={() => removeFavorite(album)}
                    className={favoritesBtnStyles}
                  >
                    <MdFavorite className="text-red-500" />
                    Remove from favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Favorites;
