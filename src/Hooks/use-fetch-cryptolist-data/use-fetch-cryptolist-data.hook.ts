import { useState, useEffect } from 'react';
import { getCryptoList } from './crypto-list-functions';

export function useFetchCryptoListData() {
  const [cryptoList, setCryptoList] = useState<any>(null);
  const [isLoading, setLoading] = useState<any>(true);
  const [isDataLoaded, setIsDataLoaded] = useState<any>(false);
  const [errorData, setErrorData] = useState(false);

  const cryptoListSuccessCallback = (obj: any) => {
    setIsDataLoaded(true);
    setCryptoList(obj);
  };

  const cryptoListErrorCallback = (errorObj: any) => {
    setErrorData(errorObj);
    setCryptoList(true);
  };

  useEffect(() => {
    if (errorData && isDataLoaded) {
      setLoading(false);
    } else if (cryptoList && isDataLoaded) {
      setLoading(false);
    } else if (!isDataLoaded) {
      setLoading(true);
      getCryptoList({cryptoListSuccessCallback, cryptoListErrorCallback});
    }
  }, [isDataLoaded, cryptoList, errorData]);

  return [cryptoList, isLoading, errorData];
}
