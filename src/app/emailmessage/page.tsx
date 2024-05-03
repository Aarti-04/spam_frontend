import React, { useState } from "react";
import { Typography } from "@mui/material";

const EmailMessage = ({ messageBody }: any) => {
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleBodyVisibility = () => {
    setShowFullBody(!showFullBody);
  };

  return (
    <div className="w-full">
      {showFullBody ? (
        <Typography variant="body1">{messageBody}</Typography>
      ) : (
        <Typography
          variant="body1"
          className="line-clamp-2 cursor-pointer"
          onClick={toggleBodyVisibility}
        >
          {messageBody}
        </Typography>
      )}
    </div>
  );
};

export default EmailMessage;
