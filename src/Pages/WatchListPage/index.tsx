import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router";
import styled from "styled-components";
import WatchlistCard from "./components/watchlistCard";
import { ICoinProps } from "../../Containers/CryptoTable";
import { useFetchWatchlistsData } from "../../Hooks/use-fetch-watchlist-data/use-fetch-watchlists-data.hook";
import { SnackbarContext } from "../../Contexts/SnackbarContext";
import SnackbarComponent from "../../Components/Snackbar";

export interface IWatchlistProps {
  id: string;
  name: string;
  coins: Array<ICoinProps>;
}

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  fontColor?: string;
  margin?: string;
  component?: string;
}>`
  color: ${(props) => props.fontColor};
  margin: ${(props) => props.margin};
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
  const watchlists = useFetchWatchlistsData();
  const { showSnackbar } = useContext<any>(SnackbarContext);

  const handleWatchlistClick = (watchlistId: string) => {
    localStorage.setItem("watchlistId", JSON.stringify(watchlistId));
    navigate(`/watchlist/${watchlistId}`);
  };

  const featureComingSoon = () => {
    showSnackbar("Feature not avaiable.");
  };

  return (
    <StyledPageBox>
      {/* header title and button */}
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

      {/* subtitle */}
      <StyledTypography
        variant="body1"
        color="textSecondary"
        margin="0 0 32px 0"
      >
        Track and discover the most interesting cryptocurrencies based on
        market, CryptoWatch and CoinGecko activity.
      </StyledTypography>

      {/* watchlists cards */}
      <StyledWatchlistBox>
        {watchlists &&
          watchlists.map((watchlist: IWatchlistProps, index: number) => (
            <WatchlistCard
              key={`watchlist-${index}`}
              watchlistData={watchlist}
              onWatchlistClick={handleWatchlistClick}
            />
          ))}
      </StyledWatchlistBox>

      {/* snackbar component */}
      <SnackbarComponent />
    </StyledPageBox>
  );
};

export default Watchlists;
