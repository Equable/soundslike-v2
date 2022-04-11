import {Buffer} from 'buffer'
import { SpotifyRecommendationQuery, SpotifySearchTracks, SpotifyTrack, TrackFeatures } from 'utils/spotifyTypes'
import APIService from './apiService'

const base64credentials = Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`).toString('base64')
export enum SpotifySearchTypes{
  ALBUM="album",
  ARTIST="artist",
  TRACK="track"
}

export interface SpotifySearchOptions {
  q:string,
  type: SpotifySearchTypes,
  limit?: number
  offset?: number
}
class SpotifyService{
  constructor(){
  }
  static async init(){
    return await APIService.get("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64credentials}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    }).then(({access_token}) => access_token)
    .catch(err => console.error(err))
  }

  static async search(searchOptions: SpotifySearchOptions,token: string){

    const url = new URL("https://api.spotify.com/v1/search");
    Object.keys(searchOptions).forEach((key) => url.searchParams.append(key, String(searchOptions[key as keyof SpotifySearchOptions])))
    return await APIService.get(url.toString(),undefined,token).then(res => res.tracks as SpotifySearchTracks)
  }

  static async getTrackFeatures(id: string, token: string){
    return await APIService.get(`https://api.spotify.com/v1/audio-features/${id}`, undefined,token)
      .then(res => {console.log(res) 
        return res as TrackFeatures})
  }

  static async getRecommendations(recommendationQuery: SpotifyRecommendationQuery, token: string){
    const url = new URL("https://api.spotify.com/v1/recommendations");
    Object.keys(recommendationQuery).forEach((key)=> url.searchParams.append(key, String(recommendationQuery[key as keyof SpotifyRecommendationQuery])))
    return await APIService.get(url.toString(), undefined, token).then(res => res.tracks as SpotifyTrack[])
  }
}

export default SpotifyService