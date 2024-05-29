import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { LogoutOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { MailReadingService } from "@/app/redux/THUNK/SOCKET-EMAIL-THUNK/scoket";
import {
  FilterMessages,
  fetchMessages,
} from "@/app/redux/THUNK/MESSAGE-THUNK/messageslicethunk";
import Image from "next/image";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MailSearchDialogBox from "../DialogBoxes/MailSearchDialogBox";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar({ toggleDrawer }: any) {
  // const { new_mail_count } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [new_mail_count, setNewMailCount] = React.useState<number>(0);
  // console.log(new_mail_count);
  const [mailSearchOpen, setMailSearchOpen] = React.useState<boolean>(false);
  const handleMailSearch = () => {
    setMailSearchOpen(false);
  };
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedValue) {
      (async () => {
        console.log("called", search);

        await dispatch(FilterMessages({ search: search }));
      })();
    }
  }, [debouncedValue]);

  useEffect(() => {
    try {
      let user_cred: any = localStorage.getItem("persist:user");
      user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
      console.log(user_cred["jwt_access_token"]);
      const mailReadingSocket: any = new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}?access_token=${user_cred["jwt_access_token"]}`
      );
      mailReadingSocket.onmessage = function (e: any) {
        setNewMailCount(JSON.parse(e.data));
        console.log("new_mail_count", new_mail_count);
      };
    } catch (e: any) {
      console.log("Error");
    }
  }, [setNewMailCount]);
  const badgeHandler = async () => {
    setNewMailCount(0);
    await dispatch(fetchMessages());
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("68", event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Link href={"/auth/logout"}>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          onClick={() => badgeHandler()}
          size="large"
          aria-label="show 2 new mails"
          color="inherit"
        >
          <Badge badgeContent={new_mail_count} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f6f8fc",
          color: "#2f2f2f",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, width: "150px" }}
          >
            <Image
              src={"/spamlogo1_1.png"}
              alt="scamicon"
              width={500}
              height={500}
              style={{
                borderRadius: "1%",
                backgroundColor: "transparent", // Make the background transparent
                objectFit: "cover", // or "contain" depending on your preference
              }}
            ></Image>
            {/* Spam Detector */}
          </Typography>
          {/* <Box> */}
          <Search
            sx={{
              backgroundColor: "#eaf1fb",
              borderRadius: "30px",
              height: "50px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search in emails"
              inputProps={{ "aria-label": "search" }}
              fullWidth
              sx={{
                width: "700px",
                fontSize: "19px",
              }}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <ManageSearchIcon
              onClick={() => setMailSearchOpen(true)}
              sx={{ fontSize: "30px" }}
            />
            <MailSearchDialogBox
              open={mailSearchOpen}
              setOpen={handleMailSearch}
            ></MailSearchDialogBox>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show new mails"
              color="inherit"
              onClick={() => badgeHandler()}
            >
              <Badge badgeContent={new_mail_count} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
