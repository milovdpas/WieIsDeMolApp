export default class Song {
  songId: string;
  name: string;
  artist: string;
  imageUrl: string;

  constructor(songId: string, title: string, artist: string, imageUrl: string) {
    this.songId = songId;
    this.name = title;
    this.artist = artist;
    this.imageUrl = imageUrl;
  }
}
