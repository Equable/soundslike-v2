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
import { SpotifyTrack } from "utils/spotifyTypes";
import "./SearchResults.css";
interface Props {}

const useStyles = createStyles(() => ({
  gridTrack: {
    backgroundColor: "#080808",
  },
}));

const SearchResults: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { state, dispatch } = useSpotifyContext();
  const { searchResults } = state;

  const onSelectTrack = (track: SpotifyTrack) => () => {
    dispatch({
      type: SPOTIFY_CONTEXT_ACTIONS.SET_SELECTED_TRACK,
      payload: {
        selectedTrack: track,
      },
    });
    navigate("/tuneUp");
  };
  const generateTrackResults = () => {
    const tracks = searchResults?.items.map((track) => {
      return (
        <Grid.Col xl={3} lg={4} md={4} sm={6} xs={12}>
          <Grid
            classNames={{ root: classes.gridTrack }}
            className="tile"
            align="stretch"
          >
            <Grid.Col span={6}>
              <AspectRatio ratio={640 / 640}>
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
                  Play on:&nbsp;
                  <Anchor href={track?.external_urls?.spotify} target="_blank">
                    Web
                  </Anchor>
                  &nbsp;|&nbsp;
                  <Anchor href={track?.uri} target="_blank">
                    App
                  </Anchor>
                </Grid.Col>
                <Grid.Col>
                  <Group>
                    <Button onClick={onSelectTrack(track)}>Select</Button>
                  </Group>
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
    <>
      <div className="resultsContainer">
        <Grid gutter="xl">{generateTrackResults()}</Grid>
      </div>
    </>
  );
};

export default SearchResults;
