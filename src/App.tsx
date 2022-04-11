import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpotifyProvider } from 'Context';
import { Recommendations, SearchPage } from 'Pages';
import TuneUpPage from 'Pages/TuneUp/TuneUp';
import { MantineProvider } from '@mantine/core';

const App = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
            "#1DB954",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <SpotifyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/tuneUp" element={<TuneUpPage />} />
            <Route path="/results" element={<Recommendations />} />
          </Routes>
        </BrowserRouter>
      </SpotifyProvider>
    </MantineProvider>
  );
}

export default App;
