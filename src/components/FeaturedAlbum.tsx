import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import TitleDivider from "./TitleDivider";
import featuredAlbumImg from "../assets/wickedAlbum.jpg";
import { Album } from "../utils/types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

type Props = {
  featured: Album;
};

const FeaturedAlbum = ({ featured }: Props) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);

  const handleClick = () => {
    navigate(`/album/${featured?.["im:name"].label.replaceAll(" ", "_")}`);
  };

  return (
    <section id="featured" className=" pt-20 pb-10 max-md:pb-5">
      <div className="container mx-auto">
        <TitleDivider text="Featured Album" />
        <div className="lg:flex gap-48 items-center mb-10">
          <img
            src={featuredAlbumImg}
            alt="featured album cover"
            className="rounded-2xl max-w-[500px] w-full max-md:mb-6 cursor-pointer"
            onClick={handleClick}
          />
          <div>
            <h5 className="text-3xl font-semibold mb-2">
              {featured?.["im:name"].label}
            </h5>
            <h6 className="mb-2 text-xl">{featured?.["im:artist"].label}</h6>
            <p className="text-base mb-4 text-slate-500">
              Release Date: {featured?.["im:releaseDate"].attributes.label}
            </p>
            <div className="flex items-center mb-10 gap-5">
              <div className="cat flex justify-start">
                <span className="py-2 px-4 bg-slate-200 rounded-lg text-xs">
                  {featured?.category.attributes.label}
                </span>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                  isFavorite(featured)
                    ? removeFavorite(featured)
                    : addFavorite(featured)
                }
              >
                {isFavorite(featured) ? (
                  <MdFavorite className="text-red-500" />
                ) : (
                  <MdFavoriteBorder />
                )}

                <p className="text-sm">Add to favorites</p>
              </div>
            </div>

            <Button
              text="View details"
              url={`/album/${featured?.["im:name"].label.replaceAll(" ", "_")}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlbum;
