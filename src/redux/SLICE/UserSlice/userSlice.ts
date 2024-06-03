import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { stat } from 'fs';
import {
  clearCookies,
  getAuthCookies,
  setCookies,
  setRoleCookie,
} from '../../../../lib/CookiStore';
import {
  UserFormLogin,
  TokenExchangeAndRegisterUser,
  GetAccessTokenUsingRefreshToken,
  logoutUser,
  UserFormSignIn,
} from '../../THUNK/USER-THUNK/userslicethunk';
interface UserStateType {
  isAuthenticated: boolean;
  user_google_cred: any[]; // Adjust this type according to your data structure
  userStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  userError: string;
  user_token: any[];
}

const initialState: UserStateType = {
  isAuthenticated: false,
  user_google_cred: [],
  userStatus: 'idle',
  userError: '',
  user_token: [],
};
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

// export const logoutUser = createAsyncThunk(
//   "user/logout",
//   async (user_token: any) => {
//     const { jwt_access_token } = user_token;
//     console.log(jwt_access_token);

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${jwt_access_token} `,
//     };
//     const response = await axios.delete("http://localhost:8000/api/logout/", {
//       headers,
//     });
//     console.log(response);
//     return;
//   }
// );
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStateToInitial(state) {
      state.userStatus = 'idle';
      state.userError = '';
      // console.log("all set to initial");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log(action.payload);

        if (action.payload.status !== 200) {
          state.userError = action.payload.data || action.payload.detail;
        }
        state.isAuthenticated = false;
        state.userStatus = 'idle';
        state.user_google_cred = [];
        state.user_token = [];
      })
      .addCase(TokenExchangeAndRegisterUser.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(
        TokenExchangeAndRegisterUser.fulfilled,
        (state: any, action: any) => {
          state.isAuthenticated = true;
          state.user_google_cred = action.payload[0];
          // console.log(
          //   "TokenExchangeAndRegisterUser",
          //   action.payload[1]["access_token"]["access_token"]
          // );
          state.user_token = {
            jwt_access_token: action.payload[1]['access_token'],
            jwt_refresh_token: action.payload[1]['refresh_token'],
          };
          setCookies('isAuthenticated', 'true');
          // console.log("set cookie");
          state.userStatus = 'success';
        }
      )
      .addCase(TokenExchangeAndRegisterUser.rejected, (state, action) => {
        state.userStatus = 'failed';
        state.userError = action.error.message || 'An error occurred.';
        state.isAuthenticated = false;
        setCookies('isAuthenticated', 'false');
      })
      .addCase(UserFormSignIn.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(UserFormSignIn.fulfilled, (state: any, action: any) => {
        console.log('fullfilled');
        console.log(action.payload);

        if (action.payload[0] == 200) {
          state.isAuthenticated = true;
          state.user_google_cred = [];
          // console.log(
          //   "TokenExchangeAndRegisterUser",
          //   action.payload[1]["access_token"]["access_token"]
          // );
          state.user_token = {
            jwt_access_token: action.payload[1]['access_token'],
            jwt_refresh_token: action.payload[1]['refresh_token'],
          };
          setCookies('isAuthenticated', 'true');
          // console.log("set cookie");
          state.userStatus = 'success';
          state.userError = '';
        } else {
          state.userStatus = 'failed';
          state.userError = action.payload[1];
          setCookies('isAuthenticated', 'false');
        }
        console.log(state.userStatus);
        console.log(state.userError);
      })
      .addCase(UserFormSignIn.rejected, (state, action) => {
        console.log('rejected');

        state.userStatus = 'failed';
        state.userError = action.error.message || 'An error occurred.';
        state.isAuthenticated = false;
        setCookies('isAuthenticated', 'false');
      })
      .addCase(GetAccessTokenUsingRefreshToken.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(GetAccessTokenUsingRefreshToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user_google_cred = action.payload;
      })
      .addCase(GetAccessTokenUsingRefreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userStatus = 'failed';
        state.userError = action.error.message || 'An error occurred.';
      });
  },
});
export const {
  /* any additional reducers */
  setUserStateToInitial,
} = userSlice.actions;

export default userSlice.reducer;
