import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const createProject = async ({ token, body }) => {
  try {
 
    const res = await axios.post(BASE_URL + "/project/createProject", body, {
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

