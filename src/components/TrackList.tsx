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
        `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c4779b96e5eaa35221c79ccec89b6857&artist=${album?.[
          "im:artist"
        ].label.replaceAll(/%/g, " ")}&album=${album?.[
          "im:name"
        ].label.replaceAll(/%/g, " ")}&format=json`
      )
      .then((res) => res.data.album);
  }
  const albumQuery = useQuery({
    queryKey: ["albumDetails"],
    queryFn: getAlbumInfo,
  });

  if (albumQuery.isLoading) {
    return <p className="text-base text-gray-500">Loading...</p>;
  }
  if (albumQuery.isError) {
    return (
      <p>
        Sorry, something went wrong while retrieving your track list. Try
        selecting a different album.
      </p>
    );
  }

  if (!albumQuery.data.tracks) {
    return (
      <div className="mt-20">
        <TitleDivider text="Tracks List" />
        <p className="text-base text-center">Tracks list unavailable.</p>
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
