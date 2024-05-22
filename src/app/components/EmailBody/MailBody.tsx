// import React from "react";
// import he from "he";
// const MailBody1 = ({}) => {
//   return <div>MailBody1</div>;
// };

// export default MailBody1;
import React from "react";
import he from "he"; // Import the he library
import { Box } from "@mui/system";
import { ListItem, Paper, Toolbar, Typography } from "@mui/material";
import sanitizeHtml from "../../../../lib/dompurify";
import BodyUpperSection from "./BodyUpperSection";
import parser from "html-react-parser";
import str from "./ex";
interface propsTypeInterface {
  encodedHtml: string;
  header: string;
  message_id: string;
  sender: string;
  spamOrNot: boolean;
}
const MailBody = ({
  encodedHtml,
  header,
  message_id,
  sender,
  spamOrNot,
}: propsTypeInterface) => {
  // Decode the HTML entities
  // const decodedHtml = he.decode(encodedHtml);
  // const htmlText = parser(str);
  const sanitizedHtml = sanitizeHtml(encodedHtml);
  return (
    // <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80vh overflow-y-auto bg-white p-8 rounded-lg shadow-md">
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%", // Adjust width as needed
        maxHeight: "80vh", // Adjust max height as needed
        overflowY: "auto",
        backgroundColor: "white", // Set background color
        padding: "20px", // Add padding
        borderRadius: "8px", // Add border radius
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add box shadow
      }}
    >
      <Paper>
        <BodyUpperSection message_id={message_id}></BodyUpperSection>
      </Paper>
      <Paper elevation={2}>
        <Typography variant="body1" color="textPrimary">
          {header}
        </Typography>
        <Typography>{sender}</Typography>
        <Paper></Paper>
        {/* {typeof encodedHtml == 'string' && encodedHtml.startsWith('<') ? ( */}
        {/* <Typography> */}
        <div
          style={{ maxWidth: "100%" }}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
        {/* {htmlText} */}
        {/* </Typography> */}
        {/* ) : (
          <Typography sx={{ maxWidth: '100%' }}>{encodedHtml}</Typography>
        )} */}
      </Paper>
    </Box>
    // </div>
  );
};

export default MailBody;
