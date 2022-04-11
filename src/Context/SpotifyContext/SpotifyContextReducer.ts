import React from "react";
import { SpotifySearchTracks, SpotifyTrack, TrackFeatures } from "utils/spotifyTypes";

export enum SPOTIFY_CONTEXT_ACTIONS {
  RESET = "RESET",
  SET_TOKEN = "SET_TOKEN",
  SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS",
  SET_SELECTED_TRACK = "SET_SELECTED_TRACK",
  SET_TRACK_FEATURES = "SET_TRACK_FEATURES",
  SET_RECOMMENDATIONS="SET_RECOMMENDATIONS"
}

export const DEFAULT_SPOTIFY_CONTEXT_STATE = {
  token: null,
  searchResults: null,
  selectedTrack: null,
  trackFeatures: null,
  recommendations: null
};

export interface SpotifyContextState {
  token: string | null
  searchResults: SpotifySearchTracks | null
  selectedTrack: SpotifyTrack | null
  trackFeatures: TrackFeatures | null
  recommendations: SpotifyTrack[] | null

}

export interface SpotifyReducerAction {
  type: SPOTIFY_CONTEXT_ACTIONS;
  payload: Partial<SpotifyContextState> | null;
}

export const spotifyContextReducer: React.Reducer<SpotifyContextState, SpotifyReducerAction> = (state = DEFAULT_SPOTIFY_CONTEXT_STATE, action ): SpotifyContextState  =>{
  switch(action.type){
    case SPOTIFY_CONTEXT_ACTIONS.RESET:
      return({
        ...DEFAULT_SPOTIFY_CONTEXT_STATE,
        token: state.token
      })
    case SPOTIFY_CONTEXT_ACTIONS.SET_TOKEN:
      return({
        ...state,
        token: action.payload?.token! as string
      })
    case SPOTIFY_CONTEXT_ACTIONS.SET_SEARCH_RESULTS:
      return({
        ...state,
        searchResults: action.payload?.searchResults!
      })
    case SPOTIFY_CONTEXT_ACTIONS.SET_SELECTED_TRACK:
      return({
        ...state,
        selectedTrack: action.payload?.selectedTrack!
      })
    case SPOTIFY_CONTEXT_ACTIONS.SET_TRACK_FEATURES:
      return({
        ...state,
        trackFeatures: action.payload?.trackFeatures!
      })
    case SPOTIFY_CONTEXT_ACTIONS.SET_RECOMMENDATIONS:
      return({
        ...state,
        recommendations: action.payload?.recommendations!
      })
    default:
      return({
        ...state
      })
  }
}