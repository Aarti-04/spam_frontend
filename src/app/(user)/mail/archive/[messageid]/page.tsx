"use client";
import { mailArchived } from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch: any = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { messages, isArchived, messageCount, status, error } = useSelector(
    (state: any) => state.message
  );
  // console.log(pathname);
  const message_id = pathname.split("/")[3];
  // console.log(message_id);
  let res = "";
  useEffect(() => {
    res = dispatch(mailArchived(message_id));
  });
  console.log(isArchived);

  if (isArchived) {
    router.push("/mail/inbox");
  }
  // console.log(res);

  return <div>page</div>;
};

export default page;
