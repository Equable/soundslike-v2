import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from "Pages"
import { SpotifyProvider } from 'Context';

const App = () => {
  return (
    <SpotifyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SpotifyProvider>
  );
}

export default App;
