import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import { MailReadingService } from "@/app/redux/THUNK/SOCKET-EMAIL-THUNK/scoket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyWebSocketComponent() {
  // const [socket, setSocket]: any = useState(null);
  const dispatch = useAppDispatch();
  const { socket, socketStatus, socketError } = useAppSelector(
    (state) => state.socket
  );
  console.log("socket", socket);

  useEffect(() => {
    dispatch(MailReadingService());
  }, []);
  const handleSocket = (e: any) => {
    e.preventDefault();
    const newSocket: any = new WebSocket("ws://localhost:8000/practice/");
    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
      // setSocket(newSocket); // Store the socket object in state
    };
    console.log(newSocket);
  };

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
