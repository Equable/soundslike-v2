import {createContext, FunctionComponent, useReducer} from 'react'
import { DEFAULT_SPOTIFY_CONTEXT_STATE, spotifyContextReducer, SpotifyContextState, SpotifyReducerAction } from './SpotifyContextReducer'

interface SpotifyContext {
  state: Partial<SpotifyContextState>,
  dispatch: React.Dispatch<SpotifyReducerAction> | null
}
export interface SpotifyProviderProps{
  children: any
}

const SpotifyContext = createContext<SpotifyContext>({state: DEFAULT_SPOTIFY_CONTEXT_STATE, dispatch: null})

const SpotifyProvider: FunctionComponent<SpotifyProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(spotifyContextReducer, {...DEFAULT_SPOTIFY_CONTEXT_STATE}) 
  return(
    <SpotifyContext.Provider value={{state, dispatch}}>
        {children}
    </SpotifyContext.Provider>
  )
}

export default SpotifyProvider;