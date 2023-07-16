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

const StyledPageBox = styled(Box)`
  margin: 16px 16px;
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
  const [cryptoList, isListLoading, errorListData] = [[], false, false]; //useFetchCryptoListData();
  const cryptoCoins: Array<ICoinProps> = cryptoCoinsJson.coins;
  const [watchlists] = useFetchWatchlistsData();
  const [selectedWatchlist, setSelectedWatchlist] = useState<IWatchlistProps>();
  const { showSnackbar } = useContext<any>(SnackbarContext);

  console.log("rendering ScreenerPage", watchlistId);

  const handleAddCryptoCoin = (addCoinData: ICoinProps) => {
    debugger;
    // update only selected watchlist and it coins array
    if (selectedWatchlist) {
      selectedWatchlist.coins.push(addCoinData);
      let updatedWatchlist = {
        ...selectedWatchlist,
        coins: selectedWatchlist.coins,
      };
      setSelectedWatchlist(updatedWatchlist);

      // update complete watchlists array in storage
      let newWatchlists = watchlists.map((watchlist: IWatchlistProps) => {
        if (watchlist.id === watchlistId) {
          return updatedWatchlist;
        }
        return watchlist;
      });
      localStorage.setItem("watchlists", JSON.stringify(newWatchlists));
      showSnackbar(`${addCoinData.name} Coin is successfully added in the ${selectedWatchlist.name}`);
    }
  };

  const handleGoBackClick = () => {
    navigate(`/watchlist/${watchlistId}`);
  };

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

  React.useEffect(() => {
    if (watchlists && watchlistId) {
      let result = watchlists.find(
        (watchlist: IWatchlistProps) => watchlist.id === watchlistId
      );
      setSelectedWatchlist(result);
    }
  }, [watchlists, watchlistId]);

  return (
    <StyledPageBox>
      <StyledButton
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleGoBackClick()}
      >
        <ChevronLeftIcon /> Back
      </StyledButton>
      <StyledPageContent>
        <StyledTypography variant="h4" margin="0 0 24px 0">
          {selectedWatchlist
            ? `Add Coins to "${selectedWatchlist.name}" Watchlist`
            : "Cryptocurrency Prices by Rank"}
        </StyledTypography>
        {isListLoading ? (
          <Box width="100%" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <CryptoTable
            rows={generateRowData(cryptoCoins)}
            showLast7Days={true}
            showAddButton={!!watchlistId}
            addCryptoCoin={!!watchlistId ? handleAddCryptoCoin : () => {}}
          />
        )}
      </StyledPageContent>
      <SnackbarComponent />
    </StyledPageBox>
  );
};

export default ScreenerPage;
