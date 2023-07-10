import React, { useState, useEffect } from "react";
import { useFetchCryptoListData } from "../../Hooks/use-fetch-cryptolist-data/use-fetch-cryptolist-data.hook";
import Box from "@material-ui/core/Box";
import CryptoTable from "../CryptoTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components';

const StyledPageBox = styled(Box)`
  margin: 32px 48px;
`;

const StyledTypography = styled(Typography)<{
  margin?: string;
}>`
  margin: ${props => props.margin};
`;

const tableRows = [
  {
    rank: 1,
    coinSymbol: "BTC",
    coinName: "bitcoin",
    coinImage: "image",
    price: 20000,
    volume24h: 3.4,
    mktCap: 69,
    last7Days: 4.3,
  },
  {
    rank: 3,
    coinSymbol: "ETH",
    coinName: "Ethereum",
    coinImage: "image",
    price: 2200.78,
    volume24h: 98000.34,
    mktCap: 67,
    last7Days: 4,
  },
  {
    rank: 2,
    coinSymbol: "BTC",
    coinName: "SILVER",
    coinImage: "image",
    price: 5000,
    volume24h: 3.6,
    mktCap: 57,
    last7Days: 40,
  },
];

const generateRowData = (cryptoList: any) => {
  //   let tableRows = cryptoList.map((coin: any, index: number)=>{
  //     const coinData = {};
  //     const coinID: coinData.id;
  //     const coinSymbol: coinData.symbol
  // "symbol": "btc",
  // "name": "Bitcoin",
  //     const {rank, coinNameIcon, price, Volume24h, mktCap, last7Days} = coin;
  //     return {
  //       rank: 1,
  //       coinNameIcon: "bitcoin",
  //       price: 20000,
  //       Volume24h: 3.7,
  //       mktCap: 67,
  //       last7Days: 4.3,
  //     }
  //   })
};

const ScreenerPage = () => {
  const [cryptoList, isListLoading, errorListData] = [ [], false, false] //useFetchCryptoListData();

  console.log("rendering ScreenerPage");

  useEffect(() => {
    if (cryptoList) {
      generateRowData(cryptoList);
    }
  }, [cryptoList]);

  return (
    <StyledPageBox>
      <StyledTypography variant="h4" margin="0 0 24px 0">Cryptocurrency Prices by Rank</StyledTypography>
      {isListLoading ? (
        <Box width="100%" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        <CryptoTable rows={tableRows} />
      )}
    </StyledPageBox>
  );
};

export default ScreenerPage;
