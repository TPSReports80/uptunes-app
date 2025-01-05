import { SiApplemusic } from "react-icons/si";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
};

const Nav = ({ isTopOfPage }: Props) => {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoriteContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navbarBG = isTopOfPage ? "" : " drop-shadow-lg";
  const styles = {
    background: isTopOfPage
      ? ""
      : "linear-gradient(135deg, #f7890c 0%, #f7ef51 100%)",
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  return (
    <nav>
      <header
        style={styles}
        className={`${navbarBG}  fixed top-0 z-30 w-full py-6`}
      >
        <div className="mx-auto container">
          <div className="flex justify-between">
            <div className="logo-container">
              <button onClick={scrollToTop} className="flex items-center gap-2">
                <SiApplemusic />
                <h5>UpTunes</h5>
              </button>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleFavorites}
            >
              <MdFavorite className="text-orange-500" />
              <p>{favorites.length}</p>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Nav;
