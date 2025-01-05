import { useQuery } from "@tanstack/react-query";
import { Album } from "../utils/types";
import axios from "axios";
import TitleDivider from "./TitleDivider";
import { Link } from "react-router-dom";

type Props = {
  album: Album;
};

const TrackList = ({ album }: Props) => {
  function getAlbumInfo() {
    return axios
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${
          import.meta.env.VITE_LAST_FM_API_KEY
        }&artist=${album?.["im:artist"].label.replaceAll(
          /%/g,
          " "
        )}&album=${album?.["im:name"].label.replaceAll(/%/g, " ")}&format=json`
      )
      .then((res) => res.data.album);
  }
  const albumQuery = useQuery({
    queryKey: ["albumDetails"],
    queryFn: getAlbumInfo,
  });

  if (albumQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (!albumQuery.data.tracks) {
    return (
      <div className="mt-20">
        <TitleDivider text="Tracks List" />
        <p className="text-base text-center">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <TitleDivider text="Tracks List" />
      <ul>
        {albumQuery.data.tracks.track.map((track: any, index: number) => (
          <li key={index} className="border-b text-base py-2">{`${index + 1}. ${
            track.name
          }`}</li>
        ))}
      </ul>
      <h5 className="text-base mt-5 text-gray-600">
        Visit{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="border-b text-orange-500 border-orange-500 pb-1 hover:text-orange-700"
          to={albumQuery.data.url}
        >
          last.fm
        </Link>{" "}
        to listen to these tracks.
      </h5>
    </div>
  );
};

export default TrackList;