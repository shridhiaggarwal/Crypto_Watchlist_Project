import { BrowserRouter, Route, Routes } from "react-router-dom";
import Watchlists from './Pages/WatchListPage';
import Navbar from './Components/Header';
import ScreenerPage from "./Pages/ScreenerPage";
import CryptoListPage from "./Pages/CryptoListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Watchlists />} />
          <Route path="/watchlist/:watchlistId" element={<CryptoListPage />} />
          <Route path="/screener" element={<ScreenerPage />} />
          <Route path="/screener/:watchlistId" element={<ScreenerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
