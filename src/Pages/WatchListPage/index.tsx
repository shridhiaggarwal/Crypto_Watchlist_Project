import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { useNavigate } from "react-router";
import styled from "styled-components";
import watchlistsJson from "../../Jsons/watchlists.json";
import WatchlistCard from "./components/watchlistCard";
import CloseIcon from "@material-ui/icons/Close";

export interface ICoinProps {
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change: number;
  volume24h: number;
  mktCap: number;
}

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
`;

const StyledButton = styled(Button)`
  text-transform: none;
`;

const Watchlists = () => {
  const navigate = useNavigate();
  const watchlists: Array<IWatchlistProps> = watchlistsJson.watchlists;
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

  return (
    <StyledPageBox>
      <StyledTitleBox>
        <StyledTypography variant="h4" margin="0 0 8px 0">
          Crypto Watchlists
        </StyledTypography>
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
        {watchlists.map((watchlist, index) => (
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
