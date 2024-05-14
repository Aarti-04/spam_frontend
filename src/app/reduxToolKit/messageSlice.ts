import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mailArchived } from "./MESSAGE-THUNK/messageslicethunk";
import { access } from "fs";
// import { ArchivedMail } from "../../../lib/all-api/all_api";

// Define the initial state for message slice
interface initialStateType {
  messages: Array<object>;
  isArchived: boolean;
  messageCount: number;
  status: string;
  error: string;
}
const initialState: initialStateType = {
  messages: [],
  isArchived: false,
  messageCount: 0,
  status: "idle",
  error: "",
};

// Define the async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (args: any, thunkAPI) => {
    try {
      console.log("message slice called");

      let { user_token, creds, queryLabel, page }: any = args;
      console.log(user_token, creds);

      const { access_token } = creds;
      const { refresh_token } = creds;
      console.log(access_token);
      const { jwt_access_token } = user_token;
      console.log(jwt_access_token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_access_token} `,
      };
      const url = "http://127.0.0.1:8000/api/mailreadfromdb/";
      queryLabel = queryLabel;

      // const accessToken = access_token;
      const response = await axios.get(url, {
        params: {
          query_type: queryLabel,
          // msglimit: 30,
          page: page,
          page_size: 15,
        },
        headers,
      });

      console.log(response);
      console.log(response.data.count);
      console.log(response.data.results);

      if (!(typeof response.data == "object")) {
        throw new Error("Failed to fetch messages");
      }
      return [response.data.results, response.data.count];
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

        state.messages = action.payload[0];
        state.messageCount = action.payload[1];
        state.error = "";
      })
      .addCase(mailArchived.fulfilled, (state, action: any) => {
        console.log(action.payload);

        state.isArchived = true;
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
