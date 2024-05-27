import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ComposeDialog from './ComposeDialog';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
const ComposeButton = () => {
  const [open, setOpen] = useState(false);

  const HandleOpen = () => {
    setOpen(true);
    console.log('handleopen called');
  };
  const HandleClose = () => {
    console.log('handle close called');
    // setOpen(!open);
    setOpen(false); // Use functional update form
  };
  console.log(open);

  return (
    // <Box>
    //   <Fab color="primary" aria-label="add" onClick={handleOpen}>
    //     <AddIcon />
    //   </Fab>
    //   <ComposeDialog open={open} handleClose={handleClose}></ComposeDialog>
    // </Box>
    // <Box
    //   sx={{
    //     backgroundColor: '#c2e7fe',
    //     fontSize: '15px',
    //     height: '60px',
    //     borderRadius: '15px',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     mx: '1rem',
    //     width: '70%',
    //   }}
    //   // onClick={handleOpen}
    // >
    //   {/* <EditIcon sx={{ marginRight: '10px' }}></EditIcon> */}
    //   <Fab aria-label="add" onClick={handleOpen}>
    //     <EditIcon />
    //   </Fab>
    //   Compose
    //   <ComposeDialog open={open} handleClose={handleClose}></ComposeDialog>
    // </Box>
    <Box
      sx={{
        backgroundColor: '#c2e7fe',
        fontSize: '15px',
        height: '60px',
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mx: '1rem',
        width: '70%',
        cursor: 'pointer',
        padding: '0 16px',
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: '#b0d4f5',
        },
      }}
    >
      <EditIcon onClick={() => HandleOpen()} sx={{ marginRight: '10px' }} />
      Compose
      <ComposeDialog open={open} handleClose={() => HandleClose()} />
    </Box>
  );
};

export default ComposeButton;
