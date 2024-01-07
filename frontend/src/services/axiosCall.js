import axios from "axios";

import auth from "./auth.services";
import apis from "./Apis";

export const SecureGet = (p) => {
  return axios({
    method: "get",
    baseURL: apis.BASE,
    ...p,
    headers: {
      Authorization: `${auth.retriveToken()}`,
    },
    params: { ...p.params },
  });
};

export const Get = (p) => {
  return axios({
    method: "get",
    baseURL: apis.BASE,
    ...p,
  });
};

export const SecurePost = (p) => {
  return axios({
    method: "post",
    baseURL: apis.BASE,
    ...p,
    headers: {
      Authorization: `${auth.retriveToken()}`,
    },
    params: { ...p.params },
  });
};

export const Post = (p) => {
  return axios({
    baseURL: apis.BASE,
    method: "post",
    ...p,
  });
};
