"use client";
import AlertButton from "@/app/components/Alert";
import ConfirmationDialogBox from "@/app/components/DialogBoxes/ConfirmationDialogBox";
import { reportMail } from "@/app/redux/SLICE/MessageSlice/messageSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { reportSpam } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const reportSpamPath = usePathname();
  console.log(reportSpamPath);

  const message_id = reportSpamPath.split("/")[3];
  console.log(message_id);
  const { spamMailFeedBack } = useAppSelector((state) => state.message);
  const [openSpamConfirmation, setOpenSpamConfirmation] =
    useState<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const SpamConfirmationHandler = async (spamConfirmation: boolean) => {
    setOpenSpamConfirmation(!openSpamConfirmation);
    console.log(spamConfirmation);

    if (spamConfirmation) {
      dispatch(reportMail(spamConfirmation));
      await dispatch(reportSpam({ message_id, spam_label: spamMailFeedBack }));
    }
    router.back();
  };
  return (
    <ConfirmationDialogBox
      open={openSpamConfirmation}
      setOpen={SpamConfirmationHandler}
      message="Really want to report a mail as Spam Mail"
    ></ConfirmationDialogBox>
  );
};

export default page;
