"use client";

import { useRef } from "react";
import "./App.scss";
import HeroBanner from "./components/HeroBanner";
import FeaturedAlbum from "./components/FeaturedAlbum";
import TrendingAlbums from "./components/TrendingAlbums";
import { handleScrollToSection } from "./utils/handleScroll";
import { Album } from "./utils/types";
import TopAlbums from "./components/TopAlbums";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "./components/LoadingPage";
import NotFoundPage from "./routes/NotFoundPage";
import axios from "axios";

function App() {
  const topAlbumsSection = useRef<null | HTMLButtonElement>(null);

  function getAlbums() {
    return axios
      .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
      .then((res) => {
        let albums = res.data.feed.entry;
        return albums;
      });
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

  const featuredAlbum = albumQuery.data.find(
    (album: Album) => album?.["im:name"].label === "Wicked: The Soundtrack"
  );

  return (
    <main>
      {/* Hero Banner */}
      <HeroBanner
        section={topAlbumsSection}
        handleScrollToSection={() => handleScrollToSection(topAlbumsSection)}
      />
      {/* Featured Album */}
      <FeaturedAlbum featured={featuredAlbum} />
      {/* Trending Albums */}
      <TrendingAlbums trending={albumQuery.data.slice(6, 10)} />
      {/* Top Albums */}
      <TopAlbums albums={albumQuery.data} topAlbumsSection={topAlbumsSection} />
    </main>
  );
}

export default App;
