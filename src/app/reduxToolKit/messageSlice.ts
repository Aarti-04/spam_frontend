import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for message slice
const initialState = {
  messages: [],
  status: "idle",
  error: "",
};

// Define the async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (args: any, thunkAPI) => {
    try {
      console.log("message slice called");

      let { user_token, creds, queryLabel }: any = args;
      console.log(user_token, creds);

      const { access_token } = creds;
      const { refresh_token } = creds;
      console.log(refresh_token);
      console.log(access_token);
      const { jwt_access_token } = user_token;
      console.log(jwt_access_token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_access_token} `,
      };
      const url = "http://127.0.0.1:8000/api/mailread/";
      queryLabel = queryLabel;
      // const accessToken = access_token;
      const response = await axios.get(url, {
        params: {
          querylable: queryLabel,
          msglimit: 10,
        },
        headers,
      });

      console.log(response);
      console.log(typeof response.data);

      if (!(typeof response.data == "object")) {
        throw new Error("Failed to fetch messages");
      }
      return response.data;
    } catch (e: any) {
      throw new Error(`${e.message})}`);
    }

    // const data = await response.json();
  }
);

// Create the message slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);

        state.messages = action.payload;

        state.error = "";
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
        state.messages = [];
      });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
} = messageSlice.actions;
export default messageSlice.reducer;
