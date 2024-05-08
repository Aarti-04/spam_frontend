import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import {
  clearCookies,
  getAuthCookies,
  setCookies,
  setRoleCookie,
} from "../../../lib/CookiStore";
import { UserFormLogin } from "./USER-THUNK/userslicethunk";
interface UserStateType {
  isAuthenticated: boolean;
  user_google_cred: any[]; // Adjust this type according to your data structure
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  user_token: any[];
}

const initialState: UserStateType = {
  isAuthenticated: false,
  user_google_cred: [],
  status: "idle",
  error: "",
  user_token: [],
};
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
    try {
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
    } catch (e: any) {
      return console.log(e.message);
    }
  }
);
// export const UserFormLogin = createAsyncThunk(
//   "user/loginform",
//   async (userLoginData: any, thunkAPI) => {
//     const { email, password } = userLoginData;
//     const response = await axios.post(
//       "http://127.0.0.1:8000/api/googlelogin/",
//       {
//         email: email,
//         password: password,
//       }
//     );
//     console.log(response);
//     if (response.status == 200 || response.statusText == "OK") {
//       return response.data;
//     }
//   }
// );
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
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (user_token: any) => {
    const { jwt_access_token } = user_token;
    console.log(jwt_access_token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt_access_token} `,
    };
    const response = await axios.delete("http://localhost:8000/api/logout/", {
      headers,
    });
    console.log(response);
    return;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserFormLogin.fulfilled, (state: any, action: any) => {
        // state.isAuthenticated = false;
        console.log("UserFormLogin", action.payload["access_token"]);

        state.user_token = {
          jwt_access_token: action.payload["access_token"],
          jwt_refresh_token: action.payload["refresh_token"],
        };
        setCookies("isAuthenticated", "true");
        console.log("set cookie");
        setCookies("isAuthenticated", "false");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user_google_cred = [];
        state.user_token = [];
        setCookies("isAuthenticated", "false");
      })
      .addCase(TokenExchangeAndRegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        TokenExchangeAndRegisterUser.fulfilled,
        (state: any, action: any) => {
          state.isAuthenticated = true;
          state.user_google_cred = action.payload[0];
          console.log(
            "TokenExchangeAndRegisterUser",
            action.payload[1]["access_token"]["access_token"]
          );

          state.user_token = {
            jwt_access_token: action.payload[1]["access_token"],
            jwt_refresh_token: action.payload[1]["refresh_token"],
          };
          setCookies("isAuthenticated", "true");
          console.log("set cookie");
        }
      )
      .addCase(TokenExchangeAndRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred.";
        state.isAuthenticated = false;
        setCookies("isAuthenticated", "false");
      })
      .addCase(GetAccessTokenUsingRefreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAccessTokenUsingRefreshToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user_google_cred = action.payload;
      })
      .addCase(GetAccessTokenUsingRefreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default userSlice.reducer;
