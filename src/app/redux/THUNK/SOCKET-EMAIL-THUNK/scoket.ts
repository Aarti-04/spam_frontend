import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_user_credentials_in_axios_header } from "../MESSAGE-THUNK/messageslicethunk";

export const MailReadingService = createAsyncThunk(
  "emailSocket/MailReadingService",
  async (thunkAPI) => {
    console.log("socket slice called");
    try {
      let user_cred: any = localStorage.getItem("persist:user");
      user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
      console.log(user_cred["jwt_access_token"]);
      const mailReadingSocket: any = new WebSocket(
        `ws://localhost:8000/mailread/?access_token=${user_cred["jwt_access_token"]}`
      );
      let new_mail_count = 0;
      mailReadingSocket.onmessage = function (e: any) {
        new_mail_count = JSON.parse(e.data);
        console.log("new_mail_count", new_mail_count);
      };
      return new_mail_count;
      // console.log(mailReadingSocket);
    } catch (e: any) {
      return e.response;
      throw new Error(`${e.message})}`);
    }
  }
);
