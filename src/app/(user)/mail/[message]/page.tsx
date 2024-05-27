"use client";
import Middle from "@/components/MiddleAllHeader/Middle";
import { Box } from "@mui/system";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const MailPageSection = usePathname();
  const [pageToCall, setPageToCall] = useState<string>("");
  useEffect(() => {
    MailPageSection.split("/")[2] == "All%20Mail"
      ? setPageToCall("All Mail")
      : setPageToCall(MailPageSection.split("/")[2]);
  }, [MailPageSection, pageToCall]);
  // console.log("pageToCall", pageToCall);

  return (
    <>
      <div>{pageToCall && <Middle mailSectionLabel={pageToCall}></Middle>}</div>
    </>
  );
};

export default Page;
