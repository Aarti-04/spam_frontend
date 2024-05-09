// import React, { useState } from "react";
// import { Typography } from "@mui/material";

// const EmailMessage = ({ messageBody }: any) => {
//   const [showFullBody, setShowFullBody] = useState(false);

//   const toggleBodyVisibility = () => {
//     setShowFullBody(!showFullBody);
//   };

//   return (
//     <div className="w-full">
//       {showFullBody ? (
//         <Typography variant="body1">{messageBody}</Typography>
//       ) : (
//         <Typography
//           variant="body1"
//           className="line-clamp-2 cursor-pointer"
//           onClick={toggleBodyVisibility}
//         >
//           {messageBody}
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default EmailMessage;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EmailMessage = ({ messageBody }: any) => {
  // const [emails, setEmails] = useState([]);
  // const { messages, status, error } = useSelector(
  //   (state: any) => state.message
  // );
  // useEffect(() => {
  //   // Fetch email data from backend API
  //   fetch("/api/emails")
  //     .then((response) => response.json())
  //     .then((data) => setEmails(data))
  //     .catch((error) => console.error("Error fetching emails:", error));
  // }, []);

  return (
    <div>
      <div key={messageBody.id}>
        <h2>{messageBody.header}</h2>
        <p>From: {messageBody.sender}</p>
        <p>Date: {messageBody.date}</p>
        <div dangerouslySetInnerHTML={{ __html: messageBody.body }}></div>
        {messageBody.spam && <p>This email is marked as spam</p>}
      </div>
    </div>
  );
};

export default EmailMessage;
