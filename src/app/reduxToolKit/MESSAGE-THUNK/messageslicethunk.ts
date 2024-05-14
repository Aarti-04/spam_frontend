import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArchivedMail } from "../../../../lib/all-api/all_api";

export const mailArchived = createAsyncThunk(
  "messages/mailarchive",
  async (message_id: string) => {
    const res = await ArchivedMail(message_id);
    console.log(res);

    return res;
  }
);
