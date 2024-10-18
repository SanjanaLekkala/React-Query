import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchUsers } from "../API/api";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage, allPages);
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });
  console.log(data);
  // const handleScroll = ()=>{
  //     const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
  //     if(bottom && hasNextPage){
  //         fetchNextPage();
  //     }
  // }

  //destructuring the useView
  const { ref, inView } = useInView({
    //The hook "useInView" accepts a threshold option, indicating the percentage of visibility before triggering. It returns a "ref" and a state "inView" indicating whether the element is in view.here "inView" is the bottom
    threshold: 1, //Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points.
  });

  useEffect(() => {
    // window.addEventListener("scroll",handleScroll)
    // return ()=> window.removeEventListener("scroll",handleScroll);
    if (inView && hasNextPage) {
      //here "inView" is the bottom
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;
  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>
      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page?.map((el) => {
            return (
              <li
                key={el.id}
                style={{ padding: "10px", border: "1px solid #ccc" }}
              >
                <p>{el.title}</p>
                <img
                  src={el.url}
                  alt={"Image"}
                  style={{ width: "50px", height: "50px" }}
                />
              </li>
            );
          })}
        </ul>
      ))}
      {/*isFetchingNextPage && <p>Loading more...</p>*/}
      <div
        style={{ padding: "20px", textAlign: "center", color: "white" }}
        ref={ref}
      >
        {isFetchingNextPage
          ? "Loading more ..."
          : hasNextPage
          ? "Scroll down to load more..."
          : "No more users"}
      </div>{" "}
      {/*Assign the ref to the DOM element you want to monitor, which in our case is the div element.*/}
    </div>
  );
};

export default InfiniteScroll;
