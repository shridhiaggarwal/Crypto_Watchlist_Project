import React from "react";
import { List, ListItem, Typography, Box, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from 'styled-components';

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  margin?: string;
}>`
  margin: ${props => props.margin};
`;

const CryptoListPage = () => {
  const { watchlistId } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  // const { handleGoBackClick } = location.state;

  // Dummy data for cryptocurrencies in the watchlist
  const cryptocurrencies = [
    { id: "1", name: "Bitcoin", symbol: "BTC" },
    { id: "2", name: "Ethereum", symbol: "ETH" },
    { id: "3", name: "Litecoin", symbol: "LTC" },
  ];

  const handleGoBackClick = () => {
    // setSelectedWatchlist(null);
    localStorage.setItem("watchlistId", JSON.stringify(""));
    navigate(`/`);
  };

  return (
    <StyledPageBox>
      <StyledTypography variant="h6" margin="0 0 16px 0">
        Cryptocurrencies in Watchlist {watchlistId}
      </StyledTypography>
      <Button variant="contained" onClick={() => handleGoBackClick()}>
        Go Back
      </Button>
      <List>
        {cryptocurrencies.map((crypto) => (
          <ListItem key={crypto.id}>
            {crypto.name} ({crypto.symbol})
          </ListItem>
        ))}
      </List>
    </StyledPageBox>
  );
};

export default CryptoListPage;
