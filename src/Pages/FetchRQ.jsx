import React, { useState } from "react";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const FetchRQ = () => {
  // const [post,setPost] = useState([]);

  // const getPostsData = async() => {
  //   try{
  //     const res = await fetchPosts();
  //     console.log(res.data)
  //     //ternary operator
  //     return res.status ===200 ? res.data : [];
  //   }catch(err){
  //     console.log("Error",err);
  //     return [];
  //   }
  // }

  // useEffect(()=>{
  //   getPostsData()
  // },[])
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], //useState //here we are passing pageNumber because initialy the data will be displayed from the API when the user clicks on the next button then the pagenumber is updated and then it calls the query function with the updated value and fetch the addtional items from the API.But if we do not mention the pageNumber the data will not be updated because the pageNUmber is not being updated it is in its initial value only and it will not call the queryfunction for the updated value
    // queryFn: getPostsData,
    queryFn: () => fetchPosts(pageNumber), //useEffect //hereyou are passing the pageNumber as an argument to the query function so you need to add the fat arrow (()=>) synatx at the starting so that is does not throw any error
    gcTime: 10000, //after the mention time whatever the data is not been used will be removed from the cache. first initial request will be sent to the server and the data will be stored inside the local cache and if again we are making a request the data will be getting from the cache but the request will be made to the server. So in order to reduce this unneccessary request to the server we use the staleTime
    staleTime: 1000, // after completing the given time a new request is made to the server in between this time how many requests you make it will not send the request to the server the data will be fetched from the cache
    refetchInterval: 10000, // after completing the given time it automatically refteches the data. Example: in Grow app the stock market values will be changes without any page reload or refresh it automatically update the UI. So to fetch the data from the API at regular intervals to keep the UI up-to-date with the latest information without requireing the user to manually refresh the page
    refetchIntervalInBackground: true, //if you want to fetch the data even in the backgroung (or) you are in the another tab it continue refetching even when the component is not mounted
    placeholderData: keepPreviousData, //this is used when we want to hide the loading text as when we click on the next button it takes some time to fetch the data from the server API and display it in the UI. So to avoid showing the loading text we can use this it will not show the loading text instead it will display the previous data till it fetches and displays the new data from the server API
  });

  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // console.log(data, id)
      queryClient.setQueryData(["posts", pageNumber], (el) => {
        return el?.filter((post) => post.id !== id); //here we are using the queryClient.setQueryData  to update the cached data that means when we click the delete button the data will not be delete because it is stored in the local cache so first we need to delete the data from the local cache using this " queryClient.setQueryData"
      });
    },
  });

  //!mutation function to update the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      //onSuccess is a callback function
      console.log(apiData, postId);
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((currPost) =>
          currPost.id === postId
            ? { ...currPost, title: apiData.data.title }
            : currPost
        );
      });
    },
  });

  //conditional rendering based on loading, error and posts data
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {/*optional chaning(?.) : instead of this {post && post.map} here we are checking if the post are null (or) undefined then it will throws an "error".So instead of throwing the error we use the optional chaning that means if the post are null (or) undefined it will not throw any error instead it will returns an "undefined value'  */}

        {data?.map((el) => {
          //destructuring
          const { id, title, body } = el;

          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`} style={{ textDecoration: "none" }}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              {/* here the .muatate functin is used to call the deletePost function to access that function inside the useMutation hook we use the .mutate function inside it we pass the id same as the id that is pased inside the deletePost function i.e deletePost(id) same as .mutate(id). inside the useMutation hook the mutation function is used to execute the mutation in react query. it is same for updating data(PUT or PATCH), deleting data(DELETE) and creating new data(POST).here the .mutate function tells react query to run the mutation function defined inside the useMutation hook*/}
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          onClick={() => setPageNumber((prev) => prev - 5)}
          disabled={pageNumber === 0 ? true : false}
        >
          Prev
        </button>
        <h2 style={{ color: "white" }}>{pageNumber / 5 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 5)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
