import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserStateType {
  isAuthenticated: boolean;
  user_cred: any[]; // Adjust this type according to your data structure
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: UserStateType = {
  isAuthenticated: false,
  user_cred: [],
  status: "idle",
  error: "",
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
export const TokenExchange = createAsyncThunk(
  "user/RegisterUser",
  async (tokenResponse: any) => {
    // const payload={}
    // const { data } = await axios.post<any>(
    //   "https://oauth2.googleapis.com/token",
    //   {
    //     code: tokenResponse.code,
    //     client_id:
    //       "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
    //     client_secret: "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",
    //     redirect_uri: "http://localhost:3000",
    //     grant_type: "authorization_code",
    //   }
    // );
    const response = await axios.post(
      "http://localhost:8000/api/google-auth-callback/",
      tokenResponse.code
    );
    console.log(response);
    // console.log(Object.entries(data));
    // console.log("type of", Object.entries(data));
    return data;
  }
);

export const GetAccessTokenUsingRefreshToken = createAsyncThunk(
  "user/accessToken",
  async (refreshToken: any) => {
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
export const logoutUser = createAsyncThunk("user/logout", async () => {});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user_cred = [];
      })
      .addCase(TokenExchange.pending, (state) => {
        state.status = "loading";
      })
      .addCase(TokenExchange.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user_cred = action.payload;
      })
      .addCase(TokenExchange.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred.";
      })
      .addCase(GetAccessTokenUsingRefreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetAccessTokenUsingRefreshToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user_cred = action.payload;
      })
      .addCase(GetAccessTokenUsingRefreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default userSlice.reducer;
