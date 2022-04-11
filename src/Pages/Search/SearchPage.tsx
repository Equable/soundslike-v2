import {
  FunctionComponent
} from "react";
import { CorePage } from "Pages";
import { SpotifySearchForm } from "Components";
import SearchResults from "Components/SearchResults/SearchResults";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  return (
    <CorePage>
      <SpotifySearchForm />
      <SearchResults />
    </CorePage>
  );
};

export default SearchPage;
