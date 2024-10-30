// add relations between artists and albums as properties:
// artist.albums = [...] and albums.artists = [...]

export default function addRelations(relations) {
  let { artists, albums } = globalThis;
  // remove old relations;
  for (let artist of artists) { delete artist.albums; }
  for (let album of albums) { delete album.artists; }
  // add relations
  for (let { artistId, albumId } of relations) {
    let artist = artists.find(x => x.id === artistId);
    let album = albums.find(x => x.id === albumId);
    artist.albums = [...(artist.albums || []), album];
    album.artists = [...(album.artists || []), artist];
  }
}