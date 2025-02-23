import { useState } from "react";
import CenterWordDivider from "./CenterWordDivider";
import { Album } from "../utils/types";
import styles from "./TopAlbums.module.scss";
import { CiSearch } from "react-icons/ci";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  albums: Album[];
  topAlbumsSection: React.MutableRefObject<HTMLElement | null>;
};

const TopAlbums = ({ topAlbumsSection, albums }: Props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const genreArray = [
    ...new Set(albums.map((album) => album.category.attributes.label)),
  ];
  const [selectedGenre, setSelectedGenre] = useState<String[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filteredAlbums = albums?.filter(
    (album) =>
      (album["im:name"].label.toLowerCase().includes(query) ||
        album["im:artist"].label.toLowerCase().includes(query) ||
        album.title.label.toLowerCase().includes(query) ||
        album.category.attributes.label.toLowerCase().includes(query)) &&
      (selectedGenre.length >= 1
        ? selectedGenre.includes(album.category.attributes.label)
        : genreArray.includes(album.category.attributes.label))
  );

  const handleClick = (album: string) => {
    navigate(`/album/${album}`);
  };

  const genreHandler = (genre: string) => {
    if (selectedGenre.includes(genre)) {
      setSelectedGenre((prevState) => prevState.filter((el) => el !== genre));
    } else {
      setSelectedGenre((prevState) => [...prevState, genre]);
    }
  };

  const filterHandler = () => {
    setFilterOpen((prevState) => !prevState);
  };

  return (
    <section id={styles.topAlbums} ref={topAlbumsSection} className=" md:py-10">
      <div className="container mx-auto py-24">
        <CenterWordDivider />
        <div className="flex justify-end mb-10">
          <button onClick={filterHandler} className="flex items-center gap-2">
            <MdFilterList className="text-white w-8 h-8" />
            <p className="text-white uppercase text-base">Filter</p>
          </button>
        </div>
        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in ${
            filterOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="flex gap-10 mb-10 flex-wrap">
            {genreArray.map((genre) => (
              <button
                onClick={() => genreHandler(genre)}
                className={`text-white text-sm  border  py-2 px-4 ${
                  selectedGenre.includes(genre) && "bg-white text-blue-900"
                }`}
                key={genre}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, artist, and genre..."
              value={query}
              onChange={handleSearch}
              className={`p-2 w-full mb-20 pl-14 text-base ${styles.searchInput}`}
            />
            <CiSearch className={styles.searchIcon} />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-5 max-lg:grid-cols-4 max-md:grid-cols-2 ">
          {filteredAlbums?.map((album, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() =>
                handleClick(album["im:name"].label.replaceAll(" ", "_"))
              }
            >
              <img
                src={album["im:image"][2].label}
                alt="album cover"
                className="rounded-md mb-2 w-full hover:grayscale"
              />
              <p className="text-sm text-white mb-1 leading-tight">
                {album["im:name"].label}
              </p>
              <p className="text-xs text-white">{album["im:artist"].label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAlbums;
