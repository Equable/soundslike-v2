import React from "react";

export enum SPOTIFY_CONTEXT_ACTIONS {
  RESET = "RESET",
  FIX = "FIX",
}

export const DEFAULT_SPOTIFY_CONTEXT_STATE = {
  spotifyToken: null,
};

export interface SpotifyContextState {
  spotifyToken: string | null
}

export interface SpotifyReducerAction {
  type: SPOTIFY_CONTEXT_ACTIONS;
  payload: SPOTIFY_CONTEXT_ACTIONS;
}

export const spotifyContextReducer: React.Reducer<SpotifyContextState, SpotifyReducerAction> = (state = DEFAULT_SPOTIFY_CONTEXT_STATE, action ): SpotifyContextState  =>{
  switch(action.type){
    case SPOTIFY_CONTEXT_ACTIONS.RESET:
      return({
        ...state
      })
    default:
      return({
        ...state
      })
  }
}