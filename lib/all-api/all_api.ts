import axios from "axios";

export const userloginapi = (data: any) =>
  axios.post("http://127.0.0.1:8000/api/googlelogin/", {
    email: data.email,
    password: data.password,
  });
