"use client";
import AlertButton from "@/components/Alert";
import ConfirmationDialogBox from "@/components/DialogBoxes/ConfirmationDialogBox";
import { reportMail } from "@/app/redux/SLICE/MessageSlice/messageSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { reportSpam } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const reportSpamPath = usePathname();
  // console.log(reportSpamPath);

  const message_id = reportSpamPath.split("/")[3];
  // console.log(message_id);
  const { spamMailFeedBack, spamReportStatus } = useAppSelector(
    (state) => state.message
  );
  const [openSpamConfirmation, setOpenSpamConfirmation] =
    useState<boolean>(true);
  // const [spamMailFeedBack,setSpamFeedBack] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  // console.log("spamReportStatus", spamReportStatus);

  const SpamConfirmationHandler = async (spamConfirmation: boolean) => {
    setOpenSpamConfirmation(!openSpamConfirmation);
    // console.log(spamConfirmation);

    if (spamConfirmation) {
      dispatch(reportMail(spamConfirmation));
    }
    router.back();
  };
  useEffect(() => {
    (async () => {
      if (spamMailFeedBack !== "") {
        await dispatch(reportSpam({ message_id, spamMailFeedBack }));
      }
      if (spamReportStatus == "success")
        toast.success("Thank you for feedback");
    })();
  }, [spamMailFeedBack]);
  return (
    <>
      <ToastContainer></ToastContainer>
      <ConfirmationDialogBox
        open={openSpamConfirmation}
        setOpen={SpamConfirmationHandler}
        message="Really want to report a mail as Spam Mail"
      ></ConfirmationDialogBox>
    </>
  );
};

export default page;
