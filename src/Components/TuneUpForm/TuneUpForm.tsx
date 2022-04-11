import {
  Anchor,
  AspectRatio,
  Button,
  Container,
  Grid,
  Group,
  Image,
  RangeSlider,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyService from "utils/services/SpotifyService";
import { SpotifyRecommendationQuery } from "utils/spotifyTypes";
import "./TuneUpForm.css";
const defaultMarks = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

const intialFormValues = {
  acousticness: [0, 100],
  danceability: [0, 100],
  energy: [0, 100],
  instrumentalness: [0, 100],
  speechiness: [0, 100],
  valence: [0, 100],
};

const convertSliders = (
  values: typeof intialFormValues
): Partial<SpotifyRecommendationQuery> => {
  const convertedValues = {} as Partial<SpotifyRecommendationQuery>;
  for (const key in values) {
    const newRange = convertRange(values[key as keyof typeof intialFormValues]);
    const minKey = `min_${key}`;
    const maxKey = `max_${key}`;

    // @ts-ignore
    convertedValues[minKey as keyof SpotifyRecommendationQuery] =
      newRange[0] as number;
    // @ts-ignore
    convertedValues[maxKey as keyof SpotifyRecommendationQuery] =
      newRange[1] as number;
  }

  return convertedValues;
};

const convertRange = (range: number[]) => {
  const min = Math.round(range[0]) / 100;
  const max = Math.round(range[1]) / 100;
  return [min, max];
};
interface Props {}
const TuneUpForm: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useSpotifyContext();
  const { token, trackFeatures, selectedTrack } = state;
  const setRanges = (value: number) => {
    const adjustedValue = value * 100;
    const min = adjustedValue - 10 < 0 ? 0 : adjustedValue - 10;
    const max = adjustedValue + 10 > 100 ? 100 : adjustedValue + 10;
    return [min, max];
  };

  const recommendationForm = useForm({
    initialValues: intialFormValues as typeof intialFormValues,
  });

  useEffect(() => {
    if (trackFeatures) {
      recommendationForm.setValues({
        acousticness: setRanges(trackFeatures?.acousticness),
        danceability: setRanges(trackFeatures?.danceability),
        energy: setRanges(trackFeatures?.energy),
        instrumentalness: setRanges(trackFeatures?.instrumentalness),
        speechiness: setRanges(trackFeatures?.speechiness),
        valence: setRanges(trackFeatures?.valence),
      });
    }
  }, [trackFeatures]);
  return (
    <Container className="formContainer">
      <Grid justify="center">
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={6}>
              <AspectRatio ratio={640 / 640}>
                <Image src={selectedTrack?.album?.images[0]?.url} />
              </AspectRatio>
            </Grid.Col>
            <Grid.Col span={6}>
              <Grid>
                <Grid.Col span={12}>
                  <Title order={3}>{selectedTrack?.album?.name}</Title>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text>{selectedTrack?.name}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  Play on:&nbsp;
                  <Anchor href={selectedTrack?.external_urls?.spotify} target="_blank">
                    Web
                  </Anchor>
                  &nbsp;|&nbsp;
                  <Anchor href={selectedTrack?.uri} target="_blank">
                    App
                  </Anchor>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      {trackFeatures && (
        <form
          onSubmit={recommendationForm.onSubmit(
            (values: typeof intialFormValues) => {
              const updatedValues = {
                ...convertSliders(values)!,
                limit: 20,
                seed_tracks: selectedTrack?.id!,
              } as SpotifyRecommendationQuery;

              SpotifyService.getRecommendations(updatedValues, token!).then(
                (res) => {
                  dispatch({
                    type: SPOTIFY_CONTEXT_ACTIONS.SET_RECOMMENDATIONS,
                    payload: { recommendations: res },
                  });
                }
              );
              navigate("/results");
            }
          )}
        >
          <Grid justify={"center"}>
            <Grid.Col span={10}>
              <Stack spacing={60}>
                <div>
                  <Tooltip label="How acoustic the track is." closeDelay={200}>
                    <Title order={2}>Acousticness</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("acousticness")}
                  />
                </div>
                <div>
                  <Tooltip
                    label="How likely its gonna get you movin"
                    closeDelay={200}
                  >
                    <Title order={2}>Danceability</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("danceability")}
                  />
                </div>
                <div>
                  <Tooltip
                    label="The intesnsity or how 'Active' the song feels. Death Metal is high energy"
                    closeDelay={200}
                  >
                    <Title order={2}>Energy</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("energy")}
                  />
                </div>
                <div>
                  <Tooltip label="The more the less vocals" closeDelay={200}>
                    <Title order={2}>Instrumentalness</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("instrumentalness")}
                  />
                </div>
                <div>
                  <Tooltip
                    label="The higher the more likely its more spoken word-esqu"
                    closeDelay={200}
                  >
                    <Title order={2}>Speechiness</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("speechiness")}
                  />
                </div>
                <div>
                  <Tooltip
                    label="How postive/upbeat the song feels"
                    closeDelay={200}
                  >
                    <Title order={2}>Valence</Title>
                  </Tooltip>
                  <RangeSlider
                    style={{ paddingTop: 30 }}
                    min={0}
                    max={100}
                    step={1}
                    precision={0}
                    marks={defaultMarks}
                    {...recommendationForm.getInputProps("valence")}
                  />
                </div>
                <Group position="right" mt="md">
                  <Button type="submit">Search</Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default TuneUpForm;
