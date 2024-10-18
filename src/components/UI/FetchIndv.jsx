import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchInvPost } from "../../API/api";
import { NavLink, useParams } from "react-router-dom";

const FetchIndv = () => {
  //destructure the id
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchInvPost(id), //here if you passing an arguments to the query function then you need to add the fat arrow syntax at the starting i.e., () =>
  });
  console.log(data);

  //conditional rendering based on loading, error and posts data
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "something went wrong!"}</p>;

  return (
    <div>
      <div className="section-accordion">
        <h1>POST ID NUMBER - {id}</h1>
        <div>
          <p>ID: {data.id}</p>
          <p>TITLE: {data.title}</p>
          <p>BODY: {data.body}</p>
        </div>
        <NavLink to="/rq">
          <button>Go Back</button>
        </NavLink>
      </div>
    </div>
  );
};

export default FetchIndv;
