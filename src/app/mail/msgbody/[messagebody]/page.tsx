"use client";
import MailBody from "@/app/components/EmailBody/MailBody";
import { useAppSelector } from "@/app/redux/STORE/store";
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

  const { messages, messageStatus, messageError } = useAppSelector(
    (state) => state.message
  );
  console.log(messages);

  // let localMessages: any = localStorage.getItem("persist:message");
  // console.log(localMessages);

  // localMessages = JSON.parse(JSON.parse(localMessages || "")["messages"]);
  // console.log(messages);

  const message_body: any = messages?.find(
    (obj: any) => obj.message_id === message_id
  );
  console.log(message_body);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <List>
        <ListItem>
          <MailBody
            encodedHtml={message_body?.body}
            header={message_body?.header}
            message_id={message_body?.id}
            sender={message_body?.sender}
            spamOrNot={message_body?.spam == true}
          ></MailBody>
        </ListItem>
      </List>
    </Box>
  );
}

export default page;
