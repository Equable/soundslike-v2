import {createContext, FunctionComponent, useContext, useEffect, useReducer} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SpotifyService from 'utils/services/SpotifyService'
import { DEFAULT_SPOTIFY_CONTEXT_STATE, spotifyContextReducer, SpotifyContextState, SpotifyReducerAction, SPOTIFY_CONTEXT_ACTIONS } from './SpotifyContextReducer'
interface SpotifyContext {
  state: Partial<SpotifyContextState>,
  dispatch: React.Dispatch<SpotifyReducerAction>
}
export interface SpotifyProviderProps{
  children: any
}

const SpotifyContext = createContext<SpotifyContext>({state: DEFAULT_SPOTIFY_CONTEXT_STATE, dispatch: () =>{}})

export const useSpotifyContext = () => useContext(SpotifyContext)

const SpotifyProvider: FunctionComponent<SpotifyProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(spotifyContextReducer, {...DEFAULT_SPOTIFY_CONTEXT_STATE}) 
  const getSpotifyToken = async () => {
    await SpotifyService.init().then((token) =>
      dispatch({
        type: SPOTIFY_CONTEXT_ACTIONS.SET_TOKEN,
        payload: { token: token },
      })

    );
  };

  useEffect(() =>{
    getSpotifyToken()
  }, [])
  

  return(
    <SpotifyContext.Provider value={{state, dispatch}}>
        {children}
    </SpotifyContext.Provider>
  )
}

export default SpotifyProvider;