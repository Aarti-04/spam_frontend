import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArchivedMail } from '../../../../../lib/all-api/all_api';
import axios from 'axios';
import { useAppSelector } from '../../STORE/store';
import { json } from 'stream/consumers';
import { headers } from 'next/headers';
import { Search } from '@mui/icons-material';
export const get_user_credentials_in_axios_header = () => {
  let user_cred: any = localStorage.getItem('persist:user');
  user_cred = JSON.parse(JSON.parse(user_cred || '')['user_token']);
  // console.log(user_cred["jwt_access_token"]);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user_cred['jwt_access_token']} `,
  };
  return headers;
};
export const fetchMessages: any = createAsyncThunk(
  'messages/fetchMessages',
  async (args: any, thunkAPI) => {
    // console.log("slice called");

    try {
      let { queryLabel, page, itemsPerPage }: any = args || '';
      // const { jwt_access_token } = user_token;
      if (queryLabel) queryLabel = queryLabel.replace(/%20/g, ' ') || '';
      // console.log(user_token, creds);
      const headers = get_user_credentials_in_axios_header();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/mailreadfromdb/`;
      const response = await axios.get(url, {
        params: {
          query_type: queryLabel,
          page: page,
          per_page_total_data: itemsPerPage,
        },
        headers,
      });
      // console.log(response);
      return response;
      if (response.status == 200) {
        return [response.data.results, response.data.count];
      }
    } catch (e: any) {
      // console.log(e.respons);
      // console.log(e.message);
      return e.response || e.message;
      throw new Error(`${e.message})}`);
    }
  }
);
export const FilterMessages: any = createAsyncThunk(
  'messages/filterMessage',
  async (args: any, thunkAPI) => {
    try {
      console.log(args);
      let dataTosearch = '';
      // let search = '';
      const headers = get_user_credentials_in_axios_header();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/mailsearchfilter/`;

      // if (query_type) query_type = query_type.replace(/%20/g, ' ') || '';
      const response = await axios.get(url, {
        params: {
          ...args,

          // query_type: query_type,
        },
        headers,
      });
      // console.log(response);
      // console.log(response.data.results);
      // console.log("response", response);
      // console.log(response.data);
      console.log(response.data.results);
      return response;
      // return response.data;
      if (response.status == 200) {
        return [response.data.results, response.data.count];
      }
    } catch (e: any) {
      // console.log(e.respons);
      console.log('e.message', e.message);

      return e.response || e.message;
      throw new Error(`${e.message})}`);
    }
  }
);

export const mailArchived = createAsyncThunk(
  'messages/mailarchive',
  async (message_id: string) => {
    // const res = await ArchivedMail(message_id);
    // console.log(res);
    // return res;
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mailarchived/?message_id=${message_id}`
      );
      // console.log(res.data);
      // console.log(res.status);

      // console.log("archived....");

      return res.status;
    } catch (error: any) {
      // console.log(error.response.status);
      // console.log(error);
      // console.log(error.message);
      return error.response.status;
    }
  }
);
export const mailDelete = createAsyncThunk(
  'messages/mailDelete',
  async (message_id: string) => {
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
    // };
    const headers = get_user_credentials_in_axios_header();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/maildelete/`;
    const response = await axios.delete(url, {
      params: {
        message_id: message_id,
      },
      headers,
    });
    // console.log(response);

    return response;
  }
);
export const ComposeMail: any = createAsyncThunk(
  'messages/composeMail',
  async (args: any, thunkAPI) => {
    // console.log("slice called");
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    try {
      // console.log(args);
      const mailData = JSON.stringify(args);
      // console.log("mailData", mailData);
      const headers = get_user_credentials_in_axios_header();
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/composemail/`;
      const response = await axios.post(url, mailData, {
        headers,
      });
      // console.log("response", response.data);
      // console.log(response);
      return response;
    } catch (e: any) {
      // console.log(e.message);
      // console.log(e.response);
      // console.log(e.response);
      return e.response.status;

      // console.log(e.message.code);
      // console.log(e.message.response);

      // throw new Error(`${e.message})}`);
    }
  }
);
export const predictMail: any = createAsyncThunk(
  'messages/predictMail',
  async (args: any, thunkAPI) => {
    // console.log("slice called");
    // let user_cred: any = localStorage.getItem("persist:user");
    // user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
    // console.log(user_cred["jwt_access_token"]);
    try {
      // console.log(args);
      const mailBody = JSON.stringify(args);
      // console.log("mailData", mailBody);

      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${user_cred["jwt_access_token"]} `,
      // };
      const headers = get_user_credentials_in_axios_header();
      const url = `${process.env.NEXT_PUBLIC_BASE_MODEL_URL}/predict/`;
      const response = await axios.post(url, mailBody, {
        headers,
      });
      // console.log("main response", response);
      // console.log("response", response.data);
      // console.log(response.status);
      return response;
      // const res =
      //   response.status == 200 && "error" in response.data
      //     ? { bodyValidation: false }
      //     : { isMailSpam: response.data["is_spam"] };
      // return res;
    } catch (e: any) {
      // console.log(e.message);
      // console.log(e.response);
      return e.response;

      throw new Error(`${e.message})}`);
    }
  }
);
export const reportSpam: any = createAsyncThunk(
  'messages/reportMail',
  async (args: any, thunkAPI) => {
    const { message_id, spamMailFeedBack, message_body } = args;
    // console.log(message_id);
    // console.log("spam_label", spamMailFeedBack);
    // console.log("message_body", message_body);

    // return 0;

    const headers = get_user_credentials_in_axios_header();
    const url = `${process.env.NEXT_PUBLIC_BASE_MODEL_URL}/feedback/`;
    const spamDataToPost = {
      message_id: message_id,
      spam_label: spamMailFeedBack,
      message_body: message_body,
    };
    try {
      const response = await axios.post(url, spamDataToPost, { headers });
      // console.log(response);
      return response;
    } catch (error: any) {
      return error.response.status;
    }
  }
);
