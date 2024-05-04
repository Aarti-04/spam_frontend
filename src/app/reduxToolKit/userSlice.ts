import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";

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
    // return;
    // console.log(Object.entries(data));
    // console.log("type of", Object.entries(data));
    return [data, response.data];
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user_google_cred = [];
        state.user_token = [];
      })
      .addCase(TokenExchangeAndRegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        TokenExchangeAndRegisterUser.fulfilled,
        (state: any, action: any) => {
          state.isAuthenticated = true;
          state.user_google_cred = action.payload[0];
          state.user_token = {
            jwt_access_token: action.payload[1]["access_token"],
            jwt_refresh_token: action.payload[1]["refresh_token"],
          };
        }
      )
      .addCase(TokenExchangeAndRegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred.";
        state.isAuthenticated = false;
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
