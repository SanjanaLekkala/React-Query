import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "../App.css";
const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  let pages = [];
  for (let i = 1; i <= Math.ceil(users.length / postPerPage); i++) {
    pages.push(i);
  }

  const usersData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    usersData();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firsPostIndex = lastPostIndex - postPerPage;
  const currentPosts = users.slice(firsPostIndex, lastPostIndex);
  return (
    <>
      <h1>Pagination</h1>
      <Card users={currentPosts} />
      <div className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              className={page == currentPage ? "active" : ""}
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
