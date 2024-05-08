import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userloginapi } from "../../../../lib/all-api/all_api";

export const UserFormLogin = createAsyncThunk(
  "user/loginform",
  async (userLoginData: any, thunkAPI) => {
    const { email, password } = userLoginData;
    const response = await axios.post(
      "http://127.0.0.1:8000/api/googlelogin/",
      {
        email: email,
        password: password,
      }
    );

    const response2 = await userloginapi({ email, password });
    console.log(response2);
    if (response2.status == 200 || response2.statusText == "OK") {
      return response.data;
    }
  }
);
