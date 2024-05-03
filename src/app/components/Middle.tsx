import { List, ListItem, Paper } from '@mui/material';
import React from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Box } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
const Middle = ({ message_data }: any) => {
  console.log(message_data);

  return (
    <>
      <Box>
        <RefreshIcon
          sx={{
            marginTop: '1vw',
            marginLeft: '1vw',
            marginBottom: '1vw',
          }}
          onClick={()=>{}}
        ></RefreshIcon>
        {message_data.map((message: any) => {
          return (
            <Paper
              elevation={0}
              key={message.id}
              sx={{
                borderBottom: '1px solid lightgrey',
                borderTop: '1px solid lightgrey',
                backgroundColor: '#F8FCFF',
              }}
            >
              <List>
                <ListItem>
                  <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
                  <span style={{ marginLeft: '1.2vw', fontWeight: '500' }}>
                    {message.header}
                    <span style={{ marginLeft: '12vw', fontWeight: '200' }}>
                      fgbffgb
                    </span>
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
