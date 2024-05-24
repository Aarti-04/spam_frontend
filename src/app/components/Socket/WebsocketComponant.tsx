import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { MailReadingService } from "@/app/redux/THUNK/SOCKET-EMAIL-THUNK/scoket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyWebSocketComponent() {
  // const [socket, setSocket]: any = useState(null);
  const dispatch = useAppDispatch();
  // const { new_mail_count } = useAppSelector((state) => state.socket);
  // console.log("socket", new_mail_count);
  // const [new_mail_count, setNewMailCount] = useState<number>(0);
  // useEffect(() => {
  //   // dispatch(MailReadingService());
  //   try {
  //     let user_cred: any = localStorage.getItem("persist:user");
  //     user_cred = JSON.parse(JSON.parse(user_cred || "")["user_token"]);
  //     console.log(user_cred["jwt_access_token"]);
  //     const mailReadingSocket: any = new WebSocket(
  //       `ws://localhost:8000/mailread/?access_token=${user_cred["jwt_access_token"]}`
  //     );

  //     mailReadingSocket.onmessage = function (e: any) {
  //       setNewMailCount(JSON.parse(e.data));
  //       // new_mail_count = JSON.parse(e.data);
  //       console.log("new_mail_count", new_mail_count);
  //     };
  //   } catch (e: any) {
  //     console.log("Error");
  //   }
  // }, []);

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
