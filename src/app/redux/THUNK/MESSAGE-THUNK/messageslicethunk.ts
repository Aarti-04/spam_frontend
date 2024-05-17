import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArchivedMail } from "../../../../../lib/all-api/all_api";
import axios from "axios";
import { useAppSelector } from "../../STORE/store";
import { json } from "stream/consumers";

export const fetchMessages: any = createAsyncThunk(
  "messages/fetchMessages",
  async (args: any, thunkAPI) => {
    // console.log("slice called");

    // const { user_token } = useAppSelector((state) => state.user);
    // console.log(user_token);
    let user_cred: any = localStorage.getItem("persist:user");
    user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    console.log(user_cred["jwt_access_token"]);
    // const object1: any = new Object(user_cred);
    // console.log(object1["jwt_access_token"]);

    try {
      let { user_token, creds, queryLabel, page }: any = args;
      const { jwt_access_token } = user_token;

      queryLabel = queryLabel.replace(/%20/g, " ");
      console.log(user_token, creds);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_access_token} `,
      };
      const url = "http://127.0.0.1:8000/api/mailreadfromdb/";
      const response = await axios.get(url, {
        params: {
          query_type: queryLabel,
          page: page,
        },
        headers,
      });
      // const url = "http://127.0.0.1:8000/api/mailread/";
      // const response = await axios.get(url, {
      //   headers,
      // });

      // console.log(response);
      console.log(response.status);
      console.log(response.data.results);
      if (response.status == 200) {
        return [response.data.results, response.data.count];
      }
    } catch (e: any) {
      throw new Error(`${e.message})}`);
    }
  }
);

export const mailArchived = createAsyncThunk(
  "messages/mailarchive",
  async (message_id: string) => {
    const res = await ArchivedMail(message_id);
    console.log(res);

    return res;
  }
);
export const mailDelete = createAsyncThunk(
  "messages/mailarchive",
  async (message_id: string) => {
    // const res = await ArchivedMail(message_id);
    // console.log(res);
    let user_cred: any = localStorage.getItem("persist:user");
    user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    console.log(user_cred["jwt_access_token"]);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
    };
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
    // console.log("slice called");

    // const { user_token } = useAppSelector((state) => state.user);
    // console.log(user_token);
    let user_cred: any = localStorage.getItem("persist:user");
    user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    console.log(user_cred["jwt_access_token"]);
    // const object1: any = new Object(user_cred);
    // console.log(object1["jwt_access_token"]);

    try {
      // let { user_token, creds, queryLabel, page }: any = args;
      // const { jwt_access_token } = user_token;
      let { header, recipient, body } = args;
      console.log(args);
      const mailData = JSON.stringify(args);
      // queryLabel = queryLabel.replace(/%20/g, " ");
      // console.log(user_token, creds);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
      };
      const url = "http://127.0.0.1:8000/api/composemail/";
      const response = await axios.post(url, mailData, {
        headers,
      });
      // const url = "http://127.0.0.1:8000/api/mailread/";
      // const response = await axios.get(url, {
      //   headers,
      // });

      console.log(response);
      console.log(response.status);
      // console.log(response.data.results);
      if (response.status == 200) {
        // return [response.data.results, response.data.count];
      }
    } catch (e: any) {
      throw new Error(`${e.message})}`);
    }
  }
);
