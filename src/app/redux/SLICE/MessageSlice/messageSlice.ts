import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ComposeMail,
  fetchMessages,
  mailArchived,
  predictMail,
  reportSpam,
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

  ComposeMailStatus: string;
  ComposeMailError: string;
  emailBodyValidation: boolean;
  predictedEmailStatus: string;
  predictedEmailError: string;
  predictedEmailIsSpamOrNot: boolean | string;
  spamMailFeedBack: string;
  spamReportFeedBack: string;
  spamReportStatus: string;
}
const initialState: initialStateType = {
  messages: [],
  isArchived: false,
  messageCount: 0,
  messageStatus: "idle",
  messageError: "",
  emailSend: false,
  ComposeMailStatus: "",
  ComposeMailError: "",
  emailBodyValidation: false,
  predictedEmailStatus: "",
  predictedEmailError: "",
  predictedEmailIsSpamOrNot: "",
  spamMailFeedBack: "",
  spamReportFeedBack: "",
  spamReportStatus: "",
};

// Create the message slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reportMail(state, action) {
      if (action.payload) state.spamMailFeedBack = "spam";
      else state.spamMailFeedBack = "ham";
      // console.log(state.spamMailFeedBack);
    },
    setPredictedStateToInitial(state) {
      state.predictedEmailStatus = "";
      state.predictedEmailIsSpamOrNot = "";
      state.predictedEmailError = "";
      state.ComposeMailStatus = "idel";
      state.ComposeMailError = "";
      // console.log("all set to initial");
    },

    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(ComposeMail.pending, (state) => {
        // console.log("loading state");
        state.ComposeMailStatus = "loading";

        state.ComposeMailError = "";
      })
      .addCase(ComposeMail.fulfilled, (state, action: any) => {
        // console.log(action.payload);
        // console.log(action.payload.status);
        if (action.payload.status == 200) {
          state.ComposeMailStatus = "success";

          state.ComposeMailError = "";
        } else {
          state.ComposeMailStatus = "rejected";

          state.ComposeMailError = action.payload.data.error;
        }
        // console.log("state.ComposeMailStatus", state.ComposeMailStatus);
      })
      .addCase(ComposeMail.rejected, (state, action: any) => {
        state.ComposeMailStatus = "rejected";
        state.ComposeMailError = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        // console.log("loading state", state);

        state.messageStatus = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        // console.log("fulfilled state", action.payload.status);
        if (action.payload.status == 200) {
          state.messageStatus = "success";
          state.messages = action.payload.data.results;
          state.messageCount = action.payload.data.count;
          state.messageError = "";
        } else {
          if (action.payload.status == 401) {
            state.messageError = "Authentication failed please login";
          } else {
            state.messageError =
              action.payload.error || action.payload || "something went wrong";
          }
          state.messageStatus = "failed";
          state.messages = [];
        }
        // console.log(state.messages);
        // console.log(state.messageStatus);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        // console.log("fetchMessages failed");
        state.messageStatus = "failed";
        state.messageError = action.error.message || action.payload || "";
        state.messages = [];
      })
      .addCase(mailArchived.pending, (state, action: any) => {
        // console.log(action.payload);
        state.isArchived = false;
      })
      .addCase(mailArchived.fulfilled, (state, action: any) => {
        // console.log(action.payload);
        if (action.payload == 200) state.isArchived = true;
        else state.isArchived = false;
        // console.log("is archived", state.isArchived);
      })
      .addCase(mailArchived.rejected, (state, action: any) => {
        // console.log(action.payload);
        state.isArchived = false;
        // console.log("is archived", state.isArchived);
      })
      .addCase(predictMail.pending, (state, action: any) => {
        // console.log("pending");

        // console.log(action.payload);
        state.predictedEmailStatus = "loading";
      })
      .addCase(predictMail.fulfilled, (state, action: any) => {
        // console.log(action.payload);
        // console.log("fulfilled");

        if (action.payload.status == 200) {
          state.predictedEmailIsSpamOrNot = action.payload.data.is_spam;
          state.predictedEmailError = "";
          state.predictedEmailStatus = "success";
          // state.spamMailFeedBack = action.payload.data.is_spam;
        } else {
          state.predictedEmailStatus = "rejected";
          state.predictedEmailError = action.payload.data.error;
        }
        // console.log(state.predictedEmailStatus);
        // console.log(state.predictedEmailIsSpamOrNot);
      })
      .addCase(predictMail.rejected, (state, action: any) => {
        // console.log(action.payload);
        // console.log("rejected");

        state.predictedEmailStatus = "rejected";
      })
      .addCase(reportSpam.fulfilled, (state, action: any) => {
        // console.log(action.payload);
        // console.log("fulfilled");

        if (action.payload.status == 200) {
          state.spamReportStatus = "success";
        } else {
          state.spamReportStatus = "Failed";
        }
        // console.log(state.spamReportStatus);
      })
      .addCase(reportSpam.rejected, (state, action: any) => {
        state.spamReportStatus = "rejected";
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
