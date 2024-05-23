import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArchivedMail } from "../../../../../lib/all-api/all_api";
import axios from "axios";
import { useAppSelector } from "../../STORE/store";
import { json } from "stream/consumers";
import { headers } from "next/headers";
export const get_user_credentials_in_axios_header = () => {
  let user_cred: any = localStorage.getItem("persist:user");
  user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
  console.log(user_cred["jwt_access_token"]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
  };
  return headers;
};
export const fetchMessages: any = createAsyncThunk(
  "messages/fetchMessages",
  async (args: any, thunkAPI) => {
    // console.log("slice called");

    // const { user_token } = useAppSelector((state) => state.user);
    // console.log(user_token);
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    // const object1: any = new Object(user_cred);
    // console.log(object1["jwt_access_token"]);

    try {
      let { queryLabel, page }: any = args;
      // const { jwt_access_token } = user_token;

      queryLabel = queryLabel.replace(/%20/g, " ");
      // console.log(user_token, creds);
      const headers = get_user_credentials_in_axios_header();
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${jwt_access_token} `,
      // };
      console.log(headers);

      const url = "http://127.0.0.1:8000/api/mailreadfromdb/";
      const response = await axios.get(url, {
        params: {
          query_type: queryLabel,
          page: page,
        },
        headers,
      });
      console.log(response.status);
      console.log(response.data.results);
      if (response.status == 200) {
        return [response.data.results, response.data.count];
      }
    } catch (e: any) {
      console.log(e.response.status);

      return e.response;
      throw new Error(`${e.message})}`);
    }
  }
);

export const mailArchived = createAsyncThunk(
  "messages/mailarchive",
  async (message_id: string) => {
    // const res = await ArchivedMail(message_id);
    // console.log(res);
    // return res;
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/mailarchived/?message_id=${message_id}`
      );
      console.log(res.data);
      console.log(res.status);

      console.log("archived....");

      return res.status;
    } catch (error: any) {
      console.log(error.response.status);
      // console.log(error);
      console.log(error.message);
      return error.response.status;
    }
  }
);
export const mailDelete = createAsyncThunk(
  "messages/mailDelete",
  async (message_id: string) => {
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
    // };
    const headers = get_user_credentials_in_axios_header();
    const url = "http://127.0.0.1:8000/api/maildelete/";
    const response = await axios.delete(url, {
      params: {
        message_id: message_id,
      },
      headers,
    });
    console.log(response);

    return response;
  }
);
export const ComposeMail: any = createAsyncThunk(
  "messages/composeMail",
  async (args: any, thunkAPI) => {
    console.log("slice called");
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    try {
      console.log(args);
      const mailData = JSON.stringify(args);
      console.log("mailData", mailData);
      const headers = get_user_credentials_in_axios_header();
      const url = "http://127.0.0.1:8000/api/composemail/";
      const response = await axios.post(url, mailData, {
        headers,
      });
      // console.log("response", response.data);
      console.log(response);
      return response;
    } catch (e: any) {
      // console.log(e.message);
      console.log(e.response);
      console.log(e.response);
      return e.response;

      // console.log(e.message.code);
      // console.log(e.message.response);

      // throw new Error(`${e.message})}`);
    }
  }
);
export const predictMail: any = createAsyncThunk(
  "messages/predictMail",
  async (args: any, thunkAPI) => {
    // console.log("slice called");
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    try {
      // console.log(args);
      const mailBody = JSON.stringify(args);
      console.log("mailData", mailBody);

      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
      // };
      const headers = get_user_credentials_in_axios_header();
      const url = "http://127.0.0.1:8000/model/predict/";
      const response = await axios.post(url, mailBody, {
        headers,
      });
      console.log("main response", response);
      console.log("response", response.data);
      console.log(response.status);
      return response;
      // const res =
      //   response.status == 200 && "error" in response.data
      //     ? { bodyValidation: false }
      //     : { isMailSpam: response.data["is_spam"] };
      // return res;
    } catch (e: any) {
      console.log(e.message);
      console.log(e.response);
      return e.response;

      throw new Error(`${e.message})}`);
    }
  }
);
export const reportSpam: any = createAsyncThunk(
  "messages/reportMail",
  async (args: any, thunkAPI) => {
    const { message_id, spamMailFeedBack, message_body } = args;
    console.log(message_id);
    console.log("spam_label", spamMailFeedBack);
    console.log("message_body", message_body);

    // return 0;

    const headers = get_user_credentials_in_axios_header();
    const url = "http://127.0.0.1:8000/model/feedback/";
    const spamDataToPost = {
      message_id: message_id,
      spam_label: spamMailFeedBack,
      message_body: message_body,
    };
    try {
      const response = await axios.post(url, spamDataToPost, { headers });
      console.log(response);
    } catch (error: any) {
      console.log(error.response.status);
    }
  }
);
