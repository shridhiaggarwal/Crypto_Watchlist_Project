import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { IWatchlistProps } from "../WatchListPage";
import watchlistsJson from "../../Jsons/watchlists.json";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";
import CryptoTable from "../../Containers/CryptoTable";

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

const StyledButton = styled(Button)`
  text-transform: none;
`;

const CryptoListPage = () => {
  const { watchlistId } = useParams();
  const navigate = useNavigate();
  const watchlists: Array<IWatchlistProps> = watchlistsJson.watchlists;
  const [selectedWatchlist, setSelectedWatchlist] = React.useState<IWatchlistProps>();

  const handleGoBackClick = () => {
    localStorage.setItem("watchlistId", JSON.stringify(""));
    navigate(`/`);
  };

  const generateRowData = (watchlistCoins: any) => {
    let tableRows = watchlistCoins.map((coin: any, index: number) => {
      const { rank, symbol, name, image, price, change, volume24h, mktCap, last7days } =
        coin;
      return {
        rank: rank,
        symbol: symbol,
        image: image,
        name: name,
        price: price,
        change: change,
        volume24h: volume24h,
        mktCap: mktCap,
        last7Days: last7days,
      };
    });
    return tableRows;
  };

  React.useEffect(() => {
    let result = watchlists.filter((watchlist) => {
      if (watchlist.id === Number(watchlistId)) {
        return watchlist;
      }
    });
    setSelectedWatchlist(result[0]);
  }, [watchlists]);

  console.log("render CryptoListPage");

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
            <StyledTypography variant="h5" margin="0 0 16px 0">
              {selectedWatchlist.name}
            </StyledTypography>
            <CryptoTable rows={generateRowData(selectedWatchlist.coins)} showLast7Days={false}/>
          </>
        ) : (
          <>
            <Box width="100%" height="100%">
              <CircularProgress />
            </Box>
          </>
        )}
      </StyledPageContent>
    </StyledPageBox>
  );
};

export default CryptoListPage;
