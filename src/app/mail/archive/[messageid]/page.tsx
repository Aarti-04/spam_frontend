"use client";
import { mailArchived } from "@/app/reduxToolKit/MESSAGE-THUNK/messageslicethunk";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch: any = useDispatch();
  const pathname = usePathname();
  console.log(pathname);
  const message_id = pathname.split("/")[3];
  console.log(message_id);
  let res = "";
  useEffect(() => {
    res = dispatch(mailArchived(message_id));
  }, []);
  console.log(res);

  return <div>page</div>;
};

export default page;
