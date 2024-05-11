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
import sanitizeHtml from "../../../lib/dompurify";
const MailBody1 = ({ encodedHtml, snnipet }: any) => {
  // Decode the HTML entities
  // const decodedHtml = he.decode(encodedHtml);
  const sanitizedHtml = sanitizeHtml(encodedHtml);
  return (
    <Box sx={{ marginTop: "1.5rem", marginLeft: "1.5rem", overflow: "auto" }}>
      <Paper elevation={2}>
        <Typography>{snnipet}</Typography>
        <Typography>
          <div
            style={{ maxWidth: "100%" }}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </Typography>
      </Paper>
    </Box>
  );
};

export default MailBody1;
