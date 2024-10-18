import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">React Query</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/trad">FetchOld</NavLink>
          </li>
          <li>
            <NavLink to="/rq">FetchRQ</NavLink>
          </li>
          <li>
            <NavLink to="/infinite">InfiniteScroll</NavLink>
          </li>
          <li>
            <NavLink to="/pagination">Pagination</NavLink>
          </li>
          <li>
            <NavLink to="/reactinfinite">ReactInfiniteScroll</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
