import { Anchor, AspectRatio, Button, createStyles, Grid, Group, Image, Text } from "@mantine/core";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { SpotifyTrack } from "utils/spotifyTypes";
interface Props {
  track: SpotifyTrack,
  hideButton?: boolean;
}

const useStyles = createStyles(() => ({
  gridTrack: {
    backgroundColor: "#080808",
    minHeight: 260,
  },
}));
const AlbumCard: FunctionComponent<Props> = ({track, hideButton}) => {
  const {dispatch} = useSpotifyContext()
  const navigate = useNavigate();
  const { classes } = useStyles();

    const onSelectTrack = (track: SpotifyTrack) => () => {
      dispatch({
        type: SPOTIFY_CONTEXT_ACTIONS.SET_SELECTED_TRACK,
        payload: {
          selectedTrack: track,
        },
      });
      navigate("/tuneUp");
    };
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
          <Grid style={{ height: "100%" }}>
            <Grid.Col span={12}>
              <Grid style={{ height: "100%", alignContent: "flex-start" }}>
                <Grid.Col span={12}>
                  <Text weight={"bold"}>{track.artists[0].name}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm">{track.name}</Text>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={12}>
              <Grid style={{ height: "100%", alignContent: "flex-end" }}>
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
                { !hideButton &&
                  <Grid.Col style={{ padding: 0, paddingLeft: 8 }}>
                    <Button onClick={onSelectTrack(track)}>Select</Button>
                  </Grid.Col>
                }
              </Grid>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Grid.Col>
  );
};

export default AlbumCard
