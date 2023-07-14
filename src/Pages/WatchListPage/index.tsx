import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { useNavigate } from "react-router";
import styled from "styled-components";
import WatchlistCard from "./components/watchlistCard";
import CloseIcon from "@material-ui/icons/Close";
import { ICoinProps } from "../../Containers/CryptoTable";
import { useFetchWatchlistsData } from "../../Hooks/use-fetch-watchlist-data/use-fetch-watchlists-data.hook";

export interface IWatchlistProps {
  id: number;
  name: string;
  coins: Array<ICoinProps>;
}

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  "font-color"?: string;
  margin?: string;
  component?: string;
}>`
  color: ${(props) => props["font-color"]};
  margin: ${(props) => props["margin"]};
`;

const StyledWatchlistBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 32px;
`;

const StyledTitleBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  text-transform: none;
`;

const Watchlists = () => {
  const navigate = useNavigate();
  const [watchlists] =  useFetchWatchlistsData();
  const [snackbarState, setSnackbarState] = React.useState(false);

  const handleWatchlistClick = (watchlistId: number) => {
    localStorage.setItem("watchlistId", JSON.stringify(watchlistId));
    navigate(`/watchlist/${watchlistId}`);
  };

  const featureComingSoon = () => {
    setSnackbarState(true);
  };

  const handleClose = () => {
    setSnackbarState(false);
  };

  // const handleAddCrypto = (watchlistId: number, assetId: string) => {
  //   // Find the watchlist by its ID
  //   const watchlist = watchlists.find((w) => w.id === watchlistId);

  //   if (watchlist && watchlist.coins) {
  //     // Add the asset to the watchlist's assets array
  //     watchlist.coins.push(assetId);
  //   }
  // };

  // const handleRemoveAsset = (watchlistId: number, assetId: string) => {
  //   // Find the watchlist by its ID
  //   const watchlist = watchlists.find((w) => w.id === watchlistId);

  //   if (watchlist) {
  //     // Remove the asset from the watchlist's assets array
  //     watchlist.coins = watchlist.coins.filter((coin) => asset !== assetId);
  //   }
  // };

  console.log("render Watchlists");

  return (
    <StyledPageBox>
      <StyledTitleBox>
        <StyledTypography variant="h4">Crypto Watchlists</StyledTypography>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => featureComingSoon()}
        >
          Create WatchList
        </StyledButton>
      </StyledTitleBox>
      <StyledTypography
        variant="body1"
        color="textSecondary"
        margin="0 0 32px 0"
      >
        Track and discover the most interesting cryptocurrencies based on
        market, CryptoWatch and CoinGecko activity.
      </StyledTypography>
      <StyledWatchlistBox>
        {watchlists && watchlists.map((watchlist: IWatchlistProps, index: number) => (
          <WatchlistCard
            key={`watchlist-${index}`}
            watchlistData={watchlist}
            onWatchlistClick={handleWatchlistClick}
          />
        ))}
      </StyledWatchlistBox>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarState}
        onClose={handleClose}
        autoHideDuration={6000}
        message="This feature is not available."
        key={"bottom" + "right"}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </StyledPageBox>
  );
};

export default Watchlists;
