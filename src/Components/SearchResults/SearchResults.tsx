import {
  Grid,
} from "@mantine/core";
import { useSpotifyContext } from "Context/SpotifyContext/SpotifyContext";
import { FunctionComponent } from "react";
import { AlbumCard } from "Components";
import "./SearchResults.css";
interface Props {}



const SearchResults: FunctionComponent<Props> = () => {

  const { state } = useSpotifyContext();
  const { searchResults } = state;

  const generateTrackResults = () => {
    const tracks = searchResults?.items.map((track) => {
      return <AlbumCard track={track} key={`track_${track.id}`} />;
    });
    return tracks;
  };
  return (
    <>
      <div className="resultsContainer">
        <Grid gutter="xl" style={{ height: "100%" }}>
          {generateTrackResults()}
        </Grid>
      </div>
    </>
  );
};

export default SearchResults;
