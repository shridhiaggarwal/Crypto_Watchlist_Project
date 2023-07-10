import React, { useState } from "react";
import { List, ListItem, Box, Typography } from "@material-ui/core";
import { useNavigate } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import watchlistsJson from "../../Jsons/watchlists.json"

interface ICoinProps {
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change: number;
  volume24h: number;
  mktCap: number;
}

interface IWatchlistProps {
  id: number;
  name: string;
  coins: Array<ICoinProps>;
}

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  margin?: string;
}>`
  margin: ${props => props.margin};
`;

const Watchlists = () => {
  const navigate = useNavigate();
  const watchlists: Array<IWatchlistProps> = watchlistsJson.watchlists;

  const handleWatchlistClick = (watchlistId: number) => {
    localStorage.setItem("watchlistId", JSON.stringify(watchlistId));
    navigate(`/watchlist/${watchlistId}`);
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
      <StyledTypography variant="h4" margin="0 0 8px 0">
        Crypto Watchlists
      </StyledTypography>
      <StyledTypography variant="body2" margin="0 0 32px 0">
        Which cryptocurrencies are people more interested in? Track and discover
        the most interesting cryptocurrencies based on market and CoinGecko
        activity.
      </StyledTypography>
      <List>
        {watchlists.map((watchlist) => (
          <ListItem
            key={watchlist.id}
            button
            onClick={() => handleWatchlistClick(watchlist.id)}
          >
            {watchlist.name}
          </ListItem>
        ))}
      </List>
    </StyledPageBox>
  );
};

export default Watchlists;
