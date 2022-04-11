export interface ExternalUrls {
  spotify: string;
  [key: string]: string;
}

export interface SpotifyImage{
  height: number
  url: string
  width: number
}

export interface SpotifyArtist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface SpotifyAlbum {
  album_type: string
  artists: Array<SpotifyArtist>
  external_urls: ExternalUrls,
  href: string,
  id: string
  images: Array<SpotifyImage>
  name: string
  release_date: string
  type: string
  total_tracks: number
  uri: string
}

export interface SpotifyTrack {
  album: SpotifyAlbum
  artists: Array<SpotifyArtist>
  disc_number: number
  duration:number
  explicit: boolean
  external_urls: ExternalUrls
  href:string
  id: string
  preview_url: null
  name: string
  track_number: number
  type: string
  uri:string
  popularity: number
}

export interface SpotifySearchTracks {
  href: string
  items: Array<SpotifyTrack>
  limit: number
  next: string
  offset: number
  previous: string
  total:number
}

export interface TrackFeatures {
  danceability: number
  energy: number
  key: number
  loudness: number
  mode: number
  speechiness: number
  acousticness: number
  instrumentalness: number
  liveness: number
  valence: number
  tempo: number
  type: string
  id: string
  uri: string
  track_href: string
  duration_ms: number
  time_signature: number
}

export interface SpotifyRecommendationQuery {
  limit: number;
  seed_tracks: string;
  min_danceability: number;
  max_danceability: number;
  min_energy: number;
  max_energy: number;
  min_acousticness: number;
  max_acousticness: number;
  min_instrumentalness: number;
  max_instrumentalness: number;
  min_speechiness: number;
  max_speechiness: number;
  min_valence: number;
  max_valence: number;
}