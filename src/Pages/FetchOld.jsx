import React, { useEffect, useState } from "react";
import { fetchData } from "../API/api";

const FetchOld = () => {
  //States for loading,error and posts data
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //Fetch posts data function
  const getPostsData = async () => {
    try {
      const res = await fetchData();
      console.log(res.data);
      //ternary operator
      // return res.status ===200 ? setPost(res.data) : [];
      if (res.status === 200) {
        setPost(res.data); //Set the fetched posts data
        setIsLoading(false); //Turn off loading state
      }
    } catch (err) {
      console.log("Error", err);
      setIsError(true); //Set the error satate
      setIsLoading(false); //Turn off loading state
      return [];
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  //conditional rendering based on loading, error and posts data
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div>
      <ul className="section-accordion">
        {/*optional chaning(?.) : instead of this {post && post.map} here we are checking if the post are null (or) undefined then it will throws an "error".So instead of throwing the error we use the optional chaning that means if the post are null (or) undefined it will not throw any error instead it will returns an "undefined value'  */}

        {post?.map((el) => {
          //destructuring
          const { id, title, body } = el;

          return (
            <li key={id}>
              {id}.<p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOld;
