import React from "react";
import { useFetchCryptoListData } from "../../Hooks/use-fetch-cryptolist-data/use-fetch-cryptolist-data.hook";
import Box from "@material-ui/core/Box";
import CryptoTable from "../../Containers/CryptoTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';
import cryptoCoinsJson from "../../Jsons/cryptoCoins.json"
import { ICoinProps } from "../../Containers/CryptoTable";

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  margin?: string;
}>`
  margin: ${props => props.margin};
`;

const ScreenerPage = () => {
  const [cryptoList, isListLoading, errorListData] = [ [], false, false] //useFetchCryptoListData();
  const cryptoCoins: Array<ICoinProps> = cryptoCoinsJson.coins;

  console.log("rendering ScreenerPage");

  const generateRowData = (cryptoCoins: any) => {
    let tableRows = cryptoCoins.map((coin: any, index: number) => {
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

  return (
    <StyledPageBox>
      <StyledTypography variant="h4" margin="0 0 24px 0">Cryptocurrency Prices by Rank</StyledTypography>
      {isListLoading ? (
        <Box width="100%" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <CryptoTable rows={generateRowData(cryptoCoins)} showLast7Days={true}/>
      )}
    </StyledPageBox>
  );
};

export default ScreenerPage;
