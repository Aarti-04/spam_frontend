// import React from "react";
// import he from "he";
// const MailBody1 = ({}) => {
//   return <div>MailBody1</div>;
// };

// export default MailBody1;
import React from "react";
import he from "he"; // Import the he library
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";

const MailBody1 = ({ encodedHtml, snnipet }: any) => {
  // Decode the HTML entities
  const decodedHtml = he.decode(encodedHtml);

  return (
    <Box>
      <Paper elevation={2}>
        <Typography>{snnipet}</Typography>
        <Typography>
          <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
        </Typography>
      </Paper>
    </Box>
  );
};

export default MailBody1;
