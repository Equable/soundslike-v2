import {
  Button,
  createStyles,
  Grid,
  Group
} from "@mantine/core";
import { AlbumCard } from "Components";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { CorePage } from "..";
import './Recommendations.css';
interface Props {}

const useStyles = createStyles(() => ({
  gridTrack: {
    backgroundColor:  "#080808",
  }
}));

const Recommendations: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useSpotifyContext();
  const { recommendations } = state;

  const onStartOver =() =>{
    dispatch({type: SPOTIFY_CONTEXT_ACTIONS.RESET, payload: null})
    navigate('/')
  }
  const generateTrackResults = () => {
    const tracks = recommendations?.map((track) => {
      return (
        <AlbumCard track={track} hideButton />
      );
    });
    return tracks;
  };
  return (
    <CorePage>
      <div className="recommendationsContainer">
        <Grid gutter="xl" style={{height:"100%"}}>{generateTrackResults()}</Grid>
      </div>
      <Group position="right" mt="md" style={{padding:'10px', paddingRight:"50px"}}>
        <Button onClick={onStartOver}>Start Over</Button>
      </Group>
    </CorePage>
  );
};

export default Recommendations;
