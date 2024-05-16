"use client";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface propsType {
  message_id: string;
}
const BodyUpperSection = ({ message_id }: propsType) => {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          color: "#2f2f2f",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Tooltip title="Back">
                  <ArrowBackIcon onClick={() => router.back()} />
                </Tooltip>
              </IconButton>

              <Link href={`/mail/archive/${message_id}`}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Tooltip title="Archive">
                    <ArchiveIcon />
                  </Tooltip>
                </IconButton>
              </Link>
              <Link href={"/mail/reportspam"}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={""}
                  aria-haspopup="true"
                  //   onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Tooltip title="Report Spam">
                    <ReportIcon />
                  </Tooltip>
                </IconButton>
              </Link>
              <Link href={`/mail/delete/${message_id}`}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={""}
                  aria-haspopup="true"
                  //   onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </Link>
            </Box>
            <Link href={`/mail/delete/${message_id}`}>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={""}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
};

export default BodyUpperSection;
