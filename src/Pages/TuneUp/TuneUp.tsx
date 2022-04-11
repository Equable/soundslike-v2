import TuneUpForm from "Components/TuneUpForm/TuneUpForm";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent, useEffect } from "react";
import SpotifyService from "utils/services/SpotifyService";
import { CorePage } from "..";

interface Props {}

const TuneUpPage: FunctionComponent<Props> = () => {
  const { state, dispatch } = useSpotifyContext();
  const { selectedTrack, token } = state;
  const getTrackFeatures = async () => {
    await SpotifyService.getTrackFeatures(selectedTrack?.id!, token!).then(
      (res) => {
        console.log('useEffect', res)
        dispatch({
          type: SPOTIFY_CONTEXT_ACTIONS.SET_TRACK_FEATURES,
          payload: {
            trackFeatures: res
          },
        });
      }
    );
  };

  useEffect(() => {
    getTrackFeatures();
  }, []);
  return (
    <CorePage>
      <TuneUpForm />
    </CorePage>
  );
};

export default TuneUpPage;
