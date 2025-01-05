import { useContext } from "react";
import { FavoriteContext } from "../context/FavoritesContext";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { Album } from "../utils/types";
import LoadingPage from "../components/LoadingPage";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import TitleDivider from "../components/TitleDivider";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import TrackList from "../components/TrackList";

type Props = {};

const AlbumDetails = (props: Props) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);

  const { id } = useParams();

  function getAlbums() {
    return axios
      .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
      .then((res) => res.data.feed.entry);
  }

  const albumQuery = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  if (albumQuery.isLoading) {
    return <LoadingPage />;
  }
  if (albumQuery.isError) {
    return <NotFoundPage />;
  }

  const filteredAlbum = albumQuery.data.find(
    (album: Album) => album["im:name"].label === id
  );

  return (
    <>
      <Nav />
      <main>
        <section>
          <div className="container mx-auto py-20">
            <TitleDivider text="Album details" />
            <div className="md:flex gap-20">
              <img
                src={filteredAlbum["im:image"][2].label}
                alt="album cover"
                className="rounded-md h-full mb-8 md:mt-3"
              />
              <div>
                <h4 className="text-orange-600 mb-2">
                  {filteredAlbum?.title.label}
                </h4>
                <h6 className="mb-2 text-lg">
                  {filteredAlbum["im:artist"].label}
                </h6>
                <p className="text-sm mb-4 text-slate-500">
                  Release Date:{" "}
                  {filteredAlbum["im:releaseDate"].attributes.label}
                </p>
                <div className="flex items-center mb-10 gap-5">
                  <div className="cat flex justify-start">
                    <span className="py-2 px-4 bg-slate-200 rounded-lg text-xs">
                      {filteredAlbum?.category.attributes.label}
                    </span>
                  </div>
                  <div
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() =>
                      isFavorite(filteredAlbum)
                        ? removeFavorite(filteredAlbum)
                        : addFavorite(filteredAlbum)
                    }
                  >
                    {isFavorite(filteredAlbum) ? (
                      <MdFavorite className="text-red-500" />
                    ) : (
                      <MdFavoriteBorder />
                    )}

                    <p className="text-sm">Add to favorites</p>
                  </div>
                </div>
                <p className="text-base text-gray-600">
                  Check out Apple Music for more information on this album
                </p>
                <Link
                  to={filteredAlbum.link.attributes.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b text-orange-500 border-orange-500 pb-1 text-base hover:text-orange-700"
                >
                  More info
                </Link>
              </div>
            </div>
            <TrackList album={filteredAlbum} />
          </div>
        </section>
      </main>
    </>
  );
};

export default AlbumDetails;
