import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const ReactInfiniteScroll = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const InfiniteData = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
    );
    setUsers((prev) => [...prev, ...res.data]);
    setLoading(false);
  };

  const handleScroll = () => {
    console.log("Height:", document.documentElement.scrollHeight);
    console.log("Top:", document.documentElement.scrollTop);
    console.log("Window:", window.innerHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    InfiniteData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <h1>ReactInfiniteScroll</h1>
      <Card users={users} />
      {loading && <p>Loading data ....</p>}
    </div>
  );
};

export default ReactInfiniteScroll;
