import { createAsyncThunk } from "@reduxjs/toolkit";

export const MailReadingService = createAsyncThunk(
  "messages/fetchMessages",
  async (user_token: string, thunkAPI) => {
    try {
      //   console.log(user_token);

      const newSocket: any = new WebSocket(
        `ws://localhost:8000/mailread/?access_token=${user_token}`
      );
      console.log("socket slice called");

      // console.log(response);
      // console.log(response.data.count);
      // console.log(response.data.results);

      // if (!(typeof response.data == "object")) {
      //   throw new Error("Failed to fetch messages");
      // }
      // return [response.data.results, response.data.count];
      return newSocket;
    } catch (e: any) {
      throw new Error(`${e.message})}`);
    }
  }
);
