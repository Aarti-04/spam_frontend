import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for message slice
const initialState = {
  messages: [],
  status: 'idle',
  error: '',
};

// Define the async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (args:any, thunkAPI) => {
    // const creds = localStorage.getItem("my_token");
    // console.log(cred);
    let { creds, queryLabel }: any = args;
    const { access_token } = creds;
    // console.log(cred["access_token"]);
    console.log(access_token);

    const url = 'http://127.0.0.1:8000/api/mailread/';
    queryLabel = queryLabel;
    const accessToken = access_token;
    const response = await axios.get(url, {
      params: {
        querylable: queryLabel,
        access_token: accessToken,
      },
    });
    console.log(response);

    if (!response.statusText) {
      throw new Error('Failed to fetch messages');
    }
    // const data = await response.json();
    return response.data;
  }
);

// Create the message slice
const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

// Export actions and reducer
export const {
  /* any additional reducers */
} = messageSlice.actions;
export default messageSlice.reducer;
