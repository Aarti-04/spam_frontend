import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ComposeMail,
  fetchMessages,
  mailArchived,
} from "../../THUNK/MESSAGE-THUNK/messageslicethunk";
import { access } from "fs";
// import { ArchivedMail } from "../../../lib/all-api/all_api";

// Define the initial state for message slice
interface initialStateType {
  messages: Array<object>;
  isArchived: boolean;
  messageCount: number;
  messageStatus: string;
  messageError: string;
  emailSend: boolean;
}
const initialState: initialStateType = {
  messages: [],
  isArchived: false,
  messageCount: 0,
  messageStatus: "idle",
  messageError: "",
  emailSend: false,
};

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
        console.log("loading state", state);

        state.messageStatus = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("fulfilled state", state);

        state.messageStatus = "succeeded";
        console.log(action.payload[0]);

        state.messages = action.payload[0];
        state.messageCount = action.payload[1];
        state.messageError = "";
        console.log(state.messages);
      })
      .addCase(mailArchived.fulfilled, (state, action: any) => {
        console.log(action.payload);
        state.emailSend = true;
      })
      .addCase(ComposeMail.fulfilled, (state, action: any) => {
        console.log(action.payload);

        state.isArchived = true;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.messageStatus = "failed";
        state.messageError = action.error.message || "";
        state.messages = [];
      });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
} = messageSlice.actions;
export default messageSlice.reducer;
