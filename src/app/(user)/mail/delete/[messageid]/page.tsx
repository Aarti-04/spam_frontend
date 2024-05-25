"use client";
import ConfirmationDialogBox from "@/components/DialogBoxes/ConfirmationDialogBox";
import { useAppDispatch } from "@/app/redux/STORE/store";
import { mailDelete } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [open, setOPen] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const message_id = pathname.split("/")[3];
  // console.log(message_id);
  const confirmDeleteHandler = async (confirmDelete: boolean) => {
    setOPen(!open);
    if (confirmDelete) {
      const res = await dispatch(mailDelete(message_id));
      if (res) {
        router.push("/mail/inbox");
      }
    } else {
      router.push("/mail/inbox");
    }
  };

  return (
    <ConfirmationDialogBox
      open={open}
      setOpen={confirmDeleteHandler}
      message="Really want to delete message"
    ></ConfirmationDialogBox>
  );
};

export default page;
