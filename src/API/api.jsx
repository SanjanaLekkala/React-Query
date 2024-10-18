import axios from "axios";

//create an instance for axios
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//to fetch the data for FetchRQ component
export const fetchPosts = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=5`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
    // return [];
  }
};

//fetch the data for FtechOld component
export const fetchData = () => {
  return api.get("/posts");
};

//to fetch data for FetchIndv component

export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
//pagination...
//! https://jsonplaceholder.typicode.com/posts?_start=1&_limit=3 here the pageNumber = start as the start=1 then it display 3 items(1,2,3) (limit value) if start = 2 then again it display rest 3 items(4,5,6). so here the start = pageNumber

//to delete the post
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//to update the data
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};

//infinite scrolling
export const fetchUsers = async ({ pageParam = 1 }) => {
  //here the pageParam is nothing but the page number
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_limit=10&per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//https://api.github.com/users?per_page=10&page=${pageParam}
//https://jsonplaceholder.typicode.com/photos?per_page=10&page=${pageParam}
