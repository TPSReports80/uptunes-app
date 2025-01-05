export const fetchAlbumsFn = async () => {
  const res = await fetch(
    "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
  );
  const data = await res.json();

  return data.feed.entry;
};
