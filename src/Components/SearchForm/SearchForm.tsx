import { Button, Container, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { SPOTIFY_CONTEXT_ACTIONS } from "Context/SpotifyContext/SpotifyContextReducer";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyService, {
  SpotifySearchOptions,
} from "utils/services/SpotifyService";

interface Props {}
const SpotifySearchForm: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useSpotifyContext();
  const { token } = state;
  const searchForm = useForm({
    initialValues: {
      q: "",
      type: "track",
    } as Partial<SpotifySearchOptions>,
  });

    const onStartOver = () => {
      dispatch({ type: SPOTIFY_CONTEXT_ACTIONS.RESET, payload: null });
      navigate("/");
    };

  // Will use for advanced search functionality later
  // const generateTypeButtons = () => {
  //   const RadioButtons = Object.values(SpotifySearchTypes).map((type) => (
  //     <Radio
  //       key={`search_radio_button_type_${type}`}
  //       label={startCase(type)}
  //       value={type}
  //     />
  //   ));
  //   return RadioButtons;
  // };
  return (
    <Container size="xl">
      <form
        onSubmit={searchForm.onSubmit(({ q, type }) => {
          SpotifyService.search(
            { q, type } as SpotifySearchOptions,
            token as string
          ).then(result => {
            dispatch({payload: {searchResults: result}, type: SPOTIFY_CONTEXT_ACTIONS.SET_SEARCH_RESULTS})
          })
        })}
      >
        <Title>Search</Title>
        <TextInput
          required
          size="md"
          placeholder="What song do you want more of..."
          icon={<IconSearch />}
          {...searchForm.getInputProps("q")}
        />
        {/* Will use for advanced functionality later */}
        {/* <RadioGroup label="Search Type" {...searchForm.getInputProps("type")}>
            {generateTypeButtons()}
          </RadioGroup> */}
        <Group position="right" mt="md">
          <Button type="button" onClick={onStartOver}>Clear</Button>
          <Button type="submit">Search</Button>
        </Group>
      </form>
    </Container>
  );
};

export default SpotifySearchForm;
