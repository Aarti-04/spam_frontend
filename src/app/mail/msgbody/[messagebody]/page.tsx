"use client";
import MailBody from "@/app/components/EmailBody/MailBody";
import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const router = useRouter();
  const messageIdData = usePathname();
  console.log(messageIdData);
  const message_id = messageIdData.split("/")[3];
  console.log(message_id);

  const { messages, status, error } = useSelector(
    (state: any) => state.message
  );
  let mbody = "";
  let mSnnipet = "";
  const message_body = messages.find(
    (obj: any) => obj.message_id === message_id
  );
  console.log(message_body);

  if (message_body) {
    mbody = message_body.body;
    mSnnipet = message_body.snippet;
  }
  // console.log(mbody);

  return (
    <Box>
      <List>
        <ListItem>
          <MailBody
            encodedHtml={mbody}
            snnipet={mSnnipet}
            message_id={message_body.id}
          ></MailBody>
        </ListItem>
      </List>
    </Box>
  );
}

export default page;
