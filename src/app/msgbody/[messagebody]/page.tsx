"use client";
import MailBody1 from "@/app/components/MailBody1";
import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const router = useRouter();
  const messageId = usePathname();
  console.log(messageId);
  const id = messageId.split("/")[2];

  const { messages, status, error } = useSelector(
    (state: any) => state.message
  );
  let mbody = "";
  let mSnnipet = "";
  const message_body = messages.find((obj: any) => obj.message_id === id);
  console.log(message_body);

  if (message_body) {
    mbody = message_body.body;
    mSnnipet = message_body.snippet;
  }
  console.log(mbody);

  return (
    <Box sx={{ margin: "2rem" }}>
      <List>
        <ListItem>
          <MailBody1 encodedHtml={mbody} snnipet={mSnnipet}></MailBody1>
        </ListItem>
      </List>
    </Box>
  );
}

export default page;
