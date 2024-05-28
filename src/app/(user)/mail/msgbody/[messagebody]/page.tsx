"use client";
import AlertButton from "@/components/Alert";
import MailBody from "@/components/EmailBody/MailBody";
import { useAppSelector } from "@/app/redux/STORE/store";
import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function page() {
  const router = useRouter();
  const messageIdData = usePathname();
  // console.log(messageIdData);
  const message_id = messageIdData.split("/")[3];
  // console.log(message_id);

  const { messages, messageStatus, messageError, spamReportStatus } =
    useAppSelector((state) => state.message);
  // console.log(messages);

  // let localMessages: any = localStorage.getItem("persist:message");
  // console.log(localMessages);

  // localMessages = JSON.parse(JSON.parse(localMessages || "")["messages"]);
  // console.log(messages);

  const message_body: any = messages?.find(
    (obj: any) => obj.message_id === message_id
  );
  // console.log(message_body);
  // console.log(spamReportStatus);
  // useEffect(() => {
  //   if (spamReportStatus === "Failed") {
  // toast.error("Something went wrong Please report again");
  //   } else if (spamReportStatus === "success") {
  //     toast.success("Thank you for feedback");
  //   }
  // }, [spamReportStatus]);
  return (
    <>
      <Box>
        {/* {spamReportStatus == "success" &&
          toast.success("Thank you for feedback")}*/}

        <ToastContainer />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <MailBody
          encodedHtml={message_body?.body}
          header={message_body?.header}
          message_id={message_body?.id}
          sender={message_body?.sender}
          spamOrNot={message_body?.spam == true}
        ></MailBody>
      </Box>
    </>
  );
}

export default page;
