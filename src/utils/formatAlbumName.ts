export function formatAlbumName(album: string | undefined) {
  if (album) return album.replaceAll(" ", "_");
}
