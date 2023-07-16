import React, { useState, useEffect } from 'react';
import watchlistsJson from "../../Jsons/watchlists.json";

export function useFetchWatchlistsData() {
  const [watchlists, setWatchLists] =  useState<any>();

  useEffect(()=>{
    const localWatchLists = localStorage.getItem("watchlists");
    if(localWatchLists === null){
        localStorage.setItem("watchlists", JSON.stringify(watchlistsJson.watchlists));
        setWatchLists(watchlistsJson.watchlists);
    } else {
        setWatchLists(JSON.parse(localWatchLists));
    }
  }, []);

  return watchlists;
}
