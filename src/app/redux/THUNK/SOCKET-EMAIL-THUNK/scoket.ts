import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_user_credentials_in_axios_header } from "../MESSAGE-THUNK/messageslicethunk";

export const MailReadingService = createAsyncThunk(
  "messages/fetchMessages",
  async (thunkAPI) => {
    try {
      //   console.log(user_token);
      let user_cred: any = localStorage.getItem("persist:user");
      user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
      console.log(user_cred["jwt_access_token"]);
      const newSocket: any = new WebSocket(
        `ws://localhost:8000/mailread/?access_token=${user_cred["jwt_access_token"]}`
      );
      console.log("socket slice called");

      console.log(newSocket);
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
