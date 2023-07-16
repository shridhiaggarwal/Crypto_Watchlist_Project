import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { IWatchlistProps } from "../WatchListPage";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";
import CryptoTable, { ICoinProps } from "../../Containers/CryptoTable";
import { useFetchWatchlistsData } from "../../Hooks/use-fetch-watchlist-data/use-fetch-watchlists-data.hook";
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

const StyledTitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)<{
  backgroundColor?: string;
  color?: string;
}>`
  text-transform: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

const CryptoListPage = () => {
  const { watchlistId } = useParams();
  const navigate = useNavigate();
  const [watchlists] = useFetchWatchlistsData();
  const [selectedWatchlist, setSelectedWatchlist] =
    React.useState<IWatchlistProps>();
  const { showSnackbar } = useContext<any>(SnackbarContext);

  const handleAddCryptoCoin = () => {
    if(selectedWatchlist){
      navigate(`/screener/${selectedWatchlist.id}`);
    }
  };

  const handleRemoveCryptoCoin = (removeCoinData: ICoinProps) => {
    //update only selected watchlist and it coins array
    if (selectedWatchlist) {
      let updatedCoins = selectedWatchlist.coins.filter(
        (coin) => coin.symbol !== removeCoinData.symbol
      );
      let updatedWatchlist = {
        ...selectedWatchlist,
        coins: updatedCoins,
      };
      setSelectedWatchlist(updatedWatchlist);

      //update complete watchlists array in storage
      let newWatchlists = watchlists.map((watchlist: IWatchlistProps) => {
        if (watchlist.id === watchlistId) {
          return updatedWatchlist;
        }
        return watchlist;
      });
      localStorage.setItem("watchlists", JSON.stringify(newWatchlists));
      showSnackbar(`${removeCoinData.name} Coin is successfully removed from the ${selectedWatchlist.name}`);
    }
  };

  const handleGoBackClick = () => {
    localStorage.setItem("watchlistId", JSON.stringify(""));
    navigate(`/`);
  };

  const generateRowData = (watchlistCoins: any) => {
    let tableRows = watchlistCoins.map((coin: any, index: number) => {
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

  // console.log("render CryptoListPage");

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
        {selectedWatchlist ? (
          <>
            <StyledTitleBox>
              <StyledTypography variant="h5">
                {selectedWatchlist.name}
              </StyledTypography>
              <StyledButton
                variant="contained"
                backgroundColor="#4eaf0a"
                color="white"
                onClick={() => handleAddCryptoCoin()}
              >
                Add Coins
              </StyledButton>
            </StyledTitleBox>
            <CryptoTable
              rows={generateRowData(selectedWatchlist.coins)}
              showLast7Days={false}
              showRemoveButton={true}
              removeCryptoCoin={handleRemoveCryptoCoin}
            />
          </>
        ) : (
          <>
            <Box width="100%" height="100%">
              <CircularProgress />
            </Box>
          </>
        )}
      </StyledPageContent>
      <SnackbarComponent />
    </StyledPageBox>
  );
};

export default CryptoListPage;
