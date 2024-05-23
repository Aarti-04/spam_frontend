import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { MailReadingService } from "@/app/redux/THUNK/SOCKET-EMAIL-THUNK/scoket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyWebSocketComponent() {
  // const [socket, setSocket]: any = useState(null);
  const dispatch = useAppDispatch();
  const { new_mail_count } = useAppSelector((state) => state.socket);
  console.log("socket", new_mail_count);

  useEffect(() => {
    dispatch(MailReadingService());
  }, []);

  // Function to send message through WebSocket
  // const sendMessage: any = (message: any) => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.send(message);
  //   } else {
  //     console.error("WebSocket connection not established yet.");
  //   }
  // };

  // Usage example: sendMessage('Hello, server!');

  return (
    <div>
      {/* <button onClick={(e) => handleSocket(e)}>Button click</button> */}
    </div>
  );
}

export default MyWebSocketComponent;
