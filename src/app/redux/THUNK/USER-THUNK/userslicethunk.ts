import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userloginapi } from "../../../../../lib/all-api/all_api";
import { get_user_credentials_in_axios_header } from "../MESSAGE-THUNK/messageslicethunk";
import { setCookies } from "../../../../../lib/CookiStore";

interface tokenResponseType {
  authuser: string;
  code: string;
  prompt: string;
  scope: string;
}
const initialTokenState: tokenResponseType = {
  authuser: "",
  code: "",
  prompt: "",
  scope: "",
};
interface refreshTokenType {
  refresh: string;
}
const initialRefreshToken: refreshTokenType = {
  refresh: "",
};

export const TokenExchangeAndRegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (tokenResponse: any) => {
    // const payload={}
    // try {
    const { data } = await axios.post<any>(
      "https://oauth2.googleapis.com/token",
      {
        code: tokenResponse.code,
        client_id:
          "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code",
      }
    );
    console.log(data);

    const response = await axios.post(
      "http://localhost:8000/api/googleregister/",
      data
    );
    console.log(response);
    console.log(response.data);

    return [data, response.data];
    // } catch (e: any) {
    //   return console.log(e.message);
    // }
  }
);

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
export const GetAccessTokenUsingRefreshToken = createAsyncThunk(
  "user/accessToken",
  async (refreshToken: string) => {
    try {
      const response = await axios.post<any>(
        "https://oauth2.googleapis.com/token",
        {
          refresh_token: refreshToken,
          client_id:
            "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
          client_secret: "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",
          grant_type: "refresh_token",
        }
      );
      const accessToken = response.data.access_token;
      console.log(accessToken);
      return accessToken;
    } catch (error: any) {
      console.error("Error refreshing access token:", error.response.data);
      throw error;
    }
  }
);
export const logoutUser = createAsyncThunk("user/logout", async () => {
  const headers = get_user_credentials_in_axios_header();
  console.log(headers);

  try {
    const response = await axios.delete("http://localhost:8000/api/logout/", {
      headers,
    });
    console.log(response);
    if (response.status == 200) await setCookies("isAuthenticated", "false");

    return response.status;
  } catch (error: any) {
    console.log(error.response);

    return error.response;
  }
});
