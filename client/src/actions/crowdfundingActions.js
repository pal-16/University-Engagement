import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const createPost = async ({ token, body }) => {
  try {
 
    const res = await axios.post(BASE_URL + "/crowdfundings/new", body, {
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


export const getPosts = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(BASE_URL + `/crowdfundings/getAll`, {
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

export const getUserPosts = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(BASE_URL + `/crowdfundings/${id}/getAll`, {
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


export const donate = async ({ postID, token,donateAmount,  senderID, receiverID, userType }) => {
  try {
    const res = await axios.post(BASE_URL + "/crowdfundings/donate", { postID, token,donateAmount,  senderID, receiverID, userType }, {
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