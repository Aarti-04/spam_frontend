import { List, ListItem, Paper } from "@mui/material";
import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Box } from "@mui/system";
const Middle = ({ message_data }: any) => {
  console.log(message_data);

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "100vw" }}>
        {message_data.map((message: any) => {
          return (
            <Paper key={message.id} sx={{ border: "1px solid lightgrey" }}>
              <List>
                <ListItem>
                  <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
                  <span>
                    {message.header}
                    <span>fgbffgb</span>
                  </span>
                </ListItem>
              </List>
            </Paper>
          );
        })}
      </Box>
    </>
  );
};

export default Middle;
