import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import { motion } from "framer-motion";
import { Album } from "../utils/types";
import TitleDivider from "./TitleDivider";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type Props = {
  trending: Album[];
};

const TrendingAlbums = ({ trending }: Props) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);

  const navigate = useNavigate();
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };
  const childVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleClick = (val: string) => {
    navigate(`/album/${val}`);
  };

  return (
    <section className="pb-20">
      <div id="trending" className="container mx-auto">
        <TitleDivider text="Trending Albums" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
          className="grid grid-cols-4 gap-12 max-md:grid-cols-2"
        >
          {trending.map((album, i) => (
            <motion.div
              key={i}
              variants={childVariant}
              className="flex flex-col justify-between"
            >
              <div>
                <img
                  src={album["im:image"][2].label}
                  alt="album cover"
                  className="rounded-md mb-5 w-full cursor-pointer"
                  onClick={() => handleClick(album["im:name"].label)}
                />
                <div>
                  <h5 className="text-lg font-semibold mb-2">
                    {album["im:name"].label}
                  </h5>
                  <h6 className="mb-2 text-base">{album["im:artist"].label}</h6>
                  <p className="text-base mb-4 text-slate-500">
                    Release Date: {album["im:releaseDate"].attributes.label}
                  </p>
                  <div className="flex gap-3 items-center mb-10">
                    <div className="cat flex justify-start">
                      <span className="py-2 px-4 bg-slate-200 rounded-lg text-xs">
                        {album.category.attributes.label}
                      </span>
                    </div>
                    <div
                      className="favoriteBtn cursor-pointer"
                      onClick={() =>
                        isFavorite(album)
                          ? removeFavorite(album)
                          : addFavorite(album)
                      }
                    >
                      {isFavorite(album) ? (
                        <MdFavorite className="text-red-500" />
                      ) : (
                        <MdFavoriteBorder />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                url={`/album/${album["im:name"].label}`}
                adjustWidth={true}
                text="View details"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingAlbums;
