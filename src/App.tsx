import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpotifyProvider } from 'Context';
import { Recommendations, SearchPage } from 'Pages';
import TuneUpPage from 'Pages/TuneUp/TuneUp';

const App = () => {
  return (
    <SpotifyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/tuneUp" element={<TuneUpPage />} />
          <Route path="/results" element={<Recommendations />}/>
        </Routes>
      </BrowserRouter>
    </SpotifyProvider>
  );
}

export default App;
