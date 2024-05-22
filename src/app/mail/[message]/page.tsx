"use client";
import Middle from "@/app/components/MiddleAllHeader/Middle";
import { Box } from "@mui/system";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const messagePage = usePathname();
  const pageToCall =
    messagePage.split("/")[2] == "All%20Mail"
      ? "All Mail"
      : messagePage.split("/")[2];
  console.log("pageToCall", pageToCall);

  return (
    <Box
      sx={{
        // height: "",

        // Responsive styles
        "@media (max-width: 600px)": {
          // Styles for small screens (e.g., phones)
          marginTop: "1rem",
        },
        "@media (min-width: 601px) and (max-width: 1024px)": {
          // Styles for medium screens (e.g., tablets)
          marginTop: "1rem",
        },
        "@media (min-width: 1025px)": {
          // Styles for large screens (e.g., desktops)
          marginTop: "1rem",
        },
      }}
      // position="fixed"
    >
      <Middle mailSectionLabel={pageToCall}></Middle>
    </Box>
  );
};

export default Page;
