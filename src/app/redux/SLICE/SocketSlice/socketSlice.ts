import { createSlice } from "@reduxjs/toolkit";
import { MailReadingService } from "../../THUNK/SOCKET-EMAIL-THUNK/scoket";

// Define the initial state for message slice
const initialState = {
  socket: "",
  socketStatus: "idle",
  socketError: "",
};

// Create the message slice
const socketSlice = createSlice({
  name: "emailSocket",
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(MailReadingService.pending, (state) => {
        state.socketStatus = "loading";
      })
      .addCase(MailReadingService.fulfilled, (state, action) => {
        console.log(action.payload);
        state.socket = action.payload;
        state.socketStatus = "success";
        state.socketError = "";
      })
      .addCase(MailReadingService.rejected, (state, action) => {
        state.socketStatus = "failed";
        state.socketError = action.error.message || "";
        state.socket = "";
      });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
} = socketSlice.actions;
export default socketSlice.reducer;
