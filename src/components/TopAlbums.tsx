import { useState } from "react";
import CenterWordDivider from "./CenterWordDivider";
import { Album } from "../utils/types";
import styles from "./TopAlbums.module.scss";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

type Props = {
  albums: Album[];
  topAlbumsSection: React.MutableRefObject<HTMLElement | null>;
};

const TopAlbums = ({ topAlbumsSection, albums }: Props) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase());
  };

  const filteredAlbums = albums?.filter(
    (album) =>
      album["im:name"].label.toLowerCase().includes(query) ||
      album["im:artist"].label.toLowerCase().includes(query) ||
      album.title.label.toLowerCase().includes(query) ||
      album.category.attributes.label.toLowerCase().includes(query)
  );

  const handleClick = (album: string) => {
    navigate(`/album/${album}`);
  };

  return (
    <section id={styles.topAlbums} ref={topAlbumsSection} className=" md:py-10">
      <div className="container mx-auto  py-24">
        <CenterWordDivider />
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, artist, and genre..."
            value={query}
            onChange={handleSearch}
            className={`p-5 w-full mb-20 rounded-full  pl-14 text-lg ${styles.searchInput}`}
          />
          <CiSearch className={styles.searchIcon} />
        </div>

        <div className="grid grid-cols-6 gap-5 max-lg:grid-cols-4 max-md:grid-cols-2 ">
          {filteredAlbums?.map((album, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => handleClick(album["im:name"].label)}
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
