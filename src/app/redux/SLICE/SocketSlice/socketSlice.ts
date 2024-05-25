import { createSlice } from "@reduxjs/toolkit";
import { MailReadingService } from "../../THUNK/SOCKET-EMAIL-THUNK/scoket";

// Define the initial state for message slice
interface SocketStateType {
  new_mail_count: number;
}
const initialState = {
  new_mail_count: 0,
};

// Create the message slice
const socketSlice = createSlice({
  name: "emailSocket",
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(MailReadingService.fulfilled, (state, action: any) => {
      // console.log(action.payload);
      state.new_mail_count = action.payload;
    });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
} = socketSlice.actions;
export default socketSlice.reducer;
