import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const createPost = async ({ token, body }) => {
  try {
 
    const res = await axios.post(BASE_URL + "/crowdfunding/createPost", body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

