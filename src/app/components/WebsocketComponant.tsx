import { useEffect, useState } from 'react';

function MyWebSocketComponent() {
  const [socket, setSocket]: any = useState(null);

  useEffect(() => {
    const newSocket: any = new WebSocket('ws://localhost:8000/practice/');
    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket); // Store the socket object in state
    };
    console.log(newSocket);
    // Establish WebSocket connection
    // const newSocket: any = new WebSocket("ws://localhost:8000/ws/chat/");
    // // WebSocket event listeners
    // newSocket.onopen = () => {
    //   console.log("WebSocket connection established.");
    //   setSocket(newSocket); // Store the socket object in state
    // };
    // newSocket.onmessage = (event: any) => {
    //   console.log("Message from server:", event.data);
    // };
    // newSocket.onerror = (error: any) => {
    //   console.error("WebSocket error:", error);
    // };
    // newSocket.onclose = () => {
    //   console.log("WebSocket connection closed.");
    // };
    // // Clean up on component unmount
    // return () => {
    //   newSocket.close();
    // };
  }, []);
  const handleSocket = (e: any) => {
    e.preventDefault();
    const newSocket: any = new WebSocket('ws://localhost:8000/practice/');
    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket); // Store the socket object in state
    };
    console.log(newSocket);
  };

  // Function to send message through WebSocket
  const sendMessage: any = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error('WebSocket connection not established yet.');
    }
  };

  // Usage example: sendMessage('Hello, server!');

  return (
    <div>
      {/* <button onClick={(e) => handleSocket(e)}>Button click</button> */}
    </div>
  );
}

export default MyWebSocketComponent;
