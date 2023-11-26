import apis from "./Apis";
import { Get, Post } from "./axiosCall";

class AuthService {
  constructor() {
    this.token = null;
  }

  retriveToken = () => {
    return localStorage.getItem("Token");
  };

  storeToken = (t) => {
    localStorage.setItem("Token", t);
  };

  deleteToken = () => {
    localStorage.removeItem("Token");
  };

  LoginAuth = (u, p) => {
    return Post({
      url: apis.LOGIN,
      data: {
        emailId: u,
        password: p,
      },
    });
  };

  FetchAuth = (t) => {
    return Get({
      url: apis.GETDETAILSUSER,
      headers: {
        Authorization: `${t}`,
      },
    });
  };
}

const auth = new AuthService();
export default auth;
