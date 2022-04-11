import {
  Anchor,
  AspectRatio,
  Button,
  createStyles,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { CorePage } from "..";
import './Recommendations.css'
interface Props {}

const useStyles = createStyles(() => ({
  gridTrack: {
    backgroundColor:  "#080808",
  }
}));

const Recommendations: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { state, dispatch } = useSpotifyContext();
  const { recommendations } = state;

  const onStartOver =() =>{
    dispatch({type: SPOTIFY_CONTEXT_ACTIONS.RESET, payload: null})
    navigate('/')
  }
  const generateTrackResults = () => {
    const tracks = recommendations?.map((track) => {
      return (
        <Grid.Col span={3}>
          <Grid
            classNames={{ root: classes.gridTrack }}
            className="tile"
            align="stretch"
          >
            <Grid.Col span={6}>
              <AspectRatio ratio={640/640}>
                <Image src={track?.album?.images[0]?.url} />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <Grid>
                <Grid.Col span={12}>
                  <Text size="xl" weight={"bold"}>
                    {track.artists[0].name}
                  </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text>{track.name}</Text>
                </Grid.Col>
                <Grid.Col>
                  <Anchor href={track?.external_urls?.spotify} target="_blank">
                    Open In Spotify
                  </Anchor>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      );
    });
    return tracks;
  };
  return (
    <CorePage>
      <div className="recommendationsContainer">
        <Grid gutter="xl">{generateTrackResults()}</Grid>
      </div>
      <Group position="right" mt="md">
        <Button onClick={onStartOver}>Start Over</Button>
      </Group>
    </CorePage>
  );
};

export default Recommendations;
