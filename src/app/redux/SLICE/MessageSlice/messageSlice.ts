import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ComposeMail,
  fetchMessages,
  mailArchived,
  predictMail,
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
  mailComposedOrNot: boolean;
  ComposeMailStatus: string;
  ComposeMailError: string;
  emailBodyValidation: boolean;
  predictedEmailStatus: string;
  predictedEmailError: string;
  predictedEmailIsSpamOrNot: boolean | string;
  spamMailFeedBack: string;
}
const initialState: initialStateType = {
  messages: [],
  isArchived: false,
  messageCount: 0,
  messageStatus: "idle",
  messageError: "",
  emailSend: false,
  mailComposedOrNot: false,
  ComposeMailStatus: "",
  ComposeMailError: "",
  emailBodyValidation: false,
  predictedEmailStatus: "",
  predictedEmailError: "",
  predictedEmailIsSpamOrNot: "",
  spamMailFeedBack: "",
};

// Create the message slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reportMail(state, action) {
      if (action.payload) state.spamMailFeedBack = "spam";
      else state.spamMailFeedBack = "ham";
    },
    setPredictedStateToInitial(state) {
      state.predictedEmailStatus = "";
      state.predictedEmailIsSpamOrNot = "";
      state.predictedEmailError = "";
      console.log("set all to initial");
    },

    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(ComposeMail.pending, (state) => {
        console.log("loading state");
        state.ComposeMailStatus = "loading";
        state.mailComposedOrNot = false;
        state.ComposeMailError = "";
      })
      .addCase(ComposeMail.fulfilled, (state, action: any) => {
        console.log(action.payload);
        console.log(action.payload.status);
        if (action.payload.status == 200) {
          state.ComposeMailStatus = "success";
          state.mailComposedOrNot = true;
          state.ComposeMailError = "";
        } else {
          state.ComposeMailStatus = "rejected";
          state.mailComposedOrNot = false;
          state.ComposeMailError = action.payload.data.error;
        }
        console.log(state.ComposeMailStatus);
      })
      .addCase(ComposeMail.rejected, (state, action: any) => {
        state.ComposeMailStatus = "rejected";
        state.mailComposedOrNot = false;
        state.ComposeMailError = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        console.log("loading state", state);

        state.messageStatus = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("fulfilled state", action.payload);
        if (action.payload.status == 401) {
          state.messageError = "Not Authenticated please login";
          state.messageStatus = "failed";
          state.messages = [];
        } else {
          state.messageStatus = "succeeded";
          console.log(action.payload[0]);

          state.messages = action.payload[0];
          state.messageCount = action.payload[1];
          state.messageError = "";
          console.log(state.messages);
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        console.log("failed");

        state.messageStatus = "failed";
        state.messageError = action.error.message || "";
        state.messages = [];
      })
      .addCase(mailArchived.pending, (state, action: any) => {
        console.log(action.payload);
        state.isArchived = false;
      })
      .addCase(mailArchived.fulfilled, (state, action: any) => {
        console.log(action.payload);
        if (action.payload == 200) state.isArchived = true;
        else state.isArchived = false;
        console.log("is archived", state.isArchived);
      })
      .addCase(mailArchived.rejected, (state, action: any) => {
        console.log(action.payload);
        state.isArchived = false;
        console.log("is archived", state.isArchived);
      })
      .addCase(predictMail.pending, (state, action: any) => {
        console.log("pending");

        console.log(action.payload);
        state.predictedEmailStatus = "loading";
      })
      .addCase(predictMail.fulfilled, (state, action: any) => {
        console.log(action.payload);
        console.log("fulfilled");

        if (action.payload.status == 200) {
          state.predictedEmailIsSpamOrNot = action.payload.data.is_spam;
          state.predictedEmailError = "";
          state.predictedEmailStatus = "success";
          state.spamMailFeedBack = "spam";
        } else {
          state.predictedEmailStatus = "successwithError";
          state.predictedEmailError = action.payload.data.error;
        }
        console.log(state.predictedEmailStatus);
        console.log(state.predictedEmailIsSpamOrNot);
      })
      .addCase(predictMail.rejected, (state, action: any) => {
        console.log(action.payload);
        console.log("rejected");

        state.predictedEmailStatus = "rejected";
      });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
  reportMail,
  setPredictedStateToInitial,
} = messageSlice.actions;
export default messageSlice.reducer;
