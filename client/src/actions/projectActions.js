import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const createProject = async ({ token, body }) => {
  try {
 
    const res = await axios.post(BASE_URL + "/projects/new", body, {
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

export const getProjects = async ({ token }) => {
  try {
    const res = await axios.get(BASE_URL + `/projects/getAll`, {
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

export const getUserProjects = async ({ id, token }) => {
  try {
    const res = await axios.get(BASE_URL + `/projects/${id}/getAll`, {
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


export const likeProject = async ({ id, token, userID }) => {
  try {
    const res = await axios.post(BASE_URL + `/projects/${id}/like`,{userID:userID}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(res.data);
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

export const commentProject = async ({ id, token,body }) => {
  try {
   
    const res = await axios.post(BASE_URL + `/projects/${id}/comment`,body, {
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


export const getProjectDetails= async ({ id,token }) => {
  try {
    const res = await axios.get(BASE_URL + `/projects/${id}/getDetail`, {
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

