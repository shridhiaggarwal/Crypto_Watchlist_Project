import React, { useContext, useState } from "react";
import { useFetchCryptoListData } from "../../Hooks/use-fetch-cryptolist-data/use-fetch-cryptolist-data.hook";
import Box from "@material-ui/core/Box";
import CryptoTable from "../../Containers/CryptoTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import cryptoCoinsJson from "../../Jsons/cryptoCoins.json";
import { ICoinProps } from "../../Containers/CryptoTable";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchWatchlistsData } from "../../Hooks/use-fetch-watchlist-data/use-fetch-watchlists-data.hook";
import { IWatchlistProps } from "../WatchListPage";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { SnackbarContext } from "../../Contexts/SnackbarContext";
import SnackbarComponent from "../../Components/Snackbar";

const StyledPageBox = styled(Box)<{
  showButton?: boolean;
}>`
  margin: ${(props) => (props.showButton ? "16px 16px" : "32px 16px 0px 16px")};
`;

const StyledPageContent = styled(Box)`
  margin: 24px 32px;
`;

const StyledTypography = styled(Typography)<{
  margin?: string;
}>`
  margin: ${(props) => props.margin};
`;

const StyledButton = styled(Button)<{
  backgroundColor?: string;
  color?: string;
}>`
  text-transform: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

const ScreenerPage = () => {
  const { watchlistId } = useParams();
  const navigate = useNavigate();
  const cryptoCoins: Array<ICoinProps> = cryptoCoinsJson.coins;
  const watchlists = useFetchWatchlistsData();
  const [selectedWatchlist, setSelectedWatchlist] = useState<IWatchlistProps>();
  const { showSnackbar } = useContext<any>(SnackbarContext);
  const [watchlistCoinsSet, setWatchlistCoinsSet] = useState<Set<string>>();

  // add coin to watchlist
  const handleAddCryptoCoin = (addCoinData: ICoinProps) => {
    // update only selected watchlist and it coins array
    if (selectedWatchlist) {
      const updatedCoins = [...selectedWatchlist.coins, addCoinData];
      const updatedWatchlist = {
        ...selectedWatchlist,
        coins: updatedCoins,
      };
      setSelectedWatchlist(updatedWatchlist);
      let coinsSet: Set<string> = new Set(
        updatedCoins.map((coin: ICoinProps) => coin.symbol)
      );
      setWatchlistCoinsSet(coinsSet);

      // update complete watchlists array in storage
      const newWatchlists = watchlists.map((watchlist: IWatchlistProps) => {
        if (watchlist.id === watchlistId) {
          return updatedWatchlist;
        }
        return watchlist;
      });
      localStorage.setItem("watchlists", JSON.stringify(newWatchlists));
      showSnackbar(
        `${addCoinData.name} Coin is successfully added in the ${selectedWatchlist.name}`
      );
    }
  };

  // go back to home page
  const handleGoBackClick = () => {
    navigate(`/watchlist/${watchlistId}`);
  };

  // generate rows data to pass in CryptTable to show coins data
  const generateRowData = (cryptoCoins: any) => {
    let tableRows = cryptoCoins.map((coin: any, index: number) => {
      return {
        rank: coin.rank,
        symbol: coin.symbol,
        image: coin.image,
        name: coin.name,
        price: coin.price,
        change: coin.change,
        volume24h: coin.volume24h,
        mktCap: coin.mktCap,
        last7Days: coin.last7days,
      };
    });
    return tableRows;
  };

  // to get selected watchlist data
  React.useEffect(() => {
    if (watchlists && watchlistId) {
      let result = watchlists.find(
        (watchlist: IWatchlistProps) => watchlist.id === watchlistId
      );
      setSelectedWatchlist(result);
      let coinsSet: Set<string> = new Set(
        result.coins.map((coin: ICoinProps) => coin.symbol)
      );
      setWatchlistCoinsSet(coinsSet);
    }
  }, [watchlists, watchlistId]);

  return (
    <StyledPageBox showButton={!!selectedWatchlist}>
      {/* if it is screen page to add coins, show go back button */}
      {selectedWatchlist && (
        <StyledButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleGoBackClick()}
        >
          <ChevronLeftIcon /> Back
        </StyledButton>
      )}
      <StyledPageContent>
        {/* title based on add coins screener page and normal coins screener page*/}
        <StyledTypography variant="h4" margin="0 0 24px 0">
          {selectedWatchlist
            ? `Add Coins to "${selectedWatchlist.name}" Watchlist`
            : "Cryptocurrency Prices by Rank"}
        </StyledTypography>

        {/* cryptoTable to show coins data */}
        <CryptoTable
          rows={generateRowData(cryptoCoins)}
          watchlistCoinsSet={watchlistCoinsSet}
          showLast7Days={true}
          showAddButton={!!selectedWatchlist}
          addCryptoCoin={!!selectedWatchlist ? handleAddCryptoCoin : undefined}
        />
      </StyledPageContent>
      <SnackbarComponent />
    </StyledPageBox>
  );
};

export default ScreenerPage;
