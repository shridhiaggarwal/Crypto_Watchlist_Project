import { Status } from "../Utils/common";

export const fetchCoinDetails = async (coinId: string) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await response.json();
      return {
        status: Status.SUCCESS,
        data: data,
      };
    } catch (error) {
      console.error(`Failed to fetch details for coin with ID ${coinId}`);
      return {
        status: Status.ERROR,
        message: `Failed to fetch details for coin with ID ${coinId}`,
      };
    }
  };
  