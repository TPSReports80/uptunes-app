import { SiApplemusic } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import { MdFavorite } from "react-icons/md";

type Props = {};

const Nav = (props: Props) => {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  const styles = {
    color: "#fff",
    background: "linear-gradient(135deg, #f7890c 0%, #f7ef51 100%)",
  };

  return (
    <nav>
      <header style={styles} className={`  w-full py-6`}>
        <div className="mx-auto container">
          <div className="flex justify-between">
            <div className="logo-container">
              <button onClick={handleClick} className="flex items-center gap-2">
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
