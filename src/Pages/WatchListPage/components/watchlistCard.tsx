import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { IWatchlistProps } from "..";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";

interface IWatchlistCard {
  watchlistData: IWatchlistProps;
  onWatchlistClick: (watchlistId: string) => void;
}

const StyledTypography = styled(Typography)<{
  "font-color"?: string;
  margin?: string;
  component?: string;
  flexgrow?: number;
  fontWeight?: string;
}>`
  color: ${(props) => props["font-color"]};
  margin: ${(props) => props["margin"]};
  flex-grow: ${(props) => props.flexgrow};
  font-weight: ${(props) => props.fontWeight};
`;

const StyledCard = styled(Card)`
  width: 400px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 24px 0px 24px 32px;
  //   &:last-child {
  //     padding-bottom: 0;
  //   }
`;

const StyledTitleBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding-right: 8px;
  padding-bottom: 16px;
`;

const StyledCoinsHeader = styled(Box)`
  display: flex;
  padding-right: 32px;
  padding-bottom: 8px;
`;

const StyledCoinsContent = styled(Box)`
  padding-right: 32px;
`;

const StyledCoin = styled(Box)`
  display: flex;
  padding-bottom: 8px;
`;

const StyledButton = styled(Button)`
  text-transform: none;
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 16px;
  margin-left: -32px;
  padding: 1px;
`;

function WatchlistCard(props: IWatchlistCard) {
  const { watchlistData, onWatchlistClick } = props;

  return (
    <StyledCard
      key={`watchlist-${watchlistData.id}`}
      aria-label={`watchlist-${watchlistData.id}`}
    >
      <StyledCardContent>
        <StyledTitleBox>
          <StyledTypography variant="h6" fontWeight="bolder">
            {watchlistData.name}
          </StyledTypography>
          <StyledButton color="primary" size="medium" onClick={() => onWatchlistClick(watchlistData.id)}>
            View More <ChevronRightIcon />
          </StyledButton>
        </StyledTitleBox>
        <StyledCoinsHeader>
          <StyledTypography variant="body1" flexgrow={1}>
            Coin
          </StyledTypography>
          <StyledTypography variant="body1">
            Price
          </StyledTypography>
        </StyledCoinsHeader>
        <StyledDivider />
        <StyledCoinsContent>
          {watchlistData.coins.slice(0,10).map((coin, index) => {
            const { name, image, price } = coin;
            return (
              <StyledCoin key={`coin-${index}`}>
                <StyledImage src={image} />
                <StyledTypography
                  variant="body1"
                  color="textSecondary"
                  flexgrow={1}
                >
                  {name}
                </StyledTypography>
                <StyledTypography variant="body1" color="textSecondary">
                  {price}
                </StyledTypography>
              </StyledCoin>
            );
          })}
        </StyledCoinsContent>
      </StyledCardContent>
    </StyledCard>
  );
}

export default WatchlistCard;
