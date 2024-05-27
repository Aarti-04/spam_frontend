"use client";
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@mui/material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ReportIcon from "@mui/icons-material/Report";
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import ComposeButton from "../ComposeMail/ComposeButton";
import { width } from "@mui/system";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const theme = useTheme();
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ backgroundColor: "#f6f8fc", width: 250 }} my={1}>
        <List sx={{}}>
          <ComposeButton></ComposeButton>
          {["inbox", "sent", "starred"].map((setting) => {
            return (
              <Link
                key={setting}
                style={{ display: "block", fontSize: "50px" }}
                href={`/mail/${setting}`}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,

                    px: 3.5,
                  }}
                >
                  <ListItemIcon sx={{}}>
                    <MailIcon sx={{ fontSize: "30px" }} />
                  </ListItemIcon>
                  <ListItemText primary={setting} sx={{ fontWeight: "50px" }} />
                  {/* <Box>
                    <Typography sx={{ fontSize: '20px' }}>
                      {' '}
                      {setting}
                    </Typography>
                  </Box> */}
                </ListItemButton>
              </Link>
            );
          })}
        </List>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link href={"/mail/all mail"}>
              {" "}
              <ListItemButton
                sx={{
                  minHeight: 48,

                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,

                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="All">
                    <AllInboxIcon sx={{ fontSize: "30px" }} />
                  </Tooltip>
                </ListItemIcon>

                <ListItemText primary="All Mail" sx={{}} />
              </ListItemButton>
            </Link>
            <Link href={"/mail/spam"}>
              <ListItemButton
                sx={{
                  minHeight: 48,

                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,

                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Tooltip title="spam">
                    <ReportIcon sx={{ fontSize: "30px" }} />
                  </Tooltip>
                </ListItemIcon>

                <ListItemText primary="spam" sx={{}} />
              </ListItemButton>
            </Link>
            <Link href={"/mail/archive"}>
              <ListItemButton
                sx={{
                  minHeight: 48,

                  px: 3.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,

                    justifyContent: "center",
                  }}
                >
                  <ArchiveIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>

                <ListItemText primary="Archived" sx={{}} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
