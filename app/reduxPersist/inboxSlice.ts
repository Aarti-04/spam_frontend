// inboxSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InboxState {
  mails: Mail[];
  loading: boolean;
  error: string | null;
}

interface Mail {
  id: number;
  subject: string;
  sender: string;
  // Add other mail properties as needed
}

const initialState: InboxState = {
  mails: [],
  loading: false,
  error: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    fetchInboxMailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchInboxMailsSuccess(state, action: PayloadAction<Mail[]>) {
      state.loading = false;
      state.mails = action.payload;
    },
    fetchInboxMailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchInboxMailsStart,
  fetchInboxMailsSuccess,
  fetchInboxMailsFailure,
} = inboxSlice.actions;
export default inboxSlice.reducer;
