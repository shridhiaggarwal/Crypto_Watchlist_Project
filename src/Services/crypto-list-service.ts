import { Status } from "../Utils/common";

export const fetchCryptoList = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const data = await response.json();
    return {
        status: Status.SUCCESS,
        data: data,
      };
  } catch (error) {
    console.error("Failed to fetch cryptocurrency list");
    return {
        status: Status.ERROR,
        message: "Failed to fetch cryptocurrency list",
    };
  }
};
